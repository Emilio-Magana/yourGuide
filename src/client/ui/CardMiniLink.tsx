import { Link } from "react-router-dom";

const api_url = import.meta.env.VITE_API_URL;

interface TourCardMiniLinkProps {
  imageCover: string;
  label: string;
}

export default function CardMiniLink({
  label,
  imageCover,
}: TourCardMiniLinkProps) {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <Link
      className="relative w-full overflow-hidden rounded-2xl shadow-2xl duration-300 hover:drop-shadow-[-1px_1px_1px_rgb(8,47,73)]"
      to={`/tours`}
      onClick={handleClick}
    >
      <img
        src={`${api_url}/img/tours/${imageCover}`}
        alt={label}
        className="h-60 w-full"
      />
      <article className="absolute bottom-0 flex h-fit w-full flex-col gap-2 p-4 text-sky-950">
        <h1 className="justify-stretch text-2xl font-medium uppercase leading-none text-white drop-shadow-[0_3px_5px_rgb(8,47,73)]">
          {label}
        </h1>
      </article>
    </Link>
  );
}
