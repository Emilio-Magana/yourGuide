import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function Footer() {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <footer className="my-10 flex items-center justify-center gap-1 text-xs text-header duration-300 s_window:text-sm m_window:gap-2">
      <div className="flex items-center gap-1 m_window:gap-2">
        <div>
          <span className="mr-1">&copy; {new Date().getFullYear()},</span>
          <Link onClick={handleClick} to="/">
            yourGuide
          </Link>
        </div>
        <span>|</span>
        <a href="http:\\magemi.dev">Emilio Maga&ntilde;a</a>
      </div>
      <span className="hidden m_window:inline-flex">|</span>
      <div className="flex items-center gap-1 m_window:gap-2">
        <Link onClick={handleClick} to="/privacy">
          Privacy
        </Link>
        <span>|</span>
        <Link onClick={handleClick} to="/aboutUs">
          About Us
        </Link>
        <span>|</span>
        <Link onClick={handleClick} to="/Careers">
          Careers
        </Link>
        <span>|</span>
        <Link onClick={handleClick} to="/Contact">
          Contact
        </Link>
        <DarkModeToggle />
      </div>
    </footer>
  );
}
