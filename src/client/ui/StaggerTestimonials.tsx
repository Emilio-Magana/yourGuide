// import ReviewCard from "./ReviewCard";
import { useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Marie, efwefrgzetjdtyjrst",
    quote:
      "COMPANY's prodrthsrthrsthsrthhssucts make planning for the future. Can't recommend them enough!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Marie, CEO at COMPANY",
    quote:
      "COMPANY's products make planning for the future seamless. Can't recommend them enough!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Andre, CEO at COMPANY",
    quote: "If I could give 11 stars, I would give 12.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Jeremy, CEO at COMPANY",
    quote:
      "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    name: "Pam, CEO at COMPANY",
    quote: "Once we’re on COMPANY, we’re never going back.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    name: "Daniel, CEO at COMPANY",
    quote:
      "I would be lost without COMPANY's in-depth analytics. The ROI is easily 100X for us.",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    name: "HARRIS",
    quote: "I would be lost without ahahashduaiebfwiuebwibefvwu us.",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
  },
];

export default function StaggerTestimonials({ length }: { length: number }) {
  const middlePoint: number = Math.ceil(length / 2);
  const [activeIndex, setActiveIndex] = useState(middlePoint);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative flex h-[300px] items-center justify-center">
      {testimonials.map((t, i) => {
        let offset = i - activeIndex; // position relative to active
        if (offset > testimonials.length / 2) {
          offset -= testimonials.length;
        } else if (offset < -testimonials.length / 2) {
          offset += testimonials.length;
        }
        // const isActive = i === activeIndex;
        // const offset =
        //   (i - activeIndex + testimonials.length) % testimonials.length;

        // // Only show cards that are within 3 positions
        if (offset > 3 && offset < testimonials.length - 3) return null;

        // // Calculate position for wrapping
        // let position = offset;
        // if (offset > testimonials.length / 2) {
        //   position = offset - testimonials.length;
        // }

        return (
          <motion.div
            key={i}
            onClick={() => handleClick(i)}
            initial={false}
            // onClick={() => setActiveIndex(i)}
            // initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              rotate: i === activeIndex ? 0 : offset % 2 === 0 ? -2 : 2, // tilt based on position
              x: offset * 170, // horizontal spread
              y: i === activeIndex ? -20 : offset % 2 === 0 ? -5 : 20,
              zIndex: i === activeIndex ? 3 : offset % 2 === 2 ? 1 : 2,
              opacity: Math.abs(offset) > 3 ? 0 : 1, // fade out side cards
              // scale: isActive ? 1 : 0.85,
              // x: position * 140,
              // y: Math.abs(position) * 15,
              // rotate: isActive ? 0 : position * 3,
              // opacity: Math.abs(position) > 3 ? 0 : 1,
              // zIndex: isActive ? 10 : 10 - Math.abs(position),
            }}
            // transition={{
            //   type: "spring",
            //   stiffness: 200,
            //   damping: 20,
            //   duration: 0.8,
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={`absolute flex h-60 max-w-64 cursor-pointer flex-col gap-3 place-self-center border p-4 shadow-xl ${
              i === activeIndex
                ? "bg-indigo-600 text-white duration-100"
                : "bg-white text-black duration-100"
            }`}
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
              borderRadius: "4px",
            }}
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <p className="text-sm italic">"{t.quote}"</p>
            <p className="place-self-stretch text-xs font-medium">– {t.name}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
