"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faBookReader,
  faHistory,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import search from "../../assets/images/search-icon.svg";
import logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";
const InstituteHeader = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Mock data - in a real app, this would come from your auth context or API
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    role: "Student",
    image: "/abstract-profile.png",
  });
  const [cartCount, setCartCount] = useState(3);

  // Mock categories - in a real app, this would come from an API
  const categories = [
    { id: 1, name: "Web Development", slug: "web-development" },
    { id: 2, name: "Data Science", slug: "data-science" },
    { id: 3, name: "Mobile Development", slug: "mobile-development" },
    { id: 4, name: "Business", slug: "business" },
    { id: 5, name: "Design", slug: "design" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    // Implement logout functionality
    console.log("Logging out...");
    setIsAuthenticated(false);
  };

  return (
    <header className="main-header fixed-top">
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Teachera Logo" />
          </Link>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit}>
            <a
              href="#"
              className="search-btn"
              data-bs-toggle="modal"
              data-bs-target="#search"
              onClick={(e) => e.preventDefault()}
            >
              <label>
                <img src={search} alt="Search" />
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Search Course"
                value={searchQuery}
                onChange={handleSearchChange}
                name="search"
              />
            </a>
          </form>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbar"
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Menu */}
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbar"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  Categories
                </a>
                <ul className="dropdown-menu main-menu">
                  {categories.map((category) => (
                    <li key={category.id} className="dropend">
                      <Link to={`courses`} className="dropdown-item inner-item">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/all-instructors" ? "active" : ""
                  }`}
                  to="/all-instructors"
                >
                  Teach On Teachera
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/business" ? "active" : ""
                  }`}
                  to="/business"
                >
                  Teachera Business
                </Link>
              </li>
            </ul>

            {/* User Authentication Section */}
            <div className="nav-btn">
              {isAuthenticated ? (
                <>
                  {/* Cart Button */}
                  <Link to="/cart" className="cart-btn">
                    <img
                      src="/cart-icon.svg"
                      className="injectable"
                      alt="Cart"
                    />
                    <span>{cartCount}</span>
                  </Link>

                  {/* User Profile Dropdown */}
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={user.image || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <div className="nav-btn-conent">
                        <h6>{user.role}</h6>
                        <h5>{user.name}</h5>
                      </div>
                    </button>
                    <ul className="dropdown-menu profile-menu">
                      <li>
                        <Link to="" className="dropdown-item">
                          <FontAwesomeIcon icon={faUser} className="me-2" />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="dropdown-item">
                          <FontAwesomeIcon icon={faHeart} className="me-2" />
                          Wishlist
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="dropdown-item">
                          <FontAwesomeIcon
                            icon={faBookReader}
                            className="me-2"
                          />
                          My Learning
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="dropdown-item">
                          <FontAwesomeIcon icon={faHistory} className="me-2" />
                          Purchase history
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={handleLogout}
                          className="dropdown-item"
                        >
                          <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className="me-2"
                          />
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                /* Login/Register Buttons */
                <div className="login-btn">
                  <Link to="login" className="thm-btn me-1">
                    Login
                  </Link>
                  <Link to="register" className="thm-btn outline-btn ms-1">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default InstituteHeader;
