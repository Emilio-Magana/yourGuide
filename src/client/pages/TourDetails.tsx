import { createRef, useMemo } from "react";
import { useParams } from "react-router-dom";

import ImageGrid from "../ui/ImageGrid";
import TourHeader from "../ui/TourHeader";
import TourMap from "../components/TourMap";
import TourReviews from "../ui/TourReviews";
import TourOverview from "../ui/TourOverview";
import ViewOtherTours from "../ui/ViewOtherTours";
import { useGetTour, useGetTours } from "../api/queries";
import SectionNavigator, { type Section } from "../ui/SectionNavigator";

const api_url = import.meta.env.VITE_API_URL;

const tourSections: Section[] = [
  { id: "Overview" },
  { id: "Itinerary" },
  { id: "Included" },
  { id: "Reviews" },
];

export default function TourDetails() {
  const { tourId } = useParams();
  const { data: tour, isLoading } = useGetTour(tourId!);
  const { data: tours } = useGetTours();
  // const {data: reviews} = getReview()

  const sectionRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
    tourSections.forEach((section) => {
      refs[section.id] = createRef<HTMLDivElement | null>();
    });
    return refs;
  }, []);

  if (isLoading) return <div>Loading....</div>;
  if (!tour) return <div>No tour found</div>;

  return (
    <div className="flex flex-col">
      <TourHeader
        path={`${api_url}/img/tours/${tour.imageCover}`}
        title={tour.name}
        detailOne={tour.duration.toString()}
        detailTwo={tour.startLocation.description}
      />
      <SectionNavigator
        className="sticky top-0 z-20 flex place-content-between bg-white px-2 py-[13px] text-sm duration-300 m_window:text-base l_window:px-6"
        sections={tourSections}
        sectionRefs={sectionRefs}
      />
      <TourOverview
        sectionRef={sectionRefs["Overview"]}
        imgPath={`${api_url}/img`}
        className="mb-1 mt-5 scroll-mt-[74px]"
        name={tour.name}
        startDate={tour.startDates[0]}
        difficulty={tour.difficulty}
        maxGroupSize={tour.maxGroupSize}
        guides={tour.guides}
        description={tour.description}
      />
      <TourMap
        sectionRef={sectionRefs["Itinerary"]}
        className="mb-5 ml-9 flex scroll-mt-[74px] flex-col duration-300"
        locations={tour.locations}
      />
      <ImageGrid
        sectionRef={sectionRefs["Included"]}
        imgPath={`${api_url}/img`}
        className="mb-5 mr-9 flex scroll-mt-[74px] flex-col duration-300"
        imageArray={tour.images}
      />
      <TourReviews
        className="mx-9 mb-5 scroll-mt-[74px]"
        sectionRef={sectionRefs["Reviews"]}
      />
      <ViewOtherTours
        className="mx-9 mb-5 mt-2 flex flex-col gap-[11px]"
        imgPath={`${api_url}/img`}
        tours={tours}
      />
    </div>
  );
}
