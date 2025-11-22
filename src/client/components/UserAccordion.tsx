import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { User, UserRoles } from "../config/schema";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

interface AccordionProps {
  children: React.ReactNode;
  user: User;
  setIsEditing: (value: React.SetStateAction<boolean>) => void;
  setShowDeleteConfirm: (value: React.SetStateAction<boolean>) => void;
}
export default function UserAccordion({
  children,
  user,
  setIsEditing,
  setShowDeleteConfirm,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <AccordionTitle
        onClick={() => setIsOpen(!isOpen)}
        user={user}
        setIsEditing={setIsEditing}
        setShowDeleteConfirm={setShowDeleteConfirm}
      />
      <AnimatePresence initial={false}>
        {user.role === "user" && isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <section className="flex h-fit flex-col justify-between px-4 pb-2">
              {children}
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
interface TitleProps {
  onClick: () => void;
  user: User;
  setIsEditing: (value: React.SetStateAction<boolean>) => void;
  setShowDeleteConfirm: (value: React.SetStateAction<boolean>) => void;
}

function AccordionTitle({
  onClick,
  user,
  setIsEditing,
  setShowDeleteConfirm,
}: TitleProps) {
  const getRoleBadgeColor = (role: UserRoles) => {
    const colors = {
      admin: "bg-violet-100 text-violet-800",
      "lead-guide": "bg-cyan-100 text-cyan-800",
      guide: "bg-emerald-100 text-emerald-800",
      user: "bg-yellow-100 text-gray-800",
    };
    return colors[role as keyof typeof colors] || colors.user;
  };
  return (
    <div
      className="flex items-start justify-between px-4 py-2 hover:cursor-pointer hover:bg-loaderBg1"
      onClick={onClick}
    >
      <div className="text- flex place-items-baseline gap-2">
        <h2 className="text-lg font-semibold text-primary">{user.name}</h2>
        <p className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-800">
          {user.email}
        </p>
        <span
          className={`rounded px-2 py-1 text-xs ${getRoleBadgeColor(user.role || "user")}`}
        >
          {user.role || "user"}
        </span>
      </div>
      <div className="flex">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="rounded-lg p-2 text-blue-600 duration-200 hover:bg-blue-100"
        >
          <FaEdit size={20} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteConfirm(true);
          }}
          className="rounded-lg p-2 text-red-600 duration-200 hover:bg-red-900 hover:text-red-200"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </div>
  );
}
