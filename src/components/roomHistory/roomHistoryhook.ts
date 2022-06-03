import { useState } from "react";

export const useCurrentPage = (): [number, () => void, () => void] => {
  const [currentPage, setCurrentPage] = useState(1);

  const NextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const PreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return [currentPage, PreviousPage, NextPage];
};
