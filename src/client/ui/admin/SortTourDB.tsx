import type {
  sortOrder,
  TourSortBy,
} from "../../components/admin/DatabaseManager";
import {
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortAlphaUp,
  FaSortAlphaUpAlt,
  FaSortNumericDown,
  FaSortNumericDownAlt,
  FaSortNumericUp,
  FaSortNumericUpAlt,
} from "react-icons/fa";

interface Props {
  setTourSortBy: (value: React.SetStateAction<TourSortBy>) => void;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
  toggleSortOrder: () => void;
  tourSortBy: TourSortBy;
  sortOrder: sortOrder;
}
export default function SortTourDB({
  setTourSortBy,
  setCurrentPage,
  toggleSortOrder,
  tourSortBy,
  sortOrder,
}: Props) {
  return (
    <>
      <form action="">
        <select
          value={tourSortBy}
          onChange={(e) => {
            setTourSortBy(e.target.value as TourSortBy);
            setCurrentPage(1);
          }}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:ring-2 focus:ring-green-500"
        >
          <option value="name">Sort by Name</option>
          <option value="ratingsAverage">Sort by Rating</option>
          <option value="price">Sort by Price</option>
          <option value="difficulty">Sort by Difficulty</option>
          <option value="duration">Sort by Duration</option>
          <option value="maxGroupSize">Sort by Group Size</option>
        </select>
      </form>

      <button
        onClick={toggleSortOrder}
        className="group relative flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 duration-300 hover:border-headerOpposite hover:bg-headerOpposite hover:px-6"
      >
        {tourSortBy === "name" ? (
          sortOrder === "asc" ? (
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
          )
        ) : sortOrder === "asc" ? (
          <>
            <FaSortNumericDown
              size={20}
              className="inline-block duration-300 group-hover:rotate-180 group-hover:opacity-0"
            />
            <FaSortNumericUp
              size={20}
              className="absolute top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </>
        ) : (
          <>
            <FaSortNumericDownAlt
              size={20}
              className="inline-block duration-300 group-hover:rotate-180 group-hover:opacity-0"
            />
            <FaSortNumericUpAlt
              size={20}
              className="absolute top-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </>
        )}
      </button>
    </>
  );
}
