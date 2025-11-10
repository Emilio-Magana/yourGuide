import { useState } from "react";
import { motion } from "framer-motion";
import type { Review } from "../config/schema";

const api_url = import.meta.env.VITE_API_URL;

interface StaggeredTestProps {
  length: number;
  className: string;
  reviews: Review[];
}

export default function StaggeredTestimonials({
  length,
  className,
  reviews,
}: StaggeredTestProps) {
  const middlePoint: number = Math.ceil(length / 2);
  const [activeIndex, setActiveIndex] = useState(middlePoint);

  const handleClick = (ind: number) => {
    setActiveIndex(ind);
  };

  return (
    <div className={className}>
      {reviews?.map((review, ind) => {
        let offset = ind - activeIndex;
        if (offset > reviews.length / 2) {
          offset -= reviews.length;
        } else if (offset < -reviews.length / 2) {
          offset += reviews.length;
        }
        return (
          <motion.div
            key={ind}
            onClick={() => handleClick(ind)}
            layout
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              rotate: offset === 0 ? 0 : offset % 2 === 0 ? -2 : 2,
              x: offset * 185,
              y: offset === 0 ? -20 : offset % 2 === 0 ? -5 : 20,
              zIndex: offset === 0 ? 3 : offset % 2 === 0 ? 2 : 1,
              opacity: Math.abs(offset) > 3 ? 0 : 1,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              x: offset > 0 ? 400 : -400,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 100,
            }}
            className={`absolute flex h-60 max-w-64 cursor-pointer flex-col gap-3 place-self-center p-4 shadow-xl ${
              offset === 0
                ? "bg-highLightBg text-white transition-colors duration-200"
                : "text-header bg-mainBg transition-colors duration-100"
            }`}
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
              borderRadius: "4px",
            }}
          >
            <img
              src={`${api_url}/img/users/${review.user.photo}`}
              alt={review.user.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <p className="text-sm italic">"{review.review}"</p>
            <p className="place-self-stretch text-xs font-medium">
              – {review.user.name}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
