import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./../../../public/img/logo-green-small.png";

const navLinks = [
  { name: "yourGuide", href: "/" },
  { name: "LOGO", href: "/" },
  { name: "Tours", href: "/tours" },
];

export default function Navigation() {
  const location = useLocation(); // gives you the current path
  const navigate = useNavigate(); // programmatic navigation

  // scroll-to-top with smooth animation, then navigate
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (location.pathname !== href) {
      setTimeout(() => {
        navigate(href);
      }, 300);
    }
  };
  return (
    <ul className="half_monitor:gap-60 z-50 flex items-baseline transition-all duration-300 ease-in-out phone:gap-16 ipad_mini:gap-20 ipad:gap-40 half_screen:gap-56 monitor:gap-96">
      {navLinks.map((nav, id) => (
        <li
          key={id}
          className={
            id === 0
              ? "text-xl font-bold transition-all duration-300 ease-in-out hover:text-hover"
              : "transition-all duration-300 ease-in-out hover:text-hover"
          }
        >
          {id === 1 ? (
            <Link to={nav.href} onClick={(e) => handleClick(e, nav.href)}>
              <img src={logo} className="w-16 pt-4" />
            </Link>
          ) : (
            <Link to={nav.href} onClick={(e) => handleClick(e, nav.href)}>
              {nav.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
