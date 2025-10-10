import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Instructor from "../assets/images/instructor-img-04.png";
import "../assets/css/slider-custom.css";
import chooseImg from "../assets/images/choose-img.png";
import downloadImg from "../assets/images/download-img.png";
import spiralArrow from "../assets/images/spiral-arrow.png";
import playstoreIcon from "../assets/images/playstore2.svg";
import appstoreIcon from "../assets/images/appstore2.svg";
import PostImg from "../assets/images/blog-img-01.png";
import { useTranslation } from "react-i18next";
import BannerSlider from "../Components/Layout/Sliders/BannerSlider";
import CourseSlider from "../Components/Layout/Sliders/CourseSlider";
import TestimonialSlider from "../Components/Layout/Sliders/TestimonialSlider";
import BundleSlider from "../Components/Layout/Sliders/BundleSlider";
import LiveCourseSlider from "../Components/Layout/Sliders/LiveCourseSlider";
import DiplomaSlider from "../Components/Layout/Sliders/DiplomaSlider";

const Recorded = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const truncate = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  // const fetchCourses = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://api.basementex.com/api/v1/web/course-list"
  //     );
  //     const data = await response.json();

  //     setCourses(data.data);
  //     setCategories(data.Categorydetails);
  //   } catch (error) {
  //     console.error("Error fetching courses:", error);
  //   }
  // };

  // BLOG FETCH API
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.basementex.com/blog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response is ok before parsing
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // For debugging - log the raw response text
      const responseText = await response.text();

      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse blog response as JSON:", parseError);
        throw new Error("Invalid JSON response from server");
      }

      setBlogs(data.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // fetch Instructors
  const [instructors, setInstructors] = useState([]);
  const fetchInstructors = async () => {
    try {
      const response = await fetch("https://api.basementex.com/role", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response is ok before parsing
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // For debugging - log the raw response text
      const responseText = await response.text();

      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error(
          "Failed to parse instructor response as JSON:",
          parseError
        );
        throw new Error("Invalid JSON response from server");
      }

      setInstructors(data.data || []);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // fetchCourses();
    fetchInstructors();
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const time = date.toLocaleTimeString(undefined, timeOptions);
    const fullDate = date.toLocaleDateString(undefined, dateOptions);

    return `${time}, ${fullDate}`;
  };

  return (
    <div className="home-page">
      {/* Banner Section */}
      <BannerSlider />
      {/* BUndle Courses Section */}

      {/* NEW DIPLOMA SECTION */}
      <section className="course-sec tp-space">
        <div className="container">
          <div className="heading">
            <h2 className="title text-center">
              {t("Achieve your career goals with bundles designed for you")}
            </h2>
          </div>
          <BundleSlider />
        </div>
      </section>
      {/* NEW DIPLOMA SECTION END*/}

      {/* Category & Subcategory */}

      <section className="course-sec ">
        <div className="container">
          <div className="heading">
            <h2 className="title text-center">
              {t("Explore Popular Creative Classes On basementex")}
            </h2>
          </div>
          <div className="custom-tab">
            <ul className="nav justify-content-center">
              {categories.map((cat, index) => (
                <li className="tab-item" key={index}>
                  <Link
                    className={`tab-link ${index === 0 ? "" : ""}`}
                    to={`/courses?category=${cat?._id}`}
                    data-bs-target={`#tab-pane-0${index}`}
                    role="tab"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* Category & Subcategory End */}

      {/* Live Courses Section */}
      <section className=" popular-course most-course">
        <div className="container">
          <CourseSlider />
        </div>
      </section>
      <div className="text-center mt-3 mb-5">
        <Link to="/courses" className="thm-btn">
          {t("See All Courses")}
        </Link>
      </div>
      {/* Why Choose Teachera Section */}
      <section className="choose-sec tp-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img
                src={
                  chooseImg ||
                  "/placeholder.svg?height=400&width=500&query=education%20choice"
                }
                alt={t("Why Choose Teachera")}
              />
            </div>
            <div className="col-lg-6">
              <div className="choose-content">
                <div className="heading">
                  <h3 className="title">{t("Why Choose Teachera")}</h3>
                  <p>{t("Choose Description")}</p>
                </div>
                <ul className="choose-content-list">
                  <li>
                    <span className="fas fa-chalkboard-teacher"></span>
                    <div>
                      <h6>{t("Expert Instructors")}</h6>
                      <p>{t("Expert Instructors Description")}</p>
                    </div>
                  </li>
                  <li>
                    <span className="fas fa-book-open"></span>
                    <div>
                      <h6>{t("Flexible Learning")}</h6>
                      <p>{t("Flexible Learning Description")}</p>
                    </div>
                  </li>
                  <li>
                    <span className="fas fa-bookmark"></span>
                    <div>
                      <h6>{t("Comprehensive Courses")}</h6>
                      <p>{t("Comprehensive Courses Description")}</p>
                    </div>
                  </li>
                  <li>
                    <span className="fa fa-fill-drip"></span>
                    <div>
                      <h6>{t("Practical Skills")}</h6>
                      <p>{t("Practical Skills Description")}</p>
                    </div>
                  </li>
                  <li>
                    <span className="fa-solid fa-stamp"></span>
                    <div>
                      <h6>{t("Certifications")}</h6>
                      <p>{t("Certifications Description")}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Popular Courses Section */}
      <section className="tp-space popular-course most-course">
        <div className="container">
          <div className="heading">
            <h3 className="title">{t("Most Popular Courses")}</h3>
            <p>
              {t(
                "Let's join our famous class, the knowledge provided will definitely be useful for you."
              )}
            </p>
          </div>
          <CourseSlider />
        </div>
      </section>
      {/* Download App Section */}
      <section className="download-sec tp-space pt-0">
        <div className="container">
          <div className="download-innr">
            <div className="row align-items-center">
              <div className="col-lg-3">
                <img
                  src={
                    downloadImg ||
                    "/placeholder.svg?height=300&width=200&query=mobile%20app"
                  }
                  alt="Download App"
                />
              </div>
              <div className="col-lg-9">
                <div className="download-content text-center">
                  <h3 className="title">
                    {t("Online Learning Now In Your Finger tips")}
                  </h3>
                  <p>{t("Download App Now")}</p>
                  <a href="#">
                    <img
                      src={
                        playstoreIcon ||
                        "/placeholder.svg?height=50&width=150&query=google%20play"
                      }
                      alt="Google Play"
                    />
                  </a>
                  <a href="#">
                    <img
                      src={
                        appstoreIcon ||
                        "/placeholder.svg?height=50&width=150&query=app%20store"
                      }
                      alt="App Store"
                    />
                  </a>
                  <span>
                    <img
                      src={
                        spiralArrow ||
                        "/placeholder.svg?height=50&width=50&query=spiral%20arrow"
                      }
                      className="spiral-arrow"
                      alt="Arrow"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Instructors Section */}
      <section className="instructor-sec tp-space">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="instructor-content">
                <div className="heading">
                  <h3 className="title">{t("Top Instructors")}</h3>
                  <p>
                    {t(
                      "At the Academy, we strive to bring together the best professors for the best courses"
                    )}
                  </p>
                </div>
                <Link to="/all-instructors" className="thm-btn">
                  {t("All Instructors")}
                </Link>
                <span>
                  <img
                    src={
                      spiralArrow ||
                      "/placeholder.svg?height=50&width=50&query=spiral%20arrow"
                    }
                    className="spiral-arrow"
                    alt="Arrow"
                  />
                </span>
              </div>
            </div>
            <div className="col-lg-1 d-none d-lg-block d-xl-block"></div>
            <div className="col-lg-6">
              <div className="row gx-2">
                {instructors.slice(0, 6).map((instructor) => (
                  <div className="col-lg-4 col-md-4 col-6" key={instructor._id}>
                    <Link to={`/instructor-details/${instructor._id}`}>
                      <div className="instructor-card">
                        <img
                          src={instructor?.image || "/square_logo.png"}
                          alt={instructor?.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/square_logo.png";
                          }}
                        />
                        <p>
                          <span>{instructor?.name}</span>
                          {instructor?.job_title === null ? (
                            <span>Instructor</span>
                          ) : (
                            <span>{instructor?.job_title}</span>
                          )}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-sec tp-space">
        <div className="container">
          <div className="heading">
            <h3 className="title d-flex justify-content-between">
              {t("Our Recent Blog")}
              <Link to="/blog" className="text-primary fz-12 fw-500">
                {t("View All")}
                <i className="fa fa-chevron-right ms-2"></i>
              </Link>
            </h3>
            <p>
              {t(
                "At the Academy, we strive to bring together the best professors for the best courses"
              )}
            </p>
          </div>
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">{t("Loading blogs...")}</p>
            </div>
          ) : blogs.length > 0 ? (
            <div className="blog-layout-wrapper">
              {/* --- Desktop Layout (2x2 Grid) --- */}
              <div className="desktop-blog-layout">
                {blogs.slice(0, 4).map((blog) => (
                  <div className="desktop-blog-card-wrapper" key={blog._id}>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="desktop-blog-link"
                    >
                      <div className="desktop-blog-card">
                        <div className="desktop-blog-image">
                          <img
                            src={`https://api.basementex.com/${blog.image}`}
                            alt={blog.title}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                PostImg ||
                                "/placeholder.svg?height=142&width=150";
                            }}
                          />
                        </div>
                        <div className="desktop-blog-content">
                          <div className="desktop-blog-date">
                            {formatDate(blog.createdAt)}
                          </div>
                          <h3 className="desktop-blog-title">
                            {truncate(blog.title, 40)}
                          </h3>
                          <div
                            className="desktop-blog-description"
                            dangerouslySetInnerHTML={{
                              __html: truncate(blog.description, 200),
                            }}
                          />
                          <div className="desktop-read-more">
                            {t("Read More")}{" "}
                            <i className="fas fa-chevron-right ms-1"></i>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              {/* --- Mobile Layout (Horizontal Scroll) --- */}
              <div className="mobile-blog-layout">
                <div className="mobile-blog-scroll">
                  {blogs.slice(0, 4).map((blog) => (
                    <Link
                      to={`/blog/${blog._id}`}
                      key={blog._id}
                      className="mobile-blog-link"
                    >
                      <div className="mobile-blog-card">
                        <div className="mobile-blog-image">
                          <img
                            src={`https://api.basementex.com/${blog.image}`}
                            alt={blog.title}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                PostImg ||
                                "/placeholder.svg?height=142&width=150";
                            }}
                          />
                        </div>
                        <div className="mobile-blog-content">
                          <div className="mobile-blog-date">
                            {formatDate(blog.createdAt)}
                          </div>
                          <h3 className="mobile-blog-title">
                            {truncate(blog.title, 40)}
                          </h3>
                          <div
                            className="mobile-blog-description"
                            dangerouslySetInnerHTML={{
                              __html: truncate(blog.description, 120),
                            }}
                          />
                          <div className="mobile-read-more">
                            {t("Read More")}{" "}
                            <i className="fas fa-chevron-right ms-1"></i>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="col-12 text-center py-5">
              <h3>{t("No blogs found")}</h3>
              <p>{t("Check back later for new content")}</p>
            </div>
          )}
        </div>

        <style jsx>{`
          .blog-sec {
            background: #f6f7f9;
          }

          /* --- Desktop Styles (2x2 Grid) --- */
          .desktop-blog-layout {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .desktop-blog-link {
            text-decoration: none;
            color: inherit;
            display: block;
            height: 100%;
          }
          .desktop-blog-card {
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
            display: flex;
            height: 100%;
            min-height: 160px;
            border: 1px solid #f0f0f0;
            transition: all 0.3s ease;
          }
          .desktop-blog-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }
          .desktop-blog-image {
            flex: 0 0 180px;
            overflow: hidden;
          }
          .desktop-blog-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
          .desktop-blog-card:hover .desktop-blog-image img {
            transform: scale(1.05);
          }
          .desktop-blog-content {
            flex: 1;
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
          }
          .desktop-blog-date {
            color: #00bcd4;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 6px;
          }
          .desktop-blog-title {
            font-size: 18px;
            font-weight: 700;
            color: #212529;
            margin-bottom: 8px;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .desktop-blog-description {
            color: #6c757d;
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 12px;
            flex-grow: 1;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .desktop-blog-description h1 {
            display: none;
          }
          .desktop-blog-description p {
            line-height: 1rem !important;
            margin: 0;
          }
          .desktop-read-more {
            color: #007bff;
            font-weight: 600;
            font-size: 14px;
            display: inline-flex;
            align-items: center;
            margin-top: auto;
            transition: color 0.3s ease;
          }
          .desktop-read-more:hover {
            color: #0056b3;
          }
          .desktop-read-more i {
            font-size: 12px;
            transition: transform 0.3s ease;
          }
          .desktop-read-more:hover i {
            transform: translateX(3px);
          }

          /* --- Mobile Styles --- */
          .mobile-blog-layout {
            display: none;
          }
          .mobile-blog-scroll {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            padding: 10px 4px;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none; /* Firefox */
          }
          .mobile-blog-scroll::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }
          .mobile-blog-link {
            text-decoration: none;
            color: inherit;
            display: block;
            flex-shrink: 0;
          }
          .mobile-blog-card {
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
            display: flex;
            width: 90vw;
            max-width: 300px;
            height: 160px; /* Match Figma height */
            border: 1px solid #f0f0f0;
          }
          .mobile-blog-image {
            flex: 0 0 130px;
            overflow: hidden;
          }
          .mobile-blog-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .mobile-blog-content {
            flex: 1;
            padding: 12px 16px;
            display: flex;
            flex-direction: column;
          }
          .mobile-blog-date {
            color: #00bcd4;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 4px;
          }
          .mobile-blog-title {
            font-size: 12px;
            font-weight: 600;
            color: #212529;
            margin-bottom: 5px;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            //   height:50px;
          }
          .mobile-blog-description {
            color: #6c757d;
            font-size: 10px;
            margin-bottom: 2px;
            flex-grow: 1;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .mobile-blog-description h1 {
            display: none !important;
          }
          .mobile-blog-description p {
            font-size: 10px;
            margin: 0;
          }
          .mobile-read-more {
            color: #007bff;
            font-weight: 600;
            font-size: 13px;
            display: inline-flex;
            align-items: center;
            margin-top: auto;
          }
          .mobile-read-more i {
            font-size: 11px;
          }

          /* --- RTL --- */
          [dir="rtl"] .desktop-blog-card,
          [dir="rtl"] .mobile-blog-card {
            flex-direction: row-reverse;
          }
          [dir="rtl"] .desktop-blog-content,
          [dir="rtl"] .mobile-blog-content {
            text-align: right;
          }
          [dir="rtl"] .desktop-read-more,
          [dir="rtl"] .mobile-read-more {
            flex-direction: row-reverse;
          }
          [dir="rtl"] .desktop-read-more i,
          [dir="rtl"] .mobile-read-more i {
            transform: rotate(180deg);
          }
          [dir="rtl"] .desktop-read-more:hover i {
            transform: rotate(180deg) translateX(3px);
          }

          /* --- Media Queries --- */
          @media (min-width: 992px) {
            .desktop-blog-layout {
              display: grid;
            }
            .mobile-blog-layout {
              display: none;
            }
          }
          @media (max-width: 991px) {
            .desktop-blog-layout {
              display: none;
            }
            .mobile-blog-layout {
              display: block;
            }
          }
        `}</style>
      </section>
      {/* Testimonial Section */}
      <section className="testimonial tp-space">
        <div className="container">
          <div className="heading text-center">
            <h3 className="title">{t("Testimonial")}</h3>
            <p>{t("Hear from Our Successful Learners")}</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-12">
              <TestimonialSlider />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recorded;
