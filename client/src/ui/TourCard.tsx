import { Link } from "react-router-dom";

import { tourSchema, type Tour } from "./../config/schema";
import { convertDate } from "../utils/convertDate";
// const API_URL = import.meta.env.VITE_API_URL || "";
const API_URL = "http://localhost:3000";

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
    <div className="mt-4 flex w-full flex-col rounded-2xl border border-zinc-100 text-primary">
      <img
        src={`${API_URL}/img/tours/${imageCover}`}
        alt={name}
        className="h-fit rounded-2xl"
      />
      <Link to={`/tours/${_id}`}>
        <h1 className="bg-gradient-to-br from-green-600 to-green-200 px-4 py-2 font-light uppercase leading-none text-white">
          <span>{name}</span>
        </h1>
      </Link>
      <article className="px-2">
        <div className="bg-slate-50">
          <h2 className="uppercase">
            {difficulty} {duration}-day tour
          </h2>
          <p className="">{summary}</p>
          <ul className="grid grid-cols-2">
            <li>{startLocation.description}</li>
            <li>{convertDate(startDates[0])}</li>
            <li>{locations.length} stops</li>
            <li>{maxGroupSize} people</li>
          </ul>
        </div>
        <div className="">
          <h3>${price} per person</h3>
          <h3>
            ${ratingsAverage} rating ({ratingsQuantity})
          </h3>
          <Link to={`/tours/${_id}`} className="btn btn--green btn--small">
            Details
          </Link>
        </div>
      </article>
    </div>
  );
}
