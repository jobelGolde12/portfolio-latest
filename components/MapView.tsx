'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* ── Custom marker — quiet ink dot with rose ring ── */
const markerIcon = L.divIcon({
  className: '',
  html: `<div style="
    width: 14px; height: 14px;
    background: #111111;
    border: 2px solid #ffffff;
    outline: 2px solid #d96c92;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  "></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  popupAnchor: [0, -10],
});

/* ── Sorsogon State University - Bulan Campus coordinates ── */
const CAMPUS_COORDS: [number, number] = [12.6662, 123.8816];

/* ── Ensures the map re-calculates its size after mount ── */
function MapResizer() {
  const map = useMap();
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;
    // Leaflet needs the container to be visible when measuring.
    // A short timeout ensures any parent animation has settled.
    const t = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(t);
  }, [map]);

  return null;
}

export default function MapView() {
  return (
    <div className="overflow-hidden rounded-sm border border-border-subtle">
      <MapContainer
        center={CAMPUS_COORDS}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
        attributionControl={false}
        className="h-[220px] w-full sm:h-[260px] md:h-[300px]"
      >
        <MapResizer />
        {/* Standard OpenStreetMap tiles — neutral colors that sit quietly on the white canvas */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={CAMPUS_COORDS} icon={markerIcon} />
      </MapContainer>

      {/* Bottom bar with location label & attribution */}
      <div className="flex items-center justify-between gap-2 border-t border-border-subtle bg-bg-surface px-4 py-2.5">
        <span className="font-mono text-[11px] tracking-wider text-text-secondary">
          Sorsogon State University – Bulan Campus
        </span>
        <span className="font-mono text-[9px] tracking-wider text-text-faint">
          ©{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            OSM
          </a>
        </span>
      </div>
    </div>
  );
}
