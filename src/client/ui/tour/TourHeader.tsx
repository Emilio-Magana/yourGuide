import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

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
        className="h-[300px] w-full object-none object-center duration-300 m_window:h-[380px] xl_window:h-[460px]"
      />
      <h1 className="text-header absolute inset-0 flex flex-col items-center justify-center gap-10 text-5xl font-semibold drop-shadow-[-1px_1.2px_1.2px_var(--headerOpposite)] duration-300">
        {title}
      </h1>
      {detailed && (
        <div className="text-header absolute inset-x-0 bottom-20 flex flex-col items-center justify-center gap-10 font-semibold drop-shadow-[-1px_1.2px_1.2px_var(--headerOpposite)] duration-300">
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
