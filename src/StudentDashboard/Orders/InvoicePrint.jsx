// import React, { useEffect } from 'react';

// const InvoicePrint = () => {
//   // Mock data for invoice
//   const setting = {
//     logo: "/logo.png",
//     app_name: "Teachera",
//     contact_message_receiver_mail: "info@teachera.com",
//     site_address: "123 Education Street, Learning City, ED 12345"
//   };

//   const order = {
//     id: 1,
//     invoice_id: "INV-2023-001",
//     created_at: "2023-05-15T10:30:00Z",
//     payment_method: "Credit Card",
//     payment_status: "Paid",
//     conversion_rate: 1,
//     payable_currency: "USD",
//     coupon_discount_amount: 10,
//     gateway_charge: 2.5,
//     user: {
//       name: "John Doe",
//       phone: "+1234567890",
//       email: "john.doe@example.com",
//       address: "123 Main St, Anytown, USA"
//     },
//     orderItems: [
//       {
//         id: 101,
//         price: 49.99,
//         course: {
//           title: "Web Development Fundamentals",
//           instructor: {
//             name: "Sarah Johnson",
//             email: "sarah.johnson@example.com"
//           }
//         }
//       },
//       {
//         id: 102,
//         price: 39.99,
//         course: {
//           title: "JavaScript Masterclass",
//           instructor: {
//             name: "Michael Chen",
//             email: "michael.chen@example.com"
//           }
//         }
//       }
//     ]
//   };

//   // Format date helper function
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Calculate order totals
//   const subTotal = order.orderItems.reduce((sum, item) => sum + item.price, 0);
//   const discount = order.coupon_discount_amount || 0;
//   const gatewayCharge = order.gateway_charge || 0;
//   const gatewayPercentage = gatewayCharge > 0 ? (gatewayCharge / (subTotal - discount)) * 100 : 0;
//   const total = (subTotal - discount + gatewayCharge) * order.conversion_rate;

//   // Auto print on load
//   useEffect(() => {
//     window.print();
//   }, []);

//   return (
//     <div className="invoice_area" style={{
//       fontFamily: 'sans-serif',
//     }}>
//       <div className="invoice_header" style={{
//         background: '#f3f2f2',
//         padding: '30px',
//       }}>
//         <div className="table-responsive">
//           <table className="table" style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//           }}>
//             <tbody style={{ width: '100%' }}>
//               <tr style={{
//                 width: '100%',
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 justifyContent: 'space-between',
//               }}>
//                 <td className="left" style={{ width: '49%' }}>
//                   <a href="#" style={{ display: 'block', width: '160px' }}>
//                     <img src={setting.logo || "/placeholder.svg"} alt="Logo" />
//                   </a>
//                 </td>
//                 <td className="right" style={{ width: '49%' }}>
//                   <h2 style={{
//                     textTransform: 'uppercase',
//                     fontSize: '28px',
//                     fontWeight: 600,
//                     lineHeight: 'initial',
//                     marginBottom: '10px',
//                     textAlign: 'right',
//                     color: '#05092B',
//                   }}>Invoice</h2>
//                   <h5 style={{
//                     fontSize: '16px',
//                     textAlign: 'right',
//                     color: '#05092B',
//                   }}>Order Id: {order.invoice_id}</h5>
//                   <br />
//                   <h5 style={{
//                     fontSize: '16px',
//                     textAlign: 'right',
//                     color: '#05092B',
//                   }}>Date: {formatDate(order.created_at)}</h5>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="invoice_billing_info" style={{ padding: '30px' }}>
//         <div className="table-responsive">
//           <table className="table" style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//           }}>
//             <tbody style={{ width: '100%' }}>
//               <tr style={{
//                 width: '100%',
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 justifyContent: 'space-between',
//               }}>
//                 <td style={{ width: '49%' }}>
//                   <h5 style={{
//                     fontSize: '20px',
//                     fontWeight: 700,
//                     textTransform: 'capitalize',
//                     marginBottom: '10px',
//                     color: '#05092B',
//                   }}>Billed To</h5>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 400,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                   }}>{order.user.name}</p>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 400,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                   }}>{order.user.phone}</p>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 400,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                   }}>{order.user.email}</p>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 400,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                   }}>{order.user.address}</p>
//                 </td>
//                 <td style={{ width: '49%' }}>
//                   <h5 style={{
//                     fontSize: '20px',
//                     fontWeight: 700,
//                     textTransform: 'capitalize',
//                     marginBottom: '10px',
//                     color: '#05092B',
//                   }}>Billed From</h5>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 400,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                   }}>{setting.app_name}</p>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 400,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                   }}>{setting.contact_message_receiver_mail}</p>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 400,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                   }}>{setting.site_address}</p>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="invoice_billing_order" style={{ padding: '30px' }}>
//         <div className="table-responsive">
//           <table className="table" style={{
//             border: '1px solid rgb(238, 238, 238)',
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//           }}>
//             <thead style={{ width: '100%' }}>
//               <tr style={{
//                 background: '#f3f2f2',
//                 width: '100%',
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 justifyContent: 'space-between',
//               }}>
//                 <th style={{
//                   padding: '10px 20px',
//                   borderRight: '1px solid rgb(238, 238, 238)',
//                   borderBottom: '1px solid rgb(238, 238, 238)',
//                   width: '10%',
//                   color: '#05092B',
//                   textAlign: 'left',
//                 }}>No.</th>
//                 <th style={{
//                   padding: '10px 20px',
//                   borderRight: '1px solid rgb(238, 238, 238)',
//                   borderBottom: '1px solid rgb(238, 238, 238)',
//                   width: '40%',
//                   color: '#05092B',
//                   textAlign: 'left',
//                 }}>Item</th>
//                 <th style={{
//                   padding: '10px 20px',
//                   borderRight: '1px solid rgb(238, 238, 238)',
//                   borderBottom: '1px solid rgb(238, 238, 238)',
//                   width: '35%',
//                   color: '#05092B',
//                   textAlign: 'left',
//                 }}>By</th>
//                 <th style={{
//                   padding: '10px 20px',
//                   borderRight: '1px solid rgb(238, 238, 238)',
//                   borderBottom: '1px solid rgb(238, 238, 238)',
//                   width: '15%',
//                   color: '#05092B',
//                   textAlign: 'left',
//                 }}>Price</th>
//               </tr>
//             </thead>
//             <tbody style={{ width: '100%' }}>
//               {order.orderItems.map((item, index) => (
//                 <tr key={item.id} style={{
//                   width: '100%',
//                   display: 'flex',
//                   flexWrap: 'wrap',
//                   justifyContent: 'space-between',
//                 }}>
//                   <td style={{
//                     padding: '10px 20px',
//                     borderRight: '1px solid rgb(238, 238, 238)',
//                     borderBottom: '1px solid rgb(238, 238, 238)',
//                     width: '10%',
//                     color: '#05092B',
//                     textAlign: 'left',
//                   }}>{index + 1}</td>
//                   <td style={{
//                     padding: '10px 20px',
//                     borderRight: '1px solid rgb(238, 238, 238)',
//                     borderBottom: '1px solid rgb(238, 238, 238)',
//                     width: '40%',
//                     color: '#05092B',
//                     textAlign: 'left',
//                   }}>{item.course.title}</td>
//                   <td style={{
//                     padding: '10px 20px',
//                     borderRight: '1px solid rgb(238, 238, 238)',
//                     borderBottom: '1px solid rgb(238, 238, 238)',
//                     width: '35%',
//                     color: '#05092B',
//                     textAlign: 'left',
//                   }}>
//                     {item.course.instructor.name}
//                     <br />
//                     <small>{item.course.instructor.email}</small>
//                   </td>
//                   <td style={{
//                     padding: '10px 20px',
//                     borderRight: '1px solid rgb(238, 238, 238)',
//                     borderBottom: '1px solid rgb(238, 238, 238)',
//                     width: '15%',
//                     color: '#05092B',
//                     textAlign: 'left',
//                   }}>
//                     {(item.price * order.conversion_rate).toFixed(2)} {order.payable_currency}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="invoice_billing_info" style={{ padding: '30px' }}>
//         <div className="table-responsive">
//           <table className="table" style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//           }}>
//             <tbody style={{ width: '100%' }}>
//               <tr style={{
//                 width: '100%',
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 justifyContent: 'space-between',
//               }}>
//                 <td className="left" style={{ width: '49%' }}>
//                   <h5 style={{
//                     fontSize: '20px',
//                     fontWeight: 700,
//                     textTransform: 'capitalize',
//                     marginBottom: '10px',
//                     color: '#05092B',
//                   }}>Payment Details</h5>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 400,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                   }}><b>Payment Method :</b> {order.payment_method}</p>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 400,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                   }}><b>Payment Status :</b> {order.payment_status}</p>
//                 </td>
//                 <td className="right" style={{ width: '49%' }}>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 400,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                     textAlign: 'right',
//                   }}>
//                     Sub Total :
//                     <span style={{
//                       display: 'inline-block',
//                       width: '150px',
//                       textAlign: 'right',
//                     }}>
//                       {(subTotal * order.conversion_rate).toFixed(2)} {order.payable_currency}
//                     </span>
//                   </p>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 400,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                     textAlign: 'right',
//                   }}>
//                     Discount :
//                     <span style={{
//                       display: 'inline-block',
//                       width: '150px',
//                       textAlign: 'right',
//                     }}>
//                       {(discount * order.conversion_rate).toFixed(2)} {order.payable_currency}
//                     </span>
//                   </p>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 400,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                     textAlign: 'right',
//                   }}>
//                     Gateway Charge ({gatewayPercentage.toFixed(0)}%) :
//                     <span style={{
//                       display: 'inline-block',
//                       width: '150px',
//                       textAlign: 'right',
//                     }}>
//                       {(gatewayCharge * order.conversion_rate).toFixed(2)} {order.payable_currency}
//                     </span>
//                   </p>
//                   <p style={{
//                     color: '#545353',
//                     fontWeight: 600,
//                     fontSize: '16px',
//                     marginTop: '10px',
//                     textAlign: 'right',
//                   }}>
//                     Total :
//                     <span style={{
//                       display: 'inline-block',
//                       width: '150px',
//                       textAlign: 'right',
//                       fontWeight: 600,
//                     }}>
//                       {total.toFixed(2)} {order.payable_currency}
//                     </span>
//                   </p>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoicePrint;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InvoicePrint = () => {
  const { purchaseId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const userID = localStorage.getItem("userId");

  // Mock settings - you can make this dynamic too if needed
  const setting = {
    logo: "/newlogo.png",
    app_name: "Teachera",
    contact_message_receiver_mail: "info@teachera.com",
    site_address: "123 Education Street, Learning City, ED 12345",
  };

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
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
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

  // Auto print on load when data is ready
  useEffect(() => {
    if (order && !loading) {
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }, [order, loading]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>Loading invoice for printing...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>Invoice not found</p>
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
    <div
      className="invoice_area"
      style={{
        fontFamily: "sans-serif",
      }}
    >
      <div
        className="invoice_header"
        style={{
          background: "#f3f2f2",
          padding: "30px",
        }}
      >
        <div className="table-responsive">
          <table
            className="table"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <tbody style={{ width: "100%" }}>
              <tr
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <td className="left" style={{ width: "49%" }}>
                  <a href="#" style={{ display: "block", width: "160px" }}>
                    <img
                      src={
                        setting.logo || "/placeholder.svg?height=60&width=160"
                      }
                      alt="Logo"
                    />
                  </a>
                </td>
                <td className="right" style={{ width: "49%" }}>
                  <h2
                    style={{
                      textTransform: "uppercase",
                      fontSize: "28px",
                      fontWeight: 600,
                      lineHeight: "initial",
                      marginBottom: "10px",
                      textAlign: "right",
                      color: "#05092B",
                    }}
                  >
                    Invoice
                  </h2>
                  <h5
                    style={{
                      fontSize: "16px",
                      textAlign: "right",
                      color: "#05092B",
                    }}
                  >
                    Order Id: {order.invoice_id}
                  </h5>
                  <br />
                  <h5
                    style={{
                      fontSize: "16px",
                      textAlign: "right",
                      color: "#05092B",
                    }}
                  >
                    Date: {formatDate(order.created_at)}
                  </h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="invoice_billing_info" style={{ padding: "30px" }}>
        <div className="table-responsive">
          <table
            className="table"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <tbody style={{ width: "100%" }}>
              <tr
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <td style={{ width: "49%" }}>
                  <h5
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      textTransform: "capitalize",
                      marginBottom: "10px",
                      color: "#05092B",
                    }}
                  >
                    Billed To
                  </h5>
                  <p
                    style={{
                      color: "#545353",
                      fontWeight: 400,
                      fontSize: "16px",
                      marginTop: "10px",
                    }}
                  >
                    {order.user?.name}
                  </p>
                  <p
                    style={{
                      color: "#545353",
                      fontWeight: 400,
                      fontSize: "16px",
                      marginTop: "10px",
                    }}
                  >
                    {order.user?.phone}
                  </p>
                  <p
                    style={{
                      color: "#545353",
                      fontWeight: 400,
                      fontSize: "16px",
                      marginTop: "10px",
                    }}
                  >
                    {order.user?.email}
                  </p>
                  <p
                    style={{
                      color: "#545353",
                      fontWeight: 400,
                      fontSize: "16px",
                      marginTop: "10px",
                    }}
                  >
                    {order.user?.address}
                  </p>
                </td>
                <td style={{ width: "49%" }}>
                  <h5
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      textTransform: "capitalize",
                      marginBottom: "10px",
                      color: "#05092B",
                    }}
                  >
                    Billed From
                  </h5>
                  <p
                    style={{
                      color: "#545353",
                      fontWeight: 400,
                      fontSize: "16px",
                      marginTop: "10px",
                    }}
                  >
                    {setting.app_name}
                  </p>
                  <p
                    style={{
                      color: "#545353",
                      fontWeight: 400,
                      fontSize: "16px",
                      marginTop: "10px",
                    }}
                  >
                    {setting.contact_message_receiver_mail}
                  </p>
                  <p
                    style={{
                      color: "#545353",
                      fontWeight: 400,
                      fontSize: "16px",
                      marginTop: "10px",
                    }}
                  >
                    {setting.site_address}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="invoice_billing_order" style={{ padding: "30px" }}>
        <div className="table-responsive">
          <table
            className="table"
            style={{
              border: "1px solid rgb(238, 238, 238)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <thead style={{ width: "100%" }}>
              <tr
                style={{
                  background: "#f3f2f2",
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <th
                  style={{
                    padding: "10px 20px",
                    borderRight: "1px solid rgb(238, 238, 238)",
                    borderBottom: "1px solid rgb(238, 238, 238)",
                    width: "10%",
                    color: "#05092B",
                    textAlign: "left",
                  }}
                >
                  No.
                </th>
                <th
                  style={{
                    padding: "10px 20px",
                    borderRight: "1px solid rgb(238, 238, 238)",
                    borderBottom: "1px solid rgb(238, 238, 238)",
                    width: "40%",
                    color: "#05092B",
                    textAlign: "left",
                  }}
                >
                  Item
                </th>
                <th
                  style={{
                    padding: "10px 20px",
                    borderRight: "1px solid rgb(238, 238, 238)",
                    borderBottom: "1px solid rgb(238, 238, 238)",
                    width: "35%",
                    color: "#05092B",
                    textAlign: "left",
                  }}
                >
                  By
                </th>
                <th
                  style={{
                    padding: "10px 20px",
                    borderRight: "1px solid rgb(238, 238, 238)",
                    borderBottom: "1px solid rgb(238, 238, 238)",
                    width: "15%",
                    color: "#05092B",
                    textAlign: "left",
                  }}
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody style={{ width: "100%" }}>
              {order.orderItems?.length > 0 ? (
                order.orderItems.map((item, index) => (
                  <tr
                    key={item.id || index}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 20px",
                        borderRight: "1px solid rgb(238, 238, 238)",
                        borderBottom: "1px solid rgb(238, 238, 238)",
                        width: "10%",
                        color: "#05092B",
                        textAlign: "left",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        padding: "10px 20px",
                        borderRight: "1px solid rgb(238, 238, 238)",
                        borderBottom: "1px solid rgb(238, 238, 238)",
                        width: "40%",
                        color: "#05092B",
                        textAlign: "left",
                      }}
                    >
                      {item.course?.title || "Course Title"}
                    </td>
                    <td
                      style={{
                        padding: "10px 20px",
                        borderRight: "1px solid rgb(238, 238, 238)",
                        borderBottom: "1px solid rgb(238, 238, 238)",
                        width: "35%",
                        color: "#05092B",
                        textAlign: "left",
                      }}
                    >
                      {item.course?.instructor?.name || "Instructor"}
                      <br />
                      <small>{item.course?.instructor?.email || ""}</small>
                    </td>
                    <td
                      style={{
                        padding: "10px 20px",
                        borderRight: "1px solid rgb(238, 238, 238)",
                        borderBottom: "1px solid rgb(238, 238, 238)",
                        width: "15%",
                        color: "#05092B",
                        textAlign: "left",
                      }}
                    >
                      ${((item.price || 0) * order.conversion_rate).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr
                  style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <td
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      width: "100%",
                      color: "#05092B",
                    }}
                  >
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="invoice_billing_info" style={{ padding: "30px" }}>
        <div className="table-responsive">
          <table
            className="table"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <tbody style={{ width: "100%" }}>
              <tr
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <td className="left" style={{ width: "49%" }}>
                  <h5
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      textTransform: "capitalize",
                      marginBottom: "10px",
                      color: "#05092B",
                    }}
                  >
                    Payment Details
                  </h5>
                  <p
                    style={{
                      color: "#545353",
                      fontWeight: 400,
                      fontSize: "16px",
                      marginTop: "10px",
                    }}
                  >
                    <b>Payment Method :</b> {order.payment_method}
                  </p>
                  <p
                    style={{
                      color: "#545353",
                      fontWeight: 400,
                      fontSize: "16px",
                      marginTop: "10px",
                    }}
                  >
                    <b>Payment Status :</b> {order.payment_status}
                  </p>
                </td>
                <td className="right" style={{ width: "49%" }}>
                  <p
                    style={{
                      color: "#545353",
                      fontWeight: 400,
                      fontSize: "16px",
                      marginTop: "10px",
                      textAlign: "right",
                    }}
                  >
                    Sub Total :
                    <span
                      style={{
                        display: "inline-block",
                        width: "150px",
                        textAlign: "right",
                      }}
                    >
                      ${(subTotal * order.conversion_rate).toFixed(2)}
                    </span>
                  </p>
                  {discount > 0 && (
                    <p
                      style={{
                        color: "#545353",
                        fontWeight: 400,
                        fontSize: "16px",
                        marginTop: "10px",
                        textAlign: "right",
                      }}
                    >
                      Discount :
                      <span
                        style={{
                          display: "inline-block",
                          width: "150px",
                          textAlign: "right",
                        }}
                      >
                        -${(discount * order.conversion_rate).toFixed(2)}
                      </span>
                    </p>
                  )}
                  {gatewayCharge > 0 && (
                    <p
                      style={{
                        color: "#545353",
                        fontWeight: 400,
                        fontSize: "16px",
                        marginTop: "10px",
                        textAlign: "right",
                      }}
                    >
                      Gateway Charge ({gatewayPercentage.toFixed(0)}%) :
                      <span
                        style={{
                          display: "inline-block",
                          width: "150px",
                          textAlign: "right",
                        }}
                      >
                        ${(gatewayCharge * order.conversion_rate).toFixed(2)}
                      </span>
                    </p>
                  )}
                  <p
                    style={{
                      color: "#545353",
                      fontWeight: 600,
                      fontSize: "16px",
                      marginTop: "10px",
                      textAlign: "right",
                    }}
                  >
                    Total :
                    <span
                      style={{
                        display: "inline-block",
                        width: "150px",
                        textAlign: "right",
                        fontWeight: 600,
                      }}
                    >
                      ${total.toFixed(2)}
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrint;
