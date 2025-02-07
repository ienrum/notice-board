import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const VISIBILITY_PAGE = 5;
const HALF_VISIBILITY_PAGE = Math.floor(VISIBILITY_PAGE / 2);

interface PaginationProps {
  setPage: (page: number) => void;
  page: number;
  totalPage: number;
}

const Pagination = ({
  setPage,
  page: currentPageNumber,
  totalPage,
}: PaginationProps) => {
  const start = Math.max(1, currentPageNumber - HALF_VISIBILITY_PAGE);

  const endIndex = Math.min(totalPage, start + VISIBILITY_PAGE - 1);
  const startIndex = Math.max(1, endIndex - VISIBILITY_PAGE + 1);

  const pageNumbers = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, i) => i + startIndex
  );

  const handleSetPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPage) {
      return;
    }

    setPage(newPage);
  };

  return (
    <div className="flex justify-center space-x-2 items-center">
      <Button
        onClick={() => handleSetPage(currentPageNumber - 1)}
        disabled={currentPageNumber === 1}
        variant="link"
      >
        <ArrowLeft size={16} />
      </Button>
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant="link"
          onClick={() => handleSetPage(pageNumber)}
          className={pageNumber === currentPageNumber ? "underline" : ""}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        onClick={() => handleSetPage(currentPageNumber + 1)}
        disabled={currentPageNumber === totalPage}
        variant="link"
      >
        <ArrowRight size={16} />
      </Button>
    </div>
  );
};

export default Pagination;
