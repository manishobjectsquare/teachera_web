import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBook,
  faQuestionCircle,
  faMoneyBill,
  faBullhorn,
  faShoppingCart,
  faUserCog,
  faSignOutAlt,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useUser } from "../../Context/UserContext";
import Swal from "sweetalert2";

const InstructorSidebar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { profileData, logout, authLoading } = useUser();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
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

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  // If still loading, show a skeleton
  if (authLoading) {
    return (
      <div className="aside-bar">
        <div className="user-profile">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
        </div>
        <ul className="aside-bar-menu">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <li key={item}>
              <div className="skeleton-link"></div>
            </li>
          ))}
        </ul>
        <ul className="aside-bar-menu">
          {[1, 2].map((item) => (
            <li key={item}>
              <div className="skeleton-link"></div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="aside-bar">
      <div className="user-profile">
        <img
          src={
            profileData?.image
              ? `https://api.basementex.com/${profileData.image}`
              : "/square_logo.png"
          }
          alt={profileData?.name || t("User")}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/square_logo.png";
          }}
        />
        <h4>{profileData?.name || t("User")}</h4>
        <h6>{profileData?.email || ""}</h6>
      </div>

      <ul className="aside-bar-menu">
        <li className={isActive("/instructor/dashboard") ? "active" : ""}>
          <Link to="/instructor/dashboard">
            <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
            {t("Dashboard")}
          </Link>
        </li>
        <li className={isActive("/instructor/courses") ? "active" : ""}>
          <Link to="/instructor/courses">
            <FontAwesomeIcon icon={faBook} className="me-2" />
            {t("Courses")}
          </Link>
        </li>
        <li
          className={isActive("/instructor/lesson-questions") ? "active" : ""}
        >
          <Link to="/instructor/lesson-questions">
            <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
            {t("Lesson Questions")}
          </Link>
        </li>
        <li className={isActive("/instructor/payout") ? "active" : ""}>
          <Link to="/instructor/payout">
            <FontAwesomeIcon icon={faMoneyBill} className="me-2" />
            {t("Request Payout")}
          </Link>
        </li>
        <li className={isActive("/instructor/announcements") ? "active" : ""}>
          <Link to="/instructor/announcements">
            <FontAwesomeIcon icon={faBullhorn} className="me-2" />
            {t("Announcement")}
          </Link>
        </li>
        <li className={isActive("/instructor/my-sells") ? "active" : ""}>
          <Link to="/instructor/my-sells">
            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
            {t("My Sales")}
          </Link>
        </li>
      </ul>

      <ul className="aside-bar-menu">
        {/* <li>
               <a href="#" onClick={handleSwitchToStudent}>
                  <FontAwesomeIcon icon={faUserGraduate} className="me-2" />
                  {t("Switch to Student")}
               </a>
            </li> */}
        <li className={isActive("/instructor/setting") ? "active" : ""}>
          <Link to="/instructor/setting">
            <FontAwesomeIcon icon={faUserCog} className="me-2" />
            {t("Profile Settings")}
          </Link>
        </li>
        <li>
          <a href="#" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
            {t("Logout")}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default InstructorSidebar;
