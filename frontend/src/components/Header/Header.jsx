import { useEffect, useRef, useState, useContext } from "react";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BiMenu, BiX, BiUser, BiLogOut } from "react-icons/bi";
import { FaHome, FaStethoscope, FaPhoneAlt } from "react-icons/fa";
import { AuthContext } from '../../context/authContext.jsx';

const navLinks = [
  { path: "/home", display: "Home", icon: <FaHome className="w-5 h-5" /> },
  { path: "/doctors", display: "Find a Doctor", icon: <FaStethoscope className="w-5 h-5" /> },
  { path: "/contact", display: "Contact", icon: <FaPhoneAlt className="w-5 h-5" /> },
];

const Header = () => {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, token, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStickyHeader = () => {
    if (window.scrollY > 80) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-36" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-2 text-lg font-medium transition duration-300 ${
                  isActive ? "text-blue-600 underline" : "text-gray-800 dark:text-gray-300 hover:text-blue-500"
                }`
              }
            >
              {link.icon}
              {link.display}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {token && user ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-3">
                <Link to={role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}>
                  <img
                    src={user?.photo || userImg}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-blue-600 hover:scale-105 transition duration-300 object-cover"
                  />
                </Link>
                <span className="text-gray-800 dark:text-gray-200 font-medium hidden md:inline-block">
                  Hi, {user?.name?.split(" ")[0] || "User"} 👋
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={logoutHandler}
                className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold hover:scale-105 hover:shadow-lg transition duration-300"
              >
                <BiLogOut className="w-5 h-5" />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-blue-600 text-white flex items-center gap-2 px-6 py-2 rounded-full hover:bg-blue-900 hover:scale-105 transition duration-300 ease-in-out">
                <BiUser className="w-5 h-5" />
                Login
              </button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            <BiMenu className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white dark:bg-gray-900 transition-transform duration-300 flex flex-col items-center justify-center space-y-6 text-lg font-medium transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button className="absolute top-5 right-5 text-gray-800 dark:text-gray-300 text-3xl" onClick={toggleMenu}>
          <BiX />
        </button>

        {token && user && (
          <div className="flex items-center gap-3">
            <img
              src={user?.photo || userImg}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
            />
            <span className="text-gray-800 dark:text-gray-200">Hi, {user?.name?.split(" ")[0] || "User"} 👋</span>
          </div>
        )}

        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className="text-gray-800 dark:text-gray-300 hover:text-blue-500 flex items-center gap-2 transition duration-300"
            onClick={toggleMenu}
          >
            {link.icon}
            {link.display}
          </NavLink>
        ))}

        {token && user && (
          <button
            onClick={() => {
              toggleMenu();
              logoutHandler();
            }}
            className="text-red-500 hover:text-red-700 flex items-center gap-2 transition duration-300"
          >
            <BiLogOut className="w-5 h-5" />
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
