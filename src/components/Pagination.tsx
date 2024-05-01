import { CaretRight, CaretLeft } from "@phosphor-icons/react";

interface PaginationPropsI {
  totalPage: number | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ totalPage, setPage, page }: PaginationPropsI) => {
  const scrollTop = () => {
    scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const handlePrev = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
    scrollTop();
  };
  const handleNext = () => {
    if (totalPage === page) return;
    setPage((prev) => prev + 1);
    scrollTop();
  };
  return (
    <div className="flex justify-center gap-4 items-center text-[#333]">
      <button
        onClick={handlePrev}
        className="flex items-center hover:text-black"
      >
        <CaretLeft />
        Prev
      </button>
      <span className="border border-gray-500 px-4 py-1 rounded-md">
        {page}
      </span>

      <button
        onClick={handleNext}
        className="flex items-center hover:text-black"
      >
        Next <CaretRight />
      </button>
    </div>
  );
};

export default Pagination;
