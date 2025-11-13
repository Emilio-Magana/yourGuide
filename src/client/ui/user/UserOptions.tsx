import { type Dispatch, type SetStateAction } from "react";
import { SDDOption } from "../OptionTypes";
// import type { IconType } from "react-icons";

interface UserOptionsProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
  id: string;
  href: string;
}

export default function UserOptions({
  setIsOpen,
  onClick,
  id,
  href,
}: UserOptionsProps) {
  return (
    <div>
      <SDDOption
        setIsOpen={setIsOpen}
        Icon={BsPersonCircle}
        id="Profile"
        href="/users/:userId/dashboard#Profile"
      />
      <SDDOption
        setIsOpen={setIsOpen}
        Icon={FaCalendarCheck}
        id="Bookings"
        href="/users/:userId/dashboard#Bookings"
      />
      <SDDOption
        setIsOpen={setIsOpen}
        Icon={MdReviews}
        id="Reviews"
        href="/users/:userId/dashboard#Reviews"
      />
      <SDDOption
        setIsOpen={setIsOpen}
        Icon={IoMdSettings}
        id="Settings"
        href="/users/:userId/dashboard#Settings"
      />
      <SDDOption
        setIsOpen={setIsOpen}
        Icon={MdLogout}
        id="Logout"
        href="#"
        onClick={handLoggingOut}
      />
    </div>
  );
}
