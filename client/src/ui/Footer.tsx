import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="my-8 flex flex-col justify-center place-self-center ipad_mini:flex-row-reverse ipad_mini:justify-between">
      <p className="text-muted-foreground text-xs">
        &copy;{new Date().getFullYear()} Emilio Maga&ntilde;a
        {" | "}
        <Link className="link font-bold" to="/privacy">
          privacy
        </Link>
        {/* {" | "}
        <a
          className="link font-bold"
          href="https://www.icons8.com"
          target="_blank"
        >
          <img src="/icons8-mountain-96.png" className="inline w-5 pr-1"></img>
          from icons8.com
        </a> */}
      </p>
    </footer>
  );
}
