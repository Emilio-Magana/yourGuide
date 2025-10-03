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
    <ul className="xs_window:gap-14 s_window:gap-16 m_window:gap-32 l_window:gap-56 xl_window:gap-60 flex items-baseline transition-all duration-300 ease-in-out">
      {navLinks.map((nav, id) => (
        <li
          key={id}
          className={
            id === 0
              ? "text-xl font-bold transition-all duration-300 ease-in-out hover:drop-shadow-[-1px_2px_3px_rgba(30,41,59,1)]"
              : "transition-all duration-300 ease-in-out hover:drop-shadow-[-1px_1.2px_3px_rgba(30,41,59,1)]"
          }
        >
          {id === 1 ? (
            <Link to={nav.href} onClick={(e) => handleClick(e, nav.href)}>
              <img src={logo} className="ml-7 w-16 pt-4" />
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
