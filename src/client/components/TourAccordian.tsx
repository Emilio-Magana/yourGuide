import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import type { Tour } from "../config/schema";
import { FaStar } from "react-icons/fa";

interface AccordionProps {
  children: React.ReactNode;
  tour: Tour;
}

export default function TourAccordion({ children, tour }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <AccordionTitle onClick={() => setIsOpen(!isOpen)} tour={tour} />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <section className="flex h-fit flex-col justify-between px-4 pb-2">
              {children}
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
interface TitleProps {
  onClick: () => void;
  tour: Tour;
}
function AccordionTitle({ onClick, tour }: TitleProps) {
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      diffcult: "bg-red-100 text-red-800",
      medium: "bg-purple-100 text-purple-800",
      easy: "bg-blue-100 text-blue-800",
    };
    return colors[difficulty as keyof typeof colors] || colors.easy;
  };
  return (
    <div
      className="flex items-center justify-between px-4 py-1 hover:cursor-pointer hover:bg-loaderBg1"
      onClick={onClick}
    >
      <div className="flex place-items-center gap-2">
        <Link
          to={`/tours/${tour._id}`}
          className="rounded-md py-2 text-lg font-semibold text-primary duration-300 hover:cursor-pointer hover:bg-headerBegBg hover:px-3 hover:drop-shadow-[-4px_0px_1px_var(--primary)]"
          onClick={(e) => {
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {tour.name}
        </Link>
        <span
          className={`rounded px-2 py-1 text-xs ${getDifficultyColor(tour.difficulty || "easy")}`}
        >
          {tour.difficulty || "easy"}
        </span>
        <span className="rounded bg-amber-100 px-2 py-1 text-xs text-amber-800">
          {tour.duration} Days
        </span>
        <span className="rounded bg-cyan-100 px-2 py-1 text-xs text-cyan-800">
          {tour.maxGroupSize} People
        </span>
        <span className="rounded bg-pink-100 px-2 py-1 text-xs text-pink-800">
          ${tour.price}
        </span>
        {tour.ratingsAverage && (
          <div className="flex items-center gap-1 rounded-md bg-yellow-50 px-2 py-1 text-xs">
            <FaStar size={16} className="fill-yellow-500 text-yellow-500" />
            <span className="font-semibold text-yellow-700">
              {tour.ratingsAverage.toFixed(1)}
            </span>
            <span className="text-gray-500">({tour.ratingsQuantity || 0})</span>
          </div>
        )}
      </div>
    </div>
  );
}
