import { Navigate } from "react-router-dom";

function Protected({ currentUser, children }) {
  const { isSignedIn } = currentUser;
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default Protected;
