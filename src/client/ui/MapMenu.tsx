import { FaCalendar, FaMapPin } from "react-icons/fa6";
import { MdOutlineZoomOutMap } from "react-icons/md";
import type { Location } from "../components/MapTile";

interface MapMenuProps {
  className: string;
  locations: Location[];
  resetView: () => void;
  selectedLocation: Location | null;
  flyToLocation: (loc: Location, idx: number) => void;
}

export default function MapMenu({
  className,
  locations,
  flyToLocation,
  resetView,
  selectedLocation,
}: MapMenuProps) {
  return (
    <div className={className}>
      <div className="mb-5 flex items-baseline justify-between text-2xl">
        <h1 className="flex items-center gap-2 font-bold text-white">
          <FaMapPin className="text-highLightBg" />
          Tour Locations
        </h1>
        <button onClick={resetView} className="flex items-center gap-2">
          <MdOutlineZoomOutMap className="text-highLightBg" />
        </button>
      </div>
      <div className="space-y-4">
        {locations.map((loc, idx) => (
          <div
            key={loc.description}
            onClick={() => flyToLocation(loc, idx)}
            className={`cursor-pointer rounded-xl p-3 transition-all ${
              selectedLocation === loc
                ? "bg-highLightBg scale-105 text-white shadow-lg duration-300"
                : "bg-simBg text-primary hover:bg-secondary hover:shadow-md"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center self-center rounded-full font-bold ${
                  selectedLocation === loc
                    ? "text-highLightBg bg-white"
                    : "bg-highLightBg text-white"
                }`}
              >
                {idx + 1}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="mb-1 text-lg font-semibold">
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
  );
}
