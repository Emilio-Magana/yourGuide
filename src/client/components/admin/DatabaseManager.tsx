import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { LuArrowUpDown } from "react-icons/lu";
import {
  FaSearch,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaPlus,
} from "react-icons/fa";

import { useGetAllUsers } from "../../api/queries/userQueries";
import type { UserSection } from "../../ui/SectionNavigator";
import { useGetTours } from "../../api/queries/tourQueries";
import { TourWithReviews } from "./TourWithReviews";
import { UserWithReviews } from "./UserWithReviews";
import { CreateUserModal } from "./CreateUserModal";

import { useState, useMemo } from "react";
import type { Tour, User } from "../../config/schema";

const ITEMS_PER_PAGE = 6;

type ViewMode = "by-user" | "by-tour";
type TourSortBy = "name" | "rating";
type UserSortBy = "name" | "role";

export default function DatabaseManager({ sectionRef, id }: UserSection) {
  const { data: users } = useGetAllUsers();
  const { data: tours } = useGetTours();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [userSortBy, setUserSortBy] = useState<UserSortBy>("name");
  const [tourSortBy, setTourSortBy] = useState<TourSortBy>("name");
  const [viewMode, setViewMode] = useState<ViewMode>("by-user");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
      } else {
        // Sort by role
        const roleOrder = { admin: 0, "lead-guide": 1, guide: 2, user: 3 };
        const roleA = roleOrder[a.role as keyof typeof roleOrder] ?? 999;
        const roleB = roleOrder[b.role as keyof typeof roleOrder] ?? 999;
        return sortOrder === "asc" ? roleA - roleB : roleB - roleA;
      }
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
      } else {
        // Sort by average rating
        const ratingA = a.ratingsAverage || 0;
        const ratingB = b.ratingsAverage || 0;
        return sortOrder === "asc" ? ratingA - ratingB : ratingB - ratingA;
      }
    });

    return filtered;
  }, [tours, searchQuery, sortOrder, tourSortBy]);

  // Pagination
  const dataToDisplay =
    viewMode === "by-user" ? filteredAndSortedUsers : filteredAndSortedTours;
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
      className="flex scroll-mt-24 flex-col gap-5"
    >
      <h1 className="user-section-header">Data Management</h1>
      <div className="flex gap-14">
        <div className="flex w-fit rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => handleViewModeChange("by-user")}
            className={`rounded-md px-4 py-1 transition-colors ${
              viewMode === "by-user"
                ? "bg-white font-medium text-blue-600 shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            By User
          </button>
          <button
            onClick={() => handleViewModeChange("by-tour")}
            className={`rounded-md px-4 py-1 transition-colors ${
              viewMode === "by-tour"
                ? "bg-white font-medium text-blue-600 shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            By Tour
          </button>
        </div>
        {viewMode === "by-user" && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 text-white transition-colors hover:bg-green-700"
          >
            <FaPlus size={16} />
            Create User
          </button>
        )}
      </div>
      {/* FaSearch and Sort Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <FaSearch
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder={`Search by ${viewMode === "by-user" ? "username" : "tour name"}...`}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full max-w-96 rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-green-500"
          />
        </div>

        {viewMode === "by-user" ? (
          <>
            <select
              value={userSortBy}
              onChange={(e) => {
                setUserSortBy(e.target.value as UserSortBy);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-black focus:ring-2 focus:ring-green-500"
            >
              <option value="name">Sort by Name</option>
              <option value="role">Sort by Role</option>
            </select>

            <button
              onClick={toggleSortOrder}
              className="flex items-center gap-2 rounded-lg border border-secondary px-4 py-2 transition-all duration-300 hover:border-white hover:px-5 hover:py-1"
            >
              <LuArrowUpDown size={20} />
              <span>
                {userSortBy === "name" ? (
                  sortOrder === "asc" ? (
                    <span className="flex items-center gap-1">
                      A <FaAngleDoubleRight /> Z
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      A <FaAngleDoubleLeft /> Z
                    </span>
                  )
                ) : sortOrder === "asc" ? (
                  <span className="flex items-center gap-1">
                    A <FaAngleDoubleRight /> Z
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    A <FaAngleDoubleLeft /> Z
                  </span>
                )}
              </span>
            </button>
          </>
        ) : (
          <>
            <select
              value={tourSortBy}
              onChange={(e) => {
                setTourSortBy(e.target.value as TourSortBy);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-black"
            >
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
            </select>

            <button
              onClick={toggleSortOrder}
              className="flex items-center gap-2 rounded-lg border border-secondary px-4 py-2 transition-all duration-300 hover:border-white"
            >
              <LuArrowUpDown size={20} />
              <span>
                {tourSortBy === "name" ? (
                  sortOrder === "asc" ? (
                    <span className="flex items-center gap-1">
                      A <FaAngleDoubleRight /> Z
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      A <FaAngleDoubleLeft /> Z
                    </span>
                  )
                ) : sortOrder === "asc" ? (
                  <span className="flex items-center gap-1">
                    Low <FaAngleDoubleRight /> High
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    Low <FaAngleDoubleLeft /> High
                  </span>
                )}
              </span>
            </button>
          </>
        )}
      </div>

      {/* Results count */}
      {searchQuery && (
        <p className="text-sm text-gray-600">
          Found {dataToDisplay.length}{" "}
          {viewMode === "by-user" ? "user" : "tour"}
          {dataToDisplay.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Content List */}
      <div className="grid h-[780px] grid-cols-1 grid-rows-2 gap-2 m_window:grid-cols-2 l_window:grid-cols-3">
        {currentItems.length > 0 ? (
          viewMode === "by-user" ? (
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
            No {viewMode === "by-user" ? "users" : "tours"} found matching "
            {searchQuery}"
          </h2>
        ) : (
          <h2 className="py-8 text-center">
            No {viewMode === "by-user" ? "Users" : "Tours"} Yet!
          </h2>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-gray-300 p-2 duration-200 hover:-translate-y-[2px] hover:border-primary hover:bg-loaderBg2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`h-10 w-10 rounded-lg duration-200 hover:-translate-y-[2px] ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "border border-secondary hover:border-primary"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-secondary p-2 duration-200 hover:-translate-y-[2px] hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <CreateUserModal onClose={() => setShowCreateModal(false)} />
      )}
    </article>
  );
}
