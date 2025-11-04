import { useAuth, useLogout } from "./../api/queries";
import { motion } from "framer-motion";
import { IoMdPerson, IoMdSettings } from "react-icons/io";
import { CiLogin, CiLogout } from "react-icons/ci";
import { MdReviews, MdTour } from "react-icons/md";
import { FiEdit, FiChevronDown, FiPlusSquare } from "react-icons/fi";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Option } from "./OptionTypes";

export default function StaggeredDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { data: user } = useAuth();
  const logoutMutation = useLogout();

  const handLoggingOut = async () => {
    setIsOpen(false);
    try {
      await logoutMutation.mutateAsync();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
          className="flex items-center gap-2 rounded-md px-3 py-2 drop-shadow-[-1px_1.2px_1.2px_var(--headerOpposite)] transition-colors duration-300 hover:bg-slate-500"
        >
          <IoMdPerson />
          <motion.span variants={iconVariants}>
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
          {user?.role === "user" ? (
            <>
              <Option
                setIsOpen={setIsOpen}
                Icon={FiEdit}
                label="Profile"
                href="/:userId/dashboard#Profile"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={FiPlusSquare}
                label="Bookings"
                href="/:userId/dashboard#Bookings"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={MdReviews}
                label="Reviews"
                href="/:userId/dashboard#Reviews"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={IoMdSettings}
                label="Settings"
                href="/:userId/dashboard#Settings"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={CiLogout}
                label="Logout"
                href="#"
                onClick={handLoggingOut}
              />
            </>
          ) : user?.role === "guide" ||
            user?.role === "lead-guide" ||
            user?.role === "admin" ? (
            <>
              <Option
                setIsOpen={setIsOpen}
                Icon={FiEdit}
                label="Profile"
                href="/:userId/dashboard#Profile"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={FiPlusSquare}
                label="Bookings"
                href="/:userId/dashboard#Bookings"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={MdReviews}
                label="Reviews"
                href="/:userId/dashboard#Reviews"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={MdTour}
                label="Edit Tours"
                href="/:userId/tours"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={IoMdSettings}
                label="Settings"
                href="/:userId/dashboard#Settings"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={CiLogout}
                label="Logout"
                href="#"
                onClick={handLoggingOut}
              />
            </>
          ) : (
            <Option
              setIsOpen={setIsOpen}
              Icon={CiLogin}
              label="Login"
              href="/login"
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

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};
