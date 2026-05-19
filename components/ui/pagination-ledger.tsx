'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginationLedgerProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationLedger({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationLedgerProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Sliding window generation logic for page numbers
  const getPageNumbers = () => {
    const pageWindow = 2; // How many pages to show around current page
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Always include first page
    pages.push(1);

    const startPage = Math.max(2, currentPage - pageWindow);
    const endPage = Math.min(totalPages - 1, currentPage + pageWindow);

    if (startPage > 2) pages.push('...');

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push('...');

    // Always include last page
    pages.push(totalPages);

    return pages;
  };

  if (totalPages <= 1) return null; // Hide if data fits on one page

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4 px-2 text-xs font-medium text-muted-foreground select-none">
      <div>
        Showing <span className="font-bold text-foreground">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> to{" "}
        <span className="font-bold text-foreground">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{" "}
        <span className="font-bold text-foreground">{totalItems}</span> ledger rows
      </div>

      <div className="flex items-center space-x-1.5">
        {/* Jump to First Page */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 hidden sm:flex"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft size={14} />
        </Button>

        {/* Step Previous */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={14} />
        </Button>

        {/* Numeric Buttons Loop */}
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="h-8 w-8 flex items-center justify-center tracking-widest opacity-60">
                ...
              </span>
            );
          }

          return (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? 'default' : 'outline'}
              className={`h-8 w-8 p-0 font-bold ${
                currentPage === page ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''
              }`}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </Button>
          );
        })}

        {/* Step Next */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={14} />
        </Button>

        {/* Jump to Last Page */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 hidden sm:flex"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight size={14} />
        </Button>
      </div>
    </div>
  );
}