import type { NavOption } from "../ui/OptionTypes";
import TourOverview from "../ui/tour/TourOverview";
import TourReviews from "../ui/tour/TourReviews";
import TourMap from "../ui/tour/TourMap";
import ImageGrid from "../ui/ImageGrid";

// Nov 14:
// This is not being used

export const tourNavigation: NavOption[] = [
  { id: "Overview", href: "#Overview", component: TourOverview },
  { id: "Itinerary", href: "#Itinerary", component: TourMap },
  { id: "Included", href: "#Included", component: ImageGrid },
  { id: "Reviews", href: "#Reviews", component: TourReviews },
];
