import React, { useState, useEffect } from "react";

// Import images
import contactImg from "../assets/images/contact-img.svg";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";

const ContactUs = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Handle form input changes
  const [Eerror, setEError] = useState("");
  const isEmailOk = () => {
    formData.email.includes("^[^@]+@[^@]+[^@]+$");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEmailOk) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setEError("Invalid email");
    }
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true)
  //   try {
  //     const response = await fetch("https://api.basementex.com/contact",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },

  //         body: JSON.stringify({
  //           formData
  //         })
  //       }

  //     )
  //     if (response.ok) {
  //       setSubmitSuccess(true);
  //       setIsSubmitting(false)
  //       toast.success("Message Sent Successfully")
  //     }
  //   } catch (error) {
  //     console.error("Error Sending Message", error);
  //     setSubmitError(true)
  //     toast.error(error)
  //     setIsSubmitting(false)
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://api.basementex.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Failed to send message.");
      }

      setSubmitSuccess(true);
      toast.success("Message Sent Successfully");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error Sending Message", error);
      setSubmitError(error.message);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch contact data
  // State for contact information
  const [contact, setContact] = useState({});
  const fetchContact = async () => {
    try {
      const response = await fetch("https://api.basementex.com/setting");
      const data = await response.json();
      console.log("datataa", data.data);
      setContact(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchContact();
  }, []);
  const { t } = useTranslation();
  const sendMessage = t("Send Message");
  const sending = t("Sending...");
  return (
    <>
      {/* Banner Section */}
      <section className="blog-bnnr contact-bnnr mt-85">
        <div className="container">
          <div className="blog-bnnr-innr">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-12">
                <h2 className="title text-white">{t("Contact Us")}</h2>
                <p className="text-white">
                  {t("Explore career opportunities at Teachera.")}
                </p>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 text-end">
                <img
                  src={
                    contactImg ||
                    "/placeholder.svg?height=200&width=300&query=contact"
                  }
                  alt="Contact"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-sec tp-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6">
              <div className="contact-lft">
                <h4 className="title text-white">{t("Contact Information")}</h4>
                <p className="text-secondary mb-5">
                  {t("Say something to start a live chat!")}
                </p>
                <ul className="contact-lft-list">
                  <li>
                    <span className="fas fa-phone fa-rotate-90"></span>
                    <div>
                      <h6>{t("Contact Number")}</h6>
                      <a href={`tel:${contact.phone_number}`}>
                        {contact.phone_number}
                      </a>
                    </div>
                  </li>
                  <li>
                    <span className="fas fa-envelope"></span>
                    <div>
                      <h6>{t("Email Address")}</h6>
                      <a href={`mailto:${contact.email_id}`}>
                        {contact.email_id}
                      </a>
                    </div>
                  </li>
                  <li>
                    <span className="fas fa-map-marker-alt"></span>
                    <div>
                      <h6>{t("Address")}</h6>
                      <a href="javascript:void(0);">{contact.address}</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="contact-frm">
                {submitSuccess && (
                  <div className="alert alert-success mb-4" role="alert">
                    {t(
                      "Your message has been sent successfully! We'll get back to you soon."
                    )}
                  </div>
                )}

                {submitError && (
                  <div className="alert alert-danger mb-4" role="alert">
                    {submitError}
                  </div>
                )}

                <form id="contact-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 mb-4">
                      <div className="contact-input">
                        <label htmlFor="name">{t("Name")}</label>
                        <input
                          name="name"
                          id="name"
                          type="text"
                          className="form-control"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 mb-4">
                      <div className="contact-input">
                        <label htmlFor="email">{t("Email")}</label>
                        <input
                          name="email"
                          id="email"
                          type="email"
                          className="form-control"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {/* {!isEmailOk ? "" : { Eerror }} */}
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-6 mb-4">
                      <div className="contact-input">
                        <label htmlFor="subject">{t("Subject")}</label>
                        <input
                          name="subject"
                          id="subject"
                          type="text"
                          className="form-control"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 mb-4">
                      <div className="contact-input">
                        <label htmlFor="message">{t("Message")}</label>
                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          required
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 mb-4 text-lg-end">
                      <div className="contact-input">
                        <button
                          type="submit"
                          className="thm-btn btn btn-two arrow-btn"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? sending : sendMessage}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
