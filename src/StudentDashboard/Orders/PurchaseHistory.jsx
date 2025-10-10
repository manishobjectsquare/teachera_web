// import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';

// const PurchaseHistory = () => {
//   const { t } = useTranslation();
//   const [allOrders, setOrders] = useState([]);
//   const userID = localStorage.getItem('userId');
//   const getOrderHistory = async () => {
//     try {
//       const response = await fetch(`https://api.basementex.com/api/purchase/history/${userID}`);
//       const data = await response.json();
//       setOrders(data.data || []);
//     }
//     catch (error) {
//       console.error('Error fetching order history:', error);
//     }
//   }
//   useEffect(() => {
//     getOrderHistory();
//   }, []);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 10;

//   // Get current orders
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);

//   // Calculate total pages
//   const totalPages = Math.ceil(allOrders.length / ordersPerPage);

//   // Helper function to get badge color based on status
//   const getStatusBadgeColor = (status) => {
//     switch (status) {
//       case 'completed':
//       case 'paid':
//         return 'bg-success';
//       case 'processing':
//       case 'pending':
//         return 'bg-warning';
//       case 'declined':
//       case 'cancelled':
//         return 'bg-danger';
//       default:
//         return 'bg-warning';
//     }
//   };

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className=" mx-auto">
//       <h3 className="user-title">{t('Order History')}</h3>

//       <div className="card shadow-sm">
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered table-hover">
//               <thead className="table-light">
//                 <tr>
//                   <th>{t('#')}</th>
//                   <th>{t('Invoice')}</th>
//                   <th>{t('Paid')}</th>
//                   <th>{t('Gateway')}</th>
//                   <th>{t('Payment Status')}</th>
//                   <th>{t('Action')}</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentOrders.length > 0 ? (
//                   currentOrders.map((order, index) => (
//                     <tr key={order?._id}>
//                       <td>{indexOfFirstOrder + index + 1}</td>
//                       <td>{order?.invoice}</td>
//                       <td>{order?.paid}</td>
//                       <td>{t(order?.payment_Gateway)}</td>
//                       {/* <td>
//                         <span className={`badge ${getStatusBadgeColor(order.status)} text-uppercase`}>
//                           {t(order.status)}
//                         </span>
//                       </td> */}
//                       <td>
//                         <span className={`badge ${getStatusBadgeColor(order?.payment_Status)} text-uppercase`}>
//                           {t(order?.payment_Status)}
//                         </span>
//                       </td>
//                       <td>
//                         <a
//                           href={`/student/order/print-invoice/${order?._id}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="btn btn-outline-primary btn-sm"
//                         >
//                           {t('Invoice')}
//                         </a>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center">{t('No orders found!')}</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {totalPages > 1 && (
//             <div className="mt-3">
//               <nav>
//                 <ul className="pagination justify-content-center">
//                   <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                     <button
//                       className="page-link"
//                       onClick={() => paginate(currentPage - 1)}
//                       disabled={currentPage === 1}
//                     >
//                       {t('Previous')}
//                     </button>
//                   </li>

//                   {[...Array(totalPages).keys()].map(number => (
//                     <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
//                       <button
//                         onClick={() => paginate(number + 1)}
//                         className="page-link"
//                       >
//                         {number + 1}
//                       </button>
//                     </li>
//                   ))}

//                   <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                     <button
//                       className="page-link"
//                       onClick={() => paginate(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                     >
//                       {t('Next')}
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PurchaseHistory;

"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PurchaseHistory = () => {
  const { t } = useTranslation();
  const [allOrders, setOrders] = useState([]);
  const userID = localStorage.getItem("userId");

  const getOrderHistory = async () => {
    try {
      const response = await fetch(
        `https://api.basementex.com/api/purchase/history/${userID}`
      );
      const data = await response.json();
      setOrders(data.data || []);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    getOrderHistory();
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(allOrders.length / ordersPerPage);

  // Helper function to get badge color based on status
  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "paid":
        return "bg-success";
      case "processing":
      case "pending":
        return "bg-warning";
      case "declined":
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-warning";
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mx-auto">
      <h3 className="user-title">{t("Order History")}</h3>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>{t("#")}</th>
                  <th>{t("Invoice")}</th>
                  <th>{t("Course")}</th>
                  <th>{t("Paid")}</th>
                  <th>{t("Gateway")}</th>
                  <th>{t("Payment Status")}</th>
                  <th>{t("Action")}</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order, index) => (
                    <tr key={order?.purchaseId}>
                      <td>{indexOfFirstOrder + index + 1}</td>
                      <td>{order?.invoice}</td>
                      <td>{order?.courseTitle || "Course Title"}</td>
                      <td>${order?.paid}</td>
                      <td>{t(order?.payment_Gateway)}</td>
                      <td>
                        <span
                          className={`badge ${getStatusBadgeColor(
                            order?.payment_Status
                          )} text-uppercase`}
                        >
                          {t(order?.payment_Status)}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <Link
                            to={`/student/order/invoice/${order?.purchaseId}`}
                            className="btn btn-outline-primary btn-sm"
                          >
                            {t("View")}
                          </Link>
                          <a
                            href={`/student/order/print-invoice/${order?.purchaseId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-success btn-sm"
                          >
                            {t("Print")}
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      {t("No orders found!")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-3">
              <nav>
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      {t("Previous")}
                    </button>
                  </li>

                  {[...Array(totalPages).keys()].map((number) => (
                    <li
                      key={number + 1}
                      className={`page-item ${
                        currentPage === number + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginate(number + 1)}
                        className="page-link"
                      >
                        {number + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      {t("Next")}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
