// import React from 'react';

// const OrderInvoice = () => {
//     // Mock data for order
//     const order = {
//         id: 1,
//         invoice_id: 'INV-2023-001',
//         created_at: '2023-05-15T10:30:00Z',
//         payment_method: 'Credit Card',
//         payment_status: 'Paid',
//         conversion_rate: 1,
//         payable_currency: 'USD',
//         coupon_discount_amount: 10,
//         gateway_charge: 2.5,
//         user: {
//             name: 'John Doe',
//             phone: '+1234567890',
//             email: 'john.doe@example.com',
//             address: '123 Main St, Anytown, USA'
//         },
//         orderItems: [
//             {
//                 id: 101,
//                 price: 49.99,
//                 course: {
//                     title: 'Web Development Fundamentals',
//                     instructor: {
//                         name: 'Sarah Johnson',
//                         email: 'sarah.johnson@example.com'
//                     }
//                 }
//             },
//             {
//                 id: 102,
//                 price: 39.99,
//                 course: {
//                     title: 'JavaScript Masterclass',
//                     instructor: {
//                         name: 'Michael Chen',
//                         email: 'michael.chen@example.com'
//                     }
//                 }
//             }
//         ]
//     };

//     // Format date helper function

//     // Calculate order totals
//     const subTotal = order.orderItems.reduce((sum, item) => sum + item.price, 0);
//     const discount = order.coupon_discount_amount || 0;
//     const gatewayCharge = order.gateway_charge || 0;
//     const gatewayPercentage = gatewayCharge > 0 ? (gatewayCharge / (subTotal - discount)) * 100 : 0;
//     const total = (subTotal - discount + gatewayCharge) * order.conversion_rate;

//     return (
//         <div className="col-lg-9 mx-auto">
//             <div className="dashboard__content-wrap">
//                 <div className="dashboard__content-title">
//                     <h4 className="title">Order History</h4>
//                 </div>
//                 <div className="card shadow-sm">
//                     <div className="card-body">
//                         <div className="invoice">
//                             <div className="invoice-print">
//                                 <div className="row">
//                                     <div className="col-lg-12">
//                                         <div className="row g-3">
//                                             <div className="col-md-4">
//                                                 <div className="invoice-title">
//                                                     <h2 className="h5 fw-bold">Invoice</h2>
//                                                     <p className="invoice-number mb-1">Order #{order.invoice_id}</p>
//                                                     <p><strong>Order Date:</strong>29 April 2025</p>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <p>
//                                                     <strong>Billed To:</strong><br />
//                                                     {order.user.name}<br />
//                                                     <strong>Phone:</strong> {order.user.phone}<br />
//                                                     <strong>Email:</strong> {order.user.email}<br />
//                                                     <strong>Address:</strong> {order.user.address}
//                                                 </p>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <p><strong>Payment Method:</strong> {order.payment_method}</p>
//                                                 <p><strong>Payment Status:</strong> {order.payment_status}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="row mt-4">
//                                     <div className="col-md-12">
//                                         <h5 className="section-title">Order Summary</h5>
//                                         <div className="table-responsive">
//                                             <table className="table table-striped table-bordered table-hover">
//                                                 <thead className="table-dark">
//                                                     <tr>
//                                                         <th>#</th>
//                                                         <th>Item</th>
//                                                         <th>Instructor</th>
//                                                         <th className="text-center">Price</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {order.orderItems.map((item, index) => (
//                                                         <tr key={item.id}>
//                                                             <td>{index + 1}</td>
//                                                             <td>{item.course.title}</td>
//                                                             <td>
//                                                                 {item.course.instructor.name}<br />
//                                                                 {item.course.instructor.email}
//                                                             </td>
//                                                             <td className="text-center">
//                                                                 {(item.price * order.conversion_rate).toFixed(2)} {order.payable_currency}
//                                                             </td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>

//                                         <div className="row mt-3">
//                                             <div className="col-md-8"></div>
//                                             <div className="col-md-4">
//                                                 <table className="table table-borderless">
//                                                     <tbody>
//                                                         <tr>
//                                                             <td><strong>Subtotal</strong></td>
//                                                             <td className="text-end">
//                                                                 {(subTotal * order.conversion_rate).toFixed(2)} {order.payable_currency}
//                                                             </td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td><strong>Discount</strong></td>
//                                                             <td className="text-end">
//                                                                 {(discount * order.conversion_rate).toFixed(2)} {order.payable_currency}
//                                                             </td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td>
//                                                                 <strong>Gateway Charge ({gatewayPercentage.toFixed(0)}%)</strong>
//                                                             </td>
//                                                             <td className="text-end">
//                                                                 {(gatewayCharge * order.conversion_rate).toFixed(2)} {order.payable_currency}
//                                                             </td>
//                                                         </tr>
//                                                         <tr className="border-top">
//                                                             <td><strong>Total</strong></td>
//                                                             <td className="text-end fw-bold">
//                                                                 {total.toFixed(2)} {order.payable_currency}
//                                                             </td>
//                                                         </tr>
//                                                     </tbody>
//                                                 </table>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <hr />
//                                 <div className="text-end">
//                                     <a
//                                         href={`/student/order/print-invoice/${order.id}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="btn btn-outline-warning"
//                                     >
//                                         <i className="fas fa-print"></i> Print
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OrderInvoice;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderInvoice = () => {
  const { purchaseId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userID = localStorage.getItem("userId");

  // Fetch order details
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      // Get all orders and find the specific one
      const response = await fetch(
        `https://api.basementex.com/api/purchase/history/${userID}`
      );
      const data = await response.json();
      const orders = data.data || [];

      // Find the specific order by purchaseId
      const foundOrder = orders.find((o) => o.purchaseId === purchaseId);

      if (foundOrder) {
        // Transform the data to match your component structure
        const transformedOrder = {
          id: foundOrder.purchaseId,
          invoice_id: foundOrder.invoice,
          created_at: foundOrder.createdAt,
          payment_method: foundOrder.payment_Gateway,
          payment_status: foundOrder.payment_Status,
          conversion_rate: 1,
          payable_currency: "USD",
          coupon_discount_amount: 0,
          gateway_charge: 0,
          user: {
            name: foundOrder.userName || "N/A",
            phone: "N/A", // Not available in API
            email: "N/A", // Not available in API
            address: "N/A", // Not available in API
          },
          orderItems: [
            {
              id: foundOrder.course_Id,
              price: foundOrder.paid || 0,
              course: {
                title: foundOrder.courseTitle || "Course Title",
                instructor: {
                  name: "Instructor Name", // Not available in API
                  email: "instructor@example.com", // Not available in API
                },
              },
            },
          ],
        };
        setOrder(transformedOrder);
      } else {
        setError("Order not found");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (purchaseId) {
      fetchOrderDetails();
    }
  }, [purchaseId]);

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="col-lg-9 mx-auto">
        <div className="dashboard__content-wrap">
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading invoice details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-lg-9 mx-auto">
        <div className="dashboard__content-wrap">
          <div className="alert alert-danger">
            <h4>Error</h4>
            <p>{error}</p>
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline-danger"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="col-lg-9 mx-auto">
        <div className="dashboard__content-wrap">
          <div className="alert alert-warning">Order not found</div>
        </div>
      </div>
    );
  }

  // Calculate order totals
  const subTotal =
    order.orderItems?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
  const discount = order.coupon_discount_amount || 0;
  const gatewayCharge = order.gateway_charge || 0;
  const gatewayPercentage =
    gatewayCharge > 0 ? (gatewayCharge / (subTotal - discount)) * 100 : 0;
  const total = (subTotal - discount + gatewayCharge) * order.conversion_rate;

  return (
    <div className="col-lg-9 mx-auto">
      <div className="dashboard__content-wrap">
        <div className="dashboard__content-title d-flex justify-content-between align-items-center">
          <h4 className="title">Invoice Details</h4>
          <div className="d-flex gap-2">
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline-secondary"
            >
              <i className="fas fa-arrow-left"></i> Back
            </button>
            <button onClick={handlePrintInvoice} className="btn btn-primary">
              <i className="fas fa-print"></i> Print
            </button>
          </div>
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="invoice">
              <div className="invoice-print">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="invoice-title">
                          <h2 className="h5 fw-bold">Invoice</h2>
                          <p className="invoice-number mb-1">
                            Order #{order.invoice_id}
                          </p>
                          <p>
                            <strong>Order Date:</strong>{" "}
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <strong>Billed To:</strong>
                          <br />
                          {order.user?.name}
                          <br />
                          <strong>Phone:</strong> {order.user?.phone}
                          <br />
                          <strong>Email:</strong> {order.user?.email}
                          <br />
                          <strong>Address:</strong> {order.user?.address}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <strong>Payment Method:</strong>{" "}
                          {order.payment_method}
                        </p>
                        <p>
                          <strong>Payment Status:</strong>
                          <span
                            className={`badge ms-2 ${getStatusBadgeColor(
                              order.payment_status
                            )}`}
                          >
                            {order.payment_status}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <h5 className="section-title">Order Summary</h5>
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Instructor</th>
                            <th className="text-center">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderItems?.length > 0 ? (
                            order.orderItems.map((item, index) => (
                              <tr key={item.id || index}>
                                <td>{index + 1}</td>
                                <td>{item.course?.title || "Course Title"}</td>
                                <td>
                                  {item.course?.instructor?.name ||
                                    "Instructor"}
                                  <br />
                                  <small>
                                    {item.course?.instructor?.email || ""}
                                  </small>
                                </td>
                                <td className="text-center">
                                  $
                                  {(
                                    (item.price || 0) * order.conversion_rate
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center">
                                No items found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-8"></div>
                      <div className="col-md-4">
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td>
                                <strong>Subtotal</strong>
                              </td>
                              <td className="text-end">
                                ${(subTotal * order.conversion_rate).toFixed(2)}
                              </td>
                            </tr>
                            {discount > 0 && (
                              <tr>
                                <td>
                                  <strong>Discount</strong>
                                </td>
                                <td className="text-end">
                                  -$
                                  {(discount * order.conversion_rate).toFixed(
                                    2
                                  )}
                                </td>
                              </tr>
                            )}
                            {gatewayCharge > 0 && (
                              <tr>
                                <td>
                                  <strong>
                                    Gateway Charge (
                                    {gatewayPercentage.toFixed(0)}%)
                                  </strong>
                                </td>
                                <td className="text-end">
                                  $
                                  {(
                                    gatewayCharge * order.conversion_rate
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            )}
                            <tr className="border-top">
                              <td>
                                <strong>Total</strong>
                              </td>
                              <td className="text-end fw-bold">
                                ${total.toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />
                <div className="text-center">
                  <p className="text-muted">Thank you for your purchase!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper function to get badge color based on status
  function getStatusBadgeColor(status) {
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
        return "bg-secondary";
    }
  }
};

export default OrderInvoice;
