"use client"
// components/Map.jsx

import React, { useState } from 'react'

import Map, { NavigationControl } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { ColumnLayer, GeoJsonLayer, GridCellLayer, TextLayer } from '@deck.gl/layers';
import { CPUGridLayer } from '@deck.gl/aggregation-layers';
import "mapbox-gl/dist/mapbox-gl.css"
import mapData from './mapData.js';
import seatOutlines from './with_seat.geo.json';
import ppSeatOutlines from './lahore_pp_2.json';
import ppLabels from './ppSeatCentroids.json'
import res128 from './res128.json';
import res130 from './res130.json';
import mapDataFixed from './seatDataFixed.json';
import { simplify } from "@turf/simplify";
import { circle } from "@turf/circle";
import { destination } from "@turf/destination";
import { booleanOverlap } from "@turf/boolean-overlap";
import * as turf from "@turf/turf";
import * as d3 from "d3";

seatOutlines.features = seatOutlines.features.filter(
    d => [122,128,130].includes(d.properties.seat)
)
console.log(ppSeatOutlines)

ppSeatOutlines.features = ppSeatOutlines.features.filter(
    d => [171,170,169,161,156,155,157,175,173,171].includes(d.properties.id)
)



//const simmpleSeatOutlines = simplify(seatOutlines, {mutate : true, tolerance : 0.007})

// import map config
import {
    lightingEffect,
    material,
    INITIAL_VIEW_STATE,
    colorRange,
    partyColors
} from "../lib/mapconfig.js";
import { MapView } from 'deck.gl';

const circles = mapData.map(d => circle([d.lng, d.lat], 0.2))

const squareSize = 0.2; // in meters

function resolveOverlaps(circles) {
    const maxIterations = 1;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
        circles.forEach((circle, i) => {
            circles.forEach((otherCircle, j) => {
                if (otherCircle === circle) {
                    return;
                }
                if (booleanOverlap(circle, otherCircle)) {
                    console.log('overlap', circle, otherCircle, i, j);
                }
            })
        });
    }

    return squares;
}

const filterSeats = (seat, data) => {
    const seatOutline = seatOutlines.features
        .filter(d => d.properties.seat == seat)[0];

    const poly = turf.polygon(seatOutline.geometry.coordinates)
    const bbox = turf.bbox(poly);
    const correctSeats = data.filter(d => {
        return turf.booleanPointInPolygon([d.coords.lng, d.coords.lat], poly)
    })

    let randomcoords = turf.randomPoint(data.length, { bbox: bbox })

    var voronoiPolygons = turf.voronoi(randomcoords, { bbox: bbox });

    //console.log(voronoiPolygons);

    const centers = voronoiPolygons.features
        .map(d => turf.centroid(turf.polygon(d.geometry.coordinates)))

    console.log(centers);

    //correctSeats.forEach((d,i) => d.coords = centers[i].geometry.coordinates)

    return centers.map((d, i) => ({
        ...data[i],
        coords: d.geometry.coordinates
    }))
        .filter(d => {
            return turf.booleanPointInPolygon(d.coords, poly)
        });
}

const getTextLayerData = (geojson) => {


    return geojson.features
        .map(d => ({
            centroid: turf.centroid(turf.polygon(d.geometry.coordinates)).geometry.coordinates,
            seat: 'NA-' + d.properties.seat
        }));
}

const textLayerData = getTextLayerData(seatOutlines);
//const ppTextLayerData = getTextLayerData(ppSeatOutlines);
console.log(textLayerData)

//window.filterSeats = filterSeats;

/*const mapDataFormat = filterSeats(128, res128)
    .concat(filterSeats(130, res130))
    .map(
        d => ({
            centroid: d.coords,
            value: d["Final Votes"],
            advantage : Number.parseInt(d['riggingAdvantage']) || 0,
            ps: d["Polling Station"],
            winner: d.Winner
        })
    )

console.log(mapDataFormat, 'mapData');

// Call the function and update your map
//const updatedSquares = resolveOverlaps(circles);

//console.log(updatedSquares);
*/

const LocationAggregatorMap = ({
    valKey,
    data = [
        {
            centroid: [74.3587, 31.5204],
            value: 1400
        },
        {
            centroid: [74.3697, 31.5334],
            value: 800
        }
    ],
    showNA,
    showPP
}) => {

    const layers = [
        new GeoJsonLayer({
            id: 'GeoJsonLayer',
            data: seatOutlines,
            //extruded : true,
            //getElevation : d => Math.random() * 1000,
            stroked: true,
            filled: true,
            pointType: 'circle+text',
            pickable: true,
            depthTest: false,
            parameters : {
                depthTest: false
            },
            getFillColor: f => { 
                return [82,112,209, 100] 
            },
            getLineColor: f => {
                // convert to RGB
                return [0, 0, 0, 100];
            },
            getLineWidth: 80,
            lineCapRounded: true,
            lineWidthMinPixels: 1,
            getPointRadius: 4,
            opacity : showNA,
            transitions : {
                opacity : 1000
            },
            updateTriggers: {
                opacity : showNA
            }
        }),
        new GeoJsonLayer({
            id: 'GeoJsonLayer1',
            data: ppSeatOutlines,
            depthTest: false,
            polygonOffset : 10,
            parameters : {
                depthTest: false
            },
            //extruded : true,
            //getElevation : d => Math.random() * 1000,
            stroked: true,
            filled: true,
            pointType: 'circle+text',
            pickable: true,
            getFillColor: f => { 
                const opacity = showPP ? 100 : 0
                return [255,110,72, opacity] 
            },
            getLineColor: f => {
                const opacity = showPP ? 100 : 0
                // convert to RGB
                return [255, 255, 255, opacity];
            },
            getLineWidth: 60,
            lineCapRounded: true,
            lineWidthMinPixels: 1,
            getPointRadius: 4,
            transitions: {
                getFillColor: {
                    duration: 2000,
                    easing: d3.easeCubicOut
                },
                getLineColor: {
                    duration: 2000,
                    easing: d3.easeCubicOut
                },
            },
            updateTriggers: {
                getFillColor: [showPP],
                getLineColor : [showPP]
            }
        }),
        new TextLayer({
            id: 'TextLayer',
            data: textLayerData,
            getPosition: d => d.centroid,
            getText: d => d.seat,
            getPixelOffset: [0, 0],
            getAlignmentBaseline: 'center',
            getColor: d => {
                const opacity = showNA ? 255 : 0
                return [255, 255, 255, opacity]
            },
            getSize: 500,
            sizeMinPixels: 10,
            sizeScale: 1,
            getTextAnchor: 'middle',
            pickable: true,
            //background : true,
            //getBackgroundColor : [255,255,255,255],
            getAlignmentBaseline: "bottom",
            sizeUnits: 'meters',
            fontFamily: 'sans-serif',
            fontWeight: 900,
            //outlineWidth : 2,
            fontSettings: {
                radius: 5,
                sdf: true
            },
            transitions: {
                getColor: {
                    duration: 2000,
                    easing: d3.easeCubicOut
                }
            },
            updateTriggers: {
                getColor: [showNA]
            }
        }),
        new TextLayer({
            id: 'TextLayer1',
            data: ppLabels,
            getPosition: d => d.centroid,
            getText: d => d.seat,
            getPixelOffset: [0, 0],
            getAlignmentBaseline: 'center',
            getColor: d => {
                const opacity = showPP ? 150 : 0
                return [255, 255, 255, opacity]
            },
            getSize: 300,
            sizeMinPixels: 8,
            sizeScale: 1,
            getTextAnchor: 'middle',
            pickable: true,
            //background : true,
            //getBackgroundColor : [255,255,255,255],
            getAlignmentBaseline: "bottom",
            sizeUnits: 'meters',
            fontFamily: 'sans-serif',
            fontWeight: 900,
            //outlineWidth : 2,
            fontSettings: {
                radius: 5,
                sdf: true
            },
            transitions: {
                getColor: {
                    duration: 2000,
                    easing: d3.easeCubicOut
                }
            },
            updateTriggers: {
                getColor: [showPP]
            }
        })
    ];


    return (
        <div>
            <DeckGL
                layers={layers}
                //effects={[lightingEffect]}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
            //views={new MapView({})}
            /*getTooltip={(obj) => {
                console.log(obj);
                return "hello"
            }}*/
            >
                <Map
                    controller={true}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                    mapStyle="mapbox://styles/mapbox/standard"
                >
                </Map>
            </DeckGL>
        </div>
    );
};

export default LocationAggregatorMap;