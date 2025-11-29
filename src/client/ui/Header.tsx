import StaggeredDropDown from "../components/StaggeredDropDown";
import DarkModeToggle from "./DarkModeToggle";
import Navigation from "./Navigation";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 320], [0, 1]);

  return (
    <header className="sticky top-0 z-20 h-0 w-full font-mono ease-in-out">
      <nav className="relative flex h-[70px] items-baseline justify-center gap-1 px-10 pt-5">
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-headerBegBg to-headerEndBg"
        />
        <Navigation />
        <StaggeredDropDown />
        <DarkModeToggle />
      </nav>
    </header>
  );
}
