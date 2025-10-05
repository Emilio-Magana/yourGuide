import { useAuth } from "./../api/queries";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { IoMdPerson } from "react-icons/io";
import { CiLogin, CiLogout } from "react-icons/ci";
import { FiEdit, FiChevronDown, FiPlusSquare } from "react-icons/fi";
import { type Dispatch, type SetStateAction, useState } from "react";
import { Link } from "react-router-dom";

export default function StaggeredDropDown() {
  const [open, setOpen] = useState(false);
  const { data: user } = useAuth();
  return (
    <div>
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
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
          style={{ originY: "top", translateX: "-50%" }}
          className="absolute left-[50%] top-[120%] flex w-28 flex-col gap-2 overflow-hidden rounded-lg bg-white p-2 shadow-xl"
        >
          {user ? (
            <>
              <Option
                setOpen={setOpen}
                Icon={FiEdit}
                text="Profile"
                href="/profile/:userId"
              />
              <Option
                setOpen={setOpen}
                Icon={FiPlusSquare}
                text="Bookings"
                href="/bookings/:userId"
              />
              <Option setOpen={setOpen} Icon={CiLogout} text="Logout" href="" />
            </>
          ) : (
            <Option
              setOpen={setOpen}
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
  href: string;
  text: string;
  Icon: IconType;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Option = ({ href, text, Icon, setOpen }: OptionProps) => {
  return (
    <Link to={href}>
      <motion.li
        variants={itemVariants}
        onClick={() => setOpen(false)}
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
