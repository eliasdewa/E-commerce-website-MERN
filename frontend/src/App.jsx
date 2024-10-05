import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./pages/footer/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const App = () => {
  // To load from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <ToastContainer autoClose={2000} theme="dark" />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
