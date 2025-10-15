import { FaArrowTrendUp, FaCalendar } from "react-icons/fa6";
import { convertDate } from "../utils/convertDate";
import { BsFillPeopleFill } from "react-icons/bs";
import type { RefObject } from "react";

interface TourOverviewProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  name: string;
  startDate: string;
  difficulty: string;
  maxGroupSize: number;
  //   guides: Array<string>;
  guides: Array<{ _id: string }>;
  imgPath: string;
  description: string;
  className: string;
}

export default function TourOverview({
  sectionRef,
  name,
  startDate,
  difficulty,
  maxGroupSize,
  guides,
  imgPath,
  description,
  className,
}: TourOverviewProps) {
  return (
    <section className={className} ref={sectionRef}>
      <h1 className="bg-centerLBg place-self-start rounded-tr-3xl pl-3 pr-6 pt-1 font-serif text-4xl text-white duration-300">
        Overview
      </h1>
      <div className="grid grid-cols-2">
        <article className="border-centerLBg bg-centerLBg flex flex-col gap-20 overflow-hidden rounded-r-3xl border-[11px] p-4 text-white duration-300 m_window:gap-16 m_window:p-6 xl_window:gap-10 xl_window:p-10">
          <div className="flex flex-col gap-5">
            <h1 className="text-xl font-medium">Quick Facts</h1>
            <ul className="grid gap-2 capitalize" key={name}>
              <li className="grid grid-cols-3 items-center gap-1 s_window:gap-3 m_window:gap-5">
                <FaCalendar className="" />
                <span>Next Date</span>
                {convertDate(startDate)}
              </li>
              <li className="grid grid-cols-3 items-center gap-1 s_window:gap-3 m_window:gap-5">
                <FaArrowTrendUp />
                <span>Difficulty</span>
                {difficulty}
              </li>
              <li className="grid grid-cols-3 items-center gap-1 s_window:gap-3 m_window:gap-5">
                <BsFillPeopleFill className="" />
                <span>Max Group Size</span>
                {maxGroupSize} People
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="text-xl font-medium">This Trips Tour Guides</h1>
            <ul className="flex flex-col gap-3">
              {guides.map((guide: any) => (
                <li
                  key={guide.name}
                  className="grid grid-cols-3 items-center gap-1 s_window:gap-3 m_window:gap-5"
                >
                  <img
                    src={`${imgPath}/users/${guide.photo}`}
                    className="h-10 rounded-full"
                  />
                  <span className="uppercase">{guide.role}</span>
                  {guide.name}
                </li>
              ))}
            </ul>
          </div>
        </article>
        <article className="flex flex-col gap-10 p-4 text-primary duration-300 m_window:p-6 xl_window:p-10">
          <h1 className="text-xl font-medium">About {name}</h1>
          <p>{description}</p>
        </article>
      </div>
    </section>
  );
}
