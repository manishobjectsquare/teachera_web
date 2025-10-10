import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faShoppingCart,
  faHandHoldingUsd,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const Payout = () => {
  // State for earnings data
  const [earnings, setEarnings] = useState({
    currentBalance: 0,
    coursesSold: 0,
    totalPayout: 0,
  });

  // State for withdrawal requests
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format currency helper function
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format date helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get badge class based on status
  const getBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-success";
      case "rejected":
        return "bg-danger";
      case "Pending":
        return "bg-warning";
      default:
        return "";
    }
  };

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    setLoading(true);
    const mockEarnings = {
      currentBalance: 2450.75,
      coursesSold: 87,
      totalPayout: 12750.5,
    };

    const fetchWithdrawRequests = async () => {
      try {
        const response = await fetch(
          `https://api.basementex.com/api/instructor/request_payout/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setWithdrawRequests(data.data.data || []);
      } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawRequests();
    setEarnings(mockEarnings);
  }, []);

  // // Handle delete withdrawal request
  // const handleDeleteRequest = (id) => {
  //     if (window.confirm('Are you sure you want to delete this withdrawal request?')) {
  //         setWithdrawRequests(withdrawRequests.filter(request => request.id !== id));
  //     }
  // };

  return (
    <div className="col-lg-9">
      {/* Earnings Section */}
      <div className="panel-cards">
        <h4 className="title">Earnings</h4>

        <div className="row text-center">
          <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
            <div className="dash-cards">
              <span>
                <FontAwesomeIcon icon={faWallet} />
              </span>
              <div>
                <h5>{formatCurrency(earnings.currentBalance)}</h5>
                <p className="mb-0">Current Balance</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
            <div className="dash-cards">
              <span>
                <FontAwesomeIcon icon={faShoppingCart} />
              </span>
              <div>
                <h5>{earnings.coursesSold}</h5>
                <p className="mb-0">Courses Sold</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
            <div className="dash-cards">
              <span>
                <FontAwesomeIcon icon={faHandHoldingUsd} />
              </span>
              <div>
                <h5>{formatCurrency(earnings.totalPayout)}</h5>
                <p className="mb-0">Total Payout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payout History Section */}
      <div className="panel-cards mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="title">Payout History</h4>
          <Link to="/instructor/payout/create" className="thm-btn">
            Request Payout
          </Link>
        </div>

        {loading ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>No</th>
                  <th>Withdraw Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {console.log("ffff", withdrawRequests)}
                {withdrawRequests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Data
                    </td>
                  </tr>
                ) : (
                  withdrawRequests.map((request, index) => (
                    <tr key={request.id}>
                      <td>{index + 1}</td>
                      <td>{formatCurrency(request.withdraw_amount)}</td>
                      <td>{request?.payment_method}</td>
                      <td>
                        <span
                          className={`badges ${getBadgeClass(request?.status)}`}
                        >
                          {request?.status}
                        </span>
                      </td>
                      <td>{formatDate(request.createdAt)}</td>
                      <td>
                        {request.status === "Pending" && (
                          <button
                            className="btn  text-danger p-0"
                          // onClick={() => handleDeleteRequest(request.id)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payout;
