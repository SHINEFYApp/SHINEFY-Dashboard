import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import LogIn from './pages/logIn/logIn';
import { Layout } from './components/layout/Layout';
import type { RootState } from './redux/store';
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from './redux/slices/authSlice';
import ProtectedLayout from './components/ProtectedLayout/ProtectedLayout';
import { RoutesPages } from './routes';

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const LoginRedirect = () => {
    const isAuthenticated = useSelector(
      (state: RootState) => state.auth.isAuthenticated
    );

    return isAuthenticated ? <Navigate to="/" replace /> : <LogIn />;
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginRedirect />} />
        <Route
          path="/*"
          element={
            <ProtectedLayout>
              <Layout>
                <RoutesPages />
              </Layout>
            </ProtectedLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
