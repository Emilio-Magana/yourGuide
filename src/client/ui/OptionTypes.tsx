import type { Dispatch, SetStateAction } from "react";
import type { IconType } from "react-icons";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";

export type UserOptions<TKey extends string> = {
  [P in TKey]: NavOption[];
};
export type NavOption = {
  id: string;
  href: string;
  Icon?: IconType;
  component: React.FC<any>;
};
type Option = {
  id: string;
  href: string;
  Icon: IconType;
  notifs?: number;
  isOpen: boolean;
  isActive?: boolean;
  onClick?: () => Promise<void>;
};
function RSBOption({
  Icon,
  id,
  isActive,
  isOpen,
  notifs,
  href,
  onClick,
}: Option) {
  return (
    <HashLink smooth to={href}>
      <motion.button
        layout
        onClick={onClick}
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
            {id}
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
}

interface SDDOptionProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
  Icon: IconType;
  id: string;
  href: string;
}
function SDDOption({ setIsOpen, onClick, Icon, id, href }: SDDOptionProps) {
  return (
    <HashLink smooth to={href}>
      <motion.li
        variants={{
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
        }}
        onClick={id === "Logout" ? onClick : () => setIsOpen(false)}
        className="flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-md p-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-600"
      >
        <motion.span
          variants={{ open: { scale: 1, y: 0 }, closed: { scale: 0, y: -7 } }}
        >
          <Icon />
        </motion.span>
        <span>{id}</span>
      </motion.li>
    </HashLink>
  );
}

export { SDDOption, RSBOption };
