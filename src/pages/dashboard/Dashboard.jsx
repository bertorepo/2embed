import Loader from "../../components/Loader";
import useLoader from "../../hooks/use-loader";
import MoviePage from "../movie/MoviePage";

function Dashboard() {
  const { isLoading } = useLoader();

  return (
    <>
      <h1>HOME</h1>
    </>
  );
}

export default Dashboard;
