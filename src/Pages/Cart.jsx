// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// // Import images
// import emptyCartImg from '../assets/images/empty-cart.png';

// const Cart = () => {
//   // State for cart items and coupon
//   const [cartItems, setCartItems] = useState([]);
//   const [couponCode, setCouponCode] = useState('');
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [discountPercent, setDiscountPercent] = useState(0);
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(amount);
//   };

//   // Handle coupon input change
//   const handleCouponChange = (e) => {
//     setCouponCode(e.target.value);
//   };

//   // Handle apply coupon
//   const handleApplyCoupon = (e) => {
//     e.preventDefault();

//     // In a real app, you would make an API call to validate and apply the coupon
//     // For this example, we'll simulate a successful coupon application
//     if (couponCode.trim() !== '') {
//       const discount = 0.1; // 10% discount
//       const discountAmt = calculateSubtotal() * discount;

//       setAppliedCoupon(couponCode);
//       setDiscountPercent(discount * 100);
//       setDiscountAmount(discountAmt);
//       updateTotal();

//       // Reset coupon input
//       setCouponCode('');
//     }
//   };

//   // Handle remove coupon
//   const handleRemoveCoupon = () => {
//     setAppliedCoupon(null);
//     setDiscountPercent(0);
//     setDiscountAmount(0);
//     updateTotal();
//   };

//   // Handle remove cart item
//   const handleRemoveCartItem = (rowId) => {
//     // In a real app, you would make an API call to remove the item
//     // For this example, we'll just filter the items
//     const updatedCart = cartItems.filter(item => item.rowId !== rowId);
//     setCartItems(updatedCart);
//     updateTotal();
//   };

//   // Calculate subtotal
//   const calculateSubtotal = () => {
//     return cartItems.reduce((sum, item) => sum + item.price, 0);
//   };

//   // Update total
//   const updateTotal = () => {
//     const subtotal = calculateSubtotal();
//     const totalAmount = subtotal - discountAmount;
//     setTotal(totalAmount);
//   };

//   // Fetch cart items
//   useEffect(() => {
//     // In a real app, you would fetch data from an API
//     // For this example, we'll use mock data

//     // Mock cart items
//     const mockCartItems = [
//       // {
//       //   rowId: '1',
//       //   name: 'Complete Web Development Bootcamp',
//       //   price: 89.99,
//       //   options: {
//       //     image: emptyCartImg,
//       //     slug: 'complete-web-development-bootcamp'
//       //   }
//       // },

//     ];

//     setCartItems(mockCartItems);
//     setTotal(mockCartItems.reduce((sum, item) => sum + item.price, 0));
//     setLoading(false);
//   }, []);

//   // Update total when cart items or discount changes
//   useEffect(() => {
//     updateTotal();
//   }, [cartItems, discountAmount]);

//   return (
//     <section className="cart-sec tp-space mrt-50">
//       <div className="container">
//         <h2 className="title">Cart</h2>

//         {loading ? (
//           <div className="text-center py-4">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-2">Loading cart...</p>
//           </div>
//         ) : cartItems.length > 0 ? (
//           <>
//             {/* Cart Items */}
//             {cartItems.map(item => (
//               <div className="cart-table-view" key={item.rowId}>
//                 <div>
//                   <img
//                     src={item.options.image || "/placeholder.svg"}
//                     className="img-40 rounded me-2"
//                     alt={item.name}
//                   />
//                   <span>
//                     <Link to={`/course/${item.options.slug}`}>{item.name}</Link>
//                   </span>
//                 </div>
//                 <div>
//                   <p className="price mb-0">
//                     {formatCurrency(item.price)}
//                     {/* <span className="badges success">PROM135</span> */}
//                   </p>
//                 </div>
//                 <div>
//                   <a
//                     href="#"
//                     className="text-danger fz-16 product__remove"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleRemoveCartItem(item.rowId);
//                     }}
//                   >
//                     <i className="fas fa-trash-alt"></i>
//                   </a>
//                 </div>
//               </div>
//             ))}

//             {/* Coupon Form */}
//             <form
//               className="cart__actions-form coupon-form"
//               onSubmit={handleApplyCoupon}
//             >
//               <input
//                 type="text"
//                 name="coupon"
//                 placeholder="Coupon code"
//                 className="form-control"
//                 value={couponCode}
//                 onChange={handleCouponChange}
//               />
//               <button type="submit" className="btn btn-primary mt-2">
//                 Apply coupon
//               </button>
//             </form>
//           </>
//         ) : (
//           <div className="w-100 text-center mt-85">
//             <img
//               className="mb-4"
//               src={emptyCartImg || "/placeholder.svg?height=200&width=200&query=empty%20cart"}
//               alt="Empty Cart"
//             />
//             <h4 className="text-center">Cart is empty!</h4>
//             <p className="text-center">
//               Please add some courses in your cart.
//             </p>
//           </div>
//         )}

//         {/* Bill Summary */}
//         {cartItems.length > 0 && (
//           <div className="row justify-content-end">
//             <div className="col-lg-4">
//               <div className="summary-card">
//                 <h4 className="summary-title">Bill Summary</h4>

//                 {appliedCoupon ? (
//                   <p>
//                     <span>
//                       {appliedCoupon} ({discountPercent} %)
//                       <a
//                         className="ms-2 text-danger"
//                         href="#"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           handleRemoveCoupon();
//                         }}
//                       >
//                         ×
//                       </a>
//                     </span>
//                     <span className="discount-amount">{formatCurrency(discountAmount)}</span>
//                   </p>
//                 ) : (
//                   <p>
//                     <span>Discount</span>
//                     <span className="discount-amount">{formatCurrency(0)}</span>
//                   </p>
//                 )}

//                 {/* <p>
//                   <span>Discounts:</span>
//                   <span>$1000</span>
//                 </p>
//                 <p>
//                   <span>GST:</span>
//                   <span>$5</span>
//                 </p> */}

//                 <p className="grn-txt">
//                   <span className="grn-txt">Total</span>
//                   <span>{formatCurrency(total)}</span>
//                 </p>

//                 <Link to="/checkout" className="thm-btn w-100 text-center">
//                   Checkout
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Cart;

"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useUser } from "../Context/UserContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { loadStripe } from "@stripe/stripe-js";
// Import images
import emptyCartImg from "../assets/images/empty-cart.png";
import CheckoutButton from "../Components/CheckoutButton/CheckoutButton";

const Cart = () => {
  // Get cart data from context+
  const { t, i18n } = useTranslation();
  const { cart, removeFromCart, clearCart, cartLoading } = useCart();
  const { user } = useUser();

  const stripePromise = loadStripe(
    "pk_test_51KvfVjR29ouTNcS8hKVVWmVdh26RhDkw6HK8lggKQ0bE1h1lHRiCWUyUwXh4gSOLre9oJKSkQzePUNFOBUuU5mSh00SNTliKQl"
  );

  // State for coupon
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponId, setCouponId] = useState(0);
  const [loading, setLoading] = useState(false);

  // console.log(cart);

  // Format currency
  const formatCurrency = (amount) => {
    // let da = new Intl.NumberFormat("en-US", {
    //   style: "currency",
    //   currency: "USD",
    // }).format(amount);
    // return new Intl.NumberFormat("en-US", {
    //   style: "currency",
    //   currency: "USD",
    // }).format(amount);
    return `$${amount}.00`;
  };

  // Handle coupon input change
  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  // Handle apply coupon
  const handleApplyCoupon = async (e) => {
    e.preventDefault();

    //apicall
    const response = await fetch(
      "https://api.basementex.com/api/v1/web/coupon/coupon-details",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coupon_code: couponCode }),
      }
    );
    let data = await response.json();
    if (!data.status) {
      return toast.error("Please enter a valid coupon code");
    }

    if (couponCode.trim() !== "") {
      const discount = data.data.discount;
      setCouponId(data.data._id);

      const discountAmt = (cart.totalPrice * discount) / 100;

      setAppliedCoupon(couponCode);
      setDiscountPercent(discount);
      setDiscountAmount(discountAmt);

      // Reset coupon input
      setCouponCode("");
      // toast.success("Coupon applied successfully!");
    } else {
      toast.error("Please enter a valid coupon code");
    }
  };

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    setDiscountAmount(0);
    toast.success("Coupon removed");
  };

  // Handle remove cart item
  const handleRemoveCartItem = async (courseId, type) => {
    if (!user?.Token) {
      toast.error("Please login to manage your cart");
      return;
    }

    await removeFromCart(courseId, type);
  };

  // Calculate total after discount
  const calculateTotal = () => {
    return Number(cart.totalPrice) - Number(discountAmount);
  };

  const handleClick = async () => {
    const stripe = await stripePromise;

    const res = await fetch(
      // "https://api.basementex.com/api/v1/admin/stripe-route/create-checkout-session",
      "http://localhost:8201/api/v1/admin/stripe-route/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: cart?.userId?._id,
          couponId: couponId,
        }),
      }
    );

    const data = await res.json();

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (result.error) {
      console.error("Stripe checkout error:", result.error.message);
    }
  };

  return (
    <section className="cart-sec tp-space mrt-50">
      <div className="container">
        <h2 className="title">Cart</h2>

        {cartLoading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading cart...</p>
          </div>
        ) : cart.items && cart.items.length > 0 ? (
          <>
            {/* Cart Items */}
            {cart.items.map((item) => (
              <div className="cart-table-view" key={item.courseId?._id}>
                <div className="product_name_cart">
                  <img
                    src={
                      i18n.language == "en"
                        ? item?.courseId?.thumbnail
                          ? `https://api.basementex.com/${item?.courseId?.thumbnail}`
                          : "/placeholder.svg"
                        : item?.courseId?.arabic_thumbnail
                        ? `https://api.basementex.com/${item?.courseId?.arabic_thumbnail}`
                        : "/placeholder.svg"
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/square_logo.png";
                    }}
                    className="img-40 rounded me-2"
                    alt={item.course?.title || "Course"}
                  />
                  <span>
                    <Link
                      to={
                        item.itemType === "course"
                          ? `/course-details/${item?.courseId?._id}`
                          : item.itemType === "diploma"
                          ? `/diploma-details/${item?.courseId?._id}`
                          : item.itemType === "bundle"
                          ? `/bundle-details/${item?.courseId?._id}`
                          : item.itemType === "live-course"
                          ? `/live-course-details/${item?.courseId?._id}`
                          : `${-1}`
                      }
                    >
                      {/* <Link to={`/course-details/${item?.courseId?._id}`}> */}
                      {/* {console.log(item.itemType)} */}

                      {i18n.language == "en"
                        ? item?.courseId?.title
                        : item?.courseId?.arabic_title}
                    </Link>
                  </span>
                </div>
                <div>
                  <p className="price mb-0">{formatCurrency(item.price)}</p>
                </div>
                {/* <div>
                  <p className="price mb-0">{formatCurrency(item.dicounted_price)}</p>
                </div> */}
                <div>
                  <a
                    href="#"
                    className="text-danger fz-16 product__remove"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveCartItem(item.courseId._id, item.itemType);
                    }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </a>
                </div>
              </div>
            ))}

            {/* Coupon Form */}
            <form
              className="cart__actions-form coupon-form"
              onSubmit={handleApplyCoupon}
            >
              <input
                type="text"
                name="coupon"
                placeholder="Coupon code"
                className="form-control"
                value={couponCode}
                onChange={handleCouponChange}
              />
              <button type="submit" className="btn btn-primary mt-2">
                Apply coupon
              </button>
            </form>
          </>
        ) : (
          <div className="w-100 text-center mt-85">
            <img
              className="mb-4"
              src={
                emptyCartImg ||
                "/placeholder.svg?height=200&width=200&query=empty%20cart"
              }
              alt="Empty Cart"
            />
            <h4 className="text-center">Cart is empty!</h4>
            <p className="text-center">Please add some courses in your cart.</p>
            <Link to="/courses" className="thm-btn mt-3">
              Browse Courses
            </Link>
          </div>
        )}

        {/* Bill Summary */}
        {cart.items && cart.items.length > 0 && (
          <div className="row justify-content-end">
            <div className="col-lg-4">
              <div className="summary-card">
                <h4 className="summary-title">Bill Summary</h4>

                <p>
                  <span>Subtotal:</span>
                  <span>{formatCurrency(cart.totalPrice)}</span>
                </p>

                {appliedCoupon ? (
                  <p>
                    <span>
                      {appliedCoupon} ({discountPercent}%)
                      <a
                        className="ms-2 text-danger"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveCoupon();
                        }}
                      >
                        ×
                      </a>
                    </span>
                    <span className="discount-amount">-${discountAmount}</span>
                  </p>
                ) : (
                  <p>
                    <span>Discount</span>
                    <span className="discount-amount">{formatCurrency(0)}</span>
                  </p>
                )}

                <p className="grn-txt">
                  <span className="grn-txt">Total</span>
                  <span>${calculateTotal()} </span>
                </p>

                {/* <Link to="/checkout" className="thm-btn w-100 text-center">
                  Checkout
                </Link> */}
                {/* <CheckoutButton
                  onClick={() => handleClick(cart?.userId?._id, couponId)}
                /> */}
                <CheckoutButton handleClick={handleClick} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
