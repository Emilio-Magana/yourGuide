import type { RefObject } from "react";
import Maptile, { type Location } from "./MapTile";

interface TourMapProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  locations: Location[];
}

export default function TourMap({ sectionRef, locations }: TourMapProps) {
  return (
    <section
      ref={sectionRef}
      className="mb-5 ml-5 flex scroll-mt-20 flex-col gap-4 s_window:mb-9 s_window:ml-9"
    >
      <h1 className="mr-5 place-self-end text-4xl text-primary s_window:mr-9">
        Itinerary
      </h1>
      <Maptile
        className="flex flex-col justify-items-end overflow-hidden rounded-l-2xl m_window:flex-row"
        locations={locations}
      />
    </section>
  );
}
