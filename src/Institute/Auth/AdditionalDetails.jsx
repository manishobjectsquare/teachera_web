

import { useState } from "react"
import { Link } from "react-router-dom"
import LoginImage from '../../assets/images/institute-login.png';
const AdditionalDetails = () => {
  // State for form data
  const [formData, setFormData] = useState({
    type: "",
    number: "",
    address: "",
    city: "",
    pincode: "",
  })

  // State for form validation errors
  const [errors, setErrors] = useState({
    type: "",
    number: "",
    address: "",
    city: "",
    pincode: "",
  })

  // Institution types
  const institutionTypes = [
    { value: "", label: "Select" },
    { value: "type1", label: "Type1" },
    { value: "type2", label: "Type2" },
    { value: "type3", label: "Type3" },
  ]

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    const newErrors = {}
    if (!formData.type) {
      newErrors.type = "Institution type is required"
    }

    if (!formData.number) {
      newErrors.number = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.number)) {
      newErrors.number = "Please enter a valid 10-digit phone number"
    }

    if (!formData.address) {
      newErrors.address = "Address is required"
    }

    if (!formData.city) {
      newErrors.city = "City is required"
    }

    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required"
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Submit form - in a real app, you would call an API here
    console.log("Form submitted:", formData)
    // Example: submitInstitutionDetails(formData)
  }

  return (
    <section className="login-sec mt-85">
      <div className="container">
        <div className="login-innr">
          <div className="row justify-content-between align-items-center">
            {/* Left side - promotional content */}
            <div className="col-lg-6 d-lg-block d-xl-block d-none">
              <span className="text-primary fs-5">Add Institution</span>
              <h3 className="mt-2">Expand Your Reach by Selling Your Courses to a Global Audience</h3>
              <p className="text-muted" style={{ fontSize: "13px" }}>
                In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the
                visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used
                as a placeholder before the final copy is available.
              </p>
              <img src={LoginImage} alt="Institution Registration" />
            </div>

            {/* Right side - details form */}
            <div className="col-lg-5 col-md-12">
              <div className="login-frm">
                <h3>Institution Other Details</h3>
                <form onSubmit={handleSubmit} className="account__form">
                  <div className="frm-bx">
                    <label htmlFor="type">Institution Type</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`form-control ${errors.type ? "is-invalid" : ""}`}
                    >
                      {institutionTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                  </div>

                  <div className="frm-bx">
                    <label htmlFor="number">Phone Number</label>
                    <input
                      id="number"
                      type="text"
                      placeholder="Phone Number"
                      value={formData.number}
                      onChange={handleChange}
                      name="number"
                      className={`form-control ${errors.number ? "is-invalid" : ""}`}
                    />
                    {errors.number && <div className="invalid-feedback">{errors.number}</div>}
                  </div>

                  <div className="frm-bx">
                    <label htmlFor="address">Address</label>
                    <input
                      id="address"
                      type="text"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                      name="address"
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>

                  <div className="frm-bx">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      name="city"
                      className={`form-control ${errors.city ? "is-invalid" : ""}`}
                    />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>

                  <div className="frm-bx">
                    <label htmlFor="pincode">Pincode</label>
                    <input
                      id="pincode"
                      type="text"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      name="pincode"
                      className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
                    />
                    {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
                  </div>

                  <div className="frm-bx text-center mt-5">
                    <button type="submit" className="thm-btn w-100">
                      Submit
                    </button>
                  </div>
                </form>

                <p className="or-option text-center">
                  <span>OR</span>
                </p>

                <div className="social-login text-center">
                  <p className="mt-4">
                    Already have an account?{" "}
                    <Link to="/institute/login" className="text-primary fw-600">
                      Login Your Institution Account
                    </Link>
                  </p>
                  <p className="mt-4 other-type-login">
                    <Link to="/login" className="text-primary fw-600">
                      Login With Your Student/Instructor
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdditionalDetails