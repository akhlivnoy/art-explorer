import { useEffect, useState } from 'react';

import { FileRouteTypes } from '@/routeTree.gen';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

type PaginationListProps = {
  currentPage: number;
  totalPages: number;
  updatePageRange: boolean;
  to: FileRouteTypes['to'];
};

export const PaginationList: React.ComponentType<PaginationListProps> = ({
  currentPage,
  totalPages,
  updatePageRange,
  to,
}) => {
  const [pageRange, setPageRange] = useState<Array<number | '...'>>([]);

  useEffect(() => {
    if (!updatePageRange) return;

    let newPageRange: typeof pageRange;

    if (totalPages <= 3) {
      // Show first pages
      newPageRange = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= 2) {
      // Show first 3 pages
      newPageRange = [1, 2, 3, '...', totalPages];
    } else if (currentPage >= totalPages - 1) {
      // Show last pages
      newPageRange = [1, '...', totalPages - 2, totalPages - 1, totalPages];
    } else {
      // Show pages in the middle
      newPageRange = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }

    setPageRange(newPageRange);
  }, [currentPage, totalPages, updatePageRange]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={currentPage === 1} search={{ page: currentPage - 1 }} to={to} />
        </PaginationItem>

        {pageRange.map((pageNumber, index) => {
          const isActive = pageNumber === currentPage;
          return (
            <PaginationItem key={`${pageNumber}-${index}`}>
              {pageNumber === '...' ? (
                <PaginationEllipsis className="items-end py-1" />
              ) : (
                <PaginationLink
                  className="transition-none"
                  disabled={isActive}
                  isActive={isActive}
                  search={{ page: pageNumber }}
                  to={to}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext disabled={currentPage === totalPages} search={{ page: currentPage + 1 }} to={to} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
