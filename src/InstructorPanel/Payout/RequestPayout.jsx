// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDollarSign, faBookReader, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
// import { ExclamationTriangleFill } from 'react-bootstrap-icons';

// const PayoutRequest = () => {
//     // State for earnings data
//     const [earnings, setEarnings] = useState({
//         currentBalance: 0,
//         coursesSold: 0,
//         totalPayout: 0
//     });

//     // State for payout information
//     const [payoutInfo, setPayoutInfo] = useState({
//         gateway: {
//             payout_account: '',
//             payout_information: ''
//         },
//         withdrawMethod: {
//             min_amount: 0,
//             max_amount: 0
//         }
//     });

//     // State for form data
//     const [amount, setAmount] = useState('');
//     const [loading, setLoading] = useState(true);

//     // Format currency helper function
//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD'
//         }).format(amount);
//     };

//     // Fetch earnings and payout information data
//     useEffect(() => {
//         setLoading(true);

//         // In a real app, you would fetch data from an API
//         // For now, we'll use mock data

//         // Mock earnings data
//         const mockEarnings = {
//             currentBalance: 2450.75,
//             coursesSold: 87,
//             totalPayout: 12750.50
//         };

//         // Mock payout information
//         const mockPayoutInfo = {
//             gateway: {
//                 payout_account: 'PayPal',
//                 payout_information: 'Payments are processed within 3-5 business days.\nMinimum withdrawal amount is $50.\nFees may apply based on your region.'
//             },
//             withdrawMethod: {
//                 min_amount: 50,
//                 max_amount: 5000
//             }
//         };

//         setEarnings(mockEarnings);
//         setPayoutInfo(mockPayoutInfo);
//         setLoading(false);
//     }, []);

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // In a real app, you would make an API call to submit the payout request
//         console.log('Payout request submitted:', { amount });

//         // Validation example
//         const amountValue = parseFloat(amount);
//         if (isNaN(amountValue)) {
//             alert('Please enter a valid amount');
//             return;
//         }

//         if (amountValue < payoutInfo.withdrawMethod.min_amount) {
//             alert(`Minimum withdrawal amount is ${formatCurrency(payoutInfo.withdrawMethod.min_amount)}`);
//             return;
//         }

//         if (amountValue > payoutInfo.withdrawMethod.max_amount) {
//             alert(`Maximum withdrawal amount is ${formatCurrency(payoutInfo.withdrawMethod.max_amount)}`);
//             return;
//         }

//         if (amountValue > earnings.currentBalance) {
//             alert('Withdrawal amount cannot exceed your current balance');
//             return;
//         }

//         // Success message (in a real app, you would handle this differently)
//         alert('Your payout request has been submitted successfully!');
//         setAmount('');
//     };

//     return (
//         <div className="col-lg-9">
//             {/* Earnings Section */}
//             <div className="card p-4 mb-3">
//                 <h4 className="title">Earnings</h4>
//                 <div className="alert alert-primary d-flex align-items-center" role="alert">
//                     <ExclamationTriangleFill className="me-2" />
//                     <div>
//                         You can change your payment method information from your profile settings.
//                     </div>
//                 </div>

//                 <div className="row text-center">
//                     <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
//                         <div className="dash-cards">
//                             <span><FontAwesomeIcon icon={faDollarSign} /></span>
//                             <div>
//                                 <h5 className="fw-bold">{formatCurrency(earnings.currentBalance)}</h5>
//                                 <p className="text-muted">Current Balance</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
//                         <div className="dash-cards">
//                             <span><FontAwesomeIcon icon={faBookReader} /></span>
//                             <div>
//                                 <h5 className="fw-bold">{earnings.coursesSold}</h5>
//                                 <p className="text-muted">Courses Sold</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
//                         <div className="dash-cards">
//                             <span><FontAwesomeIcon icon={faMoneyBillWave} /></span>
//                             <div>
//                                 <h5 className="fw-bold">{formatCurrency(earnings.totalPayout)}</h5>
//                                 <p className="text-muted">Total Payout</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Create a Request Section */}
//             <div className="card p-4">
//                 <h4 className="title">Create a Request</h4>
//                 {loading ? (
//                     <p className="text-center">Loading payout information...</p>
//                 ) : (
//                     <form onSubmit={handleSubmit}>
//                         <table className="table table-bordered">
//                             <tbody>
//                                 <tr>
//                                     <td>Default Gateway</td>
//                                     <td>{payoutInfo.gateway.payout_account}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Minimum Payout</td>
//                                     <td>{formatCurrency(payoutInfo.withdrawMethod.min_amount)}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Maximum Payout</td>
//                                     <td>{formatCurrency(payoutInfo.withdrawMethod.max_amount)}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Gateway Information</td>
//                                     <td>
//                                         {payoutInfo.gateway.payout_information.split('\n').map((line, index) => (
//                                             <React.Fragment key={index}>
//                                                 {line}
//                                                 <br />
//                                             </React.Fragment>
//                                         ))}
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                         <div className="custom-frm-bx">
//                             <label htmlFor="amount" className="form-label">Withdraw Amount</label>
//                             <input
//                                 id="amount"
//                                 name="amount"
//                                 type="text"
//                                 className="form-control"
//                                 value={amount}
//                                 onChange={(e) => setAmount(e.target.value)}
//                             />
//                         </div>
//                         <button type="submit" className="thm-btn">Request Payout</button>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PayoutRequest;

"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faBookReader,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { ExclamationTriangleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const PayoutRequest = () => {
  // State for earnings data
  const [earnings, setEarnings] = useState({
    currentBalance: 0,
    coursesSold: 0,
    totalPayout: 0,
  });

  // State for payout information
  const [payoutInfo, setPayoutInfo] = useState({
    gateway: {
      payout_account: "",
      payout_information: "",
    },
    withdrawMethod: {
      min_amount: 0,
      max_amount: 0,
    },
  });

  // State for form data
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Format currency helper function
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Fetch earnings and payout information data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // You can replace these with real API calls
      // For now, using mock data for earnings and payout info

      // Mock earnings data - replace with real API call
      const mockEarnings = {
        currentBalance: 2450.75,
        coursesSold: 87,
        totalPayout: 12750.5,
      };

      // Mock payout information - replace with real API call
      const mockPayoutInfo = {
        gateway: {
          payout_account: "PayPal",
          payout_information:
            "Payments are processed within 3-5 business days.\nMinimum withdrawal amount is $50.\nFees may apply based on your region.\nEnsure your PayPal account is verified.",
        },
        withdrawMethod: {
          min_amount: 50,
          max_amount: 5000,
        },
      };

      setEarnings(mockEarnings);
      setPayoutInfo(mockPayoutInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load payout information");
    } finally {
      setLoading(false);
    }
  };

  // Validation function
  const validateAmount = (amountValue) => {
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return false;
    }

    if (amountValue < payoutInfo.withdrawMethod.min_amount) {
      toast.error(
        `Minimum withdrawal amount is ${formatCurrency(
          payoutInfo.withdrawMethod.min_amount
        )}`
      );
      return false;
    }

    if (amountValue > payoutInfo.withdrawMethod.max_amount) {
      toast.error(
        `Maximum withdrawal amount is ${formatCurrency(
          payoutInfo.withdrawMethod.max_amount
        )}`
      );
      return false;
    }

    if (amountValue > earnings.currentBalance) {
      toast.error("Withdrawal amount cannot exceed your current balance");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID not found. Please login again.");
      return;
    }

    const amountValue = Number.parseFloat(amount);

    if (!validateAmount(amountValue)) {
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        "https://api.basementex.com/api/instructor/request_payout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            instructor_Id: userId,
            withdraw_amount: amountValue,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Your payout request has been submitted successfully!");
        setAmount("");

        // Optionally navigate to payout history page
        setTimeout(() => {
          navigate("/instructor/payout");
        }, 2000);
      } else {
        // Handle API error response
        toast.error(data.message || "Failed to submit payout request");
      }
    } catch (error) {
      console.error("Error submitting payout request:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle amount input change with validation
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <>
      <div className="col-lg-9">
        <ToastContainer />
        {/* Earnings Section */}
        <div className="card p-4 mb-3">
          <h4 className="title">Earnings</h4>
          <div
            className="alert alert-primary d-flex align-items-center"
            role="alert"
          >
            <ExclamationTriangleFill className="me-2" />
            <div>
              You can change your payment method information from your profile
              settings.
            </div>
          </div>

          <div className="row text-center">
            <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
              <div className="dash-cards">
                <span>
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>
                <div>
                  <h5 className="fw-bold">
                    {formatCurrency(earnings.currentBalance)}
                  </h5>
                  <p className="text-muted">Current Balance</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
              <div className="dash-cards">
                <span>
                  <FontAwesomeIcon icon={faBookReader} />
                </span>
                <div>
                  <h5 className="fw-bold">{earnings.coursesSold}</h5>
                  <p className="text-muted">Courses Sold</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-3">
              <div className="dash-cards">
                <span>
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                </span>
                <div>
                  <h5 className="fw-bold">
                    {formatCurrency(earnings.totalPayout)}
                  </h5>
                  <p className="text-muted">Total Payout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create a Request Section */}
        <div className="card p-4">
          <h4 className="title">Create a Request</h4>
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading payout information...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="table-responsive mb-4">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="fw-bold">Default Gateway</td>
                      <td>
                        <span className="badge bg-primary">
                          {payoutInfo.gateway.payout_account}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Minimum Payout</td>
                      <td className="text-success fw-bold">
                        {formatCurrency(payoutInfo.withdrawMethod.min_amount)}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Maximum Payout</td>
                      <td className="text-danger fw-bold">
                        {formatCurrency(payoutInfo.withdrawMethod.max_amount)}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Available Balance</td>
                      <td className="text-primary fw-bold">
                        {formatCurrency(earnings.currentBalance)}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Gateway Information</td>
                      <td>
                        {payoutInfo.gateway.payout_information
                          .split("\n")
                          .map((line, index) => (
                            <div key={index} className="mb-1">
                              <small className="text-muted">• {line}</small>
                            </div>
                          ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="custom-frm-bx mb-4">
                    <label htmlFor="amount" className="form-label fw-bold">
                      Withdraw Amount <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        id="amount"
                        name="amount"
                        type="text"
                        className="form-control"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Enter amount"
                        required
                        disabled={submitting}
                      />
                    </div>
                    <small className="text-muted">
                      Available: {formatCurrency(earnings.currentBalance)} |
                      Min:{" "}
                      {formatCurrency(payoutInfo.withdrawMethod.min_amount)} |
                      Max:{" "}
                      {formatCurrency(payoutInfo.withdrawMethod.max_amount)}
                    </small>
                  </div>
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="mb-4">
                <label className="form-label fw-bold">Quick Select:</label>
                <div className="d-flex gap-2 flex-wrap">
                  {[50, 100, 250, 500, 1000].map((quickAmount) => (
                    <button
                      key={quickAmount}
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      disabled={
                        quickAmount > earnings.currentBalance || submitting
                      }
                    >
                      ${quickAmount}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={() =>
                      setAmount(earnings.currentBalance.toString())
                    }
                    disabled={submitting}
                  >
                    Max ({formatCurrency(earnings.currentBalance)})
                  </button>
                </div>
              </div>

              <div className="d-flex gap-3">
                <button
                  type="submit"
                  className="thm-btn"
                  disabled={submitting || !amount}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-paper-plane me-1"></i>
                      Request Payout
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/instructor/payout")}
                  disabled={submitting}
                >
                  <i className="fa fa-list me-1"></i>
                  View History
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PayoutRequest;
