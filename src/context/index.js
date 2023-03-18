import MoviesContextProvider from "./MoviesContext";

function MainProvider({children}) {
  return (
    <MoviesContextProvider>
      {children}
   </MoviesContextProvider>
 ) 
}

export default MainProvider;