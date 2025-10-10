// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import CourseImg from "../assets/images/course-img-01.png"
// import Instructors from './Instructors';
// import Instructor from "../assets/images/instructor-img-04.png"
// import { useTranslation } from 'react-i18next';
// import { faStar } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import loaderImg from "../assets/images/loaderImg.png"
// const InstructorDetails = () => {
//     const { t } = useTranslation();
//     const { id } = useParams();
//     const [instructor, setInstructor] = useState({});
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Helper functions
//     const truncate = (text, length) => {
//         if (!text) return '';
//         return text.length > length ? text.substring(0, length) + '...' : text;
//     };

//     const formatCurrency = (amount) => {
//         return `$${amount.toFixed(2)}`;
//     };

//     const calculateAverageRating = (ratings) => {
//         if (!ratings || ratings.length === 0) return 0;
//         const sum = ratings.reduce((total, rating) => total + rating, 0);
//         return (sum / ratings.length).toFixed(1);
//     };
//     const [students, setStudents] = useState("0");
//     const fetchInstructorData = async (id) => {
//         try {
//             const response = await fetch(`https://api.basementex.com/instructor/${id}`);

//             const data = await response.json();
//             setInstructor(data.data.instructor_details);
//             setCourses(data.data.course_details);
//             setStudents(data.studentCount);
//             setLoading(false);

//         } catch (error) {
//             console.error("Error fetching instructor data:", error);
//             setLoading(false);
//         }
//     }
//     useEffect(() => {
//         fetchInstructorData(id);
//     }, [id]);
//     if (loading) {
//         return (
//             <div className="preloadrwrap">
//                 <div className="preloader-two player preloader-newwww">
//                     <div className="loader-icon-two player">
//                         <img
//                             src={loaderImg}
//                             alt={t('Preloader')}
//                         />
//                     </div>
//                 </div>
//             </div>
//         )
//     }
//     if (!instructor) {
//         return (
//             <div className="container py-5 text-center">
//                 <h2>{t('Instructor not found')}</h2>
//                 <p>{t("The instructor you're looking for doesn't exist or has been removed.")}</p>
//                 <Link to="/instructors" className="btn btn-primary">{t('View All Instructorss')}</Link>
//             </div>
//         );
//     }

//     // Calculate average rating across all courses
//     const avgRating = calculateAverageRating(courses.map(course => course?.avg_rating));

//     // Calculate total students (in a real app, this would come from the API)
//     const totalStudents = 2809901; // Mock data
//     if (loading) {
//         return (
//             <div className="preloadrwrap">
//                 <div className="preloader-two player preloader-newwww">
//                     <div className="loader-icon-two player">
//                         <img src={loaderImg} alt={t("Preloader")} />
//                     </div>
//                 </div>
//             </div>
//         )
//     }
//     return (
//         <>
//             {/* Instructor Header */}
//             <section className="instructor-main py-5 bg-light">
//                 <style>

//                     {
//                         `
//                         .rating-part .rating{
//         margin-bottom: 0 !important;
// }
// .rating-part .rating span{
//         display: inline-block;
//         padding: 1px 10px;
//         background-color: #FCECE5;
//         border-radius: 25px;
//         color: #000;
//                         `
//                     }
//                 </style>
//                 <div className="container">
//                     <div className="card shadow p-4">
//                         <div className="row align-items-center">
//                             <div className="col-lg-2 col-md-3 col-sm-4 text-center">
//                                 <img
//                                     className="rounded-circle img-fluid"
//                                     src={
//                                         instructor?.image ? `https://api.basementex.com/${instructor?.image}` : "/square_logo.png"
//                                     }
//                                     alt={instructor?.name}
//                                     onError={(e) => {
//                                         e.target.onerror = null
//                                         e.target.src = "/square_logo.png"
//                                     }}
//                                     style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//                                 />
//                             </div>
//                             <div className="col-lg-10 col-md-9 col-sm-8">
//                                 <div>
//                                     <h6 className="text-uppercase text-primary">{instructor?.job_title}</h6>
//                                     <h3 className="fw-bold rating-part d-flex justify-content-between align-items-center">
//                                         {instructor?.name}
//                                         {/* <span className="text-warning ms-3">
//                                             <i className="fas fa-star me-2"></i>
//                                             ({avgRating} {t('Reviews')})
//                                         </span> */}
//                                         <p className="rating">
//                                             <span>
//                                                 <FontAwesomeIcon icon={faStar} className="me-2 text-warning" />
//                                                 {instructor?.rating || "0"}
//                                             </span>
//                                         </p>
//                                     </h3>
//                                     <p className="text-muted">
//                                         <span><i className="far fa-user me-2"></i>{students || "0"} {t('Students')}</span>
//                                         <span className="ms-3"><i className="fal fa-play-circle me-2"></i> {courses.length} {t('Courses')}</span>
//                                     </p>
//                                     <p
//                                         className="text-muted"
//                                         dangerouslySetInnerHTML={{
//                                             __html: truncate(instructor?.short_bio, 200),
//                                         }}
//                                     ></p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Instructor Bio */}
//             <section className="py-5">
//                 <div className="container">
//                     <h2 className="title mb-4">Biography</h2>
//                     {/* <div dangerouslySetInnerHTML={{ __html: instructor.bio.replace(/\n/g, '<br />') }} /> */}
//                 </div>
//             </section>

//             {/* Courses */}
//             <section className="my-course py-5 bg-light">
//                 <div className="container">
//                     <div className="text-center mb-4">
//                         <h2 className="fw-bold">My Courses</h2>
//                         <p className="text-muted">Join our famous classes! The knowledge provided will definitely be useful for you.</p>
//                     </div>

//                     <div className="row g-4">
//                         {courses.map(course => (
//                             <div className="col-lg-3 col-md-6 col-sm-6" key={course.id}>
//                                 <div className="card shadow-sm">
//                                     <Link to={`/course-details/${course?._id}`}>
//                                         <img
//                                             src={`https://api.basementex.com/${course.thumbnail}`}
//                                             className="card-img-top"
//                                             alt={course.title}
//                                         />
//                                     </Link>
//                                     <div className="card-body d-flex flex-column">
//                                         <h5 className="fw-bold">{course?.title}</h5>
//                                         <p className="text-warning mb-1">
//                                             <i className="fas fa-star"></i>
//                                             {/* {course?.avg_rating.toFixed(1)} */}
//                                             <span className="text-muted">0</span>
//                                         </p>

//                                         {course.price === 0 ? (
//                                             <p className="text-success fw-bold">Free</p>
//                                         ) : course.price > 0 && course.discount > 0 ? (
//                                             <p className="fw-bold text-primary">{formatCurrency(course.discount)}</p>
//                                         ) : (
//                                             <p className="fw-bold text-dark">{formatCurrency(course.price)}</p>
//                                         )}

//                                         <div className="mt-auto">
//                                             <p className="text-muted small mb-1">Category</p>
//                                             <h6 className="fw-bold">{course?.category_id?.title}</h6>
//                                         </div>
//                                     </div>
//                                     <div className="card-footer bg-white text-center">
//                                         {console.log(course?._id)}
//                                         <Link to={`/course-details/${course._id}`} className="btn btn-primary w-100">View Course</Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default InstructorDetails;

"use client";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loaderImg from "../assets/images/loaderImg.png";

const InstructorDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [instructor, setInstructor] = useState({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper functions
  const truncate = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const [students, setStudents] = useState("0");

  const fetchInstructorData = async (id) => {
    try {
      const response = await fetch(
        `https://api.basementex.com/instructor/${id}`
      );
      const data = await response.json();
      setInstructor(data.data.instructor_details);
      setCourses(data.data.course_details);
      setStudents(data.studentCount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching instructor data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructorData(id);
  }, [id]);

  if (loading) {
    return (
      <div className="preloadrwrap">
        <div className="preloader-two player preloader-newwww">
          <div className="loader-icon-two player">
            <img src={loaderImg || "/placeholder.svg"} alt={t("Preloader")} />
          </div>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="container py-5 text-center">
        <h2>{t("Instructor not found")}</h2>
        <p>
          {t(
            "The instructor you're looking for doesn't exist or has been removed."
          )}
        </p>
        <Link to="/instructors" className="btn btn-primary">
          {t("View All Instructors")}
        </Link>
      </div>
    );
  }

  // Calculate average rating across all courses
  const avgRating = calculateAverageRating(
    courses.map((course) => course?.avg_rating)
  );

  // Calculate total students (in a real app, this would come from the API)
  const totalStudents = 2809901; // Mock data

  return (
    <>
      {/* Instructor Header */}
      <section className="instructor-main py-5 bg-light">
        <style>
          {`
                        .rating-part .rating{
                            margin-bottom: 0 !important;
                        }
                        .rating-part .rating span{
                            display: inline-block;
                            padding: 1px 10px;
                            background-color: #FCECE5;
                            border-radius: 25px;
                            color: #000;
                        }
                    `}
        </style>
        <div className="container">
          <div className="card shadow p-4">
            <div className="row align-items-center">
              <div className="col-lg-2 col-md-3 col-sm-4 text-center">
                <img
                  className="rounded-circle img-fluid"
                  src={
                    instructor?.image
                      ? `https://api.basementex.com/${instructor?.image}`
                      : "/square_logo.png"
                  }
                  alt={instructor?.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/square_logo.png";
                  }}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="col-lg-10 col-md-9 col-sm-8">
                <div>
                  <h6 className="text-uppercase text-primary">
                    {instructor?.job_title}
                  </h6>
                  <h3 className="fw-bold rating-part d-flex justify-content-between align-items-center">
                    {instructor?.name}
                    <p className="rating">
                      <span>
                        <FontAwesomeIcon
                          icon={faStar}
                          className="me-2 text-warning"
                        />
                        {instructor?.rating || "0"}
                      </span>
                    </p>
                  </h3>
                  <p className="text-muted">
                    <span>
                      <i className="far fa-user me-2"></i>
                      {students || "0"} {t("Students")}
                    </span>
                    <span className="ms-3">
                      <i className="fal fa-play-circle me-2"></i>{" "}
                      {courses.length} {t("Courses")}
                    </span>
                  </p>
                  <p
                    className="text-muted"
                    dangerouslySetInnerHTML={{
                      __html: truncate(instructor?.short_bio, 200),
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Bio */}
      <section className="py-5">
        <div className="container">
          <h2 className="title mb-4">{t("Biography")}</h2>
          {/* <div dangerouslySetInnerHTML={{ __html: instructor.bio.replace(/\n/g, '<br />') }} /> */}
        </div>
      </section>

      {/* Courses */}
      <section className="my-course py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold">{t("My Courses")}</h2>
            <p className="text-muted">
              {t(
                "Join our famous classes! The knowledge provided will definitely be useful for you."
              )}
            </p>
          </div>

          <div className="row g-4">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={course.id}>
                  <div className="card shadow-sm">
                    <Link to={`/course-details/${course?._id}`}>
                      <img
                        src={`https://api.basementex.com/${course.thumbnail}`}
                        className="card-img-top"
                        alt={course.title}
                      />
                    </Link>
                    <div className="card-body d-flex flex-column">
                      <h5 className="fw-bold">{course?.title}</h5>
                      <p className="text-warning mb-1">
                        <i className="fas fa-star"></i>
                        <span className="text-muted">0</span>
                      </p>

                      {course.price === 0 ? (
                        <p className="text-success fw-bold">{t("Free")}</p>
                      ) : course.price > 0 && course.discount > 0 ? (
                        <p className="fw-bold text-primary">
                          {formatCurrency(course.discount)}
                        </p>
                      ) : (
                        <p className="fw-bold text-dark">
                          {formatCurrency(course.price)}
                        </p>
                      )}

                      <div className="mt-auto">
                        <p className="text-muted small mb-1">{t("Category")}</p>
                        <h6 className="fw-bold">
                          {course?.category_id?.title}
                        </h6>
                      </div>
                    </div>
                    <div className="card-footer bg-white text-center">
                      <Link
                        to={`/course-details/${course._id}`}
                        className="btn btn-primary w-100"
                      >
                        {t("View Course")}
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">{t("No courses available")}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default InstructorDetails;
