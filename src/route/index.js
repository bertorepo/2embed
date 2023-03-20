import AdminPage from "../pages/admin/AdminPage";
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
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Dashboard />} />
    </Route>
  )
);
