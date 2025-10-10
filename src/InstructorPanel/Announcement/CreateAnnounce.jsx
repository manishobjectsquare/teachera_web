// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const CreateAnnounce = () => {
//     const navigate = useNavigate();

//     // State for form data
//     const [formData, setFormData] = useState({
//         course_name: '',
//         title: '',
//         announcement: ''
//     });

//     // State for courses data
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [submitting, setSubmitting] = useState(false);

//     useEffect(() => {
//         setLoading(true);

//         const mockCourses = [
//             {
//                 id: 101,
//                 title: 'Web Development Fundamentals'
//             },
//             {
//                 id: 102,
//                 title: 'Advanced JavaScript Concepts'
//             },

//         ];

//         setCourses(mockCourses);
//         setLoading(false);
//     }, []);

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     // Handle rich text editor changes
//     const handleEditorChange = (content) => {
//         setFormData({ ...formData, announcement: content });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitting(true);

//         if (!formData.course_name) {
//             alert('Please select a course');
//             setSubmitting(false);
//             return;
//         }

//         if (!formData.title) {
//             alert('Please enter a title');
//             setSubmitting(false);
//             return;
//         }

//         try {
//             const payload = {
//                 course_name: formData.course_name,
//                 title: formData.title
//             };

//             const response = await fetch('https://api.basementex.com/instructor/announcement/add', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 toast.success('Announcement created successfully');
//                 navigate('/announcements'); // optional: navigate to list page
//             } else {
//                 toast.error('Failed to create announcement');
//             }

//         } catch (error) {
//             console.error('Error creating announcement:', error);
//             toast.error('Something went wrong');
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     // Rich text editor modules/formats
//     const modules = {
//         toolbar: [
//             [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//             ['bold', 'italic', 'underline', 'strike'],
//             [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//             ['link', 'image'],
//             ['clean']
//         ],
//     };
//     const { t } = useTranslation();
//     return (
//         <div className="col-lg-9">
//             <div className="card mt-3">
//                 <div className="card-header">
//                     <h4 className="title">{t('Create an Announcement')}</h4>
//                 </div>
//                 <div className="card-body">
//                     {loading ? (
//                         <p className="text-center">{t('Loading courses...')}</p>
//                     ) : (
//                         <form onSubmit={handleSubmit}>
//                             <div className="custom-frm-bx">
//                                 <label className="form-label">{t('Course')}</label>
//                                 <select
//                                     name="course"
//                                     className="form-select"
//                                     value={formData.course}
//                                     onChange={handleInputChange}
//                                     aria-label={t('Select course')}
//                                 >
//                                     <option value="">{t('Select')}</option>
//                                     {courses.map(course => (
//                                         <option key={course.id} value={course.id}>
//                                             {course.title}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="custom-frm-bx">
//                                 <label className="form-label">{t('Title')}</label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     className="form-control"
//                                     value={formData.title}
//                                     onChange={handleInputChange}
//                                     placeholder={t('Enter announcement title')}
//                                     aria-label={t('Announcement title')}
//                                 />
//                             </div>

//                             <div className="custom-frm-bx">
//                                 <label className="form-label">{t('Announcement')}</label>
//                                 <textarea
//                                     name="announcement"
//                                     id="announcement"
//                                     rows={6}
//                                     className='form-control'
//                                     placeholder={t('Enter your announcement content here')}
//                                     aria-label={t('Announcement content')}
//                                 ></textarea>
//                             </div>

//                             <button
//                                 type="submit"
//                                 className="btn btn-primary"
//                                 disabled={submitting}
//                             >
//                                 {submitting ? t('Creating...') : t('Create')}
//                             </button>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateAnnounce;

// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const CreateAnnounce = () => {
//     const navigate = useNavigate();
//     const { t } = useTranslation();

//     const [formData, setFormData] = useState({
//         course_name: '',
//         title: '',
//         announcement: ''
//     });

//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [submitting, setSubmitting] = useState(false);
//     const userId = localStorage.getItem('userId');
//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await fetch(`https://api.basementex.com/instructor/${userId}`);
//                 const data = await response.json();
//                 setCourses(data.data.course_details || []);
//             } catch (error) {
//                 console.error('Failed to fetch courses:', error);
//                 toast.error('Error fetching courses');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCourses();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitting(true);

//         if (!formData.course_name || !formData.title) {
//             toast.error('Please fill in all required fields');
//             setSubmitting(false);
//             return;
//         }

//         try {
//             const payload = {
//                 course_name: formData.course_name,
//                 title: formData.title,
//                 announcement: formData.announcement
//             };

//             const response = await fetch('https://api.basementex.com/instructor/announcement/add', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             });

//             const data = await response.json();
//             if (data.status) {
//                 toast.success('Announcement created successfully');
//                 navigate('/instructor/announcements');
//             } else {
//                 toast.error('Failed to create announcement');
//             }
//         } catch (error) {
//             console.error('Error creating announcement:', error);
//             toast.error('Something went wrong');
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <div className="col-lg-9">
//             <div className="card mt-3">
//                 <div className="card-header">
//                     <h4 className="title">{t('Create an Announcement')}</h4>
//                 </div>
//                 <div className="card-body">
//                     {loading ? (
//                         <p className="text-center">{t('Loading courses...')}</p>
//                     ) : (
//                         <form onSubmit={handleSubmit}>
//                             <div className="custom-frm-bx">
//                                 <label className="form-label">{t('Course')}</label>
//                                 <select
//                                     name="course_name"
//                                     className="form-select"
//                                     value={formData.course_name}
//                                     onChange={handleInputChange}
//                                     aria-label={t('Select course')}
//                                 >

//                                     <option value="">{t('Select')}</option>
//                                     {courses.map(course => (
//                                         <option key={course?._id} value={{
//                                             course_name: course?.title,
//                                             courseId: course?._id
//                                         }} >
//                                             {course?.title}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="custom-frm-bx">
//                                 <label className="form-label">{t('Title')}</label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     className="form-control"
//                                     value={formData.title}
//                                     onChange={handleInputChange}
//                                     placeholder={t('Enter announcement title')}
//                                     aria-label={t('Announcement title')}
//                                 />
//                             </div>

//                             <div className="custom-frm-bx">
//                                 <label className="form-label">{t('Announcement')}</label>
//                                 <textarea
//                                     name="announcement"
//                                     id='announcement'
//                                     className="form-control"
//                                     rows={4}
//                                     placeholder={t('You can add announcement content later')}
//                                     value={formData.announcement}
//                                     onChange={handleInputChange}
//                                 ></textarea>
//                             </div>

//                             <button
//                                 type="submit"
//                                 className="btn btn-primary"
//                                 disabled={submitting}
//                             >
//                                 {submitting ? t('Creating...') : t('Create')}
//                             </button>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateAnnounce;

"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateAnnounce = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    courseId: "",
    course_name: "",
    title: "",
    announcement: "",
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `https://api.basementex.com/instructor/${userId}`
        );
        const data = await response.json();
        setCourses(data.data.course_details || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        toast.error("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCourses();
    } else {
      toast.error("User ID not found. Please login again.");
      setLoading(false);
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseChange = (e) => {
    const selectedCourseId = e.target.value;
    const selectedCourse = courses.find(
      (course) => course._id === selectedCourseId
    );

    setFormData({
      ...formData,
      courseId: selectedCourseId,
      course_name: selectedCourse ? selectedCourse.title : "",
    });
  };

  const validateForm = () => {
    if (!formData.courseId) {
      toast.error("Please select a course");
      return false;
    }

    if (!formData.title.trim()) {
      toast.error("Please enter announcement title");
      return false;
    }

    if (!formData.announcement.trim()) {
      toast.error("Please enter announcement content");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        userId: userId,
        courseId: formData.courseId,
        title: formData.title.trim(),
        course_name: formData.course_name,
        announcement: formData.announcement.trim(),
      };

      const response = await fetch(
        "https://api.basementex.com/instructor/announcement/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add authorization header if needed
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok && data.status) {
        toast.success("Announcement created successfully");
        // Reset form
        setFormData({
          courseId: "",
          course_name: "",
          title: "",
          announcement: "",
        });
        // Navigate to announcements list
        setTimeout(() => {
          navigate("/instructor/announcements");
        }, 1500);
      } else {
        toast.error(data.message || "Failed to create announcement");
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="col-lg-9">
      <div className="card mt-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="title mb-0">{t("Create an Announcement")}</h4>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate("/instructor/announcements")}
            disabled={submitting}
          >
            <i className="fa fa-arrow-left me-1"></i>
            {t("Back")}
          </button>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">{t("Loading courses...")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="custom-frm-bx mb-3">
                    <label className="form-label fw-bold">
                      {t("Course")} <span className="text-danger">*</span>
                    </label>
                    <select
                      name="courseId"
                      className="form-select"
                      value={formData.courseId}
                      onChange={handleCourseChange}
                      aria-label={t("Select course")}
                      required
                      disabled={submitting}
                    >
                      <option value="">{t("Select a course")}</option>
                      {courses.map((course) => (
                        <option key={course?._id} value={course?._id}>
                          {course?.title}
                        </option>
                      ))}
                    </select>
                    {courses.length === 0 && (
                      <small className="text-muted">
                        {t("No courses available")}
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="custom-frm-bx mb-3">
                    <label className="form-label fw-bold">
                      {t("Title")} <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder={t("Enter announcement title")}
                      aria-label={t("Announcement title")}
                      required
                      disabled={submitting}
                      maxLength={100}
                    />
                    <small className="text-muted">
                      {formData.title.length}/100 {t("characters")}
                    </small>
                  </div>
                </div>
              </div>

              <div className="custom-frm-bx mb-4">
                <label className="form-label fw-bold">
                  {t("Announcement")} <span className="text-danger">*</span>
                </label>
                <textarea
                  name="announcement"
                  id="announcement"
                  className="form-control"
                  rows={6}
                  placeholder={t("Enter your announcement content here...")}
                  value={formData.announcement}
                  onChange={handleInputChange}
                  required
                  disabled={submitting}
                  maxLength={1000}
                ></textarea>
                <small className="text-muted">
                  {formData.announcement.length}/1000 {t("characters")}
                </small>
              </div>

              {/* Preview Section */}
              {(formData.title || formData.announcement) && (
                <div className="mb-4">
                  <h6 className="fw-bold">{t("Preview")}</h6>
                  <div className="border rounded p-3 bg-light">
                    {formData.course_name && (
                      <div className="mb-2">
                        <span className="badge bg-primary">
                          {formData.course_name}
                        </span>
                      </div>
                    )}
                    {formData.title && (
                      <h6 className="fw-bold">{formData.title}</h6>
                    )}
                    {formData.announcement && (
                      <p className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
                        {formData.announcement}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="d-flex gap-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting || courses.length === 0}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      {t("Creating...")}
                    </>
                  ) : (
                    <>
                      <i className="fa fa-bullhorn me-1"></i>
                      {t("Create Announcement")}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setFormData({
                      courseId: "",
                      course_name: "",
                      title: "",
                      announcement: "",
                    });
                  }}
                  disabled={submitting}
                >
                  <i className="fa fa-refresh me-1"></i>
                  {t("Reset")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAnnounce;
