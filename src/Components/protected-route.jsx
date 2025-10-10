// "use client"

// import { Navigate, useLocation } from "react-router-dom"
// import { useUser } from "../Context/UserContext"

// const ProtectedRoute = ({ children, requireInstructor = false }) => {
//     const { user, profileData, authLoading, activeDashboard } = useUser()
//     const location = useLocation()
//     console.log("ProtectedRoute", {
//         token: user?.Token,
//         profileRole: profileData?.role,
//         loading: authLoading,
//     })

//     // If still loading auth state, show loading
//     if (authLoading) {
//         return (
//             <div className="text-center py-5">
//                 <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//                 <p className="mt-2">Verifying access...</p>
//             </div>
//         )
//     }

//     // If not logged in, redirect to login
//     if (!user.Token) {
//         return <Navigate to="/login" state={{ from: location }} replace />
//     }

//     // If route requires instructor role but user doesn't have it
//     if (requireInstructor && profileData?.role !== "instructor") {
//         return <Navigate to="/student/dashboard" replace />
//     }

//     // If user is in instructor dashboard but trying to access student routes
//     if (!requireInstructor && activeDashboard === "instructor") {
//         return <Navigate to="/instructor/dashboard" replace />
//     }

//     // If user is in student dashboard but trying to access instructor routes
//     if (requireInstructor && activeDashboard === "student") {
//         return <Navigate to="/student/dashboard" replace />
//     }

//     return children
// }

// export default ProtectedRoute

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import toastify from "../config/toastify";

const ProtectedRoute = ({ children, requireInstructor = false }) => {
  const { user, profileData, authLoading, logoutByToken } = useUser();
  const location = useLocation();

  const navigate = useNavigate();
  const { userTokenCheck, setUserTokenCheck } = useLocation();

  // console.log("ProtectedRoute", {
  //     token: user?.Token,
  //     profileRole: profileData?.role,
  //     loading: authLoading,
  // })

  // Show loading while checking auth
  let tokenCheck = async () => {
    try {
      //   let response = await axios(`http://localhost:8201/token`, {
      let response = await axios(`https://api.basementex.com/token`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      });
      if (!response?.data.status) {
        toastify.error("Please login your session expired");
        logoutByToken();
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    tokenCheck();
  }, []);
  if (authLoading || !profileData) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Verifying access...</p>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user?.Token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route requires instructor but the user isn't one
  if (requireInstructor && profileData?.role !== "instructor") {
    return <Navigate to="/student/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
