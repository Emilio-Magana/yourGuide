import DarkModeToggle from "./DarkModeToggle";
import Navigation from "./Navigation";
import UserNavigation from "./UserNavigation";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 py-6 font-mono backdrop-blur-sm text-rose-800">
      <nav className="mx-auto flex max-w-[674px] items-center justify-between transition-all duration-300 ease-in-out phone:px-2 ipad_mini:px-8">
        <Navigation />
        {/* <div className="flex items-baseline phone:gap-2 ipad_mini:gap-4"> */}
        <UserNavigation />
        <DarkModeToggle />
        {/* </div> */}
      </nav>
    </header>
  );
}
