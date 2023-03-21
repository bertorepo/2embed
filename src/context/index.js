import AdminContextProvider from "./AdminContext";
import MoviesContextProvider from "./MoviesContext";

function MainProvider({ children }) {
  return (
    <MoviesContextProvider>
      <AdminContextProvider>{children}</AdminContextProvider>
    </MoviesContextProvider>
  );
}

export default MainProvider;
