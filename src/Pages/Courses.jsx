

"use client";

import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import userImg from "../assets/images/course-user.png";
import { useTranslation } from "react-i18next";
import loaderImg from "../assets/images/loaderImg.png";

const CoursesPage = () => {
  const { t, i18n } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [orderBy, setOrderBy] = useState("desc");
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Fetch courses with optional filters
  let category = searchParams.get("category");
  const fetchCourses = async (
    categoryId = category,
    subcategoryId = "",
    page = 1
  ) => {
    setLoading(true);
    try {
      let url = `https://api.basementex.com/api/v1/web/course-filter`;
      const params = new URLSearchParams();

      if (categoryId) {
        // params.append("category_id", categoryId);
        // setSearchParams({ category: categoryId });
      }
      category = categoryId;

      if (category) {
        params.append("category_id", category);
      }

      if (subcategoryId) {
        params.append("subcategory_id", subcategoryId);
      }
      if (page > 1) {
        params.append("page", page);
      }

      if (params.toString()) {
        url += "?" + params.toString();
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.status) {
        setCourses(data.data);
        console.log(data.Categorydetails);

        setCategories(data.Categorydetails);
        setTotalPages(data.totalPages || 1);
        setTotalRecords(data.totalRecords || data.data.length);
        setCurrentPage(data.currentPage || 1);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchCourses();
  }, [searchParams]);

  useEffect(() => {
    setSelectedMainCategory(category);
    setSelectedSubCategory("");
  }, [searchParams]);

  // Handle main category change
  const handleMainCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedMainCategory(categoryId);
    setSelectedSubCategory(""); // Reset subcategory when main category changes
    setCurrentPage(1); // Reset to first page

    // Find selected category and set its subcategories
    const selectedCategory = categories.find((cat) => cat._id === categoryId);
    setSubcategories(selectedCategory ? selectedCategory.subcat : []);

    // Fetch courses for selected category
    if (categoryId) {
      fetchCourses(categoryId, "", 1);
    } else {
      fetchCourses("", "", 1); // Fetch all courses if no category selected
    }
  };

  // Handle subcategory change
  const handleSubCategoryChange = (e) => {
    const subcategoryId = e.target.value;
    setSelectedSubCategory(subcategoryId);
    setCurrentPage(1); // Reset to first page

    // Fetch courses for selected subcategory
    if (subcategoryId) {
      fetchCourses("", subcategoryId, 1);
    } else if (selectedMainCategory) {
      fetchCourses(selectedMainCategory, "", 1);
    } else {
      fetchCourses("", "", 1);
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCourses(selectedMainCategory, selectedSubCategory, page);
  };

  // Handle order by change (this would need to be implemented in the API)
  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
    // Note: You might need to add sorting parameter to your API
    // For now, we'll just update the state
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedMainCategory("");
    setSelectedSubCategory("");
    setSelectedLanguages([]);
    setOrderBy("desc");
    setSubcategories([]);
    setCurrentPage(1);
    fetchCourses([], "", 1); // Fetch all courses
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `$${Number.parseFloat(amount).toFixed(2)}`;
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
  const direction = i18n.dir(); // 'ltr' or 'rtl'
  const prevIcon = direction === "rtl" ? faChevronRight : faChevronLeft;
  const nextIcon = direction === "rtl" ? faChevronLeft : faChevronRight;

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
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
    <section className="course-list-sec mt-85 tp-space my-course">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-12">
            <h2 className="title">{t("All courses")}</h2>
            <div className="course-list-filter-bar sticky-top">
              <div className="accordion">
                {/* Main Categories */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#filter-acc-01"
                    >
                      {t("Categories")}
                    </button>
                  </h2>
                  <div
                    id="filter-acc-01"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <ul className="">
                        <li>
                          <div className="form-check">
                            <input
                              className="form-check-input main-category-checkbox"
                              type="radio"
                              name="main_category"
                              value=""
                              id="cat_all"
                              checked={selectedMainCategory === ""}
                              onChange={handleMainCategoryChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="cat_all"
                            >
                              {t("All Categories")}
                            </label>
                          </div>
                        </li>
                        {categories.map((category) => (
                          <li key={category?._id}>
                            <div className="form-check">
                              <input
                                className="form-check-input main-category-checkbox"
                                type="radio"
                                name="main_category"
                                value={category?._id}
                                id={`cat_${category?._id}`}
                                checked={selectedMainCategory === category?._id}
                                onChange={handleMainCategoryChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`cat_${category?._id}`}
                              >
                                {/* {category?.name} */}
                                {i18n?.language == "en" ||
                                  category?.arabic_name == ""
                                  ? category?.name
                                  : category?.arabic_name}
                                {/* {category?.subcat?.length > 0 && (
                                  <span className="badge bg-secondary ms-2">{category.subcat.length}</span>
                                )} */}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Subcategories - Only show if main category is selected and has subcategories */}
                {selectedMainCategory && subcategories.length > 0 && (
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#filter-acc-02"
                      >
                        {t("Sub Category")}
                      </button>
                    </h2>
                    <div
                      id="filter-acc-02"
                      className="sub-category-holder accordion-collapse collapse show"
                    >
                      <div className="accordion-body">
                        <ul className="">
                          <li>
                            <div className="form-check">
                              <input
                                className="form-check-input sub-category-checkbox"
                                type="radio"
                                name="sub_category"
                                value=""
                                id="subcat_all"
                                checked={selectedSubCategory === ""}
                                onChange={handleSubCategoryChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="subcat_all"
                              >
                                {t("All Subcategories")}
                              </label>
                            </div>
                          </li>
                          {subcategories.map((subCat) => (
                            <li key={subCat?._id}>
                              <div className="form-check">
                                <input
                                  className="form-check-input sub-category-checkbox"
                                  type="radio"
                                  name="sub_category"
                                  value={subCat?._id}
                                  id={`subcat_${subCat?._id}`}
                                  checked={selectedSubCategory === subCat?._id}
                                  onChange={handleSubCategoryChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`subcat_${subCat?._id}`}
                                >
                                  {/* {subCat?.name} */}
                                  {i18n?.language == "en" ||
                                    subCat?.arabic_name == ""
                                    ? subCat?.name
                                    : subCat?.arabic_name}
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-12">
            {/* Filter Controls */}
            <div className="course-rgt-filter">
              <div className="filter-info">
                <span className="results-count">
                  {t("Showing")} {courses.length} {t("of")} {totalRecords}{" "}
                  {t("courses")}
                </span>
                {(selectedMainCategory || selectedSubCategory) && (
                  <Link onClick={clearFilters} className="clear-filters-btn">
                    {t("Clear Filters")}
                  </Link>
                )}
              </div>
              <div className="custom-frm-bx">
                <label htmlFor="orderby">{t("Sort By")}</label>
                <select
                  name="orderby"
                  id="orderby"
                  className="form-select orderby"
                  value={orderBy}
                  onChange={handleOrderByChange}
                >
                  <option value="desc">{t("Latest to Oldest")}</option>
                  <option value="asc">{t("Oldest to Latest")}</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedMainCategory || selectedSubCategory) && (
              <div className="active-filters mb-3">
                <span className="filter-label">{t("Active Filters")}:</span>
                {selectedMainCategory && (
                  <span className="filter-tag">
                    {i18n?.language == "en"
                      ? categories.find(
                        (cat) => cat._id === selectedMainCategory
                      )?.name
                      : categories.find(
                        (cat) => cat._id === selectedMainCategory
                      )?.arabic_name}
                    <button
                      onClick={() => {
                        setSelectedMainCategory("");
                        setSelectedSubCategory("");
                        setSubcategories([]);
                        fetchCourses();
                      }}
                      className="remove-filter"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedSubCategory && (
                  <span className="filter-tag">
                    {
                      subcategories.find(
                        (sub) => sub._id === selectedSubCategory
                      )?.name
                    }
                    <button
                      onClick={() => {
                        setSelectedSubCategory("");
                        fetchCourses(selectedMainCategory, "", 1);
                      }}
                      className="remove-filter"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Course Grid */}
            <div className="row tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="grid"
                role="tabpanel"
                aria-labelledby="grid-tab"
              >
                {courses.length > 0 ? (
                  <div className="course-holder row courses__grid-wrap row-cols-2 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-2">
                    {courses.map((course) => (
                      <div key={course?._id} className="col mb-4">
                        <Link to={`/course-details/${course?._id}`}>
                          <div className="product-card">
                            <div className="product-img">
                              <img
                                src={
                                  i18n.language == "en" ||
                                    course?.arabic_thumbnail == ""
                                    ? `https://api.basementex.com/${course?.thumbnail}`
                                    : `https://api.basementex.com/${course?.arabic_thumbnail}`
                                }
                                className="w-100"
                                alt={course?.title}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/square_logo.png";
                                }}
                              />
                              <div className="course-usr">
                                <img
                                  src={userImg || "/placeholder.svg"}
                                  className="w-auto"
                                  alt="Users"
                                />
                                <span>
                                  + {course?.studentCount} {t("Students")}
                                </span>
                              </div>
                            </div>
                            <div className="product-content">
                              <h4>
                                {i18n.language == "en" ||
                                  course.arabic_title === ""
                                  ? course.title
                                  : course.arabic_title}
                              </h4>
                              <p className="rating">
                                <i className="fas fa-star"></i>
                                {course?.averageRating}
                              </p>
                              <p className="price">
                                {course?.price === 0 ? (
                                  <span className="free-badge">
                                    {t("Free")}
                                  </span>
                                ) : (
                                  <>
                                    <span className="current-price">
                                      {formatCurrency(course?.discount_price)}
                                    </span>
                                    {course?.price > course?.discount_price && (
                                      <del className="original-price ms-1">
                                        {formatCurrency(course?.price)}
                                      </del>
                                    )}
                                  </>
                                )}
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
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-courses-found">
                    <div className="text-center py-5">
                      <i className="fas fa-search fa-3x text-muted mb-3"></i>
                      <h4>{t("No courses found")}</h4>
                      <p className="text-muted">
                        {t("Try adjusting your filters or search criteria")}
                      </p>
                      <button
                        onClick={clearFilters}
                        className="btn btn-primary"
                      >
                        {t("View All Courses")}
                      </button>
                    </div>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination-wrap">
                    <div className="custom-pagination pagination">
                      {renderPagination()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Styles */}
      <style>{`
        .filter-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .results-count {
          font-size: 0.9rem;
          color: #666;
        }

        .clear-filters-btn {
          color: #dc3545;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .clear-filters-btn:hover {
          text-decoration: underline;
        }

        .active-filters {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filter-label {
          font-weight: 600;
          color: #333;
        }

        .filter-tag {
          background: #e3f2fd;
          color: #1976d2;
          padding: 4px 8px;
          border-radius: 16px;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .remove-filter {
          background: none;
          border: none;
          color: #1976d2;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .remove-filter:hover {
          background: rgba(25, 118, 210, 0.1);
          border-radius: 50%;
        }

        .free-badge {
          background: #4caf50;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .current-price {
          font-weight: 600;
          color: #2e7d32;
        }

        .original-price {
          color: #999;
          font-size: 0.9rem;
        }

        .no-courses-found {
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-link {
          cursor: pointer;
        }

        .page-item.disabled .page-link {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .badge {
          font-size: 0.7rem;
        }

        @media (max-width: 768px) {
          .course-rgt-filter {
            flex-direction: column;
            gap: 15px;
          }

          .filter-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .active-filters {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
};

export default CoursesPage;
