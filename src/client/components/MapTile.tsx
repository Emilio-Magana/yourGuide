import mapboxgl from "mapbox-gl";
import { FaCalendar, FaMapPin } from "react-icons/fa6";
import { useRef, useEffect, useState, type RefObject } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MdOutlineZoomOutMap } from "react-icons/md";

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
        background-color: #4f46e5;
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

      // Popup positioned slightly above marker
      const popup = new mapboxgl.Popup({
        offset: 10,
        // closeButton: true,
        closeOnClick: true,
      }).setHTML(
        `
        <div className="p-3">
          <strong className="text-base text-[#1f2937]">${loc.description}</strong><br/>
          <span className="text-sm text-[#6b7280]">Day ${loc.day}</span>
        </div>
      `,
      );

      // Create marker anchored at bottom
      const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat(locCoordinates)
        .setPopup(popup)
        .addTo(map);

      el.addEventListener("click", () => setSelectedLocation(loc));

      markersRef.current.push(marker);
      //allows for all coordinates to be seen in initial render
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
      {/* Map Section */}
      <div ref={mapContainerRef} className="h-[450px] w-full grow" />

      {/* Sidebar Section */}
      <div className="max-h-[450px] bg-gradient-to-br from-blue-50 to-slate-200 p-5 duration-300 m_window:min-w-[350px] l_window:min-w-[450px]">
        <div className="mb-5 flex items-baseline justify-between text-2xl">
          <h1 className="flex items-center gap-2 font-bold text-gray-800">
            <FaMapPin className="text-indigo-600" />
            Tour Locations
          </h1>
          <button onClick={resetView} className="flex items-center gap-2">
            <MdOutlineZoomOutMap className="text-indigo-600" />
            {/* Reset View */}
          </button>
        </div>
        <div className="space-y-4">
          {locations.map((loc, idx) => (
            <div
              key={loc._id.$oid}
              onClick={() => flyToLocation(loc, idx)}
              className={`cursor-pointer rounded-xl p-3 transition-all duration-300 ${
                selectedLocation === loc
                  ? "scale-105 bg-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-800 hover:bg-indigo-100 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center self-center rounded-full font-bold ${
                    selectedLocation === loc
                      ? "bg-white text-indigo-600"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 truncate text-lg font-semibold">
                    {loc.description}
                  </h4>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <FaCalendar className="h-4 w-4" />
                    <span>Day {loc.day}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
