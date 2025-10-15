import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface PageHeaderProps {
  path: string;
  title: string;
  detailOne: string;
  detailTwo: string;
}

export default function TourHeader({
  path,
  title,
  detailOne,
  detailTwo,
}: PageHeaderProps) {
  return (
    <section className="relative">
      <img
        src={path}
        className="h-[320px] w-full rounded-br-2xl object-none duration-300 m_window:h-[400px] l_window:h-[500px]"
      />
      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center gap-10 font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(30,41,59,1)]">
        <h1 className="text-5xl">{title}</h1>
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
      {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-90% to-current" /> */}
    </section>
  );
}
