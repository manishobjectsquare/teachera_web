// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// const EditAnnouncement = () => {
//     const { t } = useTranslation();
//     const navigate = useNavigate();

//     // State for form data
//     const [formData, setFormData] = useState({
//         course: '',
//         title: '',
//         announcement: ''
//     });

//     // State for courses data
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [submitting, setSubmitting] = useState(false);

//     // Fetch courses data
//     useEffect(() => {
//         setLoading(true);

//         // In a real app, you would fetch data from an API
//         // For now, we'll use mock data
//         const mockCourses = [
//             {
//                 id: 101,
//                 title: 'Web Development Fundamentals'
//             },
//             {
//                 id: 102,
//                 title: 'Advanced JavaScript Concepts'
//             },
//             {
//                 id: 103,
//                 title: 'React for Beginners'
//             },
//             {
//                 id: 104,
//                 title: 'Data Science with Python'
//             },
//             {
//                 id: 105,
//                 title: 'UI/UX Design Principles'
//             }
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
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setSubmitting(true);

//         // Basic validation
//         if (!formData.course) {
//             alert(t('Please select a course'));
//             setSubmitting(false);
//             return;
//         }

//         if (!formData.title) {
//             alert(t('Please enter a title'));
//             setSubmitting(false);
//             return;
//         }

//         if (!formData.announcement) {
//             alert(t('Please enter announcement content'));
//             setSubmitting(false);
//             return;
//         }

//         // In a real app, you would make an API call to create the announcement
//         console.log(t('Updating announcement:'), formData);

//         // Simulate API call
//         setTimeout(() => {
//             setSubmitting(false);
//             alert(t('Announcement updated successfully!'));
//             navigate('/instructor/announcements'); // Redirect to announcements list
//         }, 1000);
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

//     return (
//         <div className="col-lg-9">
//             <div className="card mt-3">
//                 <div className="card-header">
//                     <h4 className="title">{t('Edit Announcement')}</h4>
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
//                                     rows={6}
//                                     className='form-control'
//                                     value={formData.announcement}
//                                     onChange={(e) => handleInputChange(e)}
//                                     placeholder={t('Enter your announcement content here')}
//                                     aria-label={t('Announcement content')}
//                                 ></textarea>
//                             </div>

//                             <button
//                                 type="submit"
//                                 className="btn btn-primary"
//                                 disabled={submitting}
//                             >
//                                 {submitting ? t('Updating...') : t('Update')}
//                             </button>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditAnnouncement;

"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";

const EditAnnouncement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams(); // Get announcement ID from URL params

  // State for form data
  const [formData, setFormData] = useState({
    courseId: "",
    course_name: "",
    title: "",
    announcement: "",
  });

  // State for courses data
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingAnnouncement, setFetchingAnnouncement] = useState(true);

  const userId = localStorage.getItem("userId");

  // Fetch courses and announcements data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch instructor courses
        const coursesResponse = await fetch(
          `https://api.basementex.com/instructor/${userId}`
        );
        const coursesData = await coursesResponse.json();
        setCourses(coursesData.data.course_details || []);

        // Fetch announcements to find the specific one
        const announcementsResponse = await fetch(
          `https://api.basementex.com/instructor/announcement/get/${userId}`
        );
        const announcementsData = await announcementsResponse.json();

        console.log("API Response:", announcementsData); // Debug log

        if (
          announcementsData.status &&
          announcementsData.data?.announcement_data
        ) {
          const announcementsList = announcementsData.data.announcement_data;
          setAnnouncements(announcementsList);

          // Find the specific announcement by ID
          const currentAnnouncement = announcementsList.find(
            (announcement) => announcement._id === id
          );

          if (currentAnnouncement) {
            // Find the course details for this announcement
            const relatedCourse = coursesData.data.course_details?.find(
              (course) => course.title === currentAnnouncement.course_name
            );

            console.log("Found announcement:", currentAnnouncement); // Debug log
            console.log("Related course:", relatedCourse); // Debug log

            setFormData({
              courseId: relatedCourse?._id || "",
              course_name: currentAnnouncement.course_name || "",
              title: currentAnnouncement.title || "",
              announcement: currentAnnouncement.announcement || "",
            });
          } else {
            console.log("Announcement not found with ID:", id); // Debug log
            toast.error("Announcement not found");
            navigate("/instructor/announcements");
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
        setFetchingAnnouncement(false);
      }
    };

    if (userId && id) {
      fetchData();
    } else {
      toast.error("Missing required information");
      navigate("/instructor/announcements");
    }
  }, [userId, id, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle course selection change
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

  // Validation function
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        announcementId: id,
        userId: userId,
        courseId: formData.courseId,
        title: formData.title.trim(),
        course_name: formData.course_name,
        announcement: formData.announcement.trim(),
      };

      const response = await fetch(
        `https://api.basementex.com/instructor/announcement/update/${id}`,
        {
          method: "PATCH",
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
        toast.success("Announcement updated successfully!");
        setTimeout(() => {
          navigate("/instructor/announcements");
        }, 1500);
      } else {
        toast.error(data.message || "Failed to update announcement");
      }
    } catch (error) {
      console.error("Error updating announcement:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || fetchingAnnouncement) {
    return (
      <div className="col-lg-9">
        <div className="card mt-3">
          <div className="card-body">
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">{t("Loading announcement data...")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-lg-9">
      <ToastContainer />
      <div className="card mt-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="title mb-0">{t("Edit Announcement")}</h4>
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
                rows={6}
                className="form-control"
                value={formData.announcement}
                onChange={handleInputChange}
                placeholder={t("Enter your announcement content here")}
                aria-label={t("Announcement content")}
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

            {/* Current Data Info */}
            {/* <div className="alert alert-info mb-4">
                            <h6 className="alert-heading">
                                <i className="fa fa-info-circle me-1"></i>
                                {t("Current Announcement Info")}
                            </h6>
                            <div className="row">
                                <div className="col-md-6">
                                    <small>
                                        <strong>{t("Announcement ID")}:</strong> {id}
                                    </small>
                                </div>
                                <div className="col-md-6">
                                    <small>
                                        <strong>{t("Original Course")}:</strong> {formData.course_name || t("Not specified")}
                                    </small>
                                </div>
                            </div>
                        </div> */}

            <div className="d-flex gap-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting || courses.length === 0}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {t("Updating...")}
                  </>
                ) : (
                  <>
                    <i className="fa fa-save me-1"></i>
                    {t("Update Announcement")}
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  if (
                    window.confirm(
                      t("Are you sure you want to discard changes?")
                    )
                  ) {
                    navigate("/instructor/announcements");
                  }
                }}
                disabled={submitting}
              >
                <i className="fa fa-times me-1"></i>
                {t("Cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAnnouncement;
