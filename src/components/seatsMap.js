"use client"
// components/Map.jsx

import React, { useState } from 'react'

import Map, { NavigationControl } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { SolidPolygonLayer, GeoJsonLayer, GridCellLayer, TextLayer } from '@deck.gl/layers';
import { CPUGridLayer } from '@deck.gl/aggregation-layers';
import "mapbox-gl/dist/mapbox-gl.css"
import mapData from './mapData.js';
import seatOutlines from './with_seat.geo.json';
import res128 from './res128.json';
import res130 from './res130.json';
import { simplify } from "@turf/simplify";
import { circle } from "@turf/circle";
import { destination } from "@turf/destination";
import { booleanOverlap } from "@turf/boolean-overlap";
import * as turf from "@turf/turf";
import * as d3 from "d3";



//const simmpleSeatOutlines = simplify(seatOutlines, {mutate : true, tolerance : 0.007})

console.log(seatOutlines);
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

    console.log(voronoiPolygons);

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

const getTextLayerData = () => {


    return seatOutlines.features
        .map(d => ({
            centroid: turf.centroid(turf.polygon(d.geometry.coordinates)).geometry.coordinates,
            seat: 'NA-' + d.properties.seat
        }));
}

const textLayerData = getTextLayerData();
console.log(textLayerData)

//window.filterSeats = filterSeats;

const mapDataFormat = filterSeats(128, res128)
    .concat(filterSeats(130, res130))
    .map(
        d => ({
            centroid: d.coords,
            value: d["Final Votes"],
            ps: d["Polling Station"],
            winner: d.Winner
        })
    )

// Call the function and update your map
//const updatedSquares = resolveOverlaps(circles);

//console.log(updatedSquares);

const seatAverage = {
    128 : {
        na : 82.5,
        pa : 46.6
    },
    130 : {
        na : 66.2,
        pa : 39.7
    }
}

const polyLayer = seatOutlines.features
    .filter(d => d.properties.seat == 128 || d.properties.seat == 130)

const LocationAggregatorMap = ({
    extensionKey = "Final Votes",
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
    valKey
}) => {

    const layers = [
        /*new ColumnLayer({
            id: 'ColumnLayer',
            data: mapDataFormat,
            diskResolution: 6,
            extruded: true,
            radius: 100,
            elevationScale: 1,
            getElevation: (d) => d.value,
            getFillColor: (d) => [48, 128, d.value * 255, 250],
            getPosition: (d) => d.centroid,
            pickable: true
        }),*/
        /*new CPUGridLayer({
            id: 'CPUGridLayer',
            data: mapDataFormat,
            extruded: true,
            getPosition: d => d.centroid,
            getColorWeight: 0,
            colorRange : [[10,10,250,180]],
            getElevationWeight: d => d.value,
            elevationScale: 4,
            cellSize: 50,
            pickable: true
        }),*/
        new GeoJsonLayer({
            id: 'GeoJsonLayer',
            data: seatOutlines,
            //extruded : true,
            //getElevation : d => Math.random() * 1000,
            stroked: true,
            filled: true,
            pointType: 'circle+text',
            pickable: true,

            getFillColor: f => { return [...partyColors[f.properties.winner], 70] },
            getLineColor: f => {
                const hex = f.properties.color;
                // convert to RGB
                return [250, 250, 250, 120];
            },
            getLineWidth: 40,
            lineCapRounded: true,
            lineWidthMinPixels: 1,
            getPointRadius: 4
        }),
        new SolidPolygonLayer({
            id: 'solidpolylayer',
            data: polyLayer,
            elevationScale : 10,
            extruded : true,
            getPolygon : (d) => d.geometry.coordinates,
            getElevation : d => {
                if(seatAverage[d.properties.seat]){
                    return seatAverage[d.properties.seat][valKey]
                }else{
                    return 0
                }
            },
            stroked: true,
            filled: true,
            pointType: 'circle+text',
            pickable: true,
            wireframe : true,
            getFillColor: f => { 
                if(f.properties.winner !== 'pti'){
                    return [255,174,155, 200]
                }else{
                    return [127,157,255, 200]
                } 
            },
            getLineColor: f => {
                const hex = f.properties.color;
                // convert to RGB
                return [250, 250, 250, 200];
            },
            getLineWidth: 80,
            lineCapRounded: true,
            lineWidthMinPixels: 1,
            transitions : {
                getElevation : {
                    duration : 1000,
                    easing : d3.easeCubicOut
                }
            },
            updateTriggers : {
                getElevation : [valKey]
            }
        }),
        new TextLayer({
            id: 'TextLayer',
            data: textLayerData,
            getPosition: d => [d.centroid[0], d.centroid[1], 1200],
            getText: d => d.seat,
            getPixelOffset: [0, 0],
            getAlignmentBaseline: 'center',
            getColor: [255,255,255,255],
            getSize: 500,
            sizeMinPixels : 10,
            sizeScale: 1,
            getTextAnchor: 'middle',
            pickable: true,
            getAlignmentBaseline: "bottom",
            sizeUnits: 'meters',
            fontFamily: 'sans-serif',
            fontWeight: 900,
            outlineColor: [250, 250, 250, 250],
            fontSettings: {
                radius: 5
            }
        })
        /*new PolygonLayer({
            id: 'PolygonLayer',
            data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-zipcodes.json',

            getPolygon: d => d.contour,
            getElevation: d => d.population / d.area / 10,
            getFillColor: d => [d.population / d.area / 60, 140, 0],
            getLineColor: [255, 255, 255],
            getLineWidth: 20,
            lineWidthMinPixels: 1,
            pickable: true
        }),*/
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