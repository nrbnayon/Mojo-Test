import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar";
import Footer from "../Pages/Shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  return (
    <div>
      <div className="h-20">
        <NavBar />
      </div>

      <div className="h-screen">
        <Outlet />
      </div>

      <div>
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Root;
