import { FaLocationDot } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { FaClock } from "react-icons/fa";

const api_url = import.meta.env.VITE_API_URL;

interface PageHeaderProps {
  tourCover: string;
  height: string;
  title: string;

  detailed?: boolean;
  detailOne?: string;
  detailTwo?: string;
}

export default function TourHeader({
  tourCover,
  height,
  title,
  detailed,
  detailOne,
  detailTwo,
}: PageHeaderProps) {
  const location = useLocation();
  const pathname = location.pathname;

  let startOpacity;
  if (pathname.slice(6, 7) === "/") {
    startOpacity = 0.5;
  } else {
    startOpacity = 0;
  }

  return (
    <section className="relative">
      <img
        src={`${api_url}/img/tours/${tourCover}`}
        className={`w-full object-none object-center duration-300 ${height}`}
      />
      <h1 className="absolute inset-0 flex flex-col items-center justify-center gap-10 text-5xl font-semibold text-header drop-shadow-[-1px_1.2px_1.2px_var(--headerOpposite)] duration-300">
        {title}
      </h1>
      {detailed && (
        <div className="absolute inset-x-0 bottom-20 flex flex-col items-center justify-center gap-10 font-semibold text-header drop-shadow-[-1px_1.2px_1.2px_var(--headerOpposite)] duration-300">
          <ul className="flex gap-10 uppercase">
            <li className="inline-flex items-center gap-1">
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
