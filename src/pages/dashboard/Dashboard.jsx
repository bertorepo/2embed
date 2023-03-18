import { useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import Loader from "../../components/Loader";

import Library from "../library/Library";
import MoviePage from "../movie/MoviePage";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <AppBar />
      {/* <Library /> */}
      {isLoading ? <Loader /> : <MoviePage />}
    </>
  );
}

export default Dashboard;
