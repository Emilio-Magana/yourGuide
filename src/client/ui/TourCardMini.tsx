import type { Tour } from "../config/schema";

const api_url = import.meta.env.VITE_API_URL;

interface TourCardMiniProps {
  imageCover: string;
  difficulty: string;
  className: string;
  duration: number;
  name: string;
  _id: Tour["_id"];
  onClick: () => void;
}

export default function TourCardMini({
  name,
  imageCover,
  _id,
  className,
  onClick,
}: TourCardMiniProps) {
  return (
    <button className={className} onClick={onClick}>
      <img
        src={`${api_url}/img/tours/${imageCover}`}
        alt={name}
        className="h-60 w-full"
      />
      <h1 className="absolute bottom-0 flex h-fit w-full flex-col gap-2 p-4 text-white drop-shadow-[-1px_1.2px_1.2px_rgb(0,0,0)] duration-300">
        <span className="font-semibold">{name}</span>
      </h1>
    </button>
  );
}
