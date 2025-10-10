// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons';
// import logo from "../../assets/images/logowhite.png"
// import userImg from "../../assets/images/instructor-img-04.png"
// import { useTranslation } from 'react-i18next';

// const InstructorHeader = () => {
//     const { t } = useTranslation();

//     const [user, setUser] = useState({
//         name: "John Doe",
//         role: "Instructor",
//         image: userImg
//     });

//     return (
//         <header className="main-header">
//             <nav className="navbar navbar-expand-lg custom-navbar">
//                 <div className="container">
//                     <Link className="navbar-brand" to="/instructor/dashboard">
//                         <img src={logo || "/placeholder.svg"} alt={t('Teachera Logo')} />
//                     </Link>

//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label={t('Toggle navigation')}
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>

//                     <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
//                         <div className="nav-btn">
//                             <Link to="/student/dashboard">{t('Switch to Student')}</Link>

//                             <a href="#" className="bell-btn" aria-label={t('Notifications')}>
//                                 <FontAwesomeIcon icon={faBell} />
//                                 <span>1</span>
//                             </a>

//                             <div className="dropdown">
//                                 <button
//                                     className="dropdown-toggle"
//                                     type="button"
//                                     data-bs-toggle="dropdown"
//                                     aria-expanded="false"
//                                     aria-label={t('User menu')}
//                                 >
//                                     <img src={user.image || "/placeholder.svg"} alt={user.name} />
//                                     <div className="nav-btn-conent">
//                                         <h6>{t(user.role)}</h6>
//                                         <h5>{user.name}</h5>
//                                     </div>
//                                 </button>

//                                 <ul className="dropdown-menu profile-menu">
//                                     <li><Link className="dropdown-item" to="/instructor/setting">{t('Profile')}</Link></li>
//                                     <li><Link className="dropdown-item" to="/instructor/dashboard">{t('Instructor Dashboard')}</Link></li>
//                                     <li><Link className="dropdown-item" to="/student/dashboard">{t('Student Dashboard')}</Link></li>
//                                     <li><Link className="dropdown-item" to="/instructor/courses">{t('Course')}</Link></li>
//                                     <li>
//                                         <a
//                                             className="dropdown-item"
//                                             href="#"
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 // Implement logout functionality
//                                                 console.log(t("Logging out..."));
//                                             }}
//                                         >
//                                             {t('Logout')}
//                                         </a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// };

// export default InstructorHeader;

"use client";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logowhite.png";
import { useTranslation } from "react-i18next";
import { useUser } from "../../Context/UserContext";
import Swal from "sweetalert2";

const InstructorHeader = () => {
  const { t } = useTranslation();
  const { profileData, switchDashboard, logout } = useUser();
  const navigate = useNavigate();
  const handleSwitchToStudent = (e) => {
    e.preventDefault();
    switchDashboard("student");
  };
  const handleLogout = async (e) => {
    e.preventDefault();

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
      navigate("/");
    }
  };
  return (
    <header className="main-header">
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/instructor/dashboard">
            <img src={logo || "/placeholder.svg"} alt={t("Teachera Logo")} />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label={t("Toggle navigation")}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <div className="nav-btn">
              <a href="#" onClick={handleSwitchToStudent}>
                {t("Switch to Student")}
              </a>

              <a href="#" className="bell-btn" aria-label={t("Notifications")}>
                <FontAwesomeIcon icon={faBell} />
                <span>1</span>
              </a>

              <div className="dropdown">
                <button
                  className="dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label={t("User menu")}
                >
                  <img
                    src={
                      profileData?.image
                        ? `https://api.basementex.com/${profileData.image}`
                        : "/square_logo.png"
                    }
                    alt={profileData?.name || "User"}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop in case favicon.png also fails
                      e.target.src = "/square_logo.png";
                    }}
                  />
                  <div className="nav-btn-conent">
                    <h6 className="text-white">{t("Instructor")}</h6>
                    <h5 className="text-white">
                      {profileData?.name || "User"}
                    </h5>
                  </div>
                </button>

                <ul className="dropdown-menu profile-menu">
                  <li>
                    <Link className="dropdown-item" to="/instructor/setting">
                      {t("Profile")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/instructor/dashboard">
                      {t("Instructor Dashboard")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/student/dashboard">
                      {t("Student Dashboard")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/instructor/courses">
                      {t("Course")}
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleLogout}
                    >
                      {t("Logout")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default InstructorHeader;
