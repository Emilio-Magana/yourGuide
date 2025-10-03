import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// interface locationProps {
//   coordinates: Array<number>;
//   description: string;
//   day: number;
// }

export default function Maptile({ locations }: { locations: any }) {
  // Reference for the container <div>
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // Reference to hold the map instance
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // ✅ Initialize map only once
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/s-chanda/clikoaxwo00fq01pf9h3lgc0g",
        scrollZoom: false,
      });
    }

    const map = mapRef.current;

    // ✅ Create bounds
    const bounds = new mapboxgl.LngLatBounds();

    // ✅ Clear existing markers/popups if needed
    // (MapboxGL doesn’t automatically clear them between renders)

    locations.forEach((location: any) => {
      // create marker element
      const el = document.createElement("div");
      el.className = "marker";

      // add marker
      new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat(location.coordinates)
        .addTo(map);

      // add popup
      new mapboxgl.Popup({ offset: 30 })
        .setLngLat(location.coordinates)
        .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
        .addTo(map);

      // extend bounds
      bounds.extend(location.coordinates);
    });

    // ✅ Fit to bounds
    map.fitBounds(bounds, {
      padding: { top: 200, bottom: 150, left: 100, right: 100 },
    });

    // ✅ Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [locations]); // re-run when locations change

  return (
    <section className="section-map">
      <div
        ref={mapContainerRef}
        id="map"
        className="h-[500px] w-full" // make sure container has a size
      ></div>
    </section>
  );
}
