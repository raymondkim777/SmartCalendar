"use client"

import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMapRoute = ({ directions, bounds, start, end }) => {
    let polyline = require( 'google-polyline' );


    const mapRef = React.useRef(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                version: 'weekly'
            });

            const { Map } = await loader.importLibrary('maps');
            const { AdvancedMarkerElement } = await loader.importLibrary('marker');
            const { Polyline } = await loader.importLibrary('maps');
            const { LatLngBounds } = await loader.importLibrary('core');

            console.log(bounds);
            // const boundsObject = {
            //     north: bounds.northeast.lat,
            //     south: bounds.southwest.lat,
            //     west: bounds.southwest.lng,
            //     east: bounds.northeast.lng,
            // };
            // console.log(boundsObject);

            // map options
            const mapOptions = {
                mapId: 'DETAIL_MAP_VIEW',
                disableDefaultUI: true,
                gestureHandling: 'none',
                // restriction: {
                //     latLngBounds: boundsObject,
                //     strictBounds: true,
                // },
            };

            // setup map
            const map = new Map(mapRef.current, mapOptions);
            // map.fitBounds(new LatLngBounds(bounds.southwest, bounds.northeast));

            // put up marker
            const markerStart = new AdvancedMarkerElement({
                map: map, 
                position: start,
                title: "From",
            })
            const markerEnd = new AdvancedMarkerElement({
                map: map, 
                position: end,
                title: "To",
            })

            // draw polyline
            const pathPoints = polyline.decode(directions);
            const pathCoordinates = [];

            let boundsObject = new LatLngBounds();

            for (let i = 0; i < pathPoints.length; i++) {
                let coordinates = {lat: pathPoints[i][0], lng: pathPoints[i][1]};
                pathCoordinates.push(coordinates);
                boundsObject.extend(coordinates);
            }
            map.fitBounds(boundsObject);

            const path = new Polyline({
                path: pathCoordinates, 
                geodesic: true, 
                strokeColor: "#FF0000", 
                strokeOpacity: 1.0, 
                strokeWeight: 4,
            })
            path.setMap(map);
        }

        initMap();
    }, [directions]);

    return (
        <div className='w-full h-full overflow-hidden' ref={mapRef} />
    )
}

export default GoogleMapRoute;