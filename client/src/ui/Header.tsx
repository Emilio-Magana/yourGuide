import StaggeredDropDown from "./../components/StaggeredDropDown";
import DarkModeToggle from "./DarkModeToggle";
import Navigation from "./Navigation";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 300], [0.5, 1]);

  return (
    <header className="half_screen sticky top-0 mx-auto -mb-6 h-0 font-mono text-white transition-all duration-300 ease-in-out half_screen:max-w-[950px] monitor:max-w-[1200px]">
      <nav className="relative flex h-32 w-full -translate-y-10 items-baseline justify-center gap-4 pt-12">
        {/* Background layer with opacity animation */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 rounded-3xl border bg-gradient-to-br from-slate-800 to-slate-400"
        />

        {/* Content layer - always fully visible */}
        <div className="relative z-10 flex items-baseline justify-center gap-4">
          <Navigation />
          <StaggeredDropDown />
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
}
