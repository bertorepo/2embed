import { createContext, useCallback, useState } from "react";
import { redirect } from "react-router-dom";
import { searchMovie } from "../api/movie-api";

const AdminContext = createContext();

const initialUserConfig = {
  name: "",
  isSignedIn: false,
};

const AdminContextProvider = ({ children }) => {
  const [listData, setListData] = useState([]);
  const [currentUser, setCurrentUser] = useState(initialUserConfig);

  const signOut = () => {
    setCurrentUser({ ...initialUserConfig, isSignedIn: false });
    if (!currentUser.isSignedIn) {
      return redirect("/");
    }
  };

  const authenticateUser = () => {
    setCurrentUser({ ...initialUserConfig, isSignedIn: true });
  };

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
    setListData,
    currentUser,
    signOut,
    authenticateUser,
  };

  return (
    <AdminContext.Provider value={adminConfig}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext };

export default AdminContextProvider;
