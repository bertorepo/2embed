import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdminContext } from "../../../hooks/use-admin-context";

function Protected({ children }) {
  const { getUserDetails, currentUser } = useAdminContext();

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const { isSignedIn } = currentUser;
  console.log(isSignedIn);
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default Protected;
