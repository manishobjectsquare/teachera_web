import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import logo from '../../assets/images/logo.png';
import facebookIcon from "../../assets/images/ffacebook.png";
import twitterIcon from "../../assets/images/x.svg";
import instagramIcon from "../../assets/images/instagram.svg";
import linkedinIcon from "../../assets/images/linkdin.svg";
import playstoreIcon from "../../assets/images/playstore2.svg";
import appstoreIcon from "../../assets/images/appstore2.svg";
import { useTranslation } from "react-i18next";
import { Facebook } from "react-bootstrap-icons";
import logo from "/newlogo.png";
const Footer = () => {
  const { t } = useTranslation();
  // Static data for footer settings
  const footerSettingssw = {
    logo: logo,
    footer_text: "",
    address: "123 Education Street, Learning City, 12345",
    phone: "+1 (123) 456-7890",
    email: "teachera@gmail.com",
    google_play_link: "https://play.google.com",
    apple_store_link: "https://apps.apple.com",
    copyright_text: " All Rights Reserved.",
  };

  // Static data for social links
  const socialLinks = [
    { id: 1, link: "https://facebook.com", icon: facebookIcon },
    { id: 2, link: "https://twitter.com", icon: twitterIcon },
    { id: 3, link: "https://instagram.com", icon: instagramIcon },
    { id: 4, link: "https://linkedin.com", icon: linkedinIcon },
  ];
  // Fetch contact data
  // State for contact information
  const [footerSettings, setFooterSettings] = useState({});
  const fetchContact = async () => {
    try {
      const response = await fetch("https://api.basementex.com/setting");
      const data = await response.json();
      setFooterSettings(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchContact();
  }, []);
  return (
    <footer className="thm-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="footer-abt">
              <img src={logo} className="brand" alt="Teachera Logo" />
              <p className="text-white">
                {t(
                  "Teachera is an online learning platform that offers a wide range of courses taught by expert instructors."
                )}
              </p>
              <div className="media">
                <a
                  href={footerSettings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={facebookIcon} alt="Social Media" />
                </a>
                <a
                  href={footerSettings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={twitterIcon} alt="Social Media" />
                </a>
                <a
                  href={footerSettings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={instagramIcon} alt="Social Media" />
                </a>
                <a
                  href={footerSettings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedinIcon} alt="Social Media" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h4 className="ftr-head">{t("Quick Links")}</h4>
            <ul className="ftr-links">
              <li>
                <Link to="/">{t("Home")}</Link>
              </li>
              <li>
                <Link to="/about-us">{t("About")}</Link>
              </li>
              <li>
                <Link to="/all-instructors">{t("Teach On Teachera")}</Link>
              </li>
              <li>
                <Link to="/blog">{t("Blog")}</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6">
            <h4 className="ftr-head">{t("Other Links")}</h4>
            <ul className="ftr-links">
              <li>
                <Link to="/contact">{t("Contact")}</Link>
              </li>
              <li>
                <Link to="/career">{t("Careers")}</Link>
              </li>
              <li>
                <Link to="/page/terms-and-conditions">
                  {t("Terms & Conditions")}
                </Link>
              </li>
              <li>
                <Link to="/page/privacy-policy">{t("Privacy Policy")}</Link>
              </li>
              <li>
                <Link to="/testimonial">{t("Testimonial")}</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <h4 className="ftr-head">{t("Contact")}</h4>
            <div className="ftr-contact">
              <ul>
                <li>
                  <a href="javascript:void(0);">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {footerSettings.address}
                  </a>
                </li>
                <li>
                  <a href={`tel:${footerSettings.phone_number}`}>
                    <i className="fal fa-phone me-2 fa-rotate-90"></i>
                    {footerSettings.phone_number}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${footerSettings.email_id}`}>
                    <i className="fal fa-envelope me-2"></i>
                    {footerSettings.email_id}
                  </a>
                </li>
              </ul>
              <h4 className="ftr-head">{t("Download App")}</h4>
            </div>
            <div className="download-btn">
              <a
                href={footerSettings.google_play_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={playstoreIcon || "/placeholder.svg"}
                  alt="Google Play"
                />
              </a>
              <a
                href={footerSettings.apple_store_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={appstoreIcon || "/placeholder.svg"} alt="App Store" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <section className="copy-right">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p className="text-white text-center mb-0">
                <a href="/" target="_blank" rel="noopener noreferrer">
                  ©2023 Teachera. {t("All Rights Reserved.")}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
