import StaggeredDropDown from "../components/StaggeredDropDown";
import DarkModeToggle from "./DarkModeToggle";
import Navigation from "./Navigation";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <header className="l_window:max-w-[900px] m_window:max-w-[700px] s_window:max-w-[580px] sticky top-0 z-10 mx-auto h-0 max-w-[700px] font-mono text-white transition-all duration-300 ease-in-out">
      <nav className="relative flex h-[70px] w-full items-baseline justify-center">
        {/* Background layer with opacity animation */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="from-headerBegBg to-headerEndBg absolute inset-0 rounded-b-2xl bg-gradient-to-br"
        />

        {/* Content layer - always fully visible */}
        <div className="relative flex items-baseline justify-center gap-1">
          <Navigation />
          <StaggeredDropDown />
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
}
