import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";


const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        recaptcha: ''
    });

    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({ email: '' });


    const settings = {
        app_name: 'Teachera',
        recaptcha_status: 'active',
        recaptcha_site_key: '6LcXXXXXXXXXXXXXXXXXXXXX'
    };


    useEffect(() => {

        const fetchUserEmail = async () => {
            try {

                const mockEmail = 'user@example.com';
                setUser({ email: mockEmail });
                setFormData(prev => ({ ...prev, email: mockEmail }));
            } catch (error) {
                console.error('Error fetching user email:', error);
            }
        };

        fetchUserEmail();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });


        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleRecaptchaChange = (value) => {
        setFormData({
            ...formData,
            recaptcha: value
        });

        if (errors['recaptcha']) {
            setErrors({
                ...errors,
                recaptcha: ''
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        if (settings.recaptcha_status === 'active' && !formData.recaptcha) {
            newErrors.recaptcha = 'Please complete the reCAPTCHA';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Form submitted:', formData);


    };

    return (
        <>
            {/* Breadcrumb Area */}
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <h2 className="title">Reset Password</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Reset Password</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reset Password Area */}
            <section className="singUp-area section-py-120">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-8">
                            <div className="singUp-wrap">
                                <h2 className="title">Reset Password</h2>
                                <p>Enter your new password below</p>

                                <form onSubmit={handleSubmit} className="account__form">
                                    <div className="form-grp">
                                        <label htmlFor="email">Email <code>*</code></label>
                                        <input
                                            id="email"
                                            type="text"
                                            placeholder="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            readOnly
                                        />
                                        {errors.email && <div className="text-danger">{errors.email}</div>}
                                    </div>

                                    <div className="form-grp">
                                        <label htmlFor="password">Password <code>*</code></label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && <div className="text-danger">{errors.password}</div>}
                                    </div>

                                    <div className="form-grp">
                                        <label htmlFor="confirm-password">Confirm Password <code>*</code></label>
                                        <input
                                            id="confirm-password"
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="password_confirmation"
                                            value={formData.password_confirmation}
                                            onChange={handleChange}
                                        />
                                        {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation}</div>}
                                    </div>

                                    {/* reCAPTCHA */}
                                    {settings.recaptcha_status === 'active' && (
                                        <div className="form-grp mt-3">
                                            <ReCAPTCHA
                                                sitekey={settings.recaptcha_site_key}
                                                onChange={handleRecaptchaChange}
                                            />
                                            {errors.recaptcha && <div className="text-danger">{errors.recaptcha}</div>}
                                        </div>
                                    )}

                                    <button type="submit" className="btn btn-two arrow-btn">
                                        Reset Password

                                    </button>
                                </form>
                                <div className="account__switch">
                                    <p>Already have an account? <Link to="/login">Sign in</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ResetPassword;