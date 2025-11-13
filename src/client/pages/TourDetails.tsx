import { createRef, useMemo } from "react";
import { useParams } from "react-router-dom";

import ImageGrid from "../ui/ImageGrid";
import TourHeader from "../ui/tour/TourHeader";
import TourMap from "../ui/TourMap";
import TourReviews from "../ui/tour/TourReviews";
import TourOverview from "../ui/tour/TourOverview";
import ViewOtherTours from "../ui/tour/ViewOtherTours";
import PathFinderLoader from "../components/PathFinderLoader";
import { useGetTourReviews, useGetTour, useGetTours } from "../api/queries";
import SectionNavigator, { type Section } from "../ui/SectionNavigator";

const tourSections: Section[] = [
  { id: "Overview" },
  { id: "Itinerary" },
  { id: "Included" },
  { id: "Reviews" },
];

export default function TourDetails() {
  const { tourId } = useParams();
  const { data: tours } = useGetTours();
  const { data: reviews } = useGetTourReviews(tourId!);
  const { data: tour, isLoading } = useGetTour(tourId!);

  const sectionRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
    tourSections.forEach((section) => {
      refs[section.id] = createRef<HTMLDivElement | null>();
    });
    return refs;
  }, []);

  if (isLoading) return <PathFinderLoader />;

  return (
    <div className="flex flex-col">
      <TourHeader
        tourCover={tour!.imageCover}
        title={tour!.name}
        detailed={true}
        detailOne={tour!.duration.toString()}
        detailTwo={tour!.startLocation.description}
      />
      <SectionNavigator
        className="border-centerLBg sticky top-0 z-20 flex place-content-between border-b-[1px] bg-mainBg px-2 py-[13px] text-sm duration-300 m_window:text-base l_window:px-6"
        sections={tourSections}
        sectionRefs={sectionRefs}
      />
      <TourOverview
        sectionRef={sectionRefs["Overview"]}
        className="mb-1 mt-5 scroll-mt-[74px]"
        name={tour!.name}
        startDate={tour!.startDates[0]}
        difficulty={tour!.difficulty}
        maxGroupSize={tour!.maxGroupSize}
        guides={tour!.guides}
        description={tour!.description}
      />
      <TourMap
        sectionRef={sectionRefs["Itinerary"]}
        className="mb-5 ml-9 flex scroll-mt-[74px] flex-col duration-300 l_window:-mt-3 xl_window:-mt-5"
        locations={tour!.locations}
      />
      <ImageGrid
        sectionRef={sectionRefs["Included"]}
        className="mb-5 mr-9 flex scroll-mt-[74px] flex-col duration-300"
        imageArray={tour!.images}
      />

      {reviews ? (
        <TourReviews
          className="mx-9 mb-5 scroll-mt-[74px]"
          sectionRef={sectionRefs["Reviews"]}
          reviews={reviews}
        />
      ) : (
        <div>No Reviews!</div>
      )}
      <ViewOtherTours
        className="mx-9 my-2 flex flex-col gap-[11px]"
        tours={tours!}
      />
    </div>
  );
}
