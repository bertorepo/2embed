import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovie } from "../api/movie-api";

import axios from "axios";

const AdminContext = createContext();

const initialUser = {
  username: "",
  isSignedIn: false,
};

const AdminContextProvider = ({ children }) => {
  const [listData, setListData] = useState([]);
  const [currentUser, setCurrentUser] = useState(initialUser);
  const navigate = useNavigate();

  const signOut = () => {
    setCurrentUser({ ...currentUser, isSignedIn: false });
    localStorage.removeItem("currentUser");
    if (!currentUser.isSignedIn) {
      return navigate("/");
    }
  };

  const authenticateUser = async (user) => {
    const response = await axios.get("user.json", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { username, password } = response.data.users[0];

    if (username === user.username && password === user.password) {
      // save to local storage
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          username: username,
          isSignedIn: true,
        })
      );
      setCurrentUser({ ...currentUser, username: username, isSignedIn: true });

      navigate("/admin");
    } else {
      alert("username and password incorrect!");
      navigate("/authenticate");
    }
  };

  const getUserDetails = useCallback(() => {
    const existingUser = JSON.parse(localStorage.getItem("currentUser"));

    if (existingUser !== null) {
      setCurrentUser({
        ...currentUser,
        username: existingUser.username,
        isSignedIn: existingUser.isSignedIn,
      });
    } else {
      setCurrentUser(initialUser);
    }
  }, []);

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
    getUserDetails,
  };

  return (
    <AdminContext.Provider value={adminConfig}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext };

export default AdminContextProvider;
