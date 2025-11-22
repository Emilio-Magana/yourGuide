import type {
  sortOrder,
  UserSortBy,
} from "../../components/admin/DatabaseManager";
import {
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortAlphaUp,
  FaSortAlphaUpAlt,
} from "react-icons/fa";

interface props {
  setUserSortBy: (value: React.SetStateAction<UserSortBy>) => void;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
  toggleSortOrder: () => void;
  userSortBy: UserSortBy;
  sortOrder: sortOrder;
}
export default function SortUser({
  userSortBy,
  setUserSortBy,
  setCurrentPage,
  toggleSortOrder,
  sortOrder,
}: props) {
  return (
    <>
      <form action="">
        <select
          value={userSortBy}
          onChange={(e) => {
            setUserSortBy(e.target.value as UserSortBy);
            setCurrentPage(1);
          }}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:ring-2 focus:ring-green-500"
        >
          <option value="role">Sort by Role</option>
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
        </select>
      </form>

      <button
        onClick={toggleSortOrder}
        className="group relative flex items-center gap-2 rounded-lg border border-secondary bg-secondary px-4 py-2 duration-300 hover:border-headerOpposite hover:bg-headerOpposite hover:px-6"
      >
        {sortOrder === "asc" ? (
          <>
            <FaSortAlphaDown
              size={20}
              className="inline-block duration-300 group-hover:rotate-180 group-hover:opacity-0"
            />
            <FaSortAlphaUp
              size={20}
              className="absolute top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </>
        ) : (
          <>
            <FaSortAlphaDownAlt
              size={20}
              className="inline-block duration-300 group-hover:rotate-180 group-hover:opacity-0"
            />
            <FaSortAlphaUpAlt
              size={20}
              className="absolute top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </>
        )}
      </button>
    </>
  );
}
