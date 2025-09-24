import { useParams } from "react-router-dom";
import { getTour } from "./../api/queries";

export default function TourDetails() {
  const { tourId } = useParams();
  const { data: tour, isLoading } = getTour(tourId!);

  if (isLoading) return <div>Loading...</div>;
  if (!tour) return <div>No tour found</div>;

  return (
    <div>
      <h1>{tour.name}</h1>
      <p>{tour.summary}</p>
      <p>Duration: {tour.duration} days</p>
      <p>Price: ${tour.price}</p>
    </div>
  );
}
