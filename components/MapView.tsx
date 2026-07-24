'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

/* ── Custom marker styled to match the accent palette ── */
const markerIcon = L.divIcon({
  className: '',
  html: `<div style="
    width: 18px; height: 18px;
    background: #7C5CFF;
    border: 3px solid rgba(124, 92, 255, 0.35);
    border-radius: 50%;
    box-shadow: 0 0 24px rgba(124, 92, 255, 0.55), 0 0 8px rgba(124, 92, 255, 0.3);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -12],
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
    <div className="mt-8 rounded-xl overflow-hidden border border-white/[0.06] shadow-lg shadow-black/20">
      <MapContainer
        center={CAMPUS_COORDS}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
        attributionControl={false}
        className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px]"
      >
        <MapResizer />
        {/* ── Standard OpenStreetMap tiles — normal map colors like Google Maps, clear and readable ── */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ── Marker ── */}
        <Marker position={CAMPUS_COORDS} icon={markerIcon} />
      </MapContainer>

      {/* ── Subtle bottom bar with location label & attribution ── */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-black/40 backdrop-blur-sm border-t border-white/[0.04]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-signal animate-signal-pulse" />
          <span className="font-mono text-[11px] tracking-wider text-white/45">
            Sorsogon State University – Bulan Campus
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-wider text-white/25">
          © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">OSM</a>
        </span>
      </div>
    </div>
  );
}
