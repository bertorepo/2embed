import { Navigate } from "react-router-dom";

function Protected({ currentUser, children }) {
  const { isSignedIn } = currentUser;
  console.log(isSignedIn);
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default Protected;
