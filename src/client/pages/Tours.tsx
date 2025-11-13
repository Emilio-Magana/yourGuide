import TourCard from "../ui/tour/TourCard";
import ControlPanel from "../ui/ControlPanel";
import { useGetTours } from "./../api/queries";
import PathFinderLoader from "../components/PathFinderLoader";
import TourHeader from "../ui/tour/TourHeader";

export default function Tours() {
  const { data: tours, isLoading } = useGetTours();

  if (isLoading) return <PathFinderLoader />;
  if (!tours) return <div>No tours available</div>;

  return (
    <section className="flex flex-col gap-2">
      <TourHeader tourCover="tour-3-1.jpg" title="Tours" detailed={false} />
      <article className="flex flex-col gap-4 p-2 duration-300 s_window:flex-row">
        <ControlPanel />
        <div className="grid grid-cols-1 gap-2 duration-300 s_window:grid-cols-1 m_window:grid-cols-2 xl_window:grid-cols-3">
          {tours.map((tour, ind: number) => (
            <TourCard {...tour} key={ind} />
          ))}
        </div>
      </article>
    </section>
  );
}
