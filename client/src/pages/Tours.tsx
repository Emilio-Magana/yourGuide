import Spinner from "./../ui/Spinner";
import TourCard from "./../ui/TourCard";
import { getTours } from "./../api/queries";
import type { Tour } from "./../config/schema";

export default function Tours() {
  const { data: tours, isLoading } = getTours();

  if (isLoading) return <Spinner />;
  if (!tours) return <div>No tours available</div>;

  return (
    <ul className="text-primary">
      {tours.map((tour: Tour, key: string) => (
        <TourCard {...tour} key={key} />
      ))}
    </ul>
  );
}
