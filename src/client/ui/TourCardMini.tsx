import { Link } from "react-router-dom";
import type { Tour } from "../config/schema";

const api_url = import.meta.env.VITE_API_URL;

interface TourCardMiniProps {
  name: string;
  imageCover: string;
  _id: Tour["_id"];
  difficulty: string;
  duration: number;
  className: string;
}

export default function TourCardMini({
  name,
  imageCover,
  _id,
  difficulty,
  duration,
  className,
}: TourCardMiniProps) {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Link className={className} to={`/tours/${_id}`} onClick={handleClick}>
      <img
        src={`${api_url}/img/tours/${imageCover}`}
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
