import StaggeredDropDown from "../components/StaggeredDropDown";
import DarkModeToggle from "./DarkModeToggle";
import Navigation from "./Navigation";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 320], [0, 1]);

  return (
    <header className="text-header sticky top-0 z-10 mx-auto h-0 w-full font-mono transition-all duration-300 ease-in-out">
      <nav className="relative flex h-[70px] w-full items-baseline justify-center">
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 rounded-b-2xl bg-gradient-to-br from-headerBegBg to-headerEndBg"
        />
        <div className="relative flex items-end justify-center gap-1">
          <Navigation />
          <StaggeredDropDown />
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
}
