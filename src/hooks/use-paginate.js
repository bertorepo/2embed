import { useMemo, useState } from "react";

export const usePaginate = (items, itemsPerPage = 10) => {
  /*======== Code for Pagination*/

  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);

  const lastPageNumber = itemsPerPage + currentPageNumber;
  const currentItems = items.slice(currentPageNumber, lastPageNumber);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (e) => {
    const nextPageNumber = (e.selected * itemsPerPage) % items.length;
    setCurrentPageNumber(nextPageNumber);
    setSelectedPage(e.selected);
  };

  /* ============================*/

  return {
    currentPageNumber,
    pageCount,
    handlePageClick,
    currentItems,
    setCurrentPageNumber,
    setSelectedPage,
    selectedPage,
  };
};
