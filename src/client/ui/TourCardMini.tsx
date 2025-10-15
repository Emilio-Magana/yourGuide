import { Link } from "react-router-dom";
import type { Tour } from "../config/schema";

interface TourCardMiniProps {
  name: string;
  imgPath: string;
  imageCover: string;
  _id: Tour["_id"];
  difficulty: string;
  duration: number;
  className: string;
}

export default function TourCardMini({
  name,
  imageCover,
  imgPath,
  _id,
  difficulty,
  duration,
  className,
}: TourCardMiniProps) {
  return (
    <Link className={className} to={`/tours/${_id}`}>
      <img
        src={`${imgPath}/tours/${imageCover}`}
        alt={name}
        className="h-60 w-full duration-300 ease-in-out hover:scale-105"
      />
      <article className="flex min-h-28 flex-col gap-3 bg-white px-4 py-4 font-light">
        <h1 className="justify-stretch text-xl uppercase leading-none text-black">
          {name}
        </h1>
        <h2 className="font-thin">
          A {difficulty} {duration}-day tour
        </h2>
      </article>
    </Link>
  );
}
