import type { Location } from "../../config/schema";
import Maptile from "../../components/MapTile";

import type { RefObject } from "react";

interface TourMapProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  locations: Location[];
  className: string;
}

export default function TourMap({
  sectionRef,
  locations,
  className,
}: TourMapProps) {
  return (
    <section ref={sectionRef} className={className}>
      <h1 className="place-self-end rounded-tl-3xl bg-centerLBg pl-6 pr-3 pt-2 font-serif text-4xl text-white">
        Itinerary
      </h1>
      <Maptile
        className="flex flex-col justify-items-end overflow-hidden rounded-l-3xl border-[11px] border-centerLBg duration-300 m_window:flex-row"
        locations={locations}
      />
    </section>
  );
}
