import { Outlet } from "react-router-dom";
import Library from "../library/Library";

function Dashboard() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Dashboard;
