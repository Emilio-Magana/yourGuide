import { getTours } from "./../api/queries";
import Spinner from "../ui/Spinner";
import TourCard from "../ui/TourCard";
// import type { Tour } from "./../config/schema";
import img from "/img/tours/tour-1-3.jpg";
import ControlPanel from "../ui/ControlPanel";

export default function Tours() {
  const { data: tours, isLoading } = getTours();

  if (isLoading) return <Spinner />;
  if (!tours) return <div>No tours available</div>;
  // img classnamr:
  // m_window:h-72 l_window:h-96 h-60

  return (
    <section className="flex flex-col gap-2">
      <article className="relative">
        <img
          src={img}
          className="h-60 w-full rounded-b-2xl object-none duration-500 m_window:h-72 l_window:h-96"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white drop-shadow-lg">
          Tours
        </h1>
        {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-90% to-current" /> */}
      </article>
      <article className="flex flex-col gap-4 p-2 s_window:flex-row">
        <ControlPanel />
        <ul className="grid grid-cols-1 gap-2 s_window:grid-cols-1 m_window:grid-cols-2 xl_window:grid-cols-3">
          {tours.map((tour: any, key: string) => (
            <TourCard {...tour} key={key} />
          ))}
        </ul>
      </article>
    </section>
  );
}
