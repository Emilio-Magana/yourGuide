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
      {/* pb-36 s_window:pb-40 m_window:pb-48*/}
      <div className="py-4 duration-200 s_window:py-8"></div>
      <div className="grid grid-cols-2">
        <article className="flex flex-col gap-5 rounded-r-xl bg-gray-300 p-5 s_window:p-7 m_window:p-9">
          <div>
            <h1 className="pb-5 text-xl font-medium">Quick Facts</h1>
            <ul className="grid gap-2 capitalize" key={name}>
              <li className="grid grid-cols-[50px,1fr,1fr] items-center gap-1 s_window:gap-3 m_window:gap-5">
                <FaCalendar className="" />
                <span>Next Date</span>
                {convertDate(startDate)}
              </li>
              <li className="grid grid-cols-[50px,1fr,1fr] items-center gap-1 s_window:gap-3 m_window:gap-5">
                <FaArrowTrendUp />
                <span>Difficulty</span>
                {difficulty}
              </li>
              <li className="grid grid-cols-[50px,1fr,1fr] items-center gap-1 s_window:gap-3 m_window:gap-5">
                <BsFillPeopleFill className="" />
                <span>Max Group Size</span>
                {maxGroupSize} People
              </li>
            </ul>
          </div>

          <div>
            <h1 className="text-xl font-medium">This Trips Tour Guides</h1>
            {/* <ul className="">
            {guides.map((guide: any) => (
              <li
                key={guide._id}
                className="grid max-w-96 grid-cols-3 items-center gap-3"
              >
                <img
                  src={`${imgPath}/users/${guide.photo}`}
                  className="h-10 rounded-full"
                />
                <span className="uppercase">{guide.role}</span>
                {guide.name}
              </li>
            ))}
          </ul> */}
          </div>
        </article>
        <article className="flex flex-col gap-10 bg-mainBg p-5 text-primary s_window:p-7 m_window:p-9">
          <h1 className="text-xl font-medium">About {name}</h1>
          <p>{description}</p>
        </article>
      </div>
    </section>
  );
}
