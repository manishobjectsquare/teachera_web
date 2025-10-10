import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from "../assets/images/error_img.svg"
const ErrorPage = () => {
  return (
    <section className="error-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="error-wrap text-center">
              <div className="error-img">
                <img src="/frontend/img/others/error_img.svg" alt="Error" />
              </div>
              <div className="error-content">
                <h2 className="title">
                  ERROR PAGE! <span>Sorry This Page is Not Available!</span>
                </h2>
                <div className="tg-button-wrap">
                  <Link to="/" className="btn arrow-btn">
                    Go To Home Page 
                    <img src={errorImg} alt="Arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;