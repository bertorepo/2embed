import { createContext, useCallback, useState } from "react";
import { searchMovie } from "../api/movie-api";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [listData, setListData] = useState([]);

  const findMovie = useCallback(async (title, type) => {
    const results = await searchMovie(title, type);
    if (!results.data.Error) {
      setListData(results.data.Search);
    }

    return results.data.Error;
  }, []);

  const adminConfig = {
    findMovie,
    listData,
  };

  return (
    <AdminContext.Provider value={adminConfig}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext };

export default AdminContextProvider;
