import type {
  sortOrder,
  TourSortBy,
} from "../components/admin/DatabaseManager";
import SearchBar from "./SearchBar";
import SortTours from "./SortTours";

interface Props {
  searchQuery: string;
  handleSearchChange: (value: string) => void;
  setTourSortBy: (value: React.SetStateAction<TourSortBy>) => void;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
  toggleSortOrder: () => void;
  tourSortBy: TourSortBy;
  sortOrder: sortOrder;
}

export default function ControlPanel({
  searchQuery,
  handleSearchChange,
  setTourSortBy,
  toggleSortOrder,
  setCurrentPage,
  tourSortBy,
  sortOrder,
}: Props) {
  return (
    <div className="flex shrink-0 flex-col gap-2 bg-mainBg s_window:sticky s_window:top-[86px] s_window:h-[400px] s_window:w-[197px]">
      <div className="">
        <SearchBar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
      </div>
      <SortTours
        setCurrentPage={setCurrentPage}
        setTourSortBy={setTourSortBy}
        toggleSortOrder={toggleSortOrder}
        tourSortBy={tourSortBy}
        sortOrder={sortOrder}
      />
    </div>
  );
}
