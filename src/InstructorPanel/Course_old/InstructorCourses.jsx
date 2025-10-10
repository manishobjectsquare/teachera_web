import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClock,
  faUserGraduate,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import loaderImg from "../../assets/images/loaderImg.png";

const InstructorCourses = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  // Mock data for courses
  const [courses, setCourses] = useState([]);
  const userID = localStorage.getItem("userId");
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.basementex.com/instructor/${userID}`
      );
      const data = await response.json();
      setCourses(data.data.course_details || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  // Helper function to convert minutes to hours and minutes format
  const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}${t("h")} ${remainingMinutes}${t("m")}`;
  };

  // Helper function to get badge class based on approval status
  const getBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning";
      case "rejected":
        return "bg-danger";
      case "approved":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  // Helper function to translate approval status
  const getStatusTranslation = (status) => {
    return t(status.charAt(0).toUpperCase() + status.slice(1));
  };
  if (loading) {
    return (
      <div className="preloadrwrap">
        <div className="preloader-two player preloader-newwww">
          <div className="loader-icon-two player">
            <img src={loaderImg} alt={t("Preloader")} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="col-lg-9">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="title mb-0">{t("All Courses")}</h4>
        <Link to="/instructor/courses/add" className="thm-btn mb-3">
          {t("Add Course")}
        </Link>
      </div>

      <div className="panel-cards">
        <div className="row">
          {courses?.length > 0 ? (
            courses.map((course) => (
              <div key={course?._id} className="col-md-6 col-lg-4 mb-4">
                <div className="product-card">
                  <div className="product-img">
                    <img
                      src={
                        course?.thumbnail
                          ? `https://api.basementex.com/${course?.thumbnail}`
                          : "/square_logo.png"
                      }
                      className="card-img-top"
                      alt={t("Course Image")}
                    />
                  </div>
                  <div className="product-content">
                    <h5>
                      {course?.is_approved === "approved" ? (
                        <Link to={`/course-details/${course?._id}`}>
                          {course?.title}
                        </Link>
                      ) : (
                        <Link to={`/instructor/courses/edit/${course?._id}`}>
                          {course?.title}
                        </Link>
                      )}
                    </h5>
                    <p
                      className={`badges ${getBadgeClass(course?.is_approved)}`}
                    >
                      {getStatusTranslation(course?.is_approved)}
                    </p>

                    {course?.is_approved === "approved" && (
                      <ul className="list-unstyled mt-2">
                        {course?.lectureCount > 0 && (
                          <li>
                            <span>
                              <FontAwesomeIcon icon={faBook} className="me-1" />
                              {t("{{count}} Lectures", {
                                count: course?.lectureCount,
                              })}
                            </span>
                          </li>
                        )}
                        {course?.duration > 0 && (
                          <li>
                            <span>
                              <FontAwesomeIcon
                                icon={faClock}
                                className="me-1"
                              />
                              {minutesToHours(course?.duration)}
                            </span>
                          </li>
                        )}
                        {course?.studentCount > 0 && (
                          <li>
                            <span>
                              <FontAwesomeIcon
                                icon={faUserGraduate}
                                className="me-1"
                              />
                              {t("{{count}} Students", {
                                count: course?.studentCount,
                              })}
                            </span>
                          </li>
                        )}
                      </ul>
                    )}

                    <div className="course-usr-new">
                      <div>
                        <img
                          src={
                            course?.instructor_id?.image
                              ? `https://api.basementex.com/${course?.instructor_id?.image}`
                              : "/square_logo.png"
                          }
                          alt={t("Instructor")}
                        />
                        <span className="ms-1">
                          {course?.instructor_id?.name || "Instructor"}
                        </span>
                      </div>
                      {/* <span className="text-warning">
                                                <FontAwesomeIcon icon={faStar} /> {course.rating.toFixed(1)}
                                            </span> */}
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <Link
                      to={`/instructor/courses/edit/${course?._id}`}
                      className="thm-btn"
                      aria-label={t("Edit course")}
                    >
                      <FontAwesomeIcon icon={faEdit} /> {t("Edit")}
                    </Link>
                    <Link
                      to={`/instructor/courses/delete-request/${course._id}`}
                      className="thm-btn danger"
                      aria-label={t("Delete course")}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> {t("Delete")}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center">
                <h6 className="text-muted">{t("No Course Found")}</h6>
              </div>
            </div>
          )}
        </div>

        {courses?.length > 0 && (
          <div className="mt-3">
            {/* Pagination component would go here */}
            <nav aria-label={t("Page navigation")}>
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a
                    className="page-link"
                    href="#"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    {t("Previous")}
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    {t("Next")}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorCourses;
