import i18n from './i18n'
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Home from './pages/home';
import LogIn from './pages/logIn/logIn';

function App() {
  //change dir
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);


  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
