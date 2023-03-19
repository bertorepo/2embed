import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";

function Root() {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}
export default Root;
