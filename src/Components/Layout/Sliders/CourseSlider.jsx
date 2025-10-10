import React, { useEffect, useState } from "react";

import courseUser from "../../../assets/images/course-user.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CourseSlider = () => {
  const { t, i18n } = useTranslation();
  const courseSliderOptions = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: false,
    smartSpeed: 500,
    navText: [
      '<span class="fa fa-chevron-left"></span>',
      '<span class="fas fa-chevron-right"></span>',
    ],
    responsive: {
      0: {
        items: 1.3,
      },
      500: {
        items: 1.5,
      },
      770: {
        items: 2,
      },
      1000: {
        items: 4,
      },
      1600: {
        items: 4,
      },
    },
  };
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `https://api.basementex.com/api/v1/web/course-list`
        );
        const data = await response.json();

        setCourses(data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };
  return (
    <>
      {/* {courses.map((course, index) => (
                <div
                    className={`tab-pane fade show ${index === 0 ? 'active' : ''}`}
                    id={`tab-pane-0${index}`}
                    role="tabpanel"
                    key={course.id}
                >
                
                </div>
            ))} */}
      {courses.length > 0 && (
        <OwlCarousel
          key={i18n.language}
          className="course-slide owl-carousel"
          {...courseSliderOptions}
        >
          {courses.map((course) => (
            <div className="item" key={course._id}>
              <div className="product-card">
                <Link to={`/course-details/${course?._id}`}>
                  <div className="product-img">
                    {/* {
                                                course.thumbnail.length < 1 ? (
                                                    <img src={courseImg.thumbnail} className="w-100" alt={course.title} />
                                                ) : (
                                                    <img src={courseImg} className="w-100" alt={course.title} />
                                                )
                                            } */}
                    <img
                      src={
                        i18n.language == "en" || course.arabic_thumbnail === ""
                          ? `https://api.basementex.com/${course?.thumbnail}`
                          : `https://api.basementex.com/${course?.arabic_thumbnail}`
                      }
                      className="w-100"
                      alt={course.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/square_logo.png";
                      }}
                    />
                    {/* <div className="course-usr">
                      <img
                        src={courseUser || "/placeholder.svg"}
                        className="w-auto"
                        alt="Users"
                      />
                      <span>
                        + {course?.studentCount} {t("Students")}
                      </span>
                    </div> */}
                  </div>

                  <div className="product-content">
                    <h4>
                      {i18n.language == "en" || course.arabic_title === ""
                        ? course.title
                        : course.arabic_title}
                    </h4>
                    {/* <p className="rating">
                      {Array.from({ length: 5 }, (_, i) => {
                        const rating = course?.averageRating || 0;
                        if (rating >= i + 1) {
                          return <i key={i} className="fas fa-star"></i>; // Full star
                        } else if (rating >= i + 0.5) {
                          return (
                            <i key={i} className="fas fa-star-half-alt"></i>
                          ); // Half star
                        } else {
                          return (
                            <i
                              key={i}
                              className="fas fa-star text-secondary"
                            ></i>
                          ); // Empty star
                        }
                      })}
                      <span style={{ marginLeft: "8px" }}>
                        {course?.averageRating.toFixed(1)}
                      </span>
                    </p> */}

                    <p className="price">
                      {formatCurrency(course?.discount_price)}
                      <del className="ms-1">
                        {formatCurrency(course?.price)}
                      </del>
                    </p>
                    <div className="course-bttm">
                      <img
                        src={
                          course?.instructorDetails?.image
                            ? `https://api.basementex.com/${course?.instructorDetails?.image}`
                            : "/square_logo.png"
                        }
                        alt={course?.instructorDetails?.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/square_logo.png";
                        }}
                      />
                      <div>
                        <p>{t("Instructor")}</p>
                        <h6>{course?.instructorDetails?.name}</h6>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </OwlCarousel>
      )}
      <style>
        {`
                .product-card .product-content h4 {
                    height: 45px;
                }
                `}
      </style>
    </>
  );
};

export default CourseSlider;
