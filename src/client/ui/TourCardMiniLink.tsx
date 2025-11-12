import { Link } from "react-router-dom";
import type { Tour } from "../config/schema";

const api_url = import.meta.env.VITE_API_URL;

interface TourCardMiniLinkProps {
  name: string;
  imageCover: string;
  _id: Tour["_id"];
  difficulty: string;
  duration: number;
  className: string;
}

export default function TourCardMiniLink({
  name,
  imageCover,
  _id,
  difficulty,
  duration,
  className,
}: TourCardMiniLinkProps) {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Link className={className} to={`/tours/${_id}`} onClick={handleClick}>
      <img
        src={`${api_url}/img/tours/${imageCover}`}
        alt={name}
        className="min-h-60 w-full flex-1 duration-300 ease-in-out hover:scale-105"
      />
      <article className="relative h-28 flex-none flex-col gap-3 bg-white px-4 py-4 font-light text-[#543939]">
        <h1 className="justify-stretch text-xl uppercase leading-none">
          {name}
        </h1>
        <h2 className="absolute bottom-7 font-thin">
          A {difficulty} {duration}-day tour
        </h2>
      </article>
    </Link>
  );
}
