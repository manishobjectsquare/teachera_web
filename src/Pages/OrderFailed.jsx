import React from 'react';
import { Link } from 'react-router-dom';

// Import images
import failImage from '../assets/images/fail.png';

const OrderFailed = () => {
  return (
    <>
    <div class="breadcrumb__shape-wrap">
        <img src="http://104.248.23.97:8100/frontend/img/others/breadcrumb_shape01.svg" alt="img" class="alltuchtopdown" />
        <img src="http://104.248.23.97:8100/frontend/img/others/breadcrumb_shape02.svg" alt="img" data-aos="fade-right" data-aos-delay="300" />
        <img src="http://104.248.23.97:8100/frontend/img/others/breadcrumb_shape03.svg" alt="img" data-aos="fade-up" data-aos-delay="400" />
        <img src="http://104.248.23.97:8100/frontend/img/others/breadcrumb_shape04.svg" alt="img" data-aos="fade-down-left" data-aos-delay="400" />
        <img src="http://104.248.23.97:8100/frontend/img/others/breadcrumb_shape05.svg" alt="img" data-aos="fade-left" data-aos-delay="400" />
    </div>
    <div className="checkout__area section-py-120 mb-5">
      <div className="container">
        <div className="row">
          <div className="text-center">
            <img 
              src={failImage || "/placeholder.svg?height=200&width=200&query=payment%20failed"} 
              alt="Payment Failed" 
            />
            <h6 className="mt-2">Your order has been fail</h6>
            <p>Please try again for more details connect with us</p>
            <Link to="/student/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default OrderFailed;