import { t } from 'i18next'
import './App.css'
import { Button } from './components/ui/button'
import i18n from './i18n'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/home';
import About from './pages/About';

function App() {
  //change dir
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
