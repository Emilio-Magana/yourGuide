import { useGetAllUsers } from "../../api/queries/userQueries";
import PaginationNavigator from "../../ui/PaginationNavigator";
import type { UserSection } from "../../ui/SectionNavigator";
import { useGetTours } from "../../api/queries/tourQueries";
import type { Tour, User } from "../../config/schema";
import { TourWithReviews } from "./TourWithReviews";
import { UserWithReviews } from "./UserWithReviews";
import { CreateUserModal } from "./CreateUserModal";
import ViewToggle from "../../ui/admin/ViewToggle";
import SortUser from "../../ui/admin/SortUser";
import SortTourDB from "../../ui/admin/SortTourDB";
import SearchBar from "../../ui/SearchBar";

import { useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";

const ITEMS_PER_PAGE = 12;

export type ViewMode = "Users" | "Tours";
export type sortOrder = "asc" | "desc";
export type UserSortBy = "name" | "role" | "email";
export type TourSortBy =
  | "name"
  | "ratingsAverage"
  | "price"
  | "difficulty"
  | "duration"
  | "maxGroupSize";

export default function DatabaseManager({ sectionRef, id }: UserSection) {
  const { data: tours } = useGetTours();
  const { data: users } = useGetAllUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("Users");
  const [sortOrder, setSortOrder] = useState<sortOrder>("asc");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userSortBy, setUserSortBy] = useState<UserSortBy>("role");
  const [tourSortBy, setTourSortBy] = useState<TourSortBy>("name");

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];

    let filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    filtered.sort((a, b) => {
      if (userSortBy === "name") {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else if (userSortBy === "role") {
        const roleOrder = { admin: 0, "lead-guide": 1, guide: 2, user: 3 };
        const roleA = roleOrder[a.role as keyof typeof roleOrder] ?? 999;
        const roleB = roleOrder[b.role as keyof typeof roleOrder] ?? 999;
        return sortOrder === "asc" ? roleA - roleB : roleB - roleA;
      } else if (userSortBy === "email") {
        const emailA = a.email.toLowerCase();
        const emailB = b.email.toLowerCase();
        return sortOrder === "asc"
          ? emailA.localeCompare(emailB)
          : emailB.localeCompare(emailA);
      }
      return 0;
    });

    return filtered;
  }, [users, searchQuery, sortOrder, userSortBy]);

  // Filter and sort tours
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

  // Pagination
  const dataToDisplay =
    viewMode === "Users" ? filteredAndSortedUsers : filteredAndSortedTours;
  const totalPages = Math.ceil(dataToDisplay.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = dataToDisplay.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <article
      id={id}
      ref={sectionRef}
      className="flex scroll-mt-7 flex-col gap-5"
    >
      <h1 className="user-section-header">Data Management</h1>
      <div className="flex gap-2">
        <ViewToggle
          label1="Users"
          label2="Tours"
          viewMode={viewMode}
          handleViewModeChange={handleViewModeChange}
        />
        {viewMode === "Users" && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-lg bg-sky-400 px-4 text-white duration-300 hover:-translate-y-1 hover:drop-shadow-[0_4px_1.2px_var(--primary)]"
          >
            <FaPlus size={16} />
            Create User
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <SearchBar
          viewMode={viewMode}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
        {viewMode === "Users" ? (
          <SortUser
            setUserSortBy={setUserSortBy}
            setCurrentPage={setCurrentPage}
            toggleSortOrder={toggleSortOrder}
            userSortBy={userSortBy}
            sortOrder={sortOrder}
          />
        ) : (
          <SortTourDB
            setTourSortBy={setTourSortBy}
            setCurrentPage={setCurrentPage}
            toggleSortOrder={toggleSortOrder}
            tourSortBy={tourSortBy}
            sortOrder={sortOrder}
          />
        )}
      </div>
      {searchQuery && (
        <p className="text-sm text-gray-600">
          Found {dataToDisplay.length} {viewMode === "Users" ? "user" : "tour"}
          {dataToDisplay.length !== 1 ? "s" : ""}
        </p>
      )}
      <div className="flex flex-col overflow-hidden rounded-lg border border-secondary">
        {currentItems.length > 0 ? (
          viewMode === "Users" ? (
            currentItems.map((user) => (
              <UserWithReviews key={user._id} user={user as User} />
            ))
          ) : (
            currentItems.map((tour) => (
              <TourWithReviews key={tour._id} tour={tour as Tour} />
            ))
          )
        ) : searchQuery ? (
          <h2 className="py-8 text-center text-gray-500">
            No {viewMode === "Users" ? "users" : "tours"} found matching "
            {searchQuery}"
          </h2>
        ) : (
          <h2 className="py-8 text-center">
            No {viewMode === "Users" ? "Users" : "Tours"} Yet!
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
      {showCreateModal && (
        <CreateUserModal onClose={() => setShowCreateModal(false)} />
      )}
    </article>
  );
}
