import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar";
import Footer from "../Pages/Shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");

  return (
    <div>
      {noHeaderFooter || (
        <div className="h-20">
          <NavBar />
        </div>
      )}
      <div>
        <Outlet />
      </div>
      {noHeaderFooter || (
        <div>
          <Footer />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Root;
