import { useGetTour, useGetTours } from "../api/queries/tourQueries";
import { useGetTourReviews } from "../api/queries/reviewQueries";
import PathFinderLoader from "../components/PathFinderLoader";
import { tourNavigation } from "../config/tourNavigation";
import ViewOtherTours from "../ui/tour/ViewOtherTours";
import SectionNavigator from "../ui/SectionNavigator";
import { refGenerator } from "../utils/refGenerator";
import TourOverview from "../ui/tour/TourOverview";
import TourReviews from "../ui/tour/TourReviews";
import TourHeader from "../ui/tour/TourHeader";
import TourMap from "../ui/tour/TourMap";
import ImageGrid from "../ui/ImageGrid";

import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";

export default function TourDetails() {
  const { tourId } = useParams();
  const { data: tours, isLoading: toursAreLoading } = useGetTours();
  const { data: reviews, isLoading: reviewIsLoading } = useGetTourReviews(
    tourId!,
  );
  const { data: tour, isLoading: tourIsLoading } = useGetTour(tourId!);

  const sectionRefs = useMemo(
    () => refGenerator(tourNavigation),
    [tourNavigation],
  );

  if (toursAreLoading || reviewIsLoading || tourIsLoading)
    return <PathFinderLoader />;

  return (
    <div className="flex flex-col">
      <TourHeader
        tourCover={tour!.imageCover}
        height="h-[320px] s_window:h-[380px]"
        title={tour!.name}
        detailed={true}
        detailOne={tour!.duration.toString()}
        detailTwo={tour!.startLocation.description}
      />

      <SectionNavigator
        className="sticky top-0 z-20 flex place-content-between border-b-[1px] border-centerLBg bg-mainBg px-2 py-[13px] text-sm duration-300 m_window:text-base l_window:px-6"
        sections={tourNavigation}
        sectionRefs={sectionRefs}
        tourId={tour!._id}
      />
      <TourOverview
        sectionRef={sectionRefs[tourNavigation[0].id]}
        className="mb-1 mt-5 scroll-mt-[79px]"
        name={tour!.name}
        startDate={tour!.startDates[0]}
        difficulty={tour!.difficulty}
        maxGroupSize={tour!.maxGroupSize}
        guides={tour!.guides}
        description={tour!.description}
      />
      <TourMap
        sectionRef={sectionRefs[tourNavigation[1].id]}
        className="mb-5 ml-9 flex scroll-mt-[79px] flex-col duration-300 l_window:-mt-3 xl_window:-mt-5"
        locations={tour!.locations}
      />
      <ImageGrid
        sectionRef={sectionRefs[tourNavigation[2].id]}
        className="mb-5 mr-9 flex scroll-mt-[79px] flex-col duration-300"
        imageArray={tour!.images}
      />

      {reviews ? (
        <TourReviews
          className="mx-9 mb-5 scroll-mt-[79px]"
          sectionRef={sectionRefs[tourNavigation[3].id]}
          reviews={reviews}
        />
      ) : (
        <div>No Reviews!</div>
      )}
      <div className="mx-9 mb-5 flex flex-col gap-4 text-lg font-medium text-primary">
        <h2>Contribute and add a review</h2>
        <div className="h-6">
          <Link
            to={`/tours/${tourId}/userReview`}
            className="w-fit rounded-3xl border border-primary bg-mainBg px-3 py-3 duration-300 hover:border-sky-400 hover:bg-sky-400 hover:py-2 hover:pr-5"
          >
            Write a review
          </Link>
        </div>
      </div>
      <ViewOtherTours
        className="mx-9 my-2 flex flex-col gap-[11px]"
        tours={tours!}
      />
    </div>
  );
}
