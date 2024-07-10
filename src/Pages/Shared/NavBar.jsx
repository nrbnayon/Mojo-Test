import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="hover:text-primary hover:underline transition duration-300"
        >
          HOME
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 fixed h-20 z-[999] max-w-screen-xl mx-auto opacity-90">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content gap-2 uppercase mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <div className="flex ">
          <h1 className="text-3xl font-extrabold">Mojo Test</h1>
        </div>
      </div>
      <div className="navbar-center  hidden lg:flex">
        <ul className="menu menu-horizontal space-x-2 px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        <div className="flex justify-center items-center gap-3">
          {user ? (
            <>
              <div>
                <div className="avatar online w-10 h-10 ">
                  <img
                    tabIndex={0}
                    className="rounded-full"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <Link
                onClick={handleLogout}
                className="hidden md:flex btn text-secondary"
              >
                LOGOUT
              </Link>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "flex btn text-pink-600 border border-primary"
                  : "font-bold btn btn-outline  transition-all duration-300"
              }
            >
              LOGIN
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
