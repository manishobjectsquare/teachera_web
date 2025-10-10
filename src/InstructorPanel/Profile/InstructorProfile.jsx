// import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
// import Modal from 'react-bootstrap/Modal';
// import avatar from "../../assets/images/instructor-img-04.png";
// import { useTranslation } from 'react-i18next';

// const InstructorProfile = () => {
//     const { t } = useTranslation();

//     // Refs for file inputs
//     const avatarInputRef = useRef(null);
//     const coverInputRef = useRef(null);

//     // State for user data
//     const [userData, setUserData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         gender: '',
//         age: '',
//         designation: '',
//         facebook: '',
//         twitter: '',
//         linkedin: '',
//         website: '',
//         github: '',
//         image: '/default-avatar.jpg'
//     });

//     // State for password form
//     const [passwordData, setPasswordData] = useState({
//         current_password: '',
//         password: '',
//         password_confirmation: ''
//     });

//     // State for modals
//     const [showPasswordModal, setShowPasswordModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);

//     // State for form submission
//     const [loading, setLoading] = useState(false);

//     // Fetch user data
//     useEffect(() => {
//         // In a real app, you would fetch data from an API
//         // For now, we'll use mock data
//         const mockUserData = {
//             name: 'John Doe',
//             email: 'john.doe@example.com',
//             phone: '+1 (555) 123-4567',
//             gender: 'male',
//             age: '35',
//             designation: 'Senior Web Developer',
//             facebook: 'https://facebook.com/johndoe',
//             twitter: 'https://twitter.com/johndoe',
//             linkedin: 'https://linkedin.com/in/johndoe',
//             website: 'https://johndoe.com',
//             github: 'https://github.com/johndoe',
//             image: avatar
//         };

//         setUserData(mockUserData);
//     }, []);

//     // Handle input changes for profile form
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserData({ ...userData, [name]: value });
//     };

//     // Handle input changes for password form
//     const handlePasswordInputChange = (e) => {
//         const { name, value } = e.target;
//         setPasswordData({ ...passwordData, [name]: value });
//     };

//     // Handle profile form submission
//     const handleProfileSubmit = (e) => {
//         e.preventDefault();
//         setLoading(true);

//         // In a real app, you would make an API call to update the profile
//         console.log(t('Profile data submitted:'), userData);

//         // Simulate API call
//         setTimeout(() => {
//             setLoading(false);
//             alert(t('Profile updated successfully!'));
//         }, 1000);
//     };

//     // Handle password form submission
//     const handlePasswordSubmit = (e) => {
//         e.preventDefault();

//         // Basic validation
//         if (passwordData.password !== passwordData.password_confirmation) {
//             alert(t('Passwords do not match!'));
//             return;
//         }

//         setLoading(true);

//         // In a real app, you would make an API call to update the password
//         console.log(t('Password data submitted:'), passwordData);

//         // Simulate API call
//         setTimeout(() => {
//             setLoading(false);
//             setShowPasswordModal(false);
//             setPasswordData({
//                 current_password: '',
//                 password: '',
//                 password_confirmation: ''
//             });
//             alert(t('Password updated successfully!'));
//         }, 1000);
//     };

//     // Handle account deletion
//     const handleDeleteAccount = () => {
//         // In a real app, you would make an API call to delete the account
//         console.log(t('Deleting account...'));

//         // Simulate API call
//         setTimeout(() => {
//             setShowDeleteModal(false);
//             alert(t('Account deleted successfully!'));
//             // Redirect to login page or home page
//         }, 1000);
//     };

//     // Handle avatar upload
//     const handleAvatarChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             // In a real app, you would upload the file to your server
//             // For now, we'll just update the state with a local URL
//             const imageUrl = URL.createObjectURL(file);
//             setUserData({ ...userData, image: imageUrl });
//         }
//     };

//     // Get translated gender options
//     const genderOptions = [
//         { value: '', label: t('Select') },
//         { value: 'male', label: t('Male') },
//         { value: 'female', label: t('Female') }
//     ];

//     return (
//         <>
//             {/* Profile Settings Form */}
//             <div className="col-lg-6 col-md-8">
//                 <h3 className="mb-4">{t('Profile & Settings')}</h3>
//                 <div className="card p-4">
//                     <form onSubmit={handleProfileSubmit} className="row">
//                         <div className="col-lg-12">
//                             <input
//                                 type="file"
//                                 name="avatar"
//                                 id="avatar"
//                                 className="d-none"
//                                 ref={avatarInputRef}
//                                 onChange={handleAvatarChange}
//                                 aria-label={t('Upload profile picture')}
//                             />
//                             <input
//                                 type="file"
//                                 name="cover"
//                                 id="cover-img"
//                                 className="d-none"
//                                 ref={coverInputRef}
//                                 aria-label={t('Upload cover image')}
//                             />
//                         </div>

//                         <div className="col-lg-6 custom-frm-bx">
//                             <label htmlFor="name" className="form-label">
//                                 {t('Full Name')} <code>*</code>
//                             </label>
//                             <input
//                                 id="name"
//                                 name="name"
//                                 type="text"
//                                 value={userData.name}
//                                 onChange={handleInputChange}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>

//                         <div className="col-lg-6 custom-frm-bx">
//                             <label htmlFor="email" className="form-label">
//                                 {t('Email')} <code>*</code>
//                             </label>
//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 value={userData.email}
//                                 onChange={handleInputChange}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>

//                         <div className="col-lg-6 custom-frm-bx">
//                             <label htmlFor="phone" className="form-label">{t('Phone')}</label>
//                             <input
//                                 id="phone"
//                                 name="phone"
//                                 type="text"
//                                 value={userData.phone}
//                                 onChange={handleInputChange}
//                                 className="form-control"
//                             />
//                         </div>

//                         <div className="col-lg-6 custom-frm-bx">
//                             <label htmlFor="gender" className="form-label">{t('Gender')}</label>
//                             <select
//                                 name="gender"
//                                 id="gender"
//                                 className="form-select"
//                                 value={userData.gender}
//                                 onChange={handleInputChange}
//                             >
//                                 {genderOptions.map(option => (
//                                     <option key={option.value} value={option.value}>
//                                         {option.label}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="col-lg-6 custom-frm-bx">
//                             <label htmlFor="age" className="form-label">{t('Age')}</label>
//                             <input
//                                 id="age"
//                                 name="age"
//                                 type="text"
//                                 value={userData.age}
//                                 onChange={handleInputChange}
//                                 className="form-control"
//                             />
//                         </div>

//                         <div className="col-lg-6 custom-frm-bx">
//                             <label htmlFor="designation" className="form-label">
//                                 {t('Designation')} <code>*</code>
//                             </label>
//                             <input
//                                 id="designation"
//                                 name="designation"
//                                 type="text"
//                                 value={userData.designation}
//                                 onChange={handleInputChange}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>

//                         {/* Social Links */}
//                         {['facebook', 'twitter', 'linkedin', 'website', 'github'].map((social) => (
//                             <div className="col-lg-6 custom-frm-bx" key={social}>
//                                 <label htmlFor={social} className="form-label">
//                                     {t(social.charAt(0).toUpperCase() + social.slice(1))}
//                                 </label>
//                                 <input
//                                     id={social}
//                                     name={social}
//                                     type="url"
//                                     value={userData[social]}
//                                     onChange={handleInputChange}
//                                     className="form-control"
//                                 />
//                             </div>
//                         ))}

//                         <div className="text-center">
//                             <button
//                                 className="thm-btn w-100"
//                                 type="submit"
//                                 disabled={loading}
//                             >
//                                 {loading ? t('Saving...') : t('Save')}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {/* Profile Picture Upload Section */}
//             <div className="col-lg-3 col-md-4">
//                 <h3 className="mb-4">{t('Profile Change')}</h3>
//                 <div className="card text-center p-4 change-profile-bar">
//                     <div className="position-relative d-inline-block">
//                         <img
//                             src={userData.image || '/default-avatar.jpg'}
//                             alt={t('Profile Picture')}
//                             className="img-fluid rounded-circle"
//                             style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//                         />
//                         <button
//                             className="btn btn-sm btn-secondary position-absolute bottom-0 end-50"
//                             onClick={() => avatarInputRef.current.click()}
//                             aria-label={t('Change profile picture')}
//                         >
//                             <FontAwesomeIcon icon={faCamera} />
//                         </button>
//                     </div>
//                 </div>

//                 <button
//                     className="thm-btn success w-100 text-center mt-3"
//                     onClick={() => setShowPasswordModal(true)}
//                 >
//                     {t('Change Password')}
//                 </button>

//                 <button
//                     className="thm-btn danger w-100 text-center mt-2"
//                     onClick={() => setShowDeleteModal(true)}
//                 >
//                     {t('Delete Account')}
//                 </button>
//             </div>

//             {/* Password Change Modal */}
//             <Modal
//                 show={showPasswordModal}
//                 onHide={() => setShowPasswordModal(false)}
//                 centered
//                 size="lg"
//                 className="custom-model"
//             >
//                 <Modal.Header>
//                     <h5 className="modal-title">{t('Change Password')}</h5>
//                     <button
//                         type="button"
//                         className="btn-close"
//                         onClick={() => setShowPasswordModal(false)}
//                         aria-label={t('Close')}
//                     >
//                         <FontAwesomeIcon icon={faTimes} />
//                     </button>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form onSubmit={handlePasswordSubmit}>
//                         <div className="custom-frm-bx">
//                             <label htmlFor="currentpassword" className="form-label">
//                                 {t('Current Password')} <code>*</code>
//                             </label>
//                             <input
//                                 id="currentpassword"
//                                 type="password"
//                                 name="current_password"
//                                 value={passwordData.current_password}
//                                 onChange={handlePasswordInputChange}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>

//                         <div className="custom-frm-bx">
//                             <label htmlFor="newpassword" className="form-label">
//                                 {t('New Password')} <code>*</code>
//                             </label>
//                             <input
//                                 id="newpassword"
//                                 type="password"
//                                 name="password"
//                                 value={passwordData.password}
//                                 onChange={handlePasswordInputChange}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>

//                         <div className="custom-frm-bx">
//                             <label htmlFor="repassword" className="form-label">
//                                 {t('Re-Type New Password')} <code>*</code>
//                             </label>
//                             <input
//                                 id="repassword"
//                                 type="password"
//                                 name="password_confirmation"
//                                 value={passwordData.password_confirmation}
//                                 onChange={handlePasswordInputChange}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>

//                         <div className="text-center">
//                             <button
//                                 className="thm-btn"
//                                 type="submit"
//                                 disabled={loading}
//                             >
//                                 {loading ? t('Updating...') : t('Update Password')}
//                             </button>
//                         </div>
//                     </form>
//                 </Modal.Body>
//             </Modal>

//             {/* Delete Account Modal */}
//             <Modal
//                 show={showDeleteModal}
//                 onHide={() => setShowDeleteModal(false)}
//                 centered
//                 size="lg"
//                 className="custom-model"
//             >
//                 <Modal.Header>
//                     <h5 className="modal-title">{t('Delete Account')}</h5>
//                     <button
//                         type="button"
//                         className="btn-close"
//                         onClick={() => setShowDeleteModal(false)}
//                         aria-label={t('Close')}
//                     >
//                         <FontAwesomeIcon icon={faTimes} />
//                     </button>
//                 </Modal.Header>
//                 <Modal.Body className="text-center">
//                     <div className="delete-box">
//                         <img src="/trash.gif" alt={t('Delete Account')} />
//                         <h5 className="mt-3">{t('Are You Sure you Want to Delete Your Account?')}</h5>

//                         <div className="mt-3">
//                             <button
//                                 className="thm-btn danger me-5"
//                                 onClick={handleDeleteAccount}
//                             >
//                                 {t('Yes, Delete')}
//                             </button>
//                             <button
//                                 type="button"
//                                 className="thm-btn success ms-5"
//                                 onClick={() => setShowDeleteModal(false)}
//                             >
//                                 {t('Keep Account')}
//                             </button>
//                         </div>
//                     </div>
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// };

// export default InstructorProfile;

"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useUser } from "../../Context/UserContext";

const InstructorProfile = () => {
  const { t } = useTranslation();
  const { profileData, authLoading, updateProfile } = useUser();

  // Refs for file inputs
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // State for user data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    designation: "", // This will be mapped from job_title
    facebook: "",
    twitter: "",
    linkedin: "",
    website: "",
    github: "",
    image: null,
  });

  // State for password form
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  // State for modals
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // State for form submission
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Load profile data when component mounts or profileData changes
  useEffect(() => {
    if (profileData) {
      setUserData({
        name: profileData.name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        gender: profileData.gender || "",
        age: profileData.age || "",
        designation: profileData.job_title || "", // Map job_title to designation
        facebook: profileData.facebook || "",
        twitter: profileData.twitter || "",
        linkedin: profileData.linkedin || "",
        website: profileData.website || "",
        github: profileData.github || "",
        short_bio: profileData.short_bio || "",
        bio: profileData.bio || "",
        image: profileData.image
          ? `https://api.basementex.com/${profileData.image}`
          : null,
      });
    }
  }, [profileData]);

  // Handle input changes for profile form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle input changes for password form
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Map designation back to job_title for API
      const formData = {
        ...userData,
        job_title: userData.designation, // Map designation back to job_title
      };
      delete formData.designation; // Remove designation as it's not in the API

      // Call the updateProfile function with the form data and image file
      const result = await updateProfile(formData, imageFile);

      if (result.success) {
        toast.success(t("Profile updated successfully!"));
        // Reset the image file state after successful update
        setImageFile(null);
      } else {
        toast.error(result.message || t("Failed to update profile"));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(t("Failed to update profile"));
    } finally {
      setLoading(false);
    }
  };

  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (passwordData.password !== passwordData.password_confirmation) {
      toast.error(t("Passwords do not match!"));
      return;
    }

    setLoading(true);

    try {
      // In a real app, you would make an API call to update the password
      // For now, we'll just show a message
      toast.info(t("Password change functionality is not available yet"));
      setShowPasswordModal(false);
      setPasswordData({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(t("Failed to change password"));
    } finally {
      setLoading(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      // In a real app, you would make an API call to delete the account
      // For now, we'll just show a message
      toast.info(t("Account deletion functionality is not available yet"));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(t("Failed to delete account"));
    }
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(t("Image size should be less than 2MB"));
        return;
      }

      // Store the file for later upload
      setImageFile(file);

      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData({
          ...userData,
          image: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Get translated gender options
  const genderOptions = [
    { value: "", label: t("Select") },
    { value: "male", label: t("Male") },
    { value: "female", label: t("Female") },
    { value: "other", label: t("Other") },
  ];

  if (authLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t("Loading...")}</span>
        </div>
        <p className="mt-2">{t("Loading profile data...")}</p>
      </div>
    );
  }

  return (
    <>
      {/* Profile Settings Form */}
      <div className="col-lg-6 col-md-8">
        <h3 className="mb-4">{t("Profile & Settings")}</h3>
        <div className="card p-4">
          <form onSubmit={handleProfileSubmit} className="row">
            <div className="col-lg-12">
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="d-none"
                ref={avatarInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                aria-label={t("Upload profile picture")}
              />
              <input
                type="file"
                name="cover"
                id="cover-img"
                className="d-none"
                ref={coverInputRef}
                accept="image/*"
                aria-label={t("Upload cover image")}
              />
            </div>

            <div className="col-lg-6 custom-frm-bx">
              <label htmlFor="name" className="form-label">
                {t("Full Name")} <code>*</code>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={userData.name}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-lg-6 custom-frm-bx">
              <label htmlFor="email" className="form-label">
                {t("Email")} <code>*</code>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                className="form-control"
                disabled
              />
            </div>

            <div className="col-lg-6 custom-frm-bx">
              <label htmlFor="phone" className="form-label">
                {t("Phone")}
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={userData.phone || ""}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="col-lg-6 custom-frm-bx">
              <label htmlFor="gender" className="form-label">
                {t("Gender")}
              </label>
              <select
                name="gender"
                id="gender"
                className="form-select"
                value={userData.gender || ""}
                onChange={handleInputChange}
              >
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-lg-6 custom-frm-bx">
              <label htmlFor="age" className="form-label">
                {t("Age")}
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="120"
                value={userData.age || ""}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="col-lg-6 custom-frm-bx">
              <label htmlFor="designation" className="form-label">
                {t("Designation")} <code>*</code>
              </label>
              <input
                id="designation"
                name="designation"
                type="text"
                value={userData.designation || ""}
                onChange={handleInputChange}
                className="form-control"
                required
                placeholder={t("e.g., Teacher, Professor, Instructor")}
              />
            </div>
            <div className="col-lg-12 custom-frm-bx">
              <label htmlFor="short_bio" className="form-label">
                {t("Short Bio")} <code>*</code>
              </label>
              <input
                id="short_bio"
                name="short_bio"
                type="text"
                value={userData.short_bio || ""}
                onChange={handleInputChange}
                className="form-control"
                required
                placeholder={t("Short bio about yourself")}
              />
            </div>
            <div className="col-lg-12 custom-frm-bx">
              <label htmlFor="bio" className="form-label">
                {t("Bio")} <code>*</code>
              </label>
              <textarea
                id="bio"
                name="bio"
                type="text"
                value={userData.bio || ""}
                onChange={handleInputChange}
                className="form-control"
                required
                placeholder={t("Bio")}
              ></textarea>
            </div>

            {/* Social Links */}
            {["facebook", "twitter", "linkedin", "website", "github"].map(
              (social) => (
                <div className="col-lg-6 custom-frm-bx" key={social}>
                  <label htmlFor={social} className="form-label">
                    {t(social.charAt(0).toUpperCase() + social.slice(1))}
                  </label>
                  <input
                    id={social}
                    name={social}
                    type="url"
                    value={userData[social] || ""}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder={`https://${social}.com/${
                      social === "website" ? "" : "username"
                    }`}
                  />
                </div>
              )
            )}

            <div className="text-center mt-4">
              <button
                className="thm-btn w-100"
                type="submit"
                disabled={loading}
              >
                {loading ? (
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

      {/* Profile Picture Upload Section */}
      <div className="col-lg-3 col-md-4">
        <h3 className="mb-4">{t("Profile Change")}</h3>
        <div className="card text-center p-4 change-profile-bar">
          <div className="position-relative d-inline-block">
            <img
              src={userData.image || "/square_logo.png"}
              alt={t("Profile Picture")}
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = "/square_logo.png";
              }}
            />
            <button
              type="button"
              className="btn btn-sm btn-secondary position-absolute bottom-0 end-50"
              onClick={() => avatarInputRef.current.click()}
              aria-label={t("Change profile picture")}
            >
              <FontAwesomeIcon icon={faCamera} />
            </button>
          </div>
          {imageFile && (
            <div className="mt-2">
              <span className="badge bg-success">
                {t("New image selected")}
              </span>
              <p className="small text-muted mt-1">
                {t("Click Save to update your profile picture")}
              </p>
            </div>
          )}
        </div>

        <button
          className="thm-btn success w-100 text-center mt-3"
          onClick={() => setShowPasswordModal(true)}
        >
          {t("Change Password")}
        </button>

        <button
          className="thm-btn danger w-100 text-center mt-2"
          onClick={() => setShowDeleteModal(true)}
        >
          {t("Delete Account")}
        </button>
      </div>

      {/* Password Change Modal */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        centered
        size="lg"
        className="custom-model"
      >
        <Modal.Header>
          <h5 className="modal-title">{t("Change Password")}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowPasswordModal(false)}
            aria-label={t("Close")}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-info">
            <i className="fas fa-info-circle me-2"></i>
            {t(
              "Password change functionality is not available yet. This feature will be implemented soon."
            )}
          </div>
          <form onSubmit={handlePasswordSubmit}>
            <div className="custom-frm-bx">
              <label htmlFor="currentpassword" className="form-label">
                {t("Current Password")} <code>*</code>
              </label>
              <input
                id="currentpassword"
                type="password"
                name="current_password"
                value={passwordData.current_password}
                onChange={handlePasswordInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="custom-frm-bx">
              <label htmlFor="newpassword" className="form-label">
                {t("New Password")} <code>*</code>
              </label>
              <input
                id="newpassword"
                type="password"
                name="password"
                value={passwordData.password}
                onChange={handlePasswordInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="custom-frm-bx">
              <label htmlFor="repassword" className="form-label">
                {t("Re-Type New Password")} <code>*</code>
              </label>
              <input
                id="repassword"
                type="password"
                name="password_confirmation"
                value={passwordData.password_confirmation}
                onChange={handlePasswordInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="text-center mt-3">
              <button className="thm-btn" type="submit" disabled={loading}>
                {loading ? t("Updating...") : t("Update Password")}
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
      >
        <Modal.Header>
          <h5 className="modal-title">{t("Delete Account")}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowDeleteModal(false)}
            aria-label={t("Close")}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="alert alert-info mb-4">
            <i className="fas fa-info-circle me-2"></i>
            {t(
              "Account deletion functionality is not available yet. This feature will be implemented soon."
            )}
          </div>
          <div className="delete-box">
            <img src="/trash.gif" alt={t("Delete Account")} />
            <h5 className="mt-3">
              {t("Are You Sure you Want to Delete Your Account?")}
            </h5>

            <div className="mt-3">
              <button
                className="thm-btn danger me-5"
                onClick={handleDeleteAccount}
              >
                {t("Yes, Delete")}
              </button>
              <button
                type="button"
                className="thm-btn success ms-5"
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

export default InstructorProfile;
