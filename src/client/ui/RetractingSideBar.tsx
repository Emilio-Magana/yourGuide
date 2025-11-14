import { FiChevronsRight } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

import { motion } from "framer-motion";
import type { RefObject } from "react";

import { RSBOption, type NavOption } from "./OptionTypes";
import type { User } from "../config/schema";

const api_url = import.meta.env.VITE_API_URL;

interface SideBarProps {
  sectionRefs: Record<string, RefObject<HTMLDivElement | null>>;
  active?: "Dashboard" | "Bookings" | "Reviews" | "Settings";
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sections: NavOption[];
  numBookings: number;
  className: string;
  isOpen: boolean;
  user: User;
}

export default function RetractingSideBar({
  active,
  numBookings,
  className,
  isOpen,
  setIsOpen,
  user,
  sections,
}: SideBarProps) {
  return (
    <motion.nav
      layout
      className={className}
      key="sidebar"
      style={{
        width: isOpen ? "225px" : "fit-content",
      }}
    >
      <TitleSection
        isOpen={isOpen}
        username={user.name}
        email={user.email}
        pfp={user.photo}
      />
      <div className="space-y-1">
        {sections.map((section) =>
          section.id === "Bookings" ? (
            <RSBOption
              key="Bookings"
              href={section.href}
              isActive={active === section.id}
              notifs={numBookings}
              Icon={section.Icon!}
              id={"Bookings"}
              isOpen={isOpen}
            />
          ) : (
            <RSBOption
              key={section.id}
              href={section.href}
              isActive={active === section.id}
              Icon={section.Icon!}
              id={section.id}
              isOpen={isOpen}
            />
          ),
        )}
      </div>
      <ToggleClose isOpen={isOpen} setIsOpen={setIsOpen} />
    </motion.nav>
  );
}

interface TitleSectionProps {
  isOpen: boolean;
  username: string;
  email: string;
  pfp: string | undefined;
}
const TitleSection = ({ isOpen, username, email, pfp }: TitleSectionProps) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo pfp={pfp} />
          {isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">{username}</span>
              <span className="block text-xs text-slate-500">{email}</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Logo = ({ pfp }: { pfp: string | undefined }) => {
  return (
    <motion.div layout className="grid size-10 shrink-0 place-content-center">
      {pfp ? (
        <img src={`${api_url}/img/users/${pfp}`} className="rounded" />
      ) : (
        <FaUserCircle size={30} />
      )}
    </motion.div>
  );
};

const ToggleClose = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setIsOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${isOpen && "rotate-180"}`}
          />
        </motion.div>
        {isOpen && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};
