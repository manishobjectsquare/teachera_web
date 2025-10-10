import { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import User from "../../assets/images/users-img.png";
import trash from "../../assets/images/trash.gif";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useUser } from "../../Context/UserContext";
import { baseUrl } from "../../config/baseUrl";

const ProfileSettings = () => {
  const { t } = useTranslation();
  const { profileData, authLoading, updateProfile } = useUser();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    job_title: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    website: "",
    github: "",
    bio: "",
    short_bio: "",
    image: null,
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Load profile data when component mounts
  useEffect(() => {
    if (profileData) {
      setUser({
        name: profileData.name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        gender: profileData.gender || "",
        age: profileData.age || "",
        job_title: profileData.job_title || "",
        facebook: profileData.facebook || "",
        twitter: profileData.twitter || "",
        linkedin: profileData.linkedin || "",
        instagram: profileData.instagram || "",
        website: profileData.website || "",
        github: profileData.github || "",
        bio: profileData.bio || "",
        short_bio: profileData.short_bio || "",
        image: profileData.image
          ? `https://api.basementex.com/${profileData.image}`
          : null,
      });
    }
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
    // Clear error for this field when user types
    if (passwordErrors[name]) {
      setPasswordErrors({
        ...passwordErrors,
        [name]: "",
      });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      // Store the file for later upload
      setImageFile(file);

      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({
          ...user,
          image: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProfileForm = () => {
    const errors = {};
    if (!user.name) errors.name = "Name is required";
    // if (!user.email) errors.email = "Email is required"
    // if (user.email && !/\S+@\S+\.\S+/.test(user.email)) errors.email = "Email is invalid"

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordForm = () => {
    const errors = {};
    if (!passwordForm.current_password)
      errors.current_password = "Current password is required";
    if (!passwordForm.password) errors.password = "New password is required";
    if (passwordForm.password && passwordForm.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!passwordForm.password_confirmation)
      errors.password_confirmation = "Please confirm your password";
    if (
      passwordForm.password &&
      passwordForm.password_confirmation &&
      passwordForm.password !== passwordForm.password_confirmation
    )
      errors.password_confirmation = "Passwords do not match";

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfileForm()) return;

    setIsSubmitting(true);
    try {
      // Prepare data for API
      const formData = { ...user };

      // Call the updateProfile function with the form data and image file
      const result = await updateProfile(formData, imageFile);

      if (result.success) {
        toast.success("Profile updated successfully");
        // Reset the image file state after successful update
        setImageFile(null);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${baseUrl}/api/v1/web/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${yourToken}`
        },
        body: JSON.stringify({
          userId: profileData?._id,
          currentPassword: passwordForm.current_password,
          newPassword: passwordForm.password,
          confirmPassword: passwordForm.password_confirmation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      toast.success("Password updated successfully!");
      setShowPasswordModal(false);
      setPasswordForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    // Since there's no API for account deletion yet, show a message
    toast.info("Account deletion functionality is not available yet");
    setShowDeleteModal(false);
  };

  if (authLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading profile data...</p>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-8">
          <h3 className="user-title">{t("Profile & settings")}</h3>
          <div className="user-cards">
            <form
              onSubmit={handleProfileSubmit}
              className="instructor__profile-form"
            >
              <input
                type="file"
                name="avatar"
                id="avatar"
                hidden
                ref={avatarInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
              />
              <input
                type="file"
                name="cover"
                id="cover-img"
                hidden
                ref={coverInputRef}
                accept="image/*"
              />

              <div className="custom-frm-bx">
                <div className="form-grp">
                  <label htmlFor="name">
                    {t("Full Name")} <code>*</code>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={user.name}
                    onChange={handleInputChange}
                    className={`form-control ${
                      formErrors.name ? "is-invalid" : ""
                    }`}
                  />
                  {formErrors.name && (
                    <div className="invalid-feedback">{formErrors.name}</div>
                  )}
                </div>
              </div>

              <div className="custom-frm-bx">
                <div className="form-grp">
                  <label htmlFor="email">
                    {t("Email")} <code>*</code>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    // onChange={handleInputChange}
                    className={`form-control ${
                      formErrors.email ? "is-invalid" : ""
                    }`}
                    disabled
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>
              </div>

              <div className="custom-frm-bx">
                <div className="form-grp">
                  <label htmlFor="phone">{t("Phone")}</label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={user.phone || ""}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="custom-frm-bx">
                <div className="form-grp">
                  <label htmlFor="gender">{t("Gender")}</label>
                  <select
                    name="gender"
                    id="gender"
                    value={user.gender || ""}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">{t("Select")}</option>
                    <option value="male">{t("Male")}</option>
                    <option value="female">{t("Female")}</option>
                    <option value="other">{t("Other")}</option>
                  </select>
                </div>
              </div>

              <div className="custom-frm-bx">
                <div className="form-grp">
                  <label htmlFor="age">{t("Age")}</label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="1"
                    max="120"
                    value={user.age || ""}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="custom-frm-bx">
                <div className="form-grp">
                  <label htmlFor="facebook">{t("Facebook")}</label>
                  <input
                    id="facebook"
                    name="facebook"
                    type="url"
                    value={user.facebook || ""}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://facebook.com/username"
                  />
                </div>
              </div>

              <div className="custom-frm-bx">
                <div className="form-grp">
                  <label htmlFor="twitter">{t("Twitter")}</label>
                  <input
                    id="twitter"
                    name="twitter"
                    type="url"
                    value={user.twitter || ""}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>

              <div className="custom-frm-bx">
                <div className="form-grp">
                  <label htmlFor="linkedin">{t("LinkedIn")}</label>
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    value={user.linkedin || ""}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div className="custom-frm-bx">
                <div className="form-grp">
                  <label htmlFor="instagram">{t("Instagram")}</label>
                  <input
                    id="instagram"
                    name="instagram"
                    type="url"
                    value={user.instagram || ""}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://instagram.com/username"
                  />
                </div>
              </div>

              <div className="custom-frm-bx">
                <div className="form-grp">
                  <label htmlFor="website">{t("Website")}</label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={user.website || ""}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="custom-frm-bx">
                <div className="form-grp">
                  <label htmlFor="github">{t("GitHub")}</label>
                  <input
                    id="github"
                    name="github"
                    type="url"
                    value={user.github || ""}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>

              <div className="custom-frm-bx text-center">
                <button
                  className="thm-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      {t("Saving...")}
                    </>
                  ) : (
                    t("Save")
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-3 col-md-4">
          <h3 className="user-title">{t("Profile Change")}</h3>
          <div className="user-cards profile-chng">
            <div className="profile-chng-upload">
              <img
                className="preview-avatar"
                src={user?.image ? `${user?.image}` : "/square_logo.png"}
                alt={t("User Profile")}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = User || "/square_logo.png";
                }}
              />
              <button
                title={t("Upload Photo")}
                onClick={() => avatarInputRef.current.click()}
              >
                <i className="fas fa-camera"></i>
              </button>
            </div>
            {imageFile && (
              <div className="mt-2 text-center">
                <span className="badge bg-success">New image selected</span>
                <p className="small text-muted mt-1">
                  Click Save to update your profile picture
                </p>
              </div>
            )}
          </div>
          <button
            className="thm-btn success w-100 text-center rounded-0 mt-2"
            onClick={() => setShowPasswordModal(true)}
          >
            {t("Change Password")}
          </button>
          <button
            className="thm-btn danger w-100 text-center rounded-0 mt-2"
            onClick={() => setShowDeleteModal(true)}
          >
            {t("Delete Account")}
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        centered
        size="lg"
        className="custom-model"
        id="change-password"
      >
        <Modal.Header>
          <Modal.Title>{t("Change password")}</Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowPasswordModal(false)}
          >
            <i className="fal fa-times"></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-info">
            <i className="fas fa-info-circle me-2"></i>
            {t(
              "Password change functionality is not available yet. This feature will be implemented soon."
            )}
          </div>
          <form
            onSubmit={handlePasswordSubmit}
            className="instructor__profile-form"
          >
            <div className="custom-frm-bx">
              <label htmlFor="currentpassword">
                {t("Current Password")} <code>*</code>
              </label>
              <input
                id="currentpassword"
                type="password"
                name="current_password"
                placeholder={t("Current Password")}
                className={`form-control ${
                  passwordErrors.current_password ? "is-invalid" : ""
                }`}
                value={passwordForm.current_password}
                onChange={handlePasswordInputChange}
              />
              {passwordErrors.current_password && (
                <div className="invalid-feedback">
                  {passwordErrors.current_password}
                </div>
              )}
            </div>

            <div className="custom-frm-bx">
              <label htmlFor="newpassword">
                {t("New Password")} <code>*</code>
              </label>
              <input
                id="newpassword"
                type="password"
                name="password"
                placeholder={t("New Password")}
                className={`form-control ${
                  passwordErrors.password ? "is-invalid" : ""
                }`}
                value={passwordForm.password}
                onChange={handlePasswordInputChange}
              />
              {passwordErrors.password && (
                <div className="invalid-feedback">
                  {passwordErrors.password}
                </div>
              )}
            </div>

            <div className="custom-frm-bx">
              <label htmlFor="repassword">
                {t("Re-Type New Password")} <code>*</code>
              </label>
              <input
                id="repassword"
                type="password"
                name="password_confirmation"
                placeholder={t("Re-Type New Password")}
                className={`form-control ${
                  passwordErrors.password_confirmation ? "is-invalid" : ""
                }`}
                value={passwordForm.password_confirmation}
                onChange={handlePasswordInputChange}
              />
              {passwordErrors.password_confirmation && (
                <div className="invalid-feedback">
                  {passwordErrors.password_confirmation}
                </div>
              )}
            </div>

            <div className="custom-frm-bx text-center">
              <button className="thm-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {t("Updating...")}
                  </>
                ) : (
                  t("Update Password")
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        size="lg"
        className="custom-model"
        id="delete-account"
      >
        <Modal.Header>
          <Modal.Title>{t("Delete Account")}</Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowDeleteModal(false)}
          >
            <i className="fal fa-times"></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-info mb-4">
            <i className="fas fa-info-circle me-2"></i>
            {t(
              "Account deletion functionality is not available yet. This feature will be implemented soon."
            )}
          </div>
          <div className="delete-box">
            <img src={trash || "/placeholder.svg"} alt={t("Delete Account")} />
            <h5>
              {t("Are You Sure you Want to Delete")} <br /> {t("Your Account")}{" "}
            </h5>
            <div className="mt-3 mb-3">
              <button
                className="thm-btn danger me-5"
                onClick={handleDeleteAccount}
              >
                {t("Yes, Delete")}
              </button>
              <button
                className="thm-btn greem ms-5"
                onClick={() => setShowDeleteModal(false)}
              >
                {t("Keep Account")}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileSettings;
