import { Navigate } from "react-router";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import type { JSX } from "react";
import { useState, useEffect } from "react";
import ProductPages from "../../common/loader"; // يمكن أن تكون هذه صفحة الـ loading الخاصة بك

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.auth
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2500); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ProductPages />;
  }

  if (!isInitialized) {
    return <ProductPages />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedLayout;
