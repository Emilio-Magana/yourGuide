import type { Dispatch, SetStateAction } from "react";
import type { IconType } from "react-icons";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";

interface OptionProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  Icon: IconType;
  onClick?: () => void;
  href: string;
  label: string;
}

const Option = ({ href, label, Icon, setIsOpen, onClick }: OptionProps) => {
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

export { Option };
