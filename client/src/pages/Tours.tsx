import Spinner from "./../ui/Spinner";
import TourCard from "./../ui/TourCard";
import { getTours } from "./../api/queries";
import type { Tour } from "./../config/schema";

export default function Tours() {
  const { data: tours, isLoading } = getTours();

  if (isLoading) return <Spinner />;
  if (!tours) return <div>No tours available</div>;

  return (
    <section className="m-4">
      <ul className="grid grid-cols-1 gap-2 text-primary ipad_mini:grid-cols-2 half_screen:grid-cols-3 monitor:grid-cols-4">
        {tours.map((tour: Tour, key: string) => (
          <TourCard {...tour} key={key} />
        ))}
      </ul>
    </section>
  );
}
