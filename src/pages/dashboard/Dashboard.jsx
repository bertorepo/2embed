import AppBar from "../../components/AppBar";
import Library from "../library/Library";

function Dashboard() {
  // useEffect(() => {
  //   fetchedAllMovies();
  // }, [fetchedAllMovies]);

  return (
    <>
      <AppBar />
      <Library />
    </>
  );
}

export default Dashboard;
