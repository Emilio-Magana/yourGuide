import { Link } from "react-router-dom";

const navLinks = [
  {
    name: "yourGuide",
    href: "/",
  },
  {
    name: "LOGO",
    href: "/",
  },
  {
    name: "Tours",
    href: "/tours",
  },
];

export default function Navigation() {
  return (
    <ul className="flex items-baseline transition-all duration-300 ease-in-out phone:gap-2 ipad_mini:gap-4 ">
      {navLinks.map((nav, id) => (
        <li
          key={id}
          className={
            id === 0
              ? "text-xl font-bold transition-colors hover:text-hover"
              : "transition-colors hover:text-hover"
          }
        >
          <Link to={nav.href}>{nav.name}</Link>
        </li>
      ))}
    </ul>
  );
}
