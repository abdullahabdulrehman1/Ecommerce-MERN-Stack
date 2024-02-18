import { useState, useEffect, createContext, useContext } from "react";

export const SearchContext = createContext();
export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const value = {
    search,
    setSearch,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
export default { SearchProvider, useSearch };
