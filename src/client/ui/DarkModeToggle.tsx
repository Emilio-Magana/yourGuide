import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="hover:bg-navBg flex rounded p-2 drop-shadow-[0px_1.3px_2px_var(--opposite)] duration-300 hover:px-5"
    >
      {isDarkMode ? (
        <HiOutlineSun className="text-white transition-colors duration-300" />
      ) : (
        <HiOutlineMoon className="text-sky-950 transition-colors duration-300" />
      )}
    </button>
  );
}
