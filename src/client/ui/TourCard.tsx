import { Link } from "react-router-dom";
import { FaFlag, FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";

import type { Tour } from "../config/schema";
import { convertDate } from "../utils/convertDate";
const api_url = import.meta.env.VITE_API_URL || "";

export default function TourCard({
  name,
  imageCover,
  _id,
  difficulty,
  duration,
  summary,
  startDates,
  startLocation,
  locations,
  ratingsAverage,
  price,
  maxGroupSize,
  ratingsQuantity,
}: Tour) {
  return (
    <section className="w-full overflow-hidden rounded-2xl">
      {/* <section className="relative overflow-hidden"> */}
      <Link to={`/tours/${_id}`} className="relative">
        <img
          src={`${api_url}/img/tours/${imageCover}`}
          alt={name}
          className="h-60 w-full rounded-t-2xl duration-300 ease-in-out hover:scale-105"
        />
        <h1 className="absolute bottom-3 right-6 px-4 py-2 font-mono text-xl font-medium uppercase leading-none text-white drop-shadow-[-1px_2px_1.2px_rgba(0,0,0,1)]">
          {name}
        </h1>
      </Link>
      {/* </section> */}
      <article className="text-zinc-700">
        <div className="flex flex-col gap-3 bg-slate-50 px-6 py-3">
          <h2 className="font-semibold uppercase">
            {difficulty} {duration}-day tour
          </h2>
          <p className="line-clamp-2 italic">{summary}</p>
          <ul className="grid grid-cols-2 gap-4">
            <li className="li_card h-[3rem]">
              <FaLocationDot />
              {startLocation.description}
            </li>
            <li className="li_card">
              <FaCalendar />
              {convertDate(startDates[0])}
            </li>
            <li className="li_card">
              <FaFlag />
              {locations.length} stops
            </li>
            <li className="li_card">
              <span>
                <BsFillPeopleFill />
              </span>
              {maxGroupSize} people
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 rounded-b-2xl bg-slate-200 px-6 py-4">
          <div className="flex justify-between">
            <h3 className="">
              <span className="font-semibold">${price}</span>
              <br />
              per person
            </h3>
            <Link
              to={`/tours/${_id}`}
              className="place-self-center rounded bg-slate-400 p-2 text-white drop-shadow-[0_2px_1.2px_rgba(0,0,0,1)] duration-300 hover:-translate-y-1 hover:bg-slate-500"
            >
              Details
            </Link>
          </div>
          <h3>
            {ratingsAverage} / 5, ({ratingsQuantity})
          </h3>
        </div>
      </article>
    </section>
  );
}
