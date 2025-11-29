import { getRandomInt } from "../../utils/getRandomInt";
import TourCardMiniLink from "./TourCardMiniLink";
import type { Tour } from "../../config/schema";

interface ViewOtherToursProps {
  tours: Tour[];
  className: string;
}

export default function ViewOtherTours({
  tours,
  className,
}: ViewOtherToursProps) {
  if (tours?.length === 0) return null;
  // const tourCount = tours?.length ?? 0;

  const shuffleNumber: number = getRandomInt(0, 4);

  return (
    <section className={className}>
      <h1 className="font-serif text-2xl text-primary">
        While you're here be sure to check out:
      </h1>
      <div className="grid grid-cols-2 gap-3 duration-300 m_window:grid-cols-3 l_window:grid-cols-4">
        {tours
          ?.slice(shuffleNumber, 4 + shuffleNumber)
          .map((tour: Tour, ind: number) =>
            ind === 3 ? (
              <TourCardMiniLink
                className="justify-self-stretch overflow-hidden rounded-2xl duration-300 hover:drop-shadow-[0_3px_5px_var(--primary)] m_window:col-start-2 m_window:col-end-3 l_window:col-span-1"
                {...tour}
                key={tour.name}
              />
            ) : (
              <TourCardMiniLink
                className="justify-self-stretch overflow-hidden rounded-2xl duration-300 hover:drop-shadow-[0_3px_5px_var(--primary)]"
                {...tour}
                key={tour.name}
              />
            ),
          )}
      </div>
    </section>
  );
}
