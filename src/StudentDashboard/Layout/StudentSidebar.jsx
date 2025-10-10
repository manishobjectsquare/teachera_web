import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import User from "../../assets/images/users-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useUser } from "../../Context/UserContext";
import Swal from "sweetalert2";

const StudentSidebar = () => {
  const location = useLocation();
  const { user, logout, profileData, authLoading } = useUser();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
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

  const { t } = useTranslation();

  return (
    <div className="aside-bar">
      <div className="user-profile">
        <img
          src={`https://api.basementex.com/${profileData?.image}`}
          alt={profileData?.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/square_logo.png";
          }}
        />
        <h4>{profileData?.name}</h4>
        <h6>{profileData?.email}</h6>
      </div>

      <ul className="aside-bar-menu">
        <li className={isActive("/student/dashboard") ? "active" : ""}>
          <Link to="/student/dashboard">
            <i className="far fa-user me-2"></i>
            {t("Dashboard")}
          </Link>
        </li>

        <li className={isActive("/student/setting") ? "active" : ""}>
          <Link to="/student/setting">
            <i className="far fa-user me-2"></i>
            {t("Profile")}
          </Link>
        </li>

        <li className={isActive("/student/wishlist") ? "active" : ""}>
          <Link to="/student/wishlist">
            <i className="far fa-heart me-2"></i>
            {t("Wishlist")}
          </Link>
        </li>

        <li className={isActive("/student/enrolled-courses") ? "active" : ""}>
          <Link to="/student/enrolled-courses">
            <i className="fa fa-book-reader me-2"></i>
            {/* <FontAwesomeIcon icon={faBookReader} className='me-2' /> */}
            {t("My Learning")}
          </Link>
        </li>

        <li className={isActive("/student/orders") ? "active" : ""}>
          <Link to="/student/orders">
            <i className="fa fa-history me-2"></i>
            {t("Purchase history")}
          </Link>
        </li>

        <li className={isActive("/student/quiz-attempts") ? "active" : ""}>
          <Link to="/student/quiz-attempts">
            <i className="fa fa-user me-2"></i>
            {t("My Quiz Attempts")}
          </Link>
        </li>

        <li className={isActive("/student/reviews") ? "active" : ""}>
          <Link to="/student/reviews">
            <i className="fa fa-user me-2"></i>
            {t("Reviews")}
          </Link>
        </li>

        <li>
          <a href="#" onClick={handleLogout}>
            <i className="fa fa-sign-out me-2"></i>
            {t("Logout")}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar;
