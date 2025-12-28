import { Navigate } from "react-router";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import type { JSX } from "react";
import Loader from "../../common/loader";


const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isInitialized) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedLayout