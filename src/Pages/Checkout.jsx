import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import stripe from "../assets/images/stripe.png";
import paypal from "../assets/images/paypal.jpg";
const Checkout = () => {
  // State for products, payment methods, and totals
  const [products, setProducts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState({
    stripe: { status: "active", image: stripe },
    paypal: { status: "active", image: paypal },
    bank: {
      status: "active",
      image: "/placeholder.svg?height=40&width=80&query=bank",
    },
    razorpay: {
      status: "active",
      image: "/placeholder.svg?height=40&width=80&query=razorpay",
    },
    mollie: {
      status: "active",
      image: "/placeholder.svg?height=40&width=80&query=mollie",
    },
    instamojo: {
      status: "active",
      image: "/placeholder.svg?height=40&width=80&query=instamojo",
    },
    flutterwave: {
      status: "active",
      image: "/placeholder.svg?height=40&width=80&query=flutterwave",
    },
    paystack: {
      status: "active",
      image: "/placeholder.svg?height=40&width=80&query=paystack",
    },
  });
  const [coupon, setCoupon] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCurrencyWarnings, setShowCurrencyWarnings] = useState({
    stripe: false,
    mollie: false,
    paypal: false,
    instamojo: false,
  });

  // State for payment form data
  const [stripeFormData, setStripeFormData] = useState({
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  });

  const [bankFormData, setBankFormData] = useState({
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    branch: "",
  });

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Handle stripe form input change
  const handleStripeInputChange = (e) => {
    const { name, value } = e.target;
    setStripeFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle bank form input change
  const handleBankInputChange = (e) => {
    const { name, value } = e.target;
    setBankFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle stripe payment submission
  const handleStripeSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process the stripe payment here
    console.log("Processing stripe payment with data:", stripeFormData);
  };

  // Handle bank payment submission
  const handleBankSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process the bank payment here
    console.log("Processing bank payment with data:", bankFormData);
  };

  // Handle razorpay payment
  const handleRazorpayPayment = () => {
    // In a real app, you would initialize Razorpay checkout here
    console.log("Initializing Razorpay payment");
  };

  // Handle flutterwave payment
  const handleFlutterwavePayment = () => {
    // In a real app, you would initialize Flutterwave checkout here
    console.log("Initializing Flutterwave payment");
  };

  // Handle paystack payment
  const handlePaystackPayment = () => {
    // In a real app, you would initialize Paystack checkout here
    console.log("Initializing Paystack payment");
  };

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    setCoupon(null);
    setDiscountPercent(0);
    setDiscountAmount(0);
    updateTotal();
  };

  // Update total
  const updateTotal = () => {
    const subtotal = products.reduce((sum, product) => sum + product.price, 0);
    const totalAmount = subtotal - discountAmount;
    setTotal(totalAmount);
    setPayableAmount(totalAmount);
  };

  // Fetch products and payment settings
  useEffect(() => {
    // In a real app, you would fetch data from an API
    // For this example, we'll use mock data

    // Mock products
    const mockProducts = [
      {
        id: 1,
        name: "Complete Web Development Bootcamp",
        price: 89.99,
        options: {
          image: "/placeholder.svg?height=60&width=100&query=web%20development",
          slug: "complete-web-development-bootcamp",
        },
      },
      {
        id: 2,
        name: "Data Science and Machine Learning",
        price: 94.99,
        options: {
          image: "/placeholder.svg?height=60&width=100&query=data%20science",
          slug: "data-science-and-machine-learning",
        },
      },
    ];

    // Set mock data
    setProducts(mockProducts);
    setTotal(mockProducts.reduce((sum, product) => sum + product.price, 0));
    setPayableAmount(
      mockProducts.reduce((sum, product) => sum + product.price, 0)
    );

    // Simulate coupon application
    const mockCoupon = "WELCOME10";
    const mockDiscountPercent = 10;
    const mockDiscountAmount =
      (mockProducts.reduce((sum, product) => sum + product.price, 0) *
        mockDiscountPercent) /
      100;

    setCoupon(mockCoupon);
    setDiscountPercent(mockDiscountPercent);
    setDiscountAmount(mockDiscountAmount);

    // Set currency warnings based on session
    setShowCurrencyWarnings({
      stripe: true,
      mollie: false,
      paypal: true,
      instamojo: false,
    });

    setLoading(false);
  }, []);

  // Update total when discount changes
  useEffect(() => {
    updateTotal();
  }, [discountAmount]);

  // Currency support information
  const currencySupport = {
    stripe: ["USD", "EUR", "GBP", "AUD", "CAD"],
    mollie: ["EUR", "USD", "GBP", "CZK", "DKK", "NOK", "SEK"],
    paypal: ["USD", "EUR", "AUD", "BRL", "CAD", "CZK", "DKK", "HKD"],
    instamojo: ["INR"],
  };

  return (
    <section className="checkout-sec tp-space mt-85">
      <div className="container">
        <h2 className="title mb-3">Checkout</h2>

        {/* Currency Support Warnings */}
        {showCurrencyWarnings.stripe && (
          <div className="alert alert-warning">
            Stripe Support only those type of currencies:{" "}
            {currencySupport.stripe.join(", ")}
          </div>
        )}

        {showCurrencyWarnings.mollie && (
          <div className="alert alert-warning">
            Mollie Support only those type of currencies:{" "}
            {currencySupport.mollie.join(", ")}
          </div>
        )}

        {showCurrencyWarnings.paypal && (
          <div className="alert alert-warning">
            Paypal Support only those type of currencies:{" "}
            {currencySupport.paypal.join(", ")}
          </div>
        )}

        {showCurrencyWarnings.instamojo && (
          <div className="alert alert-warning">
            Instamojo Support only those type of currencies:{" "}
            {currencySupport.instamojo.join(", ")}
          </div>
        )}

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading checkout...</p>
          </div>
        ) : (
          <div className="row">
            {/* Order Details */}
            <div className="col-lg-7">
              <div className="checkout-bg">
                <h4 className="summary-title">Order Details</h4>
                {products.map((product) => (
                  <div className="cart-table-view" key={product.id}>
                    <div>
                      <img
                        src={product.options.image || "/placeholder.svg"}
                        className="img-60 rounded me-2"
                        alt={product.name}
                      />
                      <span>{product.name}</span>
                    </div>
                    <div>
                      <p className="price mb-0">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Summary and Payment Options */}
            <div className="col-lg-5">
              <div className="summary-card mt-0">
                <h4 className="summary-title">Bill Summary</h4>

                {coupon ? (
                  <p>
                    <span>Discount</span>
                    <br />
                    <small>
                      {coupon} ({discountPercent} %)
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
                    </small>
                    <span>{formatCurrency(discountAmount)}</span>
                  </p>
                ) : (
                  <p>
                    <span>Discount</span>
                    <span>{formatCurrency(0)}</span>
                  </p>
                )}

                <p className="grn-txt">
                  <span className="grn-txt">Total:</span>
                  <span>{formatCurrency(total)}</span>
                </p>
              </div>

              <div className="summary-card payment-option">
                <h4 className="summary-title mb-3">Payment Option</h4>

                {payableAmount > 0 ? (
                  <>
                    {/* Stripe Payment */}
                    {paymentMethods.stripe.status === "active" && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="stripe"
                        />
                        <label className="form-check-label" htmlFor="stripe">
                          <a
                            className="wsus__single_payment"
                            data-bs-toggle="modal"
                            data-bs-target="#stripeModal"
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              src={paymentMethods.stripe.image}
                              className="me-2 w-100"
                              alt="Stripe"
                            />
                          </a>
                        </label>
                      </div>
                    )}

                    {/* PayPal Payment */}
                    {paymentMethods.paypal.status === "active" && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="paypal"
                        />
                        <label className="form-check-label" htmlFor="paypal">
                          <Link
                            to="/pay-via-paypal"
                            className="wsus__single_payment"
                          >
                            <img
                              src={
                                paymentMethods.paypal.image ||
                                "/placeholder.svg"
                              }
                              className="me-2"
                              alt="PayPal"
                            />
                            Pay with paypal
                          </Link>
                        </label>
                      </div>
                    )}

                    {/* Bank Payment */}
                    {paymentMethods.bank.status === "active" && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="bank"
                        />
                        <label className="form-check-label" htmlFor="bank">
                          <a
                            className="wsus__single_payment"
                            data-bs-toggle="modal"
                            data-bs-target="#bankModal"
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              src={
                                paymentMethods.bank.image || "/placeholder.svg"
                              }
                              className="me-2"
                              alt="Bank"
                            />
                            Pay with bank
                          </a>
                        </label>
                      </div>
                    )}

                    {/* Razorpay Payment */}
                    {paymentMethods.razorpay.status === "active" && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="razorpayBtncall"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="razorpayBtncall"
                        >
                          <a
                            className="wsus__single_payment"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRazorpayPayment();
                            }}
                            id="razorpayBtn"
                          >
                            <img
                              src={
                                paymentMethods.razorpay.image ||
                                "/placeholder.svg"
                              }
                              className="me-2"
                              alt="Razorpay"
                            />
                            Pay with Razorpay
                          </a>
                        </label>
                      </div>
                    )}

                    {/* Mollie Payment */}
                    {paymentMethods.mollie.status === "active" && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="mobile"
                        />
                        <label className="form-check-label" htmlFor="mobile">
                          <Link
                            to="/pay-via-mollie"
                            className="wsus__single_payment"
                          >
                            <img
                              src={
                                paymentMethods.mollie.image ||
                                "/placeholder.svg"
                              }
                              className="me-2"
                              alt="Mollie"
                            />
                            Pay with Mobile
                          </Link>
                        </label>
                      </div>
                    )}

                    {/* Instamojo Payment */}
                    {paymentMethods.instamojo.status === "active" && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="Instamojo"
                        />
                        <label className="form-check-label" htmlFor="Instamojo">
                          <Link
                            to="/pay-via-instamojo"
                            className="wsus__single_payment"
                          >
                            <img
                              src={
                                paymentMethods.instamojo.image ||
                                "/placeholder.svg"
                              }
                              className="me-2"
                              alt="Instamojo"
                            />
                            Pay with Instamojo
                          </Link>
                        </label>
                      </div>
                    )}

                    {/* Flutterwave Payment */}
                    {paymentMethods.flutterwave.status === "active" && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="flutterwave"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flutterwave"
                        >
                          <a
                            href="#"
                            className="wsus__single_payment"
                            onClick={(e) => {
                              e.preventDefault();
                              handleFlutterwavePayment();
                            }}
                          >
                            <img
                              src={
                                paymentMethods.flutterwave.image ||
                                "/placeholder.svg"
                              }
                              className="me-2"
                              alt="Flutterwave"
                            />
                            Pay with flutterwave
                          </a>
                        </label>
                      </div>
                    )}

                    {/* Paystack Payment */}
                    {paymentMethods.paystack.status === "active" && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="paystack"
                        />
                        <label className="form-check-label" htmlFor="paystack">
                          <a
                            href="#"
                            className="wsus__single_payment"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePaystackPayment();
                            }}
                          >
                            <img
                              src={
                                paymentMethods.paystack.image ||
                                "/placeholder.svg"
                              }
                              className="me-2"
                              alt="Paystack"
                            />
                            Pay with Paystack
                          </a>
                        </label>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="col-lg-3 col-6 col-sm-4">
                    <form>
                      <button className="wsus__single_payment border-0">
                        <img
                          src="/placeholder.svg?height=60&width=100&query=free%20course"
                          alt="Free Course"
                          className="img-fluid w-100"
                        />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stripe Modal */}
      <div
        className="modal fade"
        id="stripeModal"
        tabIndex="-1"
        aria-labelledby="stripeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <h3>Stripe Payment</h3>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                role="form"
                className="require-validation"
                onSubmit={handleStripeSubmit}
              >
                <div className="row">
                  <div className="mt-2 col-md-12">
                    <div className="form-group required">
                      <label htmlFor="card_number">
                        Card Number<span className="text-danger">*</span>
                      </label>
                      <input
                        id="card_number"
                        className="form-control card-number"
                        size="20"
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        autoComplete="off"
                        value={stripeFormData.cardNumber}
                        onChange={handleStripeInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-4 col-md-12">
                    <div className="form-group expiration required">
                      <label htmlFor="month">
                        Month<span className="text-danger">*</span>
                      </label>
                      <input
                        id="month"
                        className="form-control card-expiry-month"
                        size="2"
                        type="text"
                        name="month"
                        placeholder="MM"
                        autoComplete="off"
                        value={stripeFormData.month}
                        onChange={handleStripeInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-4 col-md-12">
                    <div className="form-group expiration required">
                      <label htmlFor="year">
                        Year<span className="text-danger">*</span>
                      </label>
                      <input
                        id="year"
                        className="form-control card-expiry-year"
                        size="4"
                        type="text"
                        name="year"
                        autoComplete="off"
                        placeholder="YY"
                        value={stripeFormData.year}
                        onChange={handleStripeInputChange}
                      />
                    </div>
                  </div>

                  <div className="my-4 col-md-12">
                    <div className="form-group cvc required">
                      <label htmlFor="cvc">
                        CVC<span className="text-danger">*</span>
                      </label>
                      <input
                        id="cvc"
                        autoComplete="off"
                        className="form-control card-cvc"
                        size="4"
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                        value={stripeFormData.cvc}
                        onChange={handleStripeInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row row">
                  <div className="col-md-12 error form-group d-none">
                    <div className="alert-danger alert">
                      Please correct the errors and try again.
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary btn-block"
                    id="stripePaymentSubmitButton"
                    type="submit"
                  >
                    Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Modal */}
      <div className="payment_modal">
        <div
          className="modal fade"
          id="bankModal"
          tabIndex="-1"
          aria-labelledby="bankModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="bankModalLabel">
                  Pay via direct bank
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Please transfer the total amount to our bank account. Your
                  order will be processed after we receive the payment.
                  <br />
                  <br />
                  <strong>Bank Name:</strong> Example Bank
                  <br />
                  <strong>Account Name:</strong> Basementex Inc.
                  <br />
                  <strong>Account Number:</strong> 1234567890
                  <br />
                  <strong>Routing Number:</strong> 987654321
                  <br />
                  <strong>Branch:</strong> Main Branch
                  <br />
                </p>

                <form onSubmit={handleBankSubmit}>
                  {/* Bank Name */}
                  <div className="my-1 form-group">
                    <label htmlFor="bank_name">
                      Bank Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="bank_name"
                      name="bankName"
                      placeholder="Your bank name"
                      required
                      value={bankFormData.bankName}
                      onChange={handleBankInputChange}
                    />
                  </div>

                  {/* Account Number */}
                  <div className="my-1 form-group">
                    <label htmlFor="account_number">
                      Account Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="account_number"
                      name="accountNumber"
                      placeholder="Your bank account number"
                      required
                      value={bankFormData.accountNumber}
                      onChange={handleBankInputChange}
                    />
                  </div>

                  {/* Routing Number */}
                  <div className="my-1 form-group">
                    <label htmlFor="routing_number">Routing Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="routing_number"
                      name="routingNumber"
                      placeholder="Your bank routing number"
                      value={bankFormData.routingNumber}
                      onChange={handleBankInputChange}
                    />
                  </div>

                  {/* Branch */}
                  <div className="my-1 form-group">
                    <label htmlFor="branch">
                      Branch <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="branch"
                      name="branch"
                      placeholder="Your bank branch name"
                      required
                      value={bankFormData.branch}
                      onChange={handleBankInputChange}
                    />
                  </div>

                  <button className="mt-2 btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
