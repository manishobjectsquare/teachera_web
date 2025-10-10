import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../assets/images/login-img-01.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Settings state - in a real app, this would come from your API or context
    const settings = {
        app_name: 'Teachera'
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email) {
            setError('Email is required');
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Here you would handle form submission, API calls, etc.
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Password reset link sent to:', email);
            setSuccessMessage('Password reset link has been sent to your email');
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <section className="login-sec mt-85">
            <div className="container">
                <div className="login-innr">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-5 d-lg-block d-xl-block d-none">
                            <img src={loginImg || "/placeholder.svg"} alt="Forgot Password" />
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="login-frm">
                                <h3>Forgot Password</h3>
                                {successMessage ? (
                                    <div className="alert alert-success" role="alert">
                                        {successMessage}
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="account__form">
                                        <div className="frm-bx">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                id="email"
                                                type="text"
                                                placeholder="email"
                                                value={email}
                                                onChange={handleChange}
                                                name="email"
                                                className="form-control"
                                            />
                                            {error && <div className="text-danger">{error}</div>}
                                        </div>

                                        <div className="frm-bx text-center mt-5">
                                            <button
                                                type="submit"
                                                className="thm-btn w-100"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                                <div className="social-login text-center">
                                    <p className="mt-4">
                                        Already have an account? <Link to="/login" className="text-primary fw-600">Sign in</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;