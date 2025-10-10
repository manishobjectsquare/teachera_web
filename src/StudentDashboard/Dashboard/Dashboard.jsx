import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { t } = useTranslation();


  const userID = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [loading, setLoading] = useState(false)

  const getDashboardStats = async () => {
    try {
      const response = await fetch(
        `https://api.basementex.com/api/student/dashboard/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setDashboardStats(data.data || {});
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const getOrderHistory = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.basementex.com/api/purchase/history/${userID}`
      );
      const data = await response.json();
      setOrders(data.data || []);
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    getOrderHistory();
    getDashboardStats();
  }, []);
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "completed":
      case "paid":
        return "success";
      case "processing":
      case "pending":
        return "warning";
      case "declined":
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="mx-auto">
      {dashboardStats?.instructorStatus === "pending" && (
        <div className="alert alert-primary d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>
            {t(
              "We received your request to become an instructor. Please wait for admin approval!"
            )}
          </div>
        </div>
      )}

      {dashboardStats?.instructorStatus === "rejected" && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>
            {t(
              "Your request to become an instructor has been rejected. Please resubmit your request with valid information."
            )}{" "}
            <Link to="/become-instructor" className="text-decoration-underline">
              {t("here")}
            </Link>
          </div>
        </div>
      )}

      {dashboardStats?.instructorStatus === "approved" && (
        <div className="alert alert-success d-flex align-items-center" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          <div>
            {t("Your instructor profile has been approved. You can now access all instructor features.")}
          </div>
        </div>
      )}


      <div className="dashboard__content-wrap dashboard__content-wrap-two mb-4">
        <div className="dashboard__content-title mb-3">
          <h4 className="title">{t("Dashboard")}</h4>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="card text-center p-3 shadow-sm">
              <i className="bi bi-mortarboard display-6 text-primary"></i>
              <div className="mt-2">
                <h5 className="fw-bold">{dashboardStats?.enrolled_courses}</h5>
                <p className="text-muted mb-0">{t("Enrolled Courses")}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center p-3 shadow-sm">
              <i className="bi bi-pencil-square display-6 text-success"></i>
              <div className="mt-2">
                <h5 className="fw-bold">{dashboardStats?.quiz_attempts}</h5>
                <p className="text-muted mb-0">{t("Quiz Attempts")}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center p-3 shadow-sm">
              <i className="bi bi-star-fill display-6 text-warning"></i>
              <div className="mt-2">
                <h5 className="fw-bold">{dashboardStats?.total_reviews}</h5>
                <p className="text-muted mb-0">{t("Your Total Reviews")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard__content-wrap">
        <div className="dashboard__content-title mb-3">
          <h4 className="title">{t("Order History")}</h4>
        </div>
        {loading ?
          (

            <>
              <div className="col-12 text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden"></span>
                </div>
              </div>
            </>
          ) : (


            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>{t("#")}</th>
                      <th>{t("Invoice")}</th>
                      <th>{t("Paid")}</th>
                      <th>{t("Gateway")}</th>
                      {/* <th>{t('Status')}</th> */}
                      <th>{t("Payment Status")}</th>
                      <th>{t("Actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.slice(0, 8).map((order, index) => (
                        <tr key={order._id}>
                          <td>{index + 1}</td>
                          <td>#{order.invoice}</td>
                          <td>
                            {order.paid} {order.payable_currency}
                          </td>
                          <td>{order.payment_Gateway}</td>
                          <td>
                            <span
                              className={`badge bg-${getStatusBadgeColor(order.payment_Status)}`}
                            >
                              {order.payment_Status.charAt(0).toUpperCase() +
                                order.payment_Status.slice(1)}
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/student/order/invoice/${order?.purchaseId}`}
                              className="btn btn-sm btn-primary"
                            >
                              <i className="fa fa-eye"></i>
                            </Link>
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
            </>
          )
        }
      </div>
    </div>
  );
};

export default Dashboard;
