"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/images/login-img-01.png";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { useUser } from "../Context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, authLoading } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Use the login function from context with the entire formData object
    const success = await login(formData);
    if (success) {
      navigate("/student/enrolled-courses");
    }
  };

  const { t } = useTranslation();
  return (
    <>
      <section className="login-sec mt-85">
        <div className="container">
          <div className="login-innr">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-5 d-lg-block d-xl-block d-none">
                <img src={loginImg || "/placeholder.svg"} alt="Login" />
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="login-frm">
                  <h3>{t("Log in to your Teachera Account")}</h3>
                  <form onSubmit={handleSubmit} className="account__form">
                    <div className="frm-bx">
                      <label htmlFor="email">{t("Email Address")}</label>
                      <input
                        id="email"
                        type="text"
                        placeholder={t("email")}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </div>
                    <div className="frm-bx">
                      <label htmlFor="password">{t("Password")}</label>
                      <input
                        id="password"
                        type="password"
                        placeholder={t("Password")}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.password && (
                        <div className="text-danger">{errors.password}</div>
                      )}
                    </div>
                    <div className="frm-bx text-center mt-5">
                      <button
                        type="submit"
                        className="thm-btn w-100"
                        disabled={authLoading}
                      >
                        {authLoading ? t("Logging in...") : t("Login")}
                      </button>
                      <div className="text-end mt-2">
                        <Link to="/forgot-password" className="text-primary">
                          {t("Forgot Password")}
                        </Link>
                      </div>
                    </div>
                  </form>
                  <p className="mt-4 text-center">
                    {t(" Don't have an account?")}{" "}
                    <Link to="/register" className="text-primary fw-600">
                      {t("Sign Up")}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
