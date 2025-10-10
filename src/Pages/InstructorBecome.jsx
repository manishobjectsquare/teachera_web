import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const InstructorBecome = () => {
  const email = localStorage.getItem("Email") || "";
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: email,
    certificate: null,
    identity_scan: null,
    payout_account: "",
    payout_information: "",
    extra_information: "",
    recaptcha: "",
  });

  // State for settings and methods
  const [instructorRequestSetting, setInstructorRequestSetting] = useState({
    instructions:
      "<p>Thank you for your interest in becoming an instructor at Teachera. Please fill out the form below to apply. Our team will review your application and get back to you within 3-5 business days.</p><p>Requirements:</p><ul><li>Expertise in your subject area</li><li>Teaching experience (preferred but not required)</li><li>Good communication skills</li><li>Ability to create high-quality content</li></ul>",
    need_certificate: 1,
    need_identity_scan: 1,
  });

  const [withdrawMethods, setWithdrawMethods] = useState([
    {
      id: 1,
      name: "PayPal",
      description:
        "<p>Please provide your PayPal email address where you would like to receive payments.</p>",
    },
    {
      id: 2,
      name: "Bank Transfer",
      description:
        "<p>Please provide your bank account details including:</p><ul><li>Account Holder Name</li><li>Bank Name</li><li>Account Number</li><li>Routing Number/SWIFT/BIC</li></ul>",
    },
    {
      id: 3,
      name: "Stripe",
      description:
        "<p>Please provide the email address associated with your Stripe account.</p>",
    },
  ]);

  // State for showing payment info
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  // State for errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Show payment info section when payout account is selected
    if (name === "payout_account" && value) {
      setShowPaymentInfo(true);
    } else if (name === "payout_account" && !value) {
      setShowPaymentInfo(false);
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle reCAPTCHA change
  // const handleRecaptchaChange = (value) => {
  //     setFormData({
  //         ...formData,
  //         recaptcha: value
  //     });

  //     if (errors['recaptcha']) {
  //         setErrors({
  //             ...errors,
  //             recaptcha: ''
  //         });
  //     }
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const newErrors = {};

    if (instructorRequestSetting.need_certificate && !formData.certificate) {
      newErrors.certificate = "Certificate is required";
    }

    if (
      instructorRequestSetting.need_identity_scan &&
      !formData.identity_scan
    ) {
      newErrors.identity_scan = "Identity scan is required";
    }

    if (!formData.payout_account) {
      newErrors.payout_account = "Payout account is required";
    }

    if (showPaymentInfo && !formData.payout_information) {
      newErrors.payout_information = "Payment information is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false); // Stop loading on validation error
      return;
    }

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        "https://api.basementex.com/api/v1/web/instructor-request",
        {
          method: "POST",
          body: formDataObj,
        }
      );
      const data = await response.json();

      if (data.status) {
        toast.success("Your request has been submitted successfully!");
        setFormData({
          email: email,
          certificate: null,
          identity_scan: null,
          payout_account: "",
          payout_information: "",
          extra_information: "",
          recaptcha: "",
        });
        setShowPaymentInfo(false);
        setErrors({});
      } else {
        toast.error(data.message);
        setErrors(data.errors || {});
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  return (
    <>
      {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}
      <section className="singUp-area py-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="card shadow-lg border-0 p-4">
                <h2 className="text-center mb-3">Become Instructor</h2>
                <div
                  className="mb-3"
                  dangerouslySetInnerHTML={{
                    __html: instructorRequestSetting?.instructions,
                  }}
                />

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  {instructorRequestSetting?.need_certificate === 1 && (
                    <div className="mb-3">
                      <label className="form-label">
                        Certificate and Documents{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control ${
                          errors.certificate ? "is-invalid" : ""
                        }`}
                        name="certificate"
                        id="certificate"
                        onChange={handleFileChange}
                      />
                      {errors.certificate && (
                        <div className="invalid-feedback">
                          {errors.certificate}
                        </div>
                      )}
                    </div>
                  )}

                  {instructorRequestSetting?.need_identity_scan === 1 && (
                    <div className="mb-3">
                      <label className="form-label">
                        Identity Scan <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control ${
                          errors.identity_scan ? "is-invalid" : ""
                        }`}
                        name="identity_scan"
                        id="identity_scan"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                      />
                      {errors.identity_scan && (
                        <div className="invalid-feedback">
                          {errors.identity_scan}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">
                      Payout Account <span className="text-danger">*</span>
                    </label>
                    <select
                      name="payout_account"
                      id="payout_account"
                      className={`form-select ${
                        errors.payout_account ? "is-invalid" : ""
                      }`}
                      value={formData.payout_account}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {withdrawMethods.map((method) => (
                        <option key={method.id} value={method.name}>
                          {method.name}
                        </option>
                      ))}
                    </select>
                    {errors.payout_account && (
                      <div className="invalid-feedback">
                        {errors.payout_account}
                      </div>
                    )}
                  </div>

                  {showPaymentInfo && (
                    <div className="payment_info_wrap">
                      <div className="mb-3">
                        <label className="form-label">
                          Payment Information{" "}
                          <span className="text-danger">*</span>
                        </label>
                        {withdrawMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`payment-info normal-text ${
                              formData.payout_account === method.name
                                ? "d-block"
                                : "d-none"
                            } payment-${method.name}`}
                            dangerouslySetInnerHTML={{
                              __html: method.description,
                            }}
                          />
                        ))}
                        <textarea
                          name="payout_information"
                          className={`form-control ${
                            errors.payout_information ? "is-invalid" : ""
                          }`}
                          placeholder="Enter payment information"
                          value={formData.payout_information}
                          onChange={handleChange}
                        />
                        {errors.payout_information && (
                          <div className="invalid-feedback">
                            {errors.payout_information}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Extra Information</label>
                    <textarea
                      name="extra_information"
                      id="extra_information"
                      className="form-control"
                      placeholder="Enter extra information"
                      value={formData.extra_information}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit for Review"}
                      {!loading && <i className="fas fa-arrow-right ms-2"></i>}
                    </button>
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

export default InstructorBecome;
