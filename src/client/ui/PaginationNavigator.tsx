import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export default function PaginationNavigator({
  currentPage,
  totalPages,
  goToPage,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-secondary p-2 duration-200 hover:border-white disabled:cursor-not-allowed disabled:opacity-50"
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
              className={`h-10 w-10 rounded-lg duration-200 hover:-translate-y-[3px] ${
                currentPage === pageNum
                  ? "bg-sky-400 text-white"
                  : "border border-secondary hover:border-white hover:text-white"
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
        className="rounded-lg border border-secondary p-2 duration-200 hover:border-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
}
