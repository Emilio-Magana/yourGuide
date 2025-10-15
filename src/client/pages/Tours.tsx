import Spinner from "../ui/Spinner";
import TourCard from "../ui/TourCard";
import img from "/img/tours/tour-1-3.jpg";
import ControlPanel from "../ui/ControlPanel";
import { useGetTours } from "./../api/queries";
import type { Tour } from "./../config/schema";

export default function Tours() {
  const { data: tours, isLoading } = useGetTours();

  if (isLoading) return <Spinner />;
  if (!tours) return <div>No tours available</div>;

  return (
    <section className="flex flex-col gap-2">
      <article className="relative">
        <img
          src={img}
          className="h-60 w-full rounded-b-2xl object-none duration-300 m_window:h-72 l_window:h-96"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white drop-shadow-lg">
          Tours
        </h1>
      </article>
      <article className="flex flex-col gap-4 p-2 duration-300 s_window:flex-row">
        <ControlPanel />
        <div className="grid grid-cols-1 gap-2 duration-300 s_window:grid-cols-1 m_window:grid-cols-2 xl_window:grid-cols-3">
          {tours.map((tour: Tour, key: number) => (
            <TourCard {...tour} key={key} />
          ))}
        </div>
      </article>
    </section>
  );
}
