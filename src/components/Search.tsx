import { MagnifyingGlass } from "@phosphor-icons/react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const Search = ({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term.trim() === "") {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("q");
      setSearchParams(newSearchParams.toString());
    } else {
      setPage(1);
      setSearchParams({ q: term });
    }
  }, 500);

  return (
    <div className="relative">
      <MagnifyingGlass
        size={22}
        className="text-gray-400  absolute top-2 right-3 z-10"
      />
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        className="border block md:w-64 border-gray-200 w-full text-sm text-gray-600 focus:outline-gray-300 drop-shadow-md rounded-md px-3 py-2 "
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
