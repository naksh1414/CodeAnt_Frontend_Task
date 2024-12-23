import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  hasMore: boolean;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  startIndex,
  totalItems,
  hasMore,
}) => {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className="border-2 border-black bg-white rounded-md px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <span className="text-sm text-gray-600">
          Showing {startIndex + 1}-{totalItems}
        
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
            )
            .map((page, index, array) => (
              <React.Fragment key={page}>
                {index > 0 && array[index - 1] !== page - 1 && (
                  <span className="px-2">...</span>
                )}
                <button
                  onClick={() => onPageChange(page)}
                  className={`w-8 h-8 rounded-md ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              </React.Fragment>
            ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasMore}
          className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
