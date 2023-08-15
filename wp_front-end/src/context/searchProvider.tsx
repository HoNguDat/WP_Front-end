import React, { useState } from "react";

import { Keyword } from "./searchContext";
import { SearchContext } from "./searchContext";
interface Props {
  children: React.ReactNode;
}

const SearchProvider: React.FC<Props> = ({ children }) => {
  const [keyWord, setKeywordContext] = useState<string>("");

  return (
    <SearchContext.Provider value={{ keyWord, setKeywordContext }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
