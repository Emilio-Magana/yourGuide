import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const api_url = import.meta.env.VITE_API_URL;

interface PageHeaderProps {
  tourCover: string;
  title: string;
  detailed?: boolean;
  detailOne?: string;
  detailTwo?: string;
}

export default function TourHeader({
  tourCover,
  title,
  detailed,
  detailOne,
  detailTwo,
}: PageHeaderProps) {
  return (
    <section className="relative">
      <img
        src={`${api_url}/img/tours/${tourCover}`}
        className="h-[300px] w-full object-none object-center duration-300 m_window:h-[380px] xl_window:h-[460px]"
      />
      <h1 className="absolute inset-0 flex flex-col items-center justify-center gap-10 text-5xl font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(30,41,59,1)]">
        {title}
      </h1>
      {detailed && (
        <div className="absolute inset-x-0 bottom-20 flex flex-col items-center justify-center gap-10 font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(30,41,59,1)]">
          <ul className="flex gap-10 uppercase">
            <li className="items-ce nter inline-flex gap-1">
              <FaClock />
              {detailOne}
            </li>
            <li className="inline-flex items-center gap-1">
              <FaLocationDot />
              {detailTwo}
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
