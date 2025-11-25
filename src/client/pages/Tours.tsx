import PathFinderLoader from "../components/PathFinderLoader";
import { useGetTours } from "../api/queries/tourQueries";
import TourHeader from "../ui/tour/TourHeader";
import ControlPanel from "../ui/ControlPanel";
import TourCard from "../ui/tour/TourCard";
import type {
  sortOrder,
  TourSortBy,
} from "../components/admin/DatabaseManager";
import { useMemo, useState } from "react";
import PaginationNavigator from "../ui/PaginationNavigator";

const ITEMS_PER_PAGE = 10;

export default function Tours() {
  const { data: tours, isLoading } = useGetTours();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<sortOrder>("asc");
  const [tourSortBy, setTourSortBy] = useState<TourSortBy>("name");

  const filteredAndSortedTours = useMemo(() => {
    if (!tours) return [];
    let filtered = tours.filter((tour) =>
      tour.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    filtered.sort((a, b) => {
      if (tourSortBy === "name") {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else if (tourSortBy === "ratingsAverage") {
        const ratingA = a.ratingsAverage || 0;
        const ratingB = b.ratingsAverage || 0;
        return sortOrder === "asc" ? ratingA - ratingB : ratingB - ratingA;
      } else if (tourSortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (tourSortBy === "difficulty") {
        const difficultyOrder = { easy: 0, medium: 1, difficult: 2 };
        const diffA =
          difficultyOrder[a.difficulty as keyof typeof difficultyOrder] ?? 999;
        const diffB =
          difficultyOrder[b.difficulty as keyof typeof difficultyOrder] ?? 999;
        return sortOrder === "asc" ? diffA - diffB : diffB - diffA;
      } else if (tourSortBy === "duration") {
        return sortOrder === "asc"
          ? a.duration - b.duration
          : b.duration - a.duration;
      } else if (tourSortBy === "maxGroupSize") {
        return sortOrder === "asc"
          ? a.maxGroupSize - b.maxGroupSize
          : b.maxGroupSize - a.maxGroupSize;
      }
      return 0;
    });

    return filtered;
  }, [tours, searchQuery, sortOrder, tourSortBy]);

  const totalPages = Math.ceil(filteredAndSortedTours.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredAndSortedTours.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  if (isLoading) return <PathFinderLoader />;
  if (!tours) return <div>No tours available</div>;
  return (
    <section className="flex flex-col gap-1">
      <TourHeader
        tourCover="tour-3-1.jpg"
        title="Tours"
        height="h-[320px] s_window:h-[380px]"
        detailed={false}
      />

      <article className="flex flex-col gap-3 p-2 duration-300 s_window:flex-row">
        <ControlPanel
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          setTourSortBy={setTourSortBy}
          toggleSortOrder={toggleSortOrder}
          setCurrentPage={setCurrentPage}
          tourSortBy={tourSortBy}
          sortOrder={sortOrder}
        />
        <div className="grid grid-cols-1 gap-2 duration-300 s_window:grid-cols-1 m_window:grid-cols-2 xl_window:grid-cols-3 xxl_window:grid-cols-4">
          {currentItems.length > 0
            ? currentItems.map((tour) => <TourCard {...tour} key={tour.name} />)
            : searchQuery && (
                <h2 className="py-8 text-center text-gray-500">
                  No Tours found matching "{searchQuery}"
                </h2>
              )}
        </div>
        {totalPages > 1 && (
          <PaginationNavigator
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        )}
      </article>
    </section>
  );
}
