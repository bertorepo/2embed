import { Outlet, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar";
import Dashboard from "./pages/dashboard/Dashboard";
import AddMoviePage from "./pages/admin/AddMoviePage";
import AdminPage from "./pages/admin/AdminPage";
import SeasonsPage from "./pages/admin/seasons/SeasonsPage";
import Library from "./pages/library/Library";
import MoviePage from "./pages/movie/MoviePage";
import { useAdminContext } from "./hooks/use-admin-context";
import ErrorPage from "./components/ErrorPage";
import Protected from "./pages/admin/components/Protected";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import { useEffect } from "react";

function App() {
  const { currentUser } = useAdminContext();

  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/movie/:imdb" element={<MoviePage />} />
          <Route path="/library/series/:imdb" element={<MoviePage />} />

          <Route
            path="/admin"
            element={
              <Protected currentUser={currentUser}>
                <AdminPage />
              </Protected>
            }
          />
          <Route
            path="/admin/add"
            element={
              <Protected currentUser={currentUser}>
                <AddMoviePage />
              </Protected>
            }
          />
          <Route
            path="/admin/season/:imdb"
            element={
              <Protected currentUser={currentUser}>
                <SeasonsPage />
              </Protected>
            }
          />
          <Route path="/authenticate" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
