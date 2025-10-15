import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function Footer() {
  return (
    // <div className="relative flex items-baseline justify-center gap-1">

    <footer className="my-8 flex place-items-center items-center justify-center gap-1 text-xs text-primary duration-300 m_window:gap-2">
      <div>
        <span className="mr-1">&copy; {new Date().getFullYear()},</span>
        <Link className="" to="/">
          yourGuide
        </Link>
      </div>
      <span>|</span>
      <a href="http:\\magemi.dev">Emilio Maga&ntilde;a</a>
      <span>|</span>
      <Link to="/privacy">Privacy</Link>
      <span>|</span>
      <Link to="/aboutUs">About Us</Link>
      <span>|</span>
      <Link to="/Careers">Careers</Link>
      <span>|</span>
      <Link to="/Contact">Contact</Link>
      <DarkModeToggle />
    </footer>
  );
}
