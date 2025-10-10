// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import registerImg from '../assets/images/login-img-02.png';
// // import googleIcon from '../assets/images/google-icon.svg';
// import { useTranslation } from 'react-i18next';
// import { toast, ToastContainer } from 'react-toastify';

// const RegisterPage = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         role: ''
//     });
//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});

//     // Settings state - in a real app, this would come from your API or context
//     // const settings = {
//     //     google_login_status: 'active', // Assuming Google login is active
//     //     app_name: 'Teachera'
//     // };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('https://api.basementex.com/api/v1/web/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData)
//             })
//             const data = await response.json();
//             if (data.status === true) {
//                 toast.success(data.message)
//                 localStorage.setItem("Token", data.data.token)
//                 navigate("/")
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             console.log(error)
//         }

//         // Example validation
//         const newErrors = {};
//         if (!formData.name) {
//             newErrors.name = 'Name is required';
//         }
//         if (!formData.email) {
//             newErrors.email = 'Email is required';
//         }
//         if (!formData.password) {
//             newErrors.password = 'Password is required';
//         }
//         // if (formData.password !== formData.password_confirmation) {
//         //     newErrors.password_confirmation = 'Passwords do not match';
//         // }

//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }

//         // Proceed with registration logic
//         // You would typically make an API call here
//     };
//     const { t } = useTranslation();
//     return (
//         <>
//             <ToastContainer />
//             <section className="login-sec mt-85">
//                 <div className="container">
//                     <div className="login-innr">
//                         <div className="row justify-content-between align-items-center">
//                             <div className="col-lg-5 d-lg-block d-xl-block d-none">
//                                 <img src={registerImg || "/placeholder.svg"} alt="Register" />
//                             </div>
//                             <div className="col-lg-4 col-md-12">
//                                 <div className="login-frm">
//                                     <h3>{t('Sign up to your new Teachera Account')}</h3>
//                                     <form onSubmit={handleSubmit} className="account__form">
//                                         <div className="frm-bx">
//                                             <label htmlFor="fast-name">{t('Name')}</label>
//                                             <input
//                                                 type="text"
//                                                 id="fast-name"
//                                                 placeholder={t('full name')}
//                                                 name="name"
//                                                 value={formData.name}
//                                                 onChange={handleChange}
//                                                 className="form-control"
//                                             />
//                                             {errors.name && <div className="text-danger">{errors.name}</div>}
//                                         </div>
//                                         <div className="frm-bx">
//                                             <label htmlFor="email">{t('Email Address')}</label>
//                                             <input
//                                                 type="email"
//                                                 id="email"
//                                                 placeholder={t('email')}
//                                                 name="email"
//                                                 value={formData.email}
//                                                 onChange={handleChange}
//                                                 className="form-control"
//                                             />
//                                             {errors.email && <div className="text-danger">{errors.email}</div>}
//                                         </div>
//                                         <div className="frm-bx">
//                                             <label htmlFor="password">{t('Create Password')}</label>
//                                             <input
//                                                 type="password"
//                                                 id="password"
//                                                 placeholder={t('Password')}
//                                                 name="password"
//                                                 value={formData.password}
//                                                 onChange={handleChange}
//                                                 className="form-control"
//                                             />
//                                             {errors.password && <div className="text-danger">{errors.password}</div>}
//                                         </div>
//                                         <div className="frm-bx">
//                                             <label htmlFor="role">{t('Confirm Password')}</label>
//                                             <input
//                                                 type="password"
//                                                 id="role"
//                                                 placeholder="Role"
//                                                 name="role"
//                                                 value={formData.password_confirmation}
//                                                 onChange={handleChange}
//                                                 className="form-control"
//                                             />
//                                             {/* {errors.role && <div className="text-danger">{errors.role}</div>} */}
//                                         </div>
//                                         <div className="frm-bx text-center mt-5">
//                                             <button type="submit" className="thm-btn w-100">{t('Sign Up')}</button>
//                                         </div>
//                                     </form>
//                                     {/* <p className="or-option text-center"><span>{t('OR')}</span></p> */}
//                                     <div className="social-login text-center">
//                                         {/* {settings.google_login_status === 'active' && (
//                                         <a href="#" className="account__social-btn">
//                                             <img src={googleIcon || "/placeholder.svg"} alt="Google" />
//                                             {t('Continue with google')}
//                                         </a>
//                                     )} */}
//                                         <p className="mt-4">
//                                             {t('Already have an account?')} <Link to="/login" className="text-primary fw-600">{t('Login')}</Link>
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default RegisterPage;

"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/images/login-img-02.png";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { useUser } from "../Context/UserContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "tester", // Default role
  });
  const navigate = useNavigate();
  const { register, authLoading } = useUser();
  const [errors, setErrors] = useState({});
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example validation
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (formData.password !== passwordConfirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }
    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Use the register function from context
    const success = await register(formData);
    if (success) {
      navigate("/");
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
                <img src={registerImg || "/placeholder.svg"} alt="Register" />
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="login-frm">
                  <h3>{t("Sign up to your new Teachera Account")}</h3>
                  <form onSubmit={handleSubmit} className="account__form">
                    <div className="frm-bx">
                      <label htmlFor="fast-name">{t("Name")}</label>
                      <input
                        type="text"
                        id="fast-name"
                        placeholder={t("full name")}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.name && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </div>
                    <div className="frm-bx">
                      <label htmlFor="email">{t("Email Address")}</label>
                      <input
                        type="email"
                        id="email"
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
                      <label htmlFor="password">{t("Create Password")}</label>
                      <input
                        type="password"
                        id="password"
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
                    <div className="frm-bx">
                      <label htmlFor="password_confirmation">
                        {t("Confirm Password")}
                      </label>
                      <input
                        type="password"
                        id="password_confirmation"
                        placeholder={t("Confirm Password")}
                        name="password_confirmation"
                        value={passwordConfirmation}
                        onChange={handlePasswordConfirmationChange}
                        className="form-control"
                      />
                      {errors.password_confirmation && (
                        <div className="text-danger">
                          {errors.password_confirmation}
                        </div>
                      )}
                    </div>
                    <div className="frm-bx">
                      <label htmlFor="role">{t("Role")}</label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="form-control"
                      >
                        {/* <option value="tester">Tester</option> */}
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                      </select>
                      {errors.role && (
                        <div className="text-danger">{errors.role}</div>
                      )}
                    </div>
                    <div className="frm-bx text-center mt-5">
                      <button
                        type="submit"
                        className="thm-btn w-100"
                        disabled={authLoading}
                      >
                        {authLoading ? t("Signing up...") : t("Sign Up")}
                      </button>
                    </div>
                  </form>
                  <div className="social-login text-center">
                    <p className="mt-4">
                      {t("Already have an account?")}{" "}
                      <Link to="/login" className="text-primary fw-600">
                        {t("Login")}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
