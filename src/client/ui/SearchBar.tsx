import { FaSearch } from "react-icons/fa";
import type { ViewMode } from "../components/admin/DatabaseManager";

interface Props {
  viewMode?: ViewMode;
  searchQuery: string;
  handleSearchChange: (value: string) => void;
}

export default function SearchBar({
  viewMode,
  searchQuery,
  handleSearchChange,
}: Props) {
  return (
    <>
      <div className="relative flex-1">
        <FaSearch
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder={`Search by ${viewMode === "Users" ? "username" : "tour name"}...`}
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-black focus:border-transparent focus:ring-2 focus:ring-green-500"
        />
      </div>
    </>
  );
}
