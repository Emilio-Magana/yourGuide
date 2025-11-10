import { Link } from "react-router-dom";
import type { Tour } from "../config/schema";
import { IoIosStar } from "react-icons/io";
const api_url = import.meta.env.VITE_API_URL;

interface UserReviewCardProps {
  _id: Tour["_id"];
  imageCover: string;
  className: string;
  review: string;
  name: string;
  id: React.Key | null | undefined;
}

export default function UserReviewCard({
  _id,
  imageCover,
  className,
  review,
  name,
  id,
}: UserReviewCardProps) {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Link
      className={className}
      to={`/tours/${_id}`}
      onClick={handleClick}
      key={id}
    >
      <img
        src={`${api_url}/img/tours/${imageCover}`}
        alt={name}
        className="h-60 w-full"
      />
      <h1 className="absolute bottom-0 flex h-fit w-full flex-col gap-2 bg-white/70 p-4 text-black">
        <span className="border-b border-black font-semibold">{name}</span>
        <div className="flex items-center gap-1">
          <IoIosStar />
          <span className="text-pretty">{review}</span>
        </div>
      </h1>
    </Link>
  );
}
