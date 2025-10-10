import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faPhone,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons';

const InstructorFooter = () => {
    const socialLinks = [
        { icon: "/facebook.svg", link: "https://facebook.com" },
        { icon: "/twitter.svg", link: "https://twitter.com" },
        { icon: "/instagram.svg", link: "https://instagram.com" },
        { icon: "/linkedin.svg", link: "https://linkedin.com" }
    ];

    return (
        <footer className="thm-footer cst-gradient">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-abt">
                            <img src="/logo.png" className="brand" alt="Teachera Logo" />
                            <p className="text-white">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            <div className="media">
                                {socialLinks.map((social, index) => (
                                    <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
                                        <img src={social.icon || "/placeholder.svg"} alt="Social Media" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h4 className="ftr-head">Quick Links</h4>
                        <ul className="ftr-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about-us">About</Link></li>
                            <li><Link to="/all-instructors">Teach On Teachera</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <h4 className="ftr-head">Other Links</h4>
                        <ul className="ftr-links">
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/page/terms-and-conditions">Terms & Conditions</Link></li>
                            <li><Link to="/page/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/testimonials">Testimonial</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h4 className="ftr-head">Contact</h4>
                        <div className="ftr-contact">
                            <ul>
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                        Veshali Nagar, Jaipur, India
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+91-9876543210">
                                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                                        +91-9876543210
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:teachera@gmail.com">
                                        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                                        teachera@gmail.com
                                    </a>
                                </li>
                            </ul>
                            <h4 className="ftr-head">Download App</h4>
                        </div>
                        <div className="download-btn">
                            <a href="#"><img src="/playstore2.svg" alt="Google Play" /></a>
                            <a href="#"><img src="/appstore2.svg" alt="App Store" /></a>
                        </div>
                    </div>
                </div>
            </div>

            <section className="copy-right">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="text-white text-center mb-0">
                                © {new Date().getFullYear()} Teachera. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default InstructorFooter;
