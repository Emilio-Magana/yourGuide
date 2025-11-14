const api_url = import.meta.env.VITE_API_URL;

interface TourCardMiniProps {
  imageCover: string;
  name: string;
  onClick: () => void;
}

export default function TourCardMini({
  name,
  imageCover,
  onClick,
}: TourCardMiniProps) {
  return (
    <button
      className="relative h-40 justify-self-stretch overflow-hidden rounded-2xl duration-300 hover:-translate-y-1 hover:cursor-pointer hover:drop-shadow-[0_4px_1.2px_var(--primary)]"
      onClick={onClick}
    >
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
