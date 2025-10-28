import RetractingSideBar from "../components/RetractingSideBar";
import UserProfile from "../components/UserProfile";
import Bookings from "../components/Bookings";
import Reviews from "../components/Reviews";
import Settings from "../components/Settings";
import { useLocation } from "react-router-dom";

export default function UserOverview() {
  const location = useLocation();

  const path = location.pathname;
  const active = path.includes("profile")
    ? "Profile"
    : path.includes("bookings")
      ? "Bookings"
      : path.includes("reviews")
        ? "Reviews"
        : path.includes("settings")
          ? "Settings"
          : "";
  return (
    <section className="z-10 mt-[70px] flex">
      <RetractingSideBar active={active} />
      <div className="w-full bg-mainBg p-4 text-primary">
        {active === "Profile" && <UserProfile />}
        {active === "Bookings" && <Bookings />}
        {active === "Reviews" && <Reviews />}
        {active === "Settings" && <Settings />}
      </div>
    </section>
  );
}
