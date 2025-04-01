'use client';

import L from "leaflet";
import { MapContainer, Marker, TileLayer, ZoomControl, useMap } from "react-leaflet";
import { useCallback, useEffect, useMemo, useState } from "react";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface MapUpdateProps {
    center: L.LatLngExpression;
    zoom: number;
}

const MapUpdate: React.FC<MapUpdateProps> = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(center, zoom);
    }, [center, map, zoom]);

    return null;
};

// @ts-expect-error - Leaflet's type definitions don't include _getIconUrl property
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,       
    iconRetinaUrl: markerIcon2x, 
    shadowUrl: markerShadow,
});

interface MapProps {
    center?: number[]; // Optional center coordinates [latitude, longitude]
}

const DEFAULT_CENTER: L.LatLngExpression = [51, -0.09];
const DEFAULT_ZOOM = 2;
const CENTERED_ZOOM = 4;

const Map: React.FC<MapProps> = ({ center }) => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const mapCenter = useMemo(() => {
        if (!center) return DEFAULT_CENTER;
        try {
            return center as L.LatLngExpression;
        } catch (err) {
            setError("Invalid coordinates provided");
            return DEFAULT_CENTER;
        }
    }, [center]);

    const handleMapError = useCallback((error: Error) => {
        console.error("Map Error:", error);
        setError("Failed to load map properly");
    }, []);

    useEffect(() => {
        // Simulate map loading
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (error) {
        return (
            <div className="h-[35vh] rounded-lg bg-neutral-200 flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-[35vh] rounded-lg bg-neutral-200 flex items-center justify-center">
                <p>Loading map...</p>
            </div>
        );
    }

    return (
        <MapContainer
            center={mapCenter}
            zoom={center ? CENTERED_ZOOM : DEFAULT_ZOOM}
            scrollWheelZoom={true}
            className="h-[35vh] rounded-lg"
            zoomControl={false}
            onError={handleMapError}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />
            {center && (
                <>
                    <MapUpdate center={center as L.LatLngExpression} zoom={CENTERED_ZOOM} />
                    <Marker 
                        position={center as L.LatLngExpression}
                        eventHandlers={{
                            error: handleMapError
                        }}
                    />
                </>
            )}
        </MapContainer>
    );
};

export default Map;