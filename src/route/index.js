import AddMoviePage from "../pages/admin/AddMoviePage";
import AdminPage from "../pages/admin/AdminPage";
import SeasonsPage from "../pages/admin/seasons/SeasonsPage";
import Dashboard from "../pages/dashboard/Dashboard";
import Library from "../pages/library/Library";
import MoviePage from "../pages/movie/MoviePage";
import Root from "../route/Root";

const {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} = require("react-router-dom");

export const mainRoot = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Dashboard />} />
      <Route path="/library" element={<Library />} />
      <Route path="/library/movie/:imdb" element={<MoviePage />} />
      <Route path="/library/series/:imdb" element={<MoviePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/add" element={<AddMoviePage />} />
      <Route path="/admin/season/:imdb" element={<SeasonsPage />} />
      <Route path="*" element={<Dashboard />} />
    </Route>
  )
);
