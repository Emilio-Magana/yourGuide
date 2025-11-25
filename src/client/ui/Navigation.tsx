import { Link } from "react-router-dom";
import logo from "/img/logo-green-small.png";

const navLinks = [
  { name: "yourGuide", href: "/" },
  { name: "LOGO", href: "/" },
  { name: "Tours", href: "/tours" },
];

export default function Navigation() {
  // const location = useLocation();
  // const navigate = useNavigate();

  // const handleClick = (
  //   e: React.MouseEvent<HTMLAnchorElement>,
  //   href: string,
  // ) => {
  //   e.preventDefault();

  //   window.scrollTo({ top: 0, behavior: "smooth" });

  //   if (location.pathname !== href) {
  //     setTimeout(() => {
  //       navigate(href);
  //     }, 300);
  //   }
  // };

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div className="flex items-baseline duration-300 xs_window:gap-5 s_window:gap-11 m_window:gap-28 l_window:gap-52 xl_window:gap-52">
      {navLinks.map((nav, id) => (
        <Link
          to={nav.href}
          // onClick={(e) => handleClick(e, nav.href)}
          onClick={(e) => handleClick()}
          key={id}
          className={`${
            id === 0
              ? "text-xl font-bold drop-shadow-[0px_1.3px_2px_var(--headerOpposite)]"
              : id === 1
                ? "duration-100 hover:drop-shadow-[0px_1.3px_2px_var(--headerOpposite)]"
                : "hover:bg-navBg rounded-md px-3 py-1 drop-shadow-[0px_1.3px_2px_var(--headerOpposite)] duration-300 hover:px-5"
          } `}
        >
          {id === 1 ? (
            <img src={logo} className="ml-16 w-16 pt-4 s_window:ml-20" />
          ) : (
            <div className="text-header duration-300">{nav.name}</div>
          )}
        </Link>
      ))}
    </div>
  );
}
