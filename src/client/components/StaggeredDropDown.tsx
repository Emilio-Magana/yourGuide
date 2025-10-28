import { useAuth, useLogout } from "./../api/queries";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { IoMdPerson, IoMdSettings } from "react-icons/io";
import { CiLogin, CiLogout } from "react-icons/ci";
import { FiEdit, FiChevronDown, FiPlusSquare } from "react-icons/fi";
import { MdReviews } from "react-icons/md";

import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";

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
          className="flex items-center gap-2 rounded-md px-3 py-2 text-white transition-colors duration-300 hover:bg-slate-500"
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
          className="absolute left-[50%] top-[120%] flex w-28 flex-col gap-2 overflow-hidden rounded-lg bg-white p-2 shadow-xl"
        >
          {user ? (
            <>
              <Option
                setIsOpen={setIsOpen}
                Icon={FiEdit}
                text="Profile"
                href="/:userId/profile"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={FiPlusSquare}
                text="Bookings"
                href="/:userId/bookings"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={MdReviews}
                text="Reviews"
                href="/:userId/reviews"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={IoMdSettings}
                text="Settings"
                href="/:userId/settings"
              />
              <Option
                setIsOpen={setIsOpen}
                Icon={CiLogout}
                text="Logout"
                href="#"
                onClick={handLoggingOut}
              />
            </>
          ) : (
            <Option
              setIsOpen={setIsOpen}
              Icon={CiLogin}
              text="Login"
              href="/login"
            />
          )}
        </motion.ul>
      </motion.div>
    </div>
  );
}

interface OptionProps {
  onClick?: () => void;
  href: string;
  text: string;
  Icon: IconType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Option = ({ href, text, Icon, setIsOpen, onClick }: OptionProps) => {
  return (
    <Link to={href}>
      <motion.li
        variants={itemVariants}
        onClick={text === "Logout" ? onClick : () => setIsOpen(false)}
        className="flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-md p-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-600"
      >
        <motion.span variants={actionIconVariants}>
          <Icon />
        </motion.span>
        <span>{text}</span>
      </motion.li>
    </Link>
  );
};

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

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
