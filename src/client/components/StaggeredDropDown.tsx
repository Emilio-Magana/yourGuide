import { FiChevronDown } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { MdLogin, MdLogout } from "react-icons/md";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { useAuth, useLogout } from "../api/queries/authQueries";
import { userNavigation } from "../config/userNavigation";
import { SDDOption } from "../ui/OptionTypes";

export default function StaggeredDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const logoutMutation = useLogout();
  const { data: user } = useAuth();

  const userOptions = userNavigation[user?.role || "user"];

  const handLoggingOut = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setIsOpen(false);
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  return (
    <div ref={ref}>
      <motion.div animate={isOpen ? "open" : "closed"} className="relative">
        <button
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          className="hover:bg-navBg flex items-center gap-2 rounded-md px-3 py-2 text-header drop-shadow-[0px_1.3px_2px_var(--headerOpposite)] duration-300 hover:px-5"
        >
          <IoMdPerson />
          <motion.span
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
          >
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          exit={wrapperVariants.closed}
          style={{ originY: "top", translateX: "-50%" }}
          className={`absolute left-[50%] top-[120%] flex w-32 flex-col gap-2 overflow-hidden rounded-lg bg-white p-2 shadow-xl`}
        >
          {user ? (
            userOptions.map((section) => (
              <SDDOption
                key={section.id}
                href={section.href}
                Icon={section.Icon!}
                id={section.id}
                setIsOpen={setIsOpen}
              />
            ))
          ) : (
            <SDDOption
              setIsOpen={setIsOpen}
              Icon={MdLogin}
              id="Login"
              href="/login"
            />
          )}
          {user && (
            <SDDOption
              setIsOpen={setIsOpen}
              Icon={MdLogout}
              id="Logout"
              href="#"
              onClick={handLoggingOut}
            />
          )}
        </motion.ul>
      </motion.div>
    </div>
  );
}
const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      duration: 0.1,
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};
