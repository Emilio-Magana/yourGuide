import { useState, type RefObject } from "react";
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

interface StaggeredTestProps {
  className: string;
  length: number;
  sectionRef: RefObject<HTMLDivElement | null>;
}

export default function StaggeredTestimonials({
  className,
  length,
  sectionRef,
}: StaggeredTestProps) {
  const middlePoint: number = Math.ceil(length / 2);
  const [activeIndex, setActiveIndex] = useState(middlePoint);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={className} ref={sectionRef}>
      {testimonials.map((t, i) => {
        let offset = i - activeIndex;
        if (offset > testimonials.length / 2) {
          offset -= testimonials.length;
        } else if (offset < -testimonials.length / 2) {
          offset += testimonials.length;
        }
        return (
          <motion.div
            key={i}
            onClick={() => handleClick(i)}
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
              opacity: Math.abs(offset) >= 3 ? 0 : 1,
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
            className={`absolute flex h-60 max-w-64 cursor-pointer flex-col gap-3 place-self-center border p-4 shadow-xl ${
              offset === 0
                ? "bg-indigo-600 text-white transition-colors duration-200"
                : "bg-white text-black transition-colors duration-100"
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
