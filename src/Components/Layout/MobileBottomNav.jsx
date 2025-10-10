// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
// import { useUser } from "../../Context/UserContext"
// import { useCart } from "../../Context/CartContext"
// import home from "../../assets/images/icon/home.svg"
// import search from "../../assets/images/icon/search.svg"
// import learning from "../../assets/images/icon/learning.svg"
// import menu from "../../assets/images/icon/menu.svg"
// import { useTranslation } from "react-i18next"
// const MobileBottomNav = () => {
//   const location = useLocation()
//   const { user, profileData } = useUser()
//   const { cart } = useCart()
//   const [isVisible, setIsVisible] = useState(false)
//   const { t } = useTranslation();
//   // Check if user is authenticated
//   const isAuthenticated = !!user?.Token
//   const cartCount = cart?.totalQuantity || 0

//   // Check screen size and show/hide bottom nav
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsVisible(window.innerWidth < 768) // Show on mobile screens
//     }

//     checkScreenSize()
//     window.addEventListener("resize", checkScreenSize)
//     return () => window.removeEventListener("resize", checkScreenSize)
//   }, [])

//   const [searchQuery, setSearchQuery] = useState("")
//   const [searchResults, setSearchResults] = useState([])
//   const [isSearching, setIsSearching] = useState(false)
//   const searchTimeoutRef = useRef(null)
//   const searchModalRef = useRef(null)
//   const navigate = useNavigate()

//   // Init Bootstrap Modal on mount
//   useEffect(() => {
//     const modalElement = document.getElementById("search")
//     if (modalElement && window.bootstrap) {
//       searchModalRef.current = new window.bootstrap.Modal(modalElement)
//       modalElement.addEventListener("hidden.bs.modal", () => {
//         setSearchQuery("")
//         setSearchResults([])
//       })
//     }
//   }, [])

//   // Don't render if not visible or on certain pages
//   if (!isVisible) return null

//   const handleSearchChange = (e) => {
//     const value = e.target.value
//     setSearchQuery(value)

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current)
//     }

//     if (value.trim()) {
//       setIsSearching(true)
//       searchTimeoutRef.current = setTimeout(() => {
//         fetchSearchResults(value)
//       }, 300)
//     } else {
//       setSearchResults([])
//       setIsSearching(false)
//     }
//   }

//   const handleSearchSubmit = (e) => {
//     e.preventDefault()
//     if (searchQuery.trim()) {
//       fetchSearchResults(searchQuery)
//     }
//   }

//   const fetchSearchResults = async (query) => {
//     try {
//       const response = await fetch(`https://api.basementex.com/search/?q=${encodeURIComponent(query)}`)
//       const data = await response.json()
//       if (data.status && data.data) {
//         setSearchResults(data.data)
//       } else {
//         setSearchResults([])
//       }
//     } catch (error) {
//       console.error("Search error:", error)
//       setSearchResults([])
//     } finally {
//       setIsSearching(false)
//     }
//   }

//   const handleSearchResultClick = (courseId) => {
//     if (searchModalRef.current) {
//       searchModalRef.current.hide()
//     }
//     navigate(`/course-details/${courseId}`)
//   }

//   const navItems = [
//     {
//       id: "home",
//       label: t("Home"),
//       icon: home,
//       path: "/home",
//       show: true,
//     },
//     {
//       id: "search",
//       label: t("Search"),
//       icon: search,
//       action: "search",
//       show: true,
//     },
//     {
//       id: "cart",
//       label: t("My Learning"),
//       icon: learning,
//       path: isAuthenticated ? "/student/enrolled-courses" : "/login",
//       show: true,
//       badge: cartCount,
//     },
//     {
//       id: "learning",
//       label: t("My Profile"),
//       icon: menu,
//       path: isAuthenticated ? "/student/setting" : "/login",
//       show: true,
//     },
//   ]

//   const handleSearchClick = () => {
//     if (searchModalRef.current) {
//       searchModalRef.current.show()
//     }
//   }

//   const isActive = (path) => {
//     if (path === "/home") {
//       return location.pathname === "/" || location.pathname === "/home"
//     }
//     return location.pathname === path
//   }

//   return (
//     <div className="mobile-bottom-nav">
//       <div className="bottom-nav-container">
//         {navItems
//           .filter((item) => item.show)
//           .map((item) => {
//             if (item.action === "search") {
//               return (
//                 <button key={item.id} className="nav-item-btn" onClick={handleSearchClick} aria-label={item.label}>
//                   <div className="nav-item-content">
//                     <img src={item.icon} alt="" />
//                     {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
//                   </div>
//                   <span className="nav-label">{item.label}</span>
//                 </button>
//               )
//             }

//             return (
//               <NavLink
//                 key={item.id}
//                 to={item.path}
//                 className={`nav-item-link ${isActive(item.path) ? "active" : ""}`}
//                 aria-label={item.label}
//               >
//                 <div className="nav-item-content">
//                   <img src={item.icon} alt="" />
//                   {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
//                 </div>
//                 <span className="nav-label">{item.label}</span>
//               </NavLink>
//             )
//           })}
//       </div>
//       <div
//         className="modal fade"
//         id="search"
//         tabIndex="-1"
//         aria-labelledby="searchLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-fullscreen">
//           <div className="modal-content" style={{ backgroundColor: "#fff", borderRadius: 0 }}>
//             <div className="modal-body p-3 position-relative">
//               {/* Close Button */}
//               <button
//                 type="button"
//                 className="btn-close position-absolute top-0 end-0 m-3"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>

//               {/* Search Input */}
//               <form onSubmit={handleSearchSubmit}>
//                 <div className="mb-3 position-relative">
//                   <input
//                     type="text"
//                     className="form-control form-control-lg rounded-pill ps-5"
//                     placeholder={t("Search Course")}
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     autoFocus
//                     style={{ backgroundColor: "#F5F7FA" }}
//                   />
//                   <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
//                     <i className="fas fa-search" />
//                   </span>
//                 </div>
//               </form>

//               {/* Results */}
//               {searchQuery && (
//                 <div>
//                   {isSearching ? (
//                     <p>{t("Searching...")}</p>
//                   ) : searchResults.length > 0 ? (
//                     searchResults.map((course) => (
//                       <div
//                         key={course._id}
//                         className="d-flex align-items-center mb-3"
//                         onClick={() => handleSearchResultClick(course._id)}
//                         style={{ cursor: "pointer" }}
//                       >
//                         <img
//                           src={`https://api.basementex.com/${course.thumbnail}`}
//                           alt={course.title}
//                           className="me-3"
//                           style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
//                           onError={(e) => (e.target.src = "/square_logo.png")}
//                         />
//                         <div>
//                           <p className="mb-1 fw-bold text-truncate" style={{ maxWidth: 200 }}>{course.title}</p>
//                           <small className="text-muted">{t("Instructor")}: {course.instructor || "Jonas Schmedtmann"}</small>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p>{t("No courses found")}</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .mobile-bottom-nav {
//           position: fixed;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           background: #0055D2;
//           border-top: 1px solid #e5e7eb;
//           box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
//           z-index: 1020;
//           padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
//         }

//         .bottom-nav-container {
//           display: flex;
//           justify-content: space-around;
//           align-items: center;
//           max-width: 100%;
//           margin: 0 auto;
//           padding: 0 10px;
//         }

//         .nav-item-link,
//         .nav-item-btn {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           text-decoration: none;
//           color: #6b7280;
//           transition: all 0.2s ease;
//           padding: 8px 12px;
//           border-radius: 12px;
//           min-width: 60px;
//           background: none;
//           border: none;
//           cursor: pointer;
//           font-family: inherit;
//         }

//         .nav-item-link:hover,
//         .nav-item-btn:hover,
//         .nav-item-link.active {
//           color: #2563eb;
//           background: rgba(37, 99, 235, 0.1);
//           text-decoration: none;
//         }

//         .nav-item-content {
//           position: relative;
//           margin-bottom: 4px;
//         }

//         .nav-item-content i {
//           font-size: 20px;
//           display: block;
//         }

//         .nav-label {
//           font-size: 11px;
//           font-weight: 500;
//           text-align: center;
//           line-height: 1;
//         }

//         .nav-badge {
//           position: absolute;
//           top: -6px;
//           right: -6px;
//           background: #ef4444;
//           color: white;
//           border-radius: 50%;
//           width: 18px;
//           height: 18px;
//           font-size: 10px;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           min-width: 18px;
//         }
//         .nav-label{
//         color:#fff;
//         }
//         /* Add padding to body to prevent content from being hidden behind bottom nav */
//         :global(body) {
//           padding-bottom: 80px;
//         }

//         @media (min-width: 768px) {
//           .mobile-bottom-nav {
//             display: none;
//           }

//           :global(body) {
//             padding-bottom: 0;
//           }
//         }

//         /* RTL Support */
//         :global([dir="rtl"]) .nav-badge {
//           right: auto;
//           left: -6px;
//         }

//         /* Dark mode support if needed */
//         // @media (prefers-color-scheme: dark) {
//         //   .mobile-bottom-nav {
//         //     background: #1f2937;
//         //     border-top-color: #374151;
//         //   }

//         //   .nav-item-link,
//         //   .nav-item-btn {
//         //     color: #9ca3af;
//         //   }

//         //   .nav-item-link:hover,
//         //   .nav-item-btn:hover,
//         //   .nav-item-link.active {
//         //     color: #60a5fa;
//         //     background: rgba(96, 165, 250, 0.1);
//         //   }
//         // }
// .nav-item-link,.nav-item-btn{
// position:relative;
// transition:1s;
// }
// .nav-item-link::after,.nav-item-btn::after{
//   content:"";
//   position:absolute;
//   background:#fff;
//   width:0%;
//   height:2px;
//   bottom:-7px;
//   border-radius:5px;
// }
//   .nav-item-link.active::after{
//     width:100%;
//   }
//       `}</style>
//     </div>
//   )
// }

// export default MobileBottomNav

"use client";

import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { useCart } from "../../Context/CartContext";
import home from "../../assets/images/icon/home.svg";
import search from "../../assets/images/icon/search.svg";
import learning from "../../assets/images/icon/learning.svg";
import menu from "../../assets/images/icon/menu.svg";
import { useTranslation } from "react-i18next";

const MobileBottomNav = () => {
  const location = useLocation();
  const { user, profileData } = useUser();
  const { cart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  const isAuthenticated = !!user?.Token;
  const cartCount = cart?.totalQuantity || 0;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);
  const navigate = useNavigate();

  if (!isVisible) return null;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchSearchResults(searchQuery);
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
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchResultClick = (courseId) => {
    const modal = document.getElementById("mobileSearch");
    if (modal) {
      const bsModal = window.bootstrap?.Modal?.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
    }
    navigate(`/course-details/${courseId}`);
  };

  const navItems = [
    {
      id: "home",
      label: t("Home"),
      icon: home,
      path: "/home",
      show: true,
    },
    {
      id: "search",
      label: t("Search"),
      icon: search,
      action: "search",
      show: true,
    },
    {
      id: "cart",
      label: t("My Learning"),
      icon: learning,
      path: isAuthenticated ? "/student/enrolled-courses" : "/login",
      show: true,
      badge: cartCount,
    },
    {
      id: "learning",
      label: t("My Profile"),
      icon: menu,
      path: isAuthenticated ? "/student/setting" : "/login",
      show: true,
    },
  ];

  const handleSearchClick = () => {
    const searchModal = document.getElementById("mobileSearch");
    if (searchModal && window.bootstrap) {
      const modal = new window.bootstrap.Modal(searchModal);
      modal.show();
    }
  };

  const isActive = (path) => {
    if (path === "/home") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname === path;
  };

  return (
    <>
      <div className="mobile-bottom-nav">
        <div className="bottom-nav-container">
          {navItems
            .filter((item) => item.show)
            .map((item) => {
              if (item.action === "search") {
                return (
                  <button
                    key={item.id}
                    className="nav-item-btn"
                    onClick={handleSearchClick}
                    aria-label={item.label}
                  >
                    <div className="nav-item-content">
                      <img src={item.icon || "/placeholder.svg"} alt="" />
                      {item.badge > 0 && (
                        <span className="nav-badge">{item.badge}</span>
                      )}
                    </div>
                    <span className="nav-label">{item.label}</span>
                  </button>
                );
              }

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={`nav-item-link ${
                    isActive(item.path) ? "active" : ""
                  }`}
                  aria-label={item.label}
                >
                  <div className="nav-item-content">
                    <img src={item.icon || "/placeholder.svg"} alt="" />
                    {item.badge > 0 && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </div>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              );
            })}
        </div>

        <style jsx>{`
          .mobile-bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #0055d2;
            border-top: 1px solid #e5e7eb;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
          }

          .bottom-nav-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            max-width: 100%;
            margin: 0 auto;
            padding: 0 10px;
          }

          .nav-item-link,
          .nav-item-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: #ffffff;
            transition: all 0.2s ease;
            padding: 8px 12px;
            border-radius: 12px;
            min-width: 60px;
            background: none;
            border: none;
            cursor: pointer;
            font-family: inherit;
            position: relative;
          }

          .nav-item-link:hover,
          .nav-item-btn:hover,
          .nav-item-link.active {
            color: #ffffff;
            text-decoration: none;
          }

          .nav-item-content {
            position: relative;
            margin-bottom: 4px;
          }

          .nav-item-content img {
            width: 20px;
            height: 20px;
            filter: brightness(0) invert(1);
          }

          .nav-label {
            font-size: 11px;
            font-weight: 500;
            text-align: center;
            line-height: 1;
            color: #fff;
          }

          .nav-badge {
            position: absolute;
            top: -6px;
            right: -6px;
            background: #ef4444;
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 10px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 18px;
          }

          .nav-item-link::after,
          .nav-item-btn::after {
            content: "";
            position: absolute;
            background: #fff;
            width: 0%;
            height: 2px;
            bottom: -7px;
            border-radius: 5px;
            transition: width 0.3s ease;
          }

          .nav-item-link.active::after {
            width: 100%;
          }

          :global(body) {
            padding-bottom: 80px;
          }

          @media (min-width: 768px) {
            .mobile-bottom-nav {
              display: none;
            }

            :global(body) {
              padding-bottom: 0;
            }
          }

          :global([dir="rtl"]) .nav-badge {
            right: auto;
            left: -6px;
          }
          .nav-item-link,
          .nav-item-btn {
            position: relative;
            transition: 1s;
          }
          .nav-item-link::after,
          .nav-item-btn::after {
            content: "";
            position: absolute;
            background: #fff;
            width: 0%;
            height: 2px;
            bottom: -7px;
            border-radius: 5px;
          }
          .nav-item-link.active::after {
            width: 100%;
          }
        `}</style>
      </div>

      {/* Search Modal */}
      <div
        className="modal fade"
        id="mobileSearch"
        tabIndex="-1"
        aria-labelledby="mobileSearchLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div
            className="modal-content"
            style={{ backgroundColor: "#fff", borderRadius: 0 }}
          >
            <div className="modal-body p-3 position-relative">
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-3"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <form onSubmit={handleSearchSubmit}>
                <div className="mb-3 position-relative mt-4">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-pill ps-5"
                    placeholder={t("Search Course")}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    autoFocus
                    style={{ backgroundColor: "#F5F7FA" }}
                  />
                  <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                    <i className="fas fa-search" />
                  </span>
                </div>
              </form>

              {searchQuery && (
                <div>
                  {isSearching ? (
                    <p>{t("Searching...")}</p>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((course) => (
                      <div
                        key={course._id}
                        className="d-flex align-items-center mb-3"
                        onClick={() => handleSearchResultClick(course._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={`https://api.basementex.com/${course.thumbnail}`}
                          alt={course.title}
                          className="me-3"
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                          onError={(e) => (e.target.src = "/square_logo.png")}
                        />
                        <div>
                          <p
                            className="mb-1 fw-bold text-truncate"
                            style={{ maxWidth: 200 }}
                          >
                            {course.title}
                          </p>
                          <small className="text-muted">
                            {t("Instructor")}:{" "}
                            {course.instructor || "Jonas Schmedtmann"}
                          </small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>{t("No courses found")}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileBottomNav;
