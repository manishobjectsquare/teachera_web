import { useState } from "react"
import { Link } from "react-router-dom"
import LoginImage from '../../assets/images/institute-login.png';
import { useTranslation } from "react-i18next";
const InstituteLogin = () => {
  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // State for form validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()


    const newErrors = {}
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    console.log("Form submitted:", formData)

  }
  const { t } = useTranslation()
  return (

    <section className="login-sec mt-85">
      <div className="container">
        <div className="login-innr">
          <div className="row justify-content-between align-items-center">
            {/* Left side - promotional content */}
            <div className="col-lg-6 d-lg-block d-xl-block d-none">
              <span className="text-primary fs-5">{t('Add Institution')}</span>
              <h3 className="mt-2">{t('Expand Your Reach by Selling Your Courses to a Global Audience')}</h3>
              <p className="text-muted" style={{ fontSize: "13px" }}>
                {t('In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.')}
              </p>
              <img src={LoginImage || "/placeholder.svg"} alt={t('Institution Login')} />
            </div>

            {/* Right side - login form */}
            <div className="col-lg-5 col-md-12">
              <div className="login-frm">
                <h3>{t('Log in to your Institution account')}</h3>
                <form onSubmit={handleSubmit} className="account__form">
                  <div className="frm-bx">
                    <label htmlFor="email">{t('Email Address')}</label>
                    <input
                      id="email"
                      type="text"
                      placeholder={t('email')}
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      aria-label={t('Email Address')}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && <div id="email-error" className="invalid-feedback">{t(errors.email)}</div>}
                  </div>

                  <div className="frm-bx">
                    <label htmlFor="password">{t('Password')}</label>
                    <input
                      id="password"
                      type="password"
                      placeholder={t('password')}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      aria-label={t('Password')}
                      aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    {errors.password && <div id="password-error" className="invalid-feedback">{t(errors.password)}</div>}
                  </div>

                  <div className="frm-bx text-center mt-5">
                    <button type="submit" className="thm-btn w-100">
                      {t('Login')}
                    </button>
                    <div className="text-end mt-2">
                      <Link to="/institute/forgot-password" className="text-primary">
                        {t('Forgot Password')}
                      </Link>
                    </div>
                  </div>
                </form>

                <p className="or-option text-center">
                  <span>{t('OR')}</span>
                </p>

                <div className="social-login text-center">
                  <p className="mt-4">
                    {t("Don't have an account?")}{" "}
                    <Link to="/institute/register" className="text-primary fw-600">
                      {t('Sign up Your Institution')}
                    </Link>
                  </p>
                  <p className="mt-4 other-type-login">
                    <Link to="/login" className="text-primary fw-600">
                      {t('Login With Your Student/Instructor')}
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

export default InstituteLogin
