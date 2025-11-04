// import { useLocation } from "react-router-dom";
import StaggeredDropDown from "../components/StaggeredDropDown";
import DarkModeToggle from "./DarkModeToggle";
import Navigation from "./Navigation";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();

  // const location = useLocation();
  // const pathname = location.pathname;

  let startOpacity = 0;
  // if (pathname.slice(6, 7) === "/") {
  //   startOpacity = 0;
  // } else {
  //   startOpacity = 0;
  // }

  const bgOpacity = useTransform(scrollY, [0, 220], [startOpacity, 1]);

  return (
    <header className="text-header sticky top-0 z-10 mx-auto h-0 w-full font-mono transition-all duration-300 ease-in-out">
      <nav className="relative flex h-[70px] w-full items-baseline justify-center">
        {/* Background layer with opacity animation */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 rounded-b-2xl bg-gradient-to-br from-headerBegBg to-headerEndBg"
        />

        {/* Content layer - always fully visible */}
        <div className="relative flex items-end justify-center gap-1">
          <Navigation />
          <StaggeredDropDown />
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
}
