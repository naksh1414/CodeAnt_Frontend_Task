import { Search } from "lucide-react";
import React from "react";

interface SearchbarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  return (
    <div className="relative flex mb-6">
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search Repositories"
        className="w-full pl-10 pr-4 py-2 border rounded-l-md"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        onClick={handleClearSearch}
        className="text-sm md:text-lg w-40 border-2 border-black px-4 rounded-r-md  bg-black/70 hover:bg-black text-white"
      >
        Clear Search
      </button>
    </div>
  );
};

export default Searchbar;
