import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState, type RefObject } from "react";

import MapMenu from "../ui/MapMenu";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface MaptileProps {
  locations: Location[];
  sectionRef?: RefObject<HTMLDivElement | null>;
  className: string;
}
export interface Location {
  type: string;
  coordinates: number[];
  description: string;
  day: number;
  _id: { $oid: string };
}
type CoordinateTuple = [number, number];

export default function Maptile({
  locations,
  sectionRef,
  className,
}: MaptileProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const boundsRef = useRef<mapboxgl.LngLatBounds | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  useEffect(() => {
    if (!mapContainerRef.current || locations.length === 0) return;

    const center: CoordinateTuple = locations[0].coordinates as CoordinateTuple;

    // Initialize map only once
    if (!mapRef.current) {
      // mapRef.current = new mapboxgl.Map({
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/emima/cmecwcfas001w01sa8nejbkq4",
        center,
        zoom: 8,
        scrollZoom: false,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      mapRef.current.on("load", () => {
        mapRef.current?.resize();
        addMarkers(locations);
      });
    } else {
      addMarkers(locations);
    }

    // Cleanup on unmount
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [locations]);

  const addMarkers = (locs: Location[]) => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const bounds = new mapboxgl.LngLatBounds();

    locs.forEach((loc, idx) => {
      const locCoordinates: CoordinateTuple =
        loc.coordinates as CoordinateTuple;

      // Custom marker
      const el = document.createElement("div");
      el.style.cssText = `
        background-color: var(--highLightBg);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
      `;
      el.textContent = (idx + 1).toString();

      const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat(locCoordinates)
        .addTo(map);

      el.addEventListener("click", () => setSelectedLocation(loc));

      markersRef.current.push(marker);
      bounds.extend(locCoordinates);
    });

    map.fitBounds(bounds, {
      padding: { top: 100, bottom: 100, left: 100, right: 100 },
    });
    boundsRef.current = bounds;
  };

  const flyToLocation = (loc: Location, idx: number): void => {
    if (!mapRef.current) return;

    setSelectedLocation(loc);

    const map = mapRef.current;
    const locCoordinates: CoordinateTuple = loc.coordinates as CoordinateTuple;

    map.flyTo({
      center: locCoordinates,
      zoom: 10,
      duration: 1500,
      essential: true,
    });

    // Open popup after animation
    setTimeout(() => {
      markersRef.current[idx]?.togglePopup();
    }, 1500);
  };

  // react-based reset button action
  const resetView = () => {
    const map = mapRef.current;
    if (!map || !boundsRef.current) return;

    map.fitBounds(boundsRef.current, {
      padding: { top: 100, bottom: 100, left: 100, right: 100 },
      // duration: 1000,
    });
  };

  return (
    <div ref={sectionRef} className={className}>
      <div ref={mapContainerRef} className="h-[550px] w-full" />
      <MapMenu
        className="bg-centerLBg p-5 m_window:min-w-[350px] l_window:min-w-[450px]"
        locations={locations}
        flyToLocation={flyToLocation}
        resetView={resetView}
        selectedLocation={selectedLocation}
      />
    </div>
  );
}
