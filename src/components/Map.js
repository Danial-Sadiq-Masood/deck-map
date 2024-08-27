"use client"
// components/Map.jsx

import React, { useState } from 'react'

import Map, {NavigationControl}  from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import {ColumnLayer} from '@deck.gl/layers';
import "mapbox-gl/dist/mapbox-gl.css"
import mapData from './mapData.js';
// import map config
import {
    lightingEffect,
    material,
    INITIAL_VIEW_STATE,
    colorRange,
} from "../lib/mapconfig.js";

const mapDataFormat = mapData.map(
    d => ({
        centroid : [d.lng, d.lat],
        value : Math.floor(Math.random() * 1000)
    })
)

const LocationAggregatorMap = ({
    data = [
        {
            centroid : [74.3587, 31.5204],
            value : 1400
        },
        {
            centroid : [74.3697, 31.5334],
            value : 800
        }
    ]
}) => {

    const layers = [
        new ColumnLayer({
            id: 'ColumnLayer',
            data: mapDataFormat,
            diskResolution: 6,
            extruded: true,
            radius: 100,
            elevationScale: 1,
            getElevation: (d) => d.value,
            getFillColor: (d) => [48, 128, d.value * 255, 200],
            getPosition: (d) => d.centroid,
            pickable: true
        })
      ];


return (
    <div>
        <DeckGL
            layers={layers}
            effects={[lightingEffect]}
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
        >
            <Map
                controller={true}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox://styles/petherem/cl2hdvc6r003114n2jgmmdr24"
            >
            </Map>
        </DeckGL>
    </div>
);
};

export default LocationAggregatorMap;