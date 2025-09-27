import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="my-8 flex flex-row gap-2 place-self-center text-xs text-white ipad_mini:justify-between">
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
      {/* </h4> */}
    </footer>
  );
}
