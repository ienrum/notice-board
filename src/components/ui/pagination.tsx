import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const VISIBILITY_PAGE = 5;

interface PaginationProps {
  setPage: (page: number) => void;
  page: number;
  totalPage: number;
}

const Pagination = ({ setPage, page, totalPage }: PaginationProps) => {
  const pageNumbers = Array.from({ length: VISIBILITY_PAGE }, (_, i) =>
    page <= Math.floor(VISIBILITY_PAGE / 2) + 1 ? i + 1 : i + page - 1
  ).filter((pageNumber) => pageNumber <= totalPage);

  const handleSetPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPage) {
      return;
    }

    setPage(newPage);
  };

  return (
    <div className="flex justify-center space-x-2 items-center">
      <Button
        onClick={() => handleSetPage(page - 1)}
        disabled={page === 1}
        variant="link"
      >
        <ArrowLeft size={16} />
      </Button>
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant="link"
          onClick={() => handleSetPage(pageNumber)}
          className={pageNumber === page ? "underline" : ""}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        onClick={() => handleSetPage(page + 1)}
        disabled={page === totalPage}
        variant="link"
      >
        <ArrowRight size={16} />
      </Button>
    </div>
  );
};

export default Pagination;
