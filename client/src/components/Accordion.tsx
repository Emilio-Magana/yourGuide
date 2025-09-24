"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

interface AccordionParentProps {
  children: React.ReactNode;
}
interface TitleProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function Accordion({ children }: AccordionParentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-h-[90vh] w-80 rounded-2xl border-2 border-botBr bg-backgroundFadeE">
      <AccordionTitle onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />

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
            <section className="flex max-h-96 min-h-80 flex-col justify-between">
              {children}
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AccordionTitle({ onClick, isOpen }: TitleProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between px-6 py-4 font-medium transition-all hover:underline"
    >
      <div className="flex flex-col items-start">
        <p className="text-xs">Chat with</p>
        <div className="flex items-center gap-2">
          <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
          <p className="text-sm font-medium">EmiBot</p>
        </div>
      </div>
      <span
        className="ml-2 transform transition-transform duration-300"
        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        <MdOutlineKeyboardDoubleArrowUp />
      </span>
    </button>
  );
}

// function AccordionContent({ children }: ContentProps) {
//   return <div className="py-3">{children}</div>;
// }
