"use client";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import userImg from "../assets/images/course-user.png";
import { useTranslation } from "react-i18next";
import loaderImg from "../assets/images/loaderImg.png";
import courseUser from "../assets/images/course-user.png";
import LiveCourseSlider from "../Components/Layout/Sliders/LiveCourseSlider";
import BannerSlider from "../Components/Layout/Sliders/BannerSlider";
import { baseUrl } from "../config/baseUrl";
import DiplomaSlider from "../Components/Layout/Sliders/DiplomaSlider";
import LiveCourseHorizon from "../Components/Layout/Sliders/LiveCourseHorizon";
const LiveCoursesPage = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCourseLevel, setSelectedCourseLevel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [orderBy, setOrderBy] = useState("newest");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 12;

  // Course levels and languages for filtering
  const courseLevels = [
    { value: "", label: t("Course Level") },
    { value: "beginner", label: t("Beginner") },
    { value: "intermediate", label: t("Intermediate") },
    { value: "advanced", label: t("Advanced") },
  ];

  const languages = [
    { value: "", label: t("Language") },
    { value: "english", label: t("English") },
    { value: "arabic", label: t("Arabic") },
    { value: "urdu", label: t("Urdu") },
  ];

  // Fetch live courses
  const fetchLiveCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/api/v1/web/liveCourse/liveLession-list`
      );
      const data = await response.json();

      if (data.status && data.data) {
        setCourses(data.data);
        setFilteredCourses(data.data);
        setTotalPages(Math.ceil(data.data.length / coursesPerPage));
      }
    } catch (error) {
      console.error("Error fetching live courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLiveCourses();
  }, []);

  // Filter and sort courses
  useEffect(() => {
    const filtered = [...courses];

    // Apply sorting
    switch (orderBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "price_low":
        filtered.sort(
          (a, b) => (a.offer_price || a.price) - (b.offer_price || b.price)
        );
        break;
      case "price_high":
        filtered.sort(
          (a, b) => (b.offer_price || b.price) - (a.offer_price || a.price)
        );
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
    setTotalPages(Math.ceil(filtered.length / coursesPerPage));
    setCurrentPage(1);
  }, [courses, selectedCourseLevel, selectedLanguage, orderBy]);

  // Get current page courses
  const getCurrentPageCourses = () => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    return filteredCourses.slice(startIndex, endIndex);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCourseLevel("");
    setSelectedLanguage("");
    setOrderBy("newest");
    setCurrentPage(1);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `$${Number.parseFloat(amount).toFixed(2)}`;
  };

  // Helper function to render star ratings
  const renderStars = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-warning" />
      );
    }

    return stars;
  };

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

  // Generate pagination
  const direction = i18n.dir();
  const prevIcon = direction === "rtl" ? faChevronRight : faChevronLeft;
  const nextIcon = direction === "rtl" ? faChevronLeft : faChevronRight;

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <span className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </span>
        </li>
      );
    }

    return (
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <span
            className="page-link"
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
          >
            <FontAwesomeIcon icon={prevIcon} />
          </span>
        </li>
        {pages}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""
            }`}
        >
          <span
            className="page-link"
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            style={{
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            <FontAwesomeIcon icon={nextIcon} />
          </span>
        </li>
      </ul>
    );
  };

  return (
    <section className="live-courses-page">
      <BannerSlider />

      {/* Main Content */}
      <section className="course-list-sec  my-course" >
        <div className="container">
          {/* Filter Bar */}
          {/* <div className="course-rgt-filter mb-4">
                        <div className="filter-info">
                            <span className="fw-semibold me-3">{t("Filter by")}</span>


                            <div className="custom-frm-bx me-3">
                                <select
                                    className="form-select"
                                    value={selectedCourseLevel}
                                    onChange={(e) => setSelectedCourseLevel(e.target.value)}
                                    style={{ minWidth: "150px" }}
                                >
                                    {courseLevels.map((level) => (
                                        <option key={level.value} value={level.value}>
                                            {level.label}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className="custom-frm-bx me-3">
                                <select
                                    className="form-select"
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    style={{ minWidth: "150px" }}
                                >
                                    {languages.map((lang) => (
                                        <option key={lang.value} value={lang.value}>
                                            {lang.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {(selectedCourseLevel || selectedLanguage) && (
                                <button onClick={clearFilters} className="btn btn-outline-danger btn-sm">
                                    {t("Clear Filters")}
                                </button>
                            )}
                        </div>

                
                        <div className="custom-frm-bx">
                            <label htmlFor="orderby">{t("Sort by")}</label>
                            <select
                                name="orderby"
                                id="orderby"
                                className="form-select orderby"
                                value={orderBy}
                                onChange={(e) => setOrderBy(e.target.value)}
                            >
                                <option value="newest">{t("Newest to oldest")}</option>
                                <option value="oldest">{t("Oldest to newest")}</option>
                                <option value="price_low">{t("Price: Low to High")}</option>
                                <option value="price_high">{t("Price: High to Low")}</option>
                            </select>
                        </div>
                    </div> */}
          {/* 
                    <div className="filter-info mb-3">
                        <span className="results-count">
                            {t("Showing")} {getCurrentPageCourses().length} {t("of")} {filteredCourses.length} {t("live courses")}
                        </span>
                    </div> */}

          {/* Course Grid */}

          <section className="course-sec tp-space">
            <div className="">
              <div className="heading">
                <h2 className="title">{t("Diplomas")}</h2>
                <p>
                  {t(
                    "From critical skills to technical topics, Teachera supports your professional development."
                  )}
                </p>
              </div>
              <div className="custom-tab">
                <div className="tab-content">

                  <DiplomaSlider />
                </div>
              </div>
            </div>
          </section>
          <section className="course-sec tp-space">
            <div className="">
              <div className="heading">
                <h2 className="title">{t("Live Courses")}</h2>
                <p>
                  {t(
                    "From critical skills to technical topics, Teachera supports your professional development."
                  )}
                </p>
              </div>
              <div className="custom-tab">
                <div className="tab-content">

                  <LiveCourseHorizon />
                </div>
              </div>
            </div>
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-wrap">
              <div className="custom-pagination pagination">
                {renderPagination()}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Additional Styles */}
      <style>
        {`
          .product-img {
            position: relative;
          }

          .savings-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            z-index: 2;
          }

          .live-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 600;
            z-index: 2;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .live-dot {
            color: #fff;
            font-size: 0.5rem;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }

          .live-icon {
            color: #e74c3c;
            margin-right: 2px;
          }

          .course-title {
            height: 48px;
            line-height: 1.2;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 8px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .course-description {
            height: 40px;
            line-height: 1.3;
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 10px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .live-course-card {
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .product-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 15px;
          }

          .price {
            margin-bottom: 12px;
            font-weight: 600;
            font-size: 1.1rem;
          }

          .live-course-stats {
            display: flex;
            flex-direction: column;
            gap: 6px;
            width: 100%;
            margin-bottom: 12px;
          }

          .stat-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.8rem;
            color: #666;
            min-height: 18px;
          }

          .stat-item.upcoming-session {
            background: #f8f9fa;
            padding: 6px 8px;
            border-radius: 6px;
            border-left: 3px solid #e74c3c;
            font-weight: 500;
          }

          .stat-item i {
            color: #2563eb;
            font-size: 0.75rem;
            width: 12px;
            flex-shrink: 0;
          }

          .stat-item.upcoming-session i {
            color: #e74c3c;
          }

          .stat-item span {
            font-size: 0.75rem;
            line-height: 1.2;
          }

          .course-bttm {
            display: flex;
            align-items: flex-start;
            gap: 10px;
          }

          .owl-carousel .item {
            height: auto;
          }

          .owl-carousel .item .live-course-card {
            min-height: 400px;
          }

          @media (max-width: 768px) {
            .course-title {
              height: 40px;
              font-size: 0.9rem;
            }

            .course-description {
              height: 36px;
              font-size: 0.8rem;
            }

            .live-course-card {
              min-height: 360px;
            }

            .live-course-stats {
              gap: 4px;
            }

            .stat-item {
              font-size: 0.75rem;
              min-height: 16px;
            }

            .stat-item span {
              font-size: 0.7rem;
            }
          }

          @media (max-width: 480px) {
            .course-title {
              height: 36px;
              font-size: 0.85rem;
            }

            .course-description {
              height: 32px;
              font-size: 0.75rem;
            }

            .live-course-card {
              min-height: 340px;
            }
          }
            @media (max-width: 576px) {
              .owl-carousel .item .live-course-card {
              min-height: auto;}
            }
        `}
      </style>
    </section>
  );
};

export default LiveCoursesPage;
