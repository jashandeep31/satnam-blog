"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const HomePagination = ({
  currentPage,
  total,
}: {
  currentPage: number;
  total: number;
}) => {
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/?page=${Number(currentPage) - 1}`} />
            </PaginationItem>
          )}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink href={`/?page=${Number(currentPage) - 1}`}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {Array.from({ length: 2 }, (_, index) =>
            (Number(currentPage) + index) * 10 < total ? (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`/?page=${Number(currentPage) + 1 + index}`}
                >
                  {Number(currentPage) + 1 + index}
                </PaginationLink>
              </PaginationItem>
            ) : null
          )}

          {Number(total) > Number(currentPage) * 10 && (
            <PaginationItem>
              <PaginationNext href={`/?page=${Number(currentPage) + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default HomePagination;
