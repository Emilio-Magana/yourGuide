import { useRef, type RefObject } from "react";
import ImageGrid from "../ui/ImageGrid";
import TourHeader from "../ui/TourHeader";
import TourMap from "../components/TourMap";
import TourOverview from "../ui/TourOverview";
import StaggeredTestimonials from "../components/StaggeredTestimonials";
import SectionNavigator, { type Section } from "../ui/SectionNavigator";

const api_url = import.meta.env.VITE_API_URL;

const tourSections: Section[] = [
  { id: "Overview" },
  { id: "Itinerary" },
  { id: "Included" },
  { id: "Reviews" },
];

export default function TourDetails() {
  // const { tourId } = useParams();
  // const { data: tour, isLoading } = getTour(tourId!);

  // if (isLoading) return <div>Loading....</div>;
  // if (!tour) return <div>No tour found</div>;
  const sectionRefs: Record<
    string,
    RefObject<HTMLDivElement | null>
  > = tourSections.reduce(
    (acc, section) => {
      acc[section.id] = useRef<HTMLDivElement | null>(null);
      return acc;
    },
    {} as Record<string, RefObject<HTMLDivElement | null>>,
  );

  return (
    <div className="flex flex-col">
      <TourHeader
        path={`${api_url}/img/tours/${tourLocal.imageCover}`}
        title={tourLocal.name}
        detailOne={tourLocal.duration.toString()}
        detailTwo={tourLocal.startLocation.description}
      />
      <SectionNavigator sections={tourSections} sectionRefs={sectionRefs} />
      <TourOverview
        sectionRef={sectionRefs["Overview"]}
        imgPath={`${api_url}/img`}
        className="mb-2 scroll-mt-16"
        name={tourLocal.name}
        startDate={tourLocal.startDates[0]}
        difficulty={tourLocal.difficulty}
        maxGroupSize={tourLocal.maxGroupSize}
        guides={tourLocal.guides}
        description={tourLocal.description}
      />
      <TourMap
        sectionRef={sectionRefs["Itinerary"]}
        locations={tourLocal.locations}
      />
      <ImageGrid
        sectionRef={sectionRefs["Included"]}
        imgPath={`${api_url}/img`}
        className="mb-5 mr-5 flex scroll-mt-20 flex-col gap-4 s_window:mb-9 s_window:mr-9"
        imageArray={tourLocal.images}
      />
      <section>
        <StaggeredTestimonials
          sectionRef={sectionRefs["Reviews"]}
          className="relative mx-5 flex h-[350px] justify-center overflow-hidden rounded-2xl border bg-simBg s_window:mx-9"
          length={6}
        />
      </section>
      <div className="my-32"></div>
    </div>
  );
}

const tourLocal = {
  _id: "5c88fa8cf4afda39709c2955",
  name: "The Sea Explorer",
  duration: 7,
  maxGroupSize: 15,
  secretTour: false,
  difficulty: "medium",
  ratingsAverage: 4.9,
  ratingsQuantity: 7,
  price: 497,
  summary: "Exploring the jaw-dropping US east coast by foot and by boat",
  description:
    "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  imageCover: "tour-2-cover.jpg",
  images: ["tour-2-1.jpg", "tour-2-2.jpg", "tour-2-3.jpg"],
  createdAt: {
    $date: "2025-08-05T12:23:26.489Z",
  },
  startDates: [
    "2021-06-19T09:00:00.000Z",
    "2021-07-20T09:00:00.000Z",
    "2021-08-18T09:00:00.000Z",
  ],
  startLocation: {
    type: "Point",
    coordinates: [-80.185942, 25.774772],
    address: "301 Biscayne Blvd, Miami, FL 33132, USA",
    description: "Miami, USA",
  },
  locations: [
    {
      type: "Point",
      coordinates: [-80.128473, 25.781842],
      description: "Lummus Park Beach",
      day: 1,
      _id: {
        $oid: "5c88fa8cf4afda39709c2959",
      },
    },
    {
      type: "Point",
      coordinates: [-80.647885, 24.909047],
      description: "Islamorada",
      day: 2,
      _id: {
        $oid: "5c88fa8cf4afda39709c2958",
      },
    },
    {
      type: "Point",
      coordinates: [-81.0784, 24.707496],
      description: "Sombrero Beach",
      day: 3,
      _id: {
        $oid: "5c88fa8cf4afda39709c2957",
      },
    },
    {
      type: "Point",
      coordinates: [-81.768719, 24.552242],
      description: "West Key",
      day: 5,
      _id: {
        $oid: "5c88fa8cf4afda39709c2956",
      },
    },
  ],
  guides: [
    {
      _id: "5c8a22c62f8fb814b56fa18b",
    },
    {
      _id: "5c8a1f4e2f8fb814b56fa185",
    },
  ],
  slug: "the-sea-explorer",
  __v: 0,
};
