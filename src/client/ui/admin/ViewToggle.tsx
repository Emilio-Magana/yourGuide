import { motion } from "framer-motion";
import type { ViewMode } from "../../components/admin/DatabaseManager";

interface VietToggleProps {
  label1: string;
  label2: string;
  viewMode: ViewMode;
  handleViewModeChange: (mode: ViewMode) => void;
}

export default function ViewToggle({
  label1,
  label2,
  viewMode,
  handleViewModeChange,
}: VietToggleProps) {
  return (
    <div className="relative flex w-fit cursor-pointer rounded-lg bg-gray-100 p-1">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute bottom-1 top-1 mx-1 w-[46%] rounded-md bg-white shadow"
        style={{
          left: viewMode === "Users" ? "0%" : "50%",
        }}
      />

      <button
        onClick={() => handleViewModeChange("Users")}
        className={`relative z-10 w-24 rounded-l-md py-1 text-center transition-colors ${
          viewMode === "Users"
            ? "font-medium text-blue-600"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        {label1}
      </button>

      <button
        onClick={() => handleViewModeChange("Tours")}
        className={`relative z-10 w-24 rounded-r-md py-1 text-center transition-colors ${
          viewMode === "Tours"
            ? "font-medium text-blue-600"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        {label2}
      </button>
    </div>
  );
}
