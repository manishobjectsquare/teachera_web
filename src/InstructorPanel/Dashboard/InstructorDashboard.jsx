// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faBook,
//     faHourglassHalf,
//     faShoppingCart,
//     faClock,
//     faWallet,
//     faMoneyCheckAlt
// } from '@fortawesome/free-solid-svg-icons';

// const InstructorDashboard = () => {
//     // Mock data for dashboard statistics
//     const dashboardStats = {
//         totalCourses: 24,
//         totalPendingCourses: 5,
//         totalOrders: 156,
//         totalPendingOrders: 12,
//         walletBalance: 2450.75,
//         totalWithdraw: 12750.50,
//         currency: 'USD'
//     };

//     // Helper function to format currency
//     const formatCurrency = (amount, currencyCode = 'USD') => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: currencyCode
//         }).format(amount);
//     };

//     // Dashboard card data
//     const dashboardCards = [
//         {
//             id: 1,
//             icon: faBook,
//             value: dashboardStats.totalCourses,
//             label: 'Total Courses',
//             format: value => value
//         },
//         {
//             id: 2,
//             icon: faHourglassHalf,
//             value: dashboardStats.totalPendingCourses,
//             label: 'Pending Courses',
//             format: value => value
//         },
//         {
//             id: 3,
//             icon: faShoppingCart,
//             value: dashboardStats.totalOrders,
//             label: 'Total Orders',
//             format: value => value
//         },
//         {
//             id: 4,
//             icon: faClock,
//             value: dashboardStats.totalPendingOrders,
//             label: 'Pending Orders',
//             format: value => value
//         },
//         {
//             id: 5,
//             icon: faWallet,
//             value: dashboardStats.walletBalance,
//             label: 'Current Balance',
//             format: value => formatCurrency(value, dashboardStats.currency)
//         },
//         {
//             id: 6,
//             icon: faMoneyCheckAlt,
//             value: dashboardStats.totalWithdraw,
//             label: 'Total Payout',
//             format: value => formatCurrency(value, dashboardStats.currency)
//         }
//     ];

//     return (
//         <div className="col-lg-9">
//             <h4 className="title">Dashboard</h4>
//             <div className="panel-cards">
//                 <div className="row g-4">
//                     {dashboardCards.map(card => (
//                         <div key={card.id} className="col-lg-4 col-md-6">
//                             <div className="dash-cards">
//                                 <span>
//                                     <FontAwesomeIcon icon={card.icon} />
//                                 </span>
//                                 <div>
//                                     <h5>{card.format(card.value)}</h5>
//                                     <p>{card.label}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default InstructorDashboard;

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faHourglassHalf,
  faShoppingCart,
  faClock,
  faWallet,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import loaderImg from "../../assets/images/loaderImg.png";
const InstructorDashboard = () => {
  const { t } = useTranslation();

  const userId = localStorage.getItem("userId");
  const [dashboardStats, setDashboardStats] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(
        `https://api.basementex.com/api/instructor/dashboard/${userId}`
      );
      const data = await response.json();
      setDashboardStats(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardStats();
  }, []);
  // Helper function to format currency - always using en-US locale for numbers
  const formatCurrency = (amount, currencyCode = "USD") => {
    // Always use en-US locale to keep Western Arabic numerals
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  // Dashboard card data
  const dashboardCards = [
    {
      id: 1,
      icon: faBook,
      value: dashboardStats?.total_courses || 0,
      label: "Total Courses",
      format: (value) => value,
    },
    {
      id: 2,
      icon: faHourglassHalf,
      value: dashboardStats?.pending_courses || 0,
      label: "Pending Courses",
      format: (value) => value,
    },
    {
      id: 3,
      icon: faShoppingCart,
      value: dashboardStats?.total_orders || 0,
      label: "Total Orders",
      format: (value) => value,
    },
    {
      id: 4,
      icon: faClock,
      value: dashboardStats?.pending_orders || 0,
      label: "Pending Orders",
      format: (value) => value,
    },
    {
      id: 5,
      icon: faWallet,
      value: dashboardStats?.current_balance || 0,
      label: "Current Balance",
      format: (value) => formatCurrency(value, dashboardStats.currency),
    },
    {
      id: 6,
      icon: faMoneyCheckAlt,
      value: dashboardStats?.total_payout || 0,
      label: "Total Payout",
      format: (value) => formatCurrency(value, dashboardStats.currency),
    },
  ];
  if (loading) {
    return (
      <div className="preloadrwrap">
        <div className="preloader-two player preloader-newwww">
          <div className="loader-icon-two player">
            <img src={loaderImg} alt={t("Preloader")} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="col-lg-9">
      <h4 className="title">{t("Dashboard")}</h4>
      <div className="panel-cards">
        <div className="row g-4">
          {dashboardCards.map((card) => (
            <div key={card.id} className="col-lg-4 col-md-6">
              <div className="dash-cards">
                <span>
                  <FontAwesomeIcon icon={card.icon} />
                </span>
                <div>
                  <h5>{card.format(card.value)}</h5>
                  <p>{t(card.label)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
