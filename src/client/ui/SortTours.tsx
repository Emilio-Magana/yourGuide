import type {
  sortOrder,
  TourSortBy,
} from "../components/admin/DatabaseManager";
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

type SortOption = {
  value: TourSortBy;
  label: string;
};

const sortOptions: SortOption[] = [
  { value: "difficulty", label: "Difficulty" },
  { value: "ratingsAverage", label: "Rating" },
  { value: "price", label: "Price" },
  { value: "duration", label: "Duration" },
  { value: "maxGroupSize", label: "Group Size" },
  { value: "name", label: "Name" },
];

interface Props {
  setTourSortBy: (value: React.SetStateAction<TourSortBy>) => void;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
  toggleSortOrder: () => void;
  tourSortBy: TourSortBy;
  sortOrder: sortOrder;
}
export default function SortTours({
  setTourSortBy,
  setCurrentPage,
  toggleSortOrder,
  tourSortBy,
  sortOrder,
}: Props) {
  const handleChange = (value: TourSortBy) => {
    setTourSortBy(value);
    setCurrentPage(1);
    window.scrollTo({ top: 310, behavior: "smooth" });
  };
  return (
    <>
      {/* <div className="grid grid-cols-[150px_1fr] gap-2 s_window:grid-cols-[30px_1fr]"> */}
      <div className="flex place-items-center justify-center gap-2 rounded-lg bg-centerLBg py-1 font-semibold text-white s_window:flex-col s_window:gap-4">
        <span>Sort Tours By</span>
      </div>

      <div className="grid grid-cols-2 gap-2 s_window:grid-cols-1">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleChange(option.value)}
            //
            className={`rounded-lg px-4 py-2 text-sm text-white transition hover:-translate-y-[2px] ${
              tourSortBy === option.value
                ? "bg-highLightBg"
                : "bg-slate-500 hover:bg-slate-400"
            } `}
          >
            {option.label}
          </button>
        ))}
      </div>
      {/* </div> */}

      <button
        onClick={toggleSortOrder}
        className="group relative flex items-center justify-center gap-2 rounded-lg border border-secondary bg-secondary px-4 py-2 duration-300 hover:border-headerOpposite hover:bg-headerOpposite hover:px-6"
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
