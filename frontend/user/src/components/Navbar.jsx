import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false); // 👈 Add this
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
    setShowProfileMenu(false); // 👈 Hide menu on logout
  };

  // ✅ Auto-open search bar on /collection, close on other routes
  useEffect(() => {
    if (location.pathname === "/collection") {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
    setShowProfileMenu(false); // 👈 Hide menu on route change
  }, [location.pathname, setShowSearch]);

  // Hide profile menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("#profile-menu")) setShowProfileMenu(false);
    };
    if (showProfileMenu) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showProfileMenu]);

  return (
    <div className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white shadow-md relative z-30">
      <Link to="/">
        <img
          src={assets.logo}
          className="w-28 sm:w-32 transition hover:scale-105"
          alt="logo"
        />
      </Link>

      <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, i) => {
          const names = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
          return (
            <li key={i}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block py-2 px-3 hover:text-blue-500 transition-colors duration-200 ${
                    isActive ? "text-blue-500 font-semibold" : ""
                  }`
                }
              >
                {names[i]}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-5 sm:gap-6">
        {/* ✅ Always show search icon */}
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer opacity-70 hover:opacity-100"
          alt="Search"
          onClick={() => setShowSearch(true)}
        />

        <div className="relative hidden sm:block" id="profile-menu">
          <img
            onClick={() => token ? setShowProfileMenu((v) => !v) : navigate('/login')}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
          />
        {token && showProfileMenu && (
  <div className="absolute right-0 mt-1 w-40 bg-gray-100 rounded shadow-lg py-1 z-50">
    <p
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
    >
      My Profile
    </p>
    <p
      onClick={() => navigate("/orders")}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
    >
      Orders
    </p>
    <p
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      onClick={logout}
    >
      Logout
    </p>
    <p
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      onClick={() => window.open('http://localhost:5174/')}
    >
      Admin Panel
    </p>
    {/* ✅ New option to wake up Render backend */}
    <p
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        fetch("https://e-commercer-website-4.onrender.com/")
          .then(() => alert("Backend pinged! It should be active shortly."))
          .catch(() => alert("Failed to reach backend."));
      }}
    >
      Wake Backend
    </p>
  </div>
)}

        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="Cart" />
          <p className="absolute right-[-5px]  bottom-[-5px] w-4 text-center  leading-4 bg-black text-white aspect-square rounded-full text-[8px] ">
            {getCartCount()}
          </p>
        </Link>

        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
          onClick={() => setVisible(true)}
        />
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
          {["/", "/collection", "/about", "/contact"].map((path, i) => {
            const names = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
            return (
              <li key={i}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded transition ${
                      isActive
                        ? "bg-black text-white font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  onClick={() => setVisible(false)}
                >
                  {names[i]}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {visible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setVisible(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
