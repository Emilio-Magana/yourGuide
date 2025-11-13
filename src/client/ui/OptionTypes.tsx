import type { Dispatch, SetStateAction } from "react";
import type { IconType } from "react-icons";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";

interface StaggeredDownOptionProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
  Icon: IconType;
  label: string;
  href: string;
}
function SDDOption({
  setIsOpen,
  onClick,
  Icon,
  label,
  href,
}: StaggeredDownOptionProps) {
  return (
    <HashLink smooth to={href}>
      <motion.li
        variants={itemVariants}
        onClick={label === "Logout" ? onClick : () => setIsOpen(false)}
        className="flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-md p-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-600"
      >
        <motion.span variants={actionIconVariants}>
          <Icon />
        </motion.span>
        <span>{label}</span>
      </motion.li>
    </HashLink>
  );
}
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

interface RSBOptionProps {
  Icon: IconType;
  label: string;
  isActive: boolean;
  isOpen: boolean;
  notifs?: number;
  href: string;
}
const RSBOption = ({
  Icon,
  label,
  isActive,
  isOpen,
  notifs,
  href,
}: RSBOptionProps) => {
  return (
    <HashLink smooth to={href} key={label}>
      <motion.button
        layout
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${isActive ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          {Icon && <Icon />}
        </motion.div>
        {isOpen && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {label}
          </motion.span>
        )}

        {notifs != undefined && notifs > 0 && isOpen && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            style={{ y: "-50%" }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
          >
            {notifs}
          </motion.span>
        )}
      </motion.button>
    </HashLink>
  );
};

export { SDDOption, RSBOption };
