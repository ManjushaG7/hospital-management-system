import { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu, BiX, BiUser } from "react-icons/bi";
import { FaHome, FaStethoscope, FaServicestack, FaPhoneAlt } from "react-icons/fa";

const navLinks = [
    { path: '/home', display: 'Home', icon: <FaHome className="w-5 h-5 "  /> },
    { path: '/doctors', display: 'Find a Doctor', icon: <FaStethoscope className="w-5 h-5 " /> },
    { path: '/contact', display: 'Contact', icon: <FaPhoneAlt className="w-5 h-5" /> },
];

const Header = () => {
    const headerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleStickyHeader = () => {
        if (window.scrollY > 80) {
            headerRef.current.classList.add('sticky__header');
        } else {
            headerRef.current.classList.remove('sticky__header');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleStickyHeader);
        return () => window.removeEventListener('scroll', handleStickyHeader);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md">
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

                {/* Right Side - Login & Mobile Menu */}
                <div className="flex items-center space-x-4">
                    <Link to="/login">
                        <button className="bg-blue-600 text-white flex items-center gap-2 px-6 py-2 rounded-full hover:bg-blue-900 hover:scale-105 transition duration-300 ease-in-out">
                            <BiUser className="w-5 h-5" />
                            Login
                        </button>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={toggleMenu}>
                        <BiMenu className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-white dark:bg-gray-900 transition-transform duration-300 flex flex-col items-center justify-center space-y-6 text-lg font-medium transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <button className="absolute top-5 right-5 text-gray-800 dark:text-gray-300 text-3xl" onClick={toggleMenu}>
                    <BiX />
                </button>
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
            </div>
        </header>
    );
};

export default Header;
