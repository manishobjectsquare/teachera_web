

"use client";

import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "/newlogo.png";
import searchIcon from "../../assets/images/search-icon.svg";
import cartIcon from "../../assets/images/cart-icon.svg";
import { useTranslation } from "react-i18next";
import { useUser } from "../../Context/UserContext";
import { useCart } from "../../Context/CartContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, profileData, hasInstructorRole, switchDashboard } =
    useUser();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.Token) return;

      try {
        const detailedResponse = await fetch(
          `https://api.basementex.com/api/profil_details/${user?._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.Token}`,
            },
          }
        );

        const detailedData = await detailedResponse.json();

        if (detailedData?.data[0]?.status === "inactive") {
          toast.error("Your account has been deactivated! Please contact the support team.");
          logout();
        }

      } catch (err) {
        console.error("Error checking account status:", err);
      }
    };

    fetchProfileData()
  }, []);
  const handleSwitchToInstructor = (e) => {
    e.preventDefault();
    switchDashboard("instructor");
  };

  const { cart } = useCart();
  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const fetchCourses = async () => {
    try {
      const response = await fetch(
        `https://api.basementex.com/api/v1/web/course-list`
      );
      const data = await response.json();
      setCategories(data.Categorydetails);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Check if user is authenticated based on context
  const isAuthenticated = !!user?.Token;
  // Get cart count from cart context
  const cartCount = cart?.totalQuantity || 0;

  // Get user role and name from profile data
  const userRole = profileData?.role || "student";
  const userName = profileData?.name || "User";
  const instructorStatus = profileData?.instructor_status || "";
  const userProfileImage = profileData?.image || null;

  // Dropdown hover functionality
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownTimerRef = useRef(null);
  const profileDropdownTimerRef = useRef(null);

  const languages = [
    { code: "ar", label: "AR" },
    { code: "en", label: "EN" },
  ];

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  // Handle logout with context
  const handleLogout = async (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const result = await Swal.fire({
      title: t("Are you sure?"),
      text: t("You will be logged out from your account."),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, logout"),
      cancelButtonText: t("Cancel"),
    });

    if (result.isConfirmed) {
      logout();
      navigate("/home");
    }
  };

  // Dropdown hover functions for categories
  const showDropdown = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setIsDropdownOpen(true);
  };

  const hideDropdown = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  // Dropdown hover functions for profile menu
  const showProfileDropdown = () => {
    if (profileDropdownTimerRef.current) {
      clearTimeout(profileDropdownTimerRef.current);
    }
    setIsProfileDropdownOpen(true);
  };

  const hideProfileDropdown = () => {
    profileDropdownTimerRef.current = setTimeout(() => {
      setIsProfileDropdownOpen(false);
    }, 200);
  };

  // Search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const searchTimeoutRef = useRef(null);
  const searchModalRef = useRef(null);

  // Store reference to the Bootstrap modal instance
  useEffect(() => {
    const modalElement = document.getElementById("search");
    if (modalElement && window.bootstrap) {
      searchModalRef.current = new window.bootstrap.Modal(modalElement);

      modalElement.addEventListener("hidden.bs.modal", () => {
        setSearchQuery("");
        setSearchResults([]);
        setSearchBoxOpen(false);
      });
    }
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchBoxOpen(value.trim() !== "");

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim()) {
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(() => {
        fetchSearchResults(value);
      }, 300);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(
        `https://api.basementex.com/search/?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.status && data.data) {
        setSearchResults(data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const closeSearchModal = () => {
    const modal = document.getElementById("search");
    if (modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
      modal.removeAttribute("aria-modal");
      modal.style.display = "none";

      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.remove();

      document.body.classList.remove("modal-open");
      document.body.style = "";
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchSearchResults(searchQuery);
    }
  };

  const handleSearchResultClick = (courseId) => {
    closeSearchModal();
    navigate(`/course-details/${courseId}`);
  };

  const handleMobileMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Close modal when location changes
  useEffect(() => {
    closeSearchModal();
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const sideBar = document.querySelector(".navbar-collapse");
    if (sideBar) {
      sideBar.classList.remove("show");
      sideBar.setAttribute("aria-expanded", "false");
    }
  }, [location]);

  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
      if (profileDropdownTimerRef.current) {
        clearTimeout(profileDropdownTimerRef.current);
      }
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Mobile menu items
  const mobileMenuItems = [
    {
      icon: "fas fa-user",
      label: t("Profile"),
      path: "/student/setting",
      show: isAuthenticated,
    },
    {
      icon: "fas fa-book",
      label: t("All Courses"),
      path: "/courses",
      show: true,
    },
    {
      icon: "fas fa-heart",
      label: t("Wishlist"),
      path: "/student/wishlist",
      show: isAuthenticated,
    },
    {
      icon: "fas fa-graduation-cap",
      label: t("My Learning"),
      path: "/student/enrolled-courses",
      show: isAuthenticated,
    },
    {
      icon: "fas fa-graduation-cap",
      label: t("Become Instructor"),
      path: "/become-instructor",
      show: isAuthenticated && !hasInstructorRole(),
    },
    {
      icon: "fas fa-history",
      label: t("Purchase History"),
      path: "/student/orders",
      show: isAuthenticated,
    },
    { icon: "fas fa-blog", label: t("Blog"), path: "/blog", show: true },
    // { icon: "fas fa-bell", label: t("Notifications"), path: "/notifications", show: isAuthenticated },
    {
      icon: "fas fa-info-circle",
      label: t("About"),
      path: "/about-us",
      show: true,
    },
    // { icon: "fas fa-question-circle", label: t("Help and Support"), path: "/support", show: true },
    {
      icon: "fas fa-file-contract",
      label: t("Terms & Conditions"),
      path: "/terms-and-conditions",
      show: true,
    },
    {
      icon: "fas fa-shield-alt",
      label: t("Privacy Policy"),
      path: "/privacy-policy",
      show: true,
    },
    {
      icon: "fas fa-key",
      label: t("Change Password"),
      path: "/student/setting",
      show: isAuthenticated,
    },
  ];

  return (
    <>
      <header className="main-header fixed-top pt-0">
        <div className="top-header bg-black text-white py-1">
          <div className="container d-flex  gap-3">
            <NavLink
              to="/live-courses"
              className="text-white text-decoration-none tp-hdr-link"
            >
              Live
            </NavLink>
            <NavLink
              to="/recorded"
              className="text-white text-decoration-none tp-hdr-link"
            >
              Recorded
            </NavLink>
          </div>
        </div>

        <style>
          {`
          .tp-hdr-link{
          border-bottom: 2px solid transparent;
          transition: 0.4s;
          }
         .tp-hdr-link.active {
              border-color: #fff;
              font-weight: bold;
              padding-bottom: 2px;
          }
         .tp-hdr-link:hover {  
            border-color: #fff;
          }

            .dropdown-toggle::after {color: #000 !important;}
            .search-bar-box-list li a {
              display: flex;
              align-items: center;
              padding: 10px;
              text-decoration: none;
              color: inherit;
              transition: background-color 0.2s;
            }
            .search-bar-box-list li a:hover {
              background-color: rgba(0,0,0,0.05);
            }
            .search-status {
              padding: 15px;
              text-align: center;
              color: #666;
            }
            .navbar-brand img{
             vertical-align: baseline;
            }
            
            /* Chat Button Styles */
            .chat-btn {
              position: relative;
              background: #f8f9fa;
              border: none;
              padding: 8px 12px;
              margin: 0 8px;
              border-radius: 8px;
              color: #2563eb;
              font-size: 18px;
              cursor: pointer;
              transition: all 0.3s ease;
            }

            .chat-btn:hover {
              background: #f8f9fa;
              color: #2563eb;
            }

            .chat-notification {
              position: absolute;
              top: -2px;
              right: -2px;
              background: #ef4444;
              color: white;
              border-radius: 50%;
              width: 18px;
              height: 18px;
              font-size: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
            }

            /* Mobile Profile Toggle Styles */
            .mobile-profile-toggle {
              background: none;
              border: none;
              padding: 0;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              overflow: hidden;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .mobile-profile-toggle:hover {
              transform: scale(1.05);
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }

            .mobile-profile-toggle img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .mobile-menu-icon {
              width: 40px;
              height: 40px;
              background: #f8f9fa;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #333;
              font-size: 18px;
            }

            /* Mobile Menu Overlay */
            .mobile-menu-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              z-index: 9998;
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s ease;
            }

            .mobile-menu-overlay.active {
              opacity: 1;
              visibility: visible;
            }

            /* Mobile Menu */
            .mobile-menu {
              position: fixed;
              top: 0;
              left: -100%;
              width: 320px;
              height: 100vh;
              background: #fff;
              z-index: 9999;
              transition: left 0.3s ease;
              overflow-y: auto;
              box-shadow: 2px 0 10px rgba(0,0,0,0.1);
            }

            .mobile-menu.active {
              left: 0;
            }

            .mobile-menu-header {
              background: #0055D2;
              padding: 30px 20px 20px;
              color: white;
              position: relative;
            }

            .mobile-menu-close {
              position: absolute;
              top: 15px;
              right: 15px;
              background: rgba(255,255,255,0.2);
              border: none;
              color: white;
              width: 35px;
              height: 35px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: background 0.3s ease;
            }

            .mobile-menu-close:hover {
              background: rgba(255,255,255,0.3);
            }

            .mobile-menu-profile {
              display: flex;
              align-items: center;
              gap: 15px;
            }

            .mobile-menu-avatar {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              overflow: hidden;
              border: 3px solid rgba(255,255,255,0.3);
            }

            .mobile-menu-avatar img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .mobile-menu-user-info h4 {
              margin: 0;
              font-size: 18px;
              font-weight: 600;
            }

            .mobile-menu-user-info p {
              margin: 5px 0 0;
              font-size: 14px;
              opacity: 0.9;
            }

            .mobile-menu-content {
              padding: 0;
            }

            .mobile-menu-item {
              display: flex;
              align-items: center;
              padding: 15px 20px;
              color: #333;
              text-decoration: none;
              // border-bottom: 1px solid #f0f0f0;
              transition: all 0.3s ease;
            }

            .mobile-menu-item:hover {
              background: #f8f9fa;
              color: #007bff;
              text-decoration: none;
            }

            .mobile-menu-item i {
              width: 24px;
              margin-right: 15px;
              font-size: 16px;
              color: #666;
            }

            .mobile-menu-item:hover i {
              color: #007bff;
            }

            .mobile-menu-item.logout {
              color: #dc3545;
              border-top: 1px solid #f0f0f0;
              margin-top: 10px;
            }

            .mobile-menu-item.logout:hover {
              background: #fff5f5;
              color: #dc3545;
            }

            .mobile-menu-item.logout i {
              color: #dc3545;
            }

            .mobile-menu-language {
              padding: 15px 20px;
              border-bottom: 1px solid #f0f0f0;
            }

            .mobile-menu-language select {
              width: 100%;
              padding: 8px 12px;
              border: 1px solid #ddd;
              border-radius: 6px;
              background: #fff;
            }

            @media (max-width: 991px) {
              .navbar-toggler {
                display: none;
              }
            }

            /* RTL Support */
            [dir="rtl"] .mobile-menu {
              left: auto;
              right: -100%;
            }

            [dir="rtl"] .mobile-menu.active {
              right: 0;
              left: auto;
            }

            [dir="rtl"] .mobile-menu-item i {
              margin-right: 0;
              margin-left: 15px;
            }
          `}
        </style>
        <nav className="navbar navbar-expand-lg custom-navbar">
          <div className="container">
            <Link className="navbar-brand" to="/home">
              <img src={logo || "/placeholder.svg"} alt="Teachera Logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar"
              aria-controls="navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home"
                  >
                    {t("Home")}
                  </Link>
                </li>
                <li
                  className="nav-item dropdown"
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded={isDropdownOpen ? "true" : "false"}
                  >
                    {t("Categories")}
                  </a>
                  <ul
                    className={`dropdown-menu main-menu ${isDropdownOpen ? "show" : ""
                      }`}
                    onMouseEnter={showDropdown}
                    onMouseLeave={hideDropdown}
                  >
                    {categories.map((category) => (
                      <li className="dropend" key={category?._id}>
                        <Link
                          to={`/courses?category=${category?._id}`}
                          className="dropdown-item inner-item"
                        >
                          {/* {category?.name} */}
                          {i18n?.language == "en" || category?.arabic_name == ""
                            ? category?.name
                            : category?.arabic_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ADDCSSTOME" to="/courses">
                    {t("Courses")}
                  </Link>
                </li>
                <li className="nav-item">
                  {isAuthenticated && (
                    <>
                      {hasInstructorRole() ? (
                        <Link to="/instructor/dashboard" className="nav-link">
                          {t("Instructor Dashboard")}
                        </Link>
                      ) : !hasInstructorRole() ? (
                        <Link to="/become-instructor" className="nav-link">
                          {t("Become an Instructor")}
                        </Link>
                      ) : null}
                    </>
                  )}
                </li>
              </ul>
              <div className="nav-btn">
                <div className="d-lg-flex d-none">
                  <button
                    className="search-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#search"
                  >
                    <img src={searchIcon || "/placeholder.svg"} alt="Search" />
                  </button>

                  {isAuthenticated && (
                    <Link
                      className="chat-btn"
                      to="/chat"
                      title="Open Community Chat"
                      style={{ color: "#2563eb" }}
                    >
                      <i className="fas fa-comments"></i>
                    </Link>
                  )}

                  {/* <Link to="/cart" className="cart-btn">
                    <img src={cartIcon || "/placeholder.svg"} className="injectable" alt="Cart" />
                    <span>{cartCount}</span>
                  </Link> */}
                </div>

                {isAuthenticated ? (
                  <>
                    <Link to="/cart" className="cart-btn">
                      <img
                        src={cartIcon || "/placeholder.svg"}
                        className="injectable"
                        alt="Cart"
                      />
                      <span>{cartCount}</span>
                    </Link>
                    <div
                      className="dropdown"
                      onMouseEnter={showProfileDropdown}
                      onMouseLeave={hideProfileDropdown}
                    >
                      <button
                        className="dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded={isProfileDropdownOpen ? "true" : "false"}
                      >
                        <img
                          src={
                            profileData?.image
                              ? `https://api.basementex.com/${profileData.image}`
                              : "/square_logo.png"
                          }
                          alt="User"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/square_logo.png";
                          }}
                        />
                        <div className="nav-btn-conent">
                          <h6>
                            {userRole.charAt(0).toUpperCase() +
                              userRole.slice(1)}
                          </h6>
                          <h5>{userName}</h5>
                        </div>
                      </button>
                      <ul
                        className={`dropdown-menu profile-menu ${isProfileDropdownOpen ? "show" : ""
                          }`}
                        onMouseEnter={showProfileDropdown}
                        onMouseLeave={hideProfileDropdown}
                      >
                        <li>
                          <Link to="/student/setting" className="dropdown-item">
                            <i className="far fa-user me-2"></i>
                            {t("Profile")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/student/wishlist"
                            className="dropdown-item"
                          >
                            <i className="far fa-heart me-2"></i>
                            {t("Wishlist")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/student/enrolled-courses"
                            className="dropdown-item"
                          >
                            <i className="fa fa-book-reader me-2"></i>
                            {t("My Learning")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/student/orders" className="dropdown-item">
                            <i className="fa fa-history me-2"></i>
                            {t("Purchase history")}
                          </Link>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={handleLogout}
                            className="dropdown-item"
                          >
                            <i className="fa fa-sign-out me-2"></i>
                            {t("Logout")}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="login-btn">
                    <Link to="/login" className="thm-btn me-1">
                      {t("Login")}
                    </Link>
                    <Link to="/register" className="thm-btn outline-btn ms-1">
                      {t("Register")}
                    </Link>
                  </div>
                )}

                <div className="currency-bx lnguage-box">
                  {languages.length > 1 && (
                    <select
                      name="language"
                      className="form-select change-currency change-lang select_js"
                      value={i18n.language}
                      onChange={handleLanguageChange}
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
            <div className="d-lg-none d-flex align-items-center">
              <div className="d-flex align-items-center">
                <Link to="/cart" className="cart-btn me-2">
                  <img
                    src={cartIcon || "/placeholder.svg"}
                    className="injectable"
                    alt="Cart"
                  />
                  <span>{cartCount}</span>
                </Link>

                {isAuthenticated && (
                  <Link
                    className="chat-btn"
                    to="/chat"
                    title="Open Community Chat"
                    style={{ color: "#2563eb" }}
                  >
                    <i className="fas fa-comments"></i>
                  </Link>
                )}
              </div>

              {/* Mobile Profile Toggle */}
              <button
                className="mobile-profile-toggle"
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
              >
                {isAuthenticated ? (
                  <img
                    src={
                      profileData?.image
                        ? `https://api.basementex.com/${profileData.image}`
                        : "/square_logo.png"
                    }
                    alt="Profile"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/square_logo.png";
                    }}
                  />
                ) : (
                  <div className="mobile-menu-icon">
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-header">
            <button
              className="mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>

            {isAuthenticated ? (
              <div className="mobile-menu-profile">
                <div className="mobile-menu-avatar">
                  <img
                    src={
                      profileData?.image
                        ? `https://api.basementex.com/${profileData.image}`
                        : "/square_logo.png"
                    }
                    alt="Profile"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/square_logo.png";
                    }}
                  />
                </div>
                <div className="mobile-menu-user-info">
                  <h4 className="text-white">{userName}</h4>
                  <p className="text-white">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mobile-menu-profile">
                <div className="mobile-menu-avatar">
                  <img src="/square_logo.png" alt="Guest" />
                </div>
                <div className="mobile-menu-user-info">
                  <h4 className="text-white">{t("Guest User")}</h4>
                  <p className="text-white">
                    {t("Please login to access all features")}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mobile-menu-content">
            {/* Navigation Items */}
            <Link
              to="/home"
              className="mobile-menu-item"
              onClick={handleMobileMenuItemClick}
            >
              <i className="fas fa-home"></i>
              {t("Home")}
            </Link>

            {mobileMenuItems
              .filter((item) => item.show)
              .map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="mobile-menu-item"
                  onClick={handleMobileMenuItemClick}
                >
                  <i className={item.icon}></i>
                  {item.label}
                </Link>
              ))}

            {/* Categories */}
            {/* <div className="mobile-menu-item" style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <i className="fas fa-list"></i>
                {t("Categories")}
              </div>
              <div style={{ paddingLeft: "39px", width: "100%" }}>
                {categories.slice(0, 5).map((category) => (
                  <Link
                    key={category._id}
                    to={`/courses?category=${category._id}`}
                    className="d-block py-2 text-decoration-none"
                    style={{ color: "#666", fontSize: "14px" }}
                    onClick={handleMobileMenuItemClick}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div> */}

            {/* Language Selector */}
            <div className="mobile-menu-language">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                  color: "#333",
                }}
              >
                <i
                  className="fas fa-globe"
                  style={{ marginRight: "15px", width: "24px" }}
                ></i>
                {t("Language")}
              </label>
              <select value={i18n.language} onChange={handleLanguageChange}>
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Login/Register or Logout */}
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="mobile-menu-item"
                  onClick={handleMobileMenuItemClick}
                >
                  <i className="fas fa-sign-in-alt"></i>
                  {t("Login")}
                </Link>
                <Link
                  to="/register"
                  className="mobile-menu-item"
                  onClick={handleMobileMenuItemClick}
                >
                  <i className="fas fa-user-plus"></i>
                  {t("Register")}
                </Link>
              </>
            ) : (
              <a
                href="#"
                className="mobile-menu-item logout"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i>
                {t("Logout")}
              </a>
            )}
          </div>
        </div>

        <div
          className="modal fade search-screen"
          id="search"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-body">
                <form onSubmit={handleSearchSubmit}>
                  <div className="search-screen-innr">
                    <div className="search-screen-bar">
                      <span className="fal fa-search" />
                      <input
                        type="text"
                        className="form-control"
                        id="search-input"
                        placeholder={t("Search here.....")}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        autoComplete="off"
                      />
                      <button className="thm-btn" type="submit">
                        {isSearching ? t("Searching...") : t("Search")}
                      </button>
                    </div>
                    {searchQuery && (
                      <div
                        className={`search-bar-box ${!searchBoxOpen ? "d-none" : ""
                          }`}
                        id="search-bar"
                      >
                        {isSearching ? (
                          <div className="search-status">
                            <p>{t("Searching...")}</p>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <ul className="search-bar-box-list">
                            {searchResults.map((course) => (
                              <li key={course._id}>
                                <a
                                  onClick={() =>
                                    handleSearchResultClick(course?._id)
                                  }
                                >
                                  <div className="ct-icon">
                                    <img
                                      src={`https://api.basementex.com/${course?.thumbnail}`}
                                      className="w-100"
                                      alt={course.title}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/square_logo.png";
                                      }}
                                    />
                                  </div>
                                  <div className="ct-dtls">
                                    <h6>{course.title}</h6>
                                  </div>
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="search-status">
                            <p>{t("No courses found")}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
