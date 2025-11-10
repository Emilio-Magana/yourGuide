import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/img/logo-green-small.png";

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
    <ul className="flex items-baseline transition-all duration-300 xs_window:gap-5 s_window:gap-11 m_window:gap-28 l_window:gap-52 xl_window:gap-52">
      {navLinks.map((nav, id) => (
        <li
          key={id}
          className={`${
            id === 0
              ? "text-xl font-bold drop-shadow-[0px_1.3px_2px_var(--headerOpposite)]"
              : id === 2
                ? "rounded-md py-1 drop-shadow-[0px_1.3px_2px_var(--headerOpposite)] transition-colors duration-300 hover:bg-slate-500"
                : "transition-all duration-300 hover:drop-shadow-[0px_1.3px_2px_var(--headerOpposite)]"
          } `}
        >
          {id === 1 ? (
            <Link to={nav.href} onClick={(e) => handleClick(e, nav.href)}>
              <img src={logo} className="s_winsow:ml-20 ml-16 w-16 pt-4" />
            </Link>
          ) : id === 2 ? (
            <Link
              className="px-3 py-1"
              to={nav.href}
              onClick={(e) => handleClick(e, nav.href)}
            >
              {nav.name}
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
