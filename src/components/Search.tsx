import React, { useState } from "react";
import search from "/svgs/search.svg";

interface SearchProps {
  onSearch: (val: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState<string>("");

  return (
    <div className="flex gap-5">
      <div className="w-fit h-12 flex bg-gray-50 border border-gray-300 pr-3 py-2 rounded-md relative">
        <div className="flex items-center px-3">
          <img src={search} className="w-4" />
        </div>
        <input
          type="search"
          placeholder="Search categories..."
          value={keyword}
          onChange={(val) => setKeyword(val.currentTarget.value)}
          className="w-96 text-xs bg-transparent outline-none"
        />
      </div>
      <button
        className="text-white text-sm bg-[#824D77] px-10 rounded-md shadow-xl"
        onClick={() => onSearch(keyword)}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
