import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const OldCheckOut = () => {
 
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  
  
  const cart = {
    items: [
      { id: 1, name: "Course 1", price: 49.99 },
      { id: 2, name: "Course 2", price: 29.99 }
    ],
    total: "$79.98",
    payableAmount: 79.98,
    coupon: "SAVE20",
    discountPercent: 20,
    discountAmount: "$16.00"
  };
  

  const paymentGateways = {
    basicPayment: {
      stripeStatus: 'active',
      stripeImage: '/uploads/payment-gateways/stripe.png',
      paypalStatus: 'active',
      paypalImage: '/uploads/payment-gateways/paypal.png',
      bankStatus: 'active',
      bankImage: '/uploads/payment-gateways/bank.png',
      bankInformation: 'Bank Name: Example Bank<br>Account Number: 1234567890<br>Routing Number: 123456789<br>Branch: Main Branch'
    },
    razorpayCredentials: {
      razorpayStatus: 'active',
      razorpayImage: '/uploads/payment-gateways/razorpay.png',
      razorpayKey: 'rzp_test_key',
      currencyCode: 'USD',
      payableWithCharge: 81.98,
      razorpayName: 'Teachera',
      razorpayDescription: 'Course Payment',
      razorpayThemeColor: '#3498db'
    },
    mollieCredentials: {
      mollieStatus: 'active',
      mollieImage: '/uploads/payment-gateways/mollie.png'
    },
    instamojoCredentials: {
      instamojoStatus: 'active',
      instamojoImage: '/uploads/payment-gateways/instamojo.png'
    },
    flutterwaveCredentials: {
      flutterwaveStatus: 'active',
      flutterwaveImage: '/uploads/payment-gateways/flutterwave.png'
    },
    paystackCredentials: {
      paystackStatus: 'active',
      paystackImage: '/uploads/payment-gateways/paystack.png'
    }
  };
  

  const currencyNotifications = {
    showStripeCurrency: true,
    showMollieCurrency: false,
    showPaypalCurrency: false,
    showInstamojoCurrency: false,
    stripeSupportedCurrencies: ['USD', 'EUR', 'GBP', 'AUD', 'CAD'],
    mollieSupportedCurrencies: ['EUR', 'USD', 'GBP'],
    paypalSupportedCurrencies: ['USD', 'EUR', 'GBP', 'AUD', 'CAD'],
    instamojoSupportedCurrencies: ['INR']
  };
  

  const payableWithCharges = {
    stripe: 81.98,
    paypal: 82.38,
    bank: 79.98,
    razorpay: 81.58,
    mollie: 82.18,
    instamojo: 81.38,
    flutterwave: 81.78,
    paystack: 81.98
  };
  

  const [bankForm, setBankForm] = useState({
    bank_name: '',
    account_number: '',
    routing_number: '',
    branch: ''
  });
  

  const [stripeForm, setStripeForm] = useState({
    card_number: '',
    month: '',
    year: '',
    cvc: ''
  });
  

  const handleBankFormChange = (e) => {
    const { name, value } = e.target;
    setBankForm({
      ...bankForm,
      [name]: value
    });
  };
  

  const handleStripeFormChange = (e) => {
    const { name, value } = e.target;
    setStripeForm({
      ...stripeForm,
      [name]: value
    });
  };
  

  const handleBankSubmit = (e) => {
    e.preventDefault();
    console.log('Bank form submitted:', bankForm);
    
    setShowBankModal(false);
  };
  
  const handleStripeSubmit = (e) => {
    e.preventDefault();
    console.log('Stripe form submitted:', stripeForm);
   
    setShowStripeModal(false);
  };
  

  const handleRazorpayPayment = () => {
    console.log('Razorpay payment initiated');
  
  };

  const handleFlutterwavePayment = () => {
    console.log('Flutterwave payment initiated');
   
  };
  

  const handlePaystackPayment = () => {
    console.log('Paystack payment initiated');

  };

  return (
    <>
      {/* Checkout Area */}
      <div className="checkout__area section-py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div id="show_currency_notifications">
                {currencyNotifications.showStripeCurrency && (
                  <div className="alert alert-warning">
                    Stripe Support only those type of currencies :
                    {currencyNotifications.stripeSupportedCurrencies.join(', ')}
                  </div>
                )}
                {currencyNotifications.showMollieCurrency && (
                  <div className="alert alert-warning">
                    Mollie Support only those type of currencies :
                    {currencyNotifications.mollieSupportedCurrencies.join(', ')}
                  </div>
                )}
                {currencyNotifications.showPaypalCurrency && (
                  <div className="alert alert-warning">
                    Paypal Support only those type of currencies :
                    {currencyNotifications.paypalSupportedCurrencies.join(', ')}
                  </div>
                )}
                {currencyNotifications.showInstamojoCurrency && (
                  <div className="alert alert-warning">
                    Instamojo Support only those type of currencies :
                    {currencyNotifications.instamojoSupportedCurrencies.join(', ')}
                  </div>
                )}
              </div>
              
              <div className="wsus__payment_area">
                <div className="row">
                  {cart.payableAmount > 0 ? (
                    <>
                      {paymentGateways.basicPayment.stripeStatus === 'active' && (
                        <div className="col-lg-3 col-6 col-sm-4">
                          <a 
                            className="wsus__single_payment" 
                            href="javascript:;" 
                            onClick={() => setShowStripeModal(true)}
                          >
                            <img 
                              src={paymentGateways.basicPayment.stripeImage || "/placeholder.svg"} 
                              alt="Pay with stripe" 
                              className="img-fluid w-100" 
                            />
                          </a>
                        </div>
                      )}
                      
                      {paymentGateways.basicPayment.paypalStatus === 'active' && (
                        <div className="col-lg-3 col-6 col-sm-4">
                          <a 
                            className="wsus__single_payment" 
                            href="/pay-via-paypal"
                          >
                            <img 
                              src={paymentGateways.basicPayment.paypalImage || "/placeholder.svg"} 
                              alt="Pay with paypal" 
                              className="img-fluid w-100" 
                            />
                          </a>
                        </div>
                      )}
                      
                      {paymentGateways.basicPayment.bankStatus === 'active' && (
                        <div className="col-lg-3 col-6 col-sm-4">
                          <a 
                            className="wsus__single_payment" 
                            href="javascript:;" 
                            onClick={() => setShowBankModal(true)}
                          >
                            <img 
                              src={paymentGateways.basicPayment.bankImage || "/placeholder.svg"} 
                              alt="Pay with bank" 
                              className="img-fluid w-100" 
                            />
                          </a>
                        </div>
                      )}
                      
                      {paymentGateways.razorpayCredentials.razorpayStatus === 'active' && (
                        <div className="col-lg-3 col-6 col-sm-4">
                          <a 
                            href="javascript:;" 
                            className="wsus__single_payment" 
                            onClick={handleRazorpayPayment}
                          >
                            <img 
                              src={paymentGateways.razorpayCredentials.razorpayImage || "/placeholder.svg"} 
                              alt="payment method" 
                              className="img-fluid w-100" 
                            />
                          </a>
                        </div>
                      )}
                      
                      {paymentGateways.mollieCredentials.mollieStatus === 'active' && (
                        <div className="col-lg-3 col-6 col-sm-4">
                          <a 
                            href="/pay-via-mollie" 
                            className="wsus__single_payment"
                          >
                            <img 
                              src={paymentGateways.mollieCredentials.mollieImage || "/placeholder.svg"} 
                              alt="payment method" 
                              className="img-fluid w-100" 
                            />
                          </a>
                        </div>
                      )}
                      
                      {paymentGateways.instamojoCredentials.instamojoStatus === 'active' && (
                        <div className="col-lg-3 col-6 col-sm-4">
                          <a 
                            href="/pay-via-instamojo" 
                            className="wsus__single_payment"
                          >
                            <img 
                              src={paymentGateways.instamojoCredentials.instamojoImage || "/placeholder.svg"} 
                              alt="instamojo method" 
                              className="img-fluid w-100" 
                            />
                          </a>
                        </div>
                      )}
                      
                      {paymentGateways.flutterwaveCredentials.flutterwaveStatus === 'active' && (
                        <div className="col-lg-3 col-6 col-sm-4">
                          <a 
                            href="javascript:;" 
                            className="wsus__single_payment" 
                            onClick={handleFlutterwavePayment}
                          >
                            <img 
                              src={paymentGateways.flutterwaveCredentials.flutterwaveImage || "/placeholder.svg"} 
                              alt="flutterwave method" 
                              className="img-fluid w-100" 
                            />
                          </a>
                        </div>
                      )}
                      
                      {paymentGateways.paystackCredentials.paystackStatus === 'active' && (
                        <div className="col-lg-3 col-6 col-sm-4">
                          <a 
                            href="javascript:;" 
                            className="wsus__single_payment" 
                            onClick={handlePaystackPayment}
                          >
                            <img 
                              src={paymentGateways.paystackCredentials.paystackImage || "/placeholder.svg"} 
                              alt="paystack method" 
                              className="img-fluid w-100" 
                            />
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="col-lg-3 col-6 col-sm-4">
                      <form action="/pay-via-free-gateway" method="POST">
                        <button className="wsus__single_payment border-0">
                          <img 
                            src="/uploads/website-images/buy_now.png" 
                            alt="Pay with stripe" 
                            className="img-fluid w-100" 
                          />
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="cart__collaterals-wrap payment_slidebar">
                <h2 className="title">Cart totals</h2>
                <ul className="list-wrap pb-0">
                  <li>Total Items<span>{cart.items.length}</span></li>
                  <li>
                    <p className="coupon-discount m-0">
                      <span>Discount</span>
                      {cart.coupon && (
                        <>
                          <br />
                          <small>
                            {cart.coupon} ({cart.discountPercent} %)
                            <a className="ms-2 text-danger" href="/remove-coupon">×</a>
                          </small>
                        </>
                      )}
                    </p>
                    <span className="discount-amount">
                      {cart.coupon ? cart.discountAmount : "$0.00"}
                    </span>
                  </li>
                  <li>Total <span className="amount">{cart.total}</span></li>
                  
                  {cart.payableAmount > 0 && (
                    <>
                      <h6 className="bold payable-bold">payable with gateway charge:</h6>
                      
                      {paymentGateways.basicPayment.stripeStatus === 'active' && (
                        <p className="payable-text">
                          Stripe: <span>{payableWithCharges.stripe} USD</span>
                        </p>
                      )}
                      
                      {paymentGateways.basicPayment.paypalStatus === 'active' && (
                        <p className="payable-text">
                          Paypal: <span>{payableWithCharges.paypal} USD</span>
                        </p>
                      )}
                      
                      {paymentGateways.basicPayment.bankStatus === 'active' && (
                        <p className="payable-text">
                          Bank: <span>{payableWithCharges.bank} USD</span>
                        </p>
                      )}
                      
                      {paymentGateways.razorpayCredentials.razorpayStatus === 'active' && (
                        <p className="payable-text">
                          Razorpay: <span>{payableWithCharges.razorpay} USD</span>
                        </p>
                      )}
                      
                      {paymentGateways.mollieCredentials.mollieStatus === 'active' && (
                        <p className="payable-text">
                          Mollie: <span>{payableWithCharges.mollie} USD</span>
                        </p>
                      )}
                      
                      {paymentGateways.instamojoCredentials.instamojoStatus === 'active' && (
                        <p className="payable-text">
                          Instamojo: <span>{payableWithCharges.instamojo} USD</span>
                        </p>
                      )}
                      
                      {paymentGateways.flutterwaveCredentials.flutterwaveStatus === 'active' && (
                        <p className="payable-text">
                          Flutterwave: <span>{payableWithCharges.flutterwave} USD</span>
                        </p>
                      )}
                      
                      {paymentGateways.paystackCredentials.paystackStatus === 'active' && (
                        <p className="payable-text">
                          Paystack: <span>{payableWithCharges.paystack} USD</span>
                        </p>
                      )}
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stripe Modal */}
      <Modal show={showStripeModal} onHide={() => setShowStripeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Stripe Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleStripeSubmit}>
            <div className="row">
              <div className="mt-2 col-md-12">
                <div className="form-group required">
                  <label htmlFor="card_number">Card Number<span className="text-danger">*</span></label>
                  <input 
                    id="card_number" 
                    className="form-control card-number" 
                    size="20" 
                    type="text" 
                    name="card_number" 
                    placeholder="Card Number" 
                    value={stripeForm.card_number}
                    onChange={handleStripeFormChange}
                    required
                  />
                </div>
              </div>
              <div className="mt-4 col-md-12">
                <div className="form-group expiration required">
                  <label htmlFor="month">Month<span className="text-danger">*</span></label>
                  <input 
                    id="month" 
                    className="form-control card-expiry-month" 
                    size="2" 
                    type="text" 
                    name="month" 
                    placeholder="MM" 
                    value={stripeForm.month}
                    onChange={handleStripeFormChange}
                    required
                  />
                </div>
              </div>
              <div className="mt-4 col-md-12">
                <div className="form-group expiration required">
                  <label htmlFor="year">Year<span className="text-danger">*</span></label>
                  <input 
                    id="year" 
                    className="form-control card-expiry-year" 
                    size="4" 
                    type="text" 
                    name="year" 
                    placeholder="YY" 
                    value={stripeForm.year}
                    onChange={handleStripeFormChange}
                    required
                  />
                </div>
              </div>
              <div className="my-4 col-md-12">
                <div className="form-group cvc required">
                  <label htmlFor="cvc">CVC<span className="text-danger">*</span></label>
                  <input 
                    id="cvc" 
                    className="form-control card-cvc" 
                    size="4" 
                    type="text" 
                    name="cvc" 
                    placeholder="CVC" 
                    value={stripeForm.cvc}
                    onChange={handleStripeFormChange}
                    required
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
                onClick={() => setShowStripeModal(false)}
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
        </Modal.Body>
      </Modal>
      
      {/* Bank Modal */}
      <Modal show={showBankModal} onHide={() => setShowBankModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pay via direct bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: paymentGateways.basicPayment.bankInformation }} />
          
          <form onSubmit={handleBankSubmit}>
            <div className="my-1 form-group">
              <label htmlFor="bank_name">Bank Name <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className="form-control" 
                id="bank_name" 
                name="bank_name" 
                placeholder="Your bank name" 
                value={bankForm.bank_name}
                onChange={handleBankFormChange}
                required 
              />
            </div>
            
            <div className="my-1 form-group">
              <label htmlFor="account_number">Account Number <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className="form-control" 
                id="account_number" 
                name="account_number" 
                placeholder="Your bank account number" 
                value={bankForm.account_number}
                onChange={handleBankFormChange}
                required 
              />
            </div>
            
            <div className="my-1 form-group">
              <label htmlFor="routing_number">Routing Number</label>
              <input 
                type="text" 
                className="form-control" 
                id="routing_number" 
                name="routing_number" 
                placeholder="Your bank routing number" 
                value={bankForm.routing_number}
                onChange={handleBankFormChange}
              />
            </div>
            
            <div className="my-1 form-group">
              <label htmlFor="branch">Branch <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className="form-control" 
                id="branch" 
                name="branch" 
                placeholder="Your bank branch name" 
                value={bankForm.branch}
                onChange={handleBankFormChange}
                required 
              />
            </div>
            
            <button className="mt-2 btn btn-primary" type="submit">Submit</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OldCheckOut;