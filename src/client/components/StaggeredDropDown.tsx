import { IoMdPerson, IoMdSettings } from "react-icons/io";
import { FaCalendarCheck, FaEdit } from "react-icons/fa";
import { MdLogin, MdLogout } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { MdReviews } from "react-icons/md";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuth, useLogout } from "./../api/queries";
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
          className="flex items-center gap-2 rounded-md px-3 py-2 drop-shadow-[0px_1.3px_2px_var(--headerOpposite)] transition-colors duration-300 hover:bg-slate-500"
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
                Icon={BsPersonCircle}
                label="Profile"
                href="/users/:userId/dashboard#Profile"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={FaCalendarCheck}
                label="Bookings"
                href="/users/:userId/dashboard#Bookings"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={MdReviews}
                label="Reviews"
                href="/users/:userId/dashboard#Reviews"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={IoMdSettings}
                label="Settings"
                href="/users/:userId/dashboard#Settings"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={MdLogout}
                label="Logout"
                href="#"
                onClick={handLoggingOut}
              />
            </>
          ) : user?.role === "guide" || "lead-guide" || "admin" ? (
            <>
              <Option
                setIsOpen={setIsOpen}
                Icon={BsPersonCircle}
                label="Profile"
                href="/users/:userId/dashboard#Profile"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={FaCalendarCheck}
                label="Bookings"
                href="/users/:userId/dashboard#Bookings"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={MdReviews}
                label="Reviews"
                href="/users/:userId/dashboard#Reviews"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={FaEdit}
                label="Edit Tours"
                href="/users/:userId/tours"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={IoMdSettings}
                label="Settings"
                href="/users/:userId/dashboard#Settings"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={MdLogout}
                label="Logout"
                href="#"
                onClick={handLoggingOut}
              />
            </>
          ) : (
            <Option
              setIsOpen={setIsOpen}
              Icon={MdLogin}
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
