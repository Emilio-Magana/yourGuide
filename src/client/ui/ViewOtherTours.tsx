import type { Tour } from "../config/schema";
import TourCardMini from "./TourCardMini";

interface ViewOtherToursProps {
  tours: Tour[];
  imgPath: string;
  className: string;
}

export default function ViewOtherTours({
  tours,
  imgPath,
  className,
}: ViewOtherToursProps) {
  return (
    <section className={className}>
      <h1 className="font-serif text-2xl text-primary">
        While you're here be sure to check out:
      </h1>
      <div className="grid grid-cols-2 gap-3 duration-300 m_window:grid-cols-3 l_window:grid-cols-4">
        {tours
          .slice(0, 4)
          .map((tour: Tour, ind: number) =>
            ind === 3 ? (
              <TourCardMini
                className="relative justify-self-stretch overflow-hidden rounded-2xl m_window:col-start-2 m_window:col-end-3 l_window:col-span-1"
                imgPath={imgPath}
                {...tour}
                key={ind}
              />
            ) : (
              <TourCardMini
                className="relative justify-self-stretch overflow-hidden rounded-2xl"
                imgPath={imgPath}
                {...tour}
                key={ind}
              />
            ),
          )}
      </div>
    </section>
  );
}
