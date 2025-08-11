import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const location = useLocation();

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setShowProfileMenu(false);
  };

  // Auto-open search bar on /collection
  useEffect(() => {
    setShowSearch(location.pathname === "/collection");
    setShowProfileMenu(false);
  }, [location.pathname, setShowSearch]);

  // Close profile menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("#profile-menu")) setShowProfileMenu(false);
    };
    if (showProfileMenu) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showProfileMenu]);

  const menuLinks = [
    { path: "/", name: "HOME" },
    { path: "/collection", name: "COLLECTION" },
    { path: "/about", name: "ABOUT" },
    { path: "/contact", name: "CONTACT" },
  ];

  return (
    <header className="w-full bg-white shadow-md relative z-30">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src={assets.logo}
            className="w-24 sm:w-32 transition hover:scale-105"
            alt="logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex gap-6 text-sm text-gray-700">
          {menuLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block py-2 px-3 hover:text-blue-500 transition-colors duration-200 ${
                  isActive ? "text-blue-500 font-semibold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6 relative">
          {/* Search */}
          <img
            src={assets.search_icon}
            className="w-5 cursor-pointer opacity-70 hover:opacity-100"
            alt="Search"
            onClick={() => setShowSearch(true)}
          />

          {/* Profile Menu */}
          <div className="relative" id="profile-menu">
            <img
              onClick={() =>
                token ? setShowProfileMenu((v) => !v) : navigate("/login")
              }
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="Profile"
            />
            {token && showProfileMenu && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                <p className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </p>
                <p
                  onClick={() => window.open("https://e-commercer-website-t8ut.vercel.app")}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  Admin Panel
                </p>
                <p
                  onClick={() => {
                    fetch("https://e-commercer-website-4.onrender.com/")
                      .then(() =>
                        alert("Backend pinged! It should be active shortly.")
                      )
                      .catch(() => alert("Failed to reach backend."));
                  }}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  Wake Backend
                </p>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5" alt="Cart" />
            <span className="absolute right-[-5px] bottom-[-5px] w-4 h-4 text-center bg-black text-white rounded-full text-[8px] leading-4">
              {getCartCount()}
            </span>
          </Link>

          {/* Mobile Menu Icon */}
          <button
            className="sm:hidden"
            onClick={() => setVisible(true)}
            aria-label="Menu"
          >
            <img src={assets.menu_icon} className="w-5" alt="Menu" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0" : "translate-x-full"
        } sm:hidden z-40`}
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setVisible(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <ul className="px-6 space-y-3">
          {menuLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded transition ${
                    isActive
                      ? "bg-black text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setVisible(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {visible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setVisible(false)}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
