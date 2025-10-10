import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useTranslation } from "react-i18next";
import faceBook from "../assets/images/facebook2.svg";
import LinkedIn from "../assets/images/linkden.svg";
import Pinterest from "../assets/images/pintrest.svg";
import teleGram from "../assets/images/telegram.svg";
import twitter from "../assets/images/twitter.svg";
import BundleSlider from "../Components/Layout/Sliders/BundleSlider";
import { baseUrl } from "../../config/baseUrl";
import DiplomaSlider from "../Components/Layout/Sliders/DiplomaSlider";
import { useUser } from "../Context/UserContext";
import { useWishlist } from "../Context/WishListContext";
const shareUrl = "https://teachera.co/courses/graphic-design-bundle";
const description = "Check out this amazing Photoshop & AI course bundle!";
import { useCart } from "../Context/CartContext";

const DiplomaDetails = () => {
  const location = useLocation();

  const id = useParams().id;
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // Simplified state
  const [diploma, setDiploma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [purachaseDiploma, setPurachaseDiploma] = useState(false);
  const { user } = useUser();
  const { isInCart, toggleCartItem, cartLoading } = useCart();
  const { isInWishlist, toggleWishlistItem, wishlistLoading } = useWishlist();

  // Simplified fetch function
  useEffect(() => {
    const fetchDiplomaData = async () => {
      if (!id) return;
      const token = localStorage.getItem("Token");
      try {
        setLoading(true);
        const response = await fetch(
          `${baseUrl}/api/v1/web/courses/diploma-view/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();

        if (result.status && result.data) {
          setDiploma(result.data);
          setPurachaseDiploma(result.data.ispurchase);
        } else {
          setError("Failed to fetch diploma data");
        }
      } catch (err) {
        console.error("Error fetching diploma:", err);
        setError("Error loading diploma data");
      } finally {
        setLoading(false);
      }
    };

    fetchDiplomaData();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4>Error Loading Diploma</h4>
          <p>{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!diploma) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          <h4>Diploma Not Found</h4>
          <p>The requested diploma could not be found.</p>
        </div>
      </div>
    );
  }

  // Helper functions
  const truncate = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const formatCurrency = (amount) => {
    if (!amount) return "$0.00";
    return `$${Number(amount).toFixed(2)}`;
  };

  // Event handlers
  // const handleAddToCart = () => {
  //   console.log(diploma);

  //   console.log("Adding diploma to cart:", diploma?._id);
  // };
  const isFree = diploma?.price === 0;
  const isPurchased = diploma?.isPurchase === true;
  const courseInCart = isInCart(diploma?._id);

  const handleAddToCart = async () => {
    if (!user?.Token) return toast.error("Please login to add course to cart");
    await toggleCartItem(diploma?._id, diploma?.offerPrice, "diploma");
  };

  const handleToggleWishlist = () => {
    setInWishlist(!inWishlist);
    console.log(
      inWishlist ? "Removing from wishlist:" : "Adding to wishlist:",
      diploma?._id
    );
  };

  const handleApplyPromoCode = () => {
    console.log("Applying promo code:", promoCode);
  };

  return (
    <>
      {/* Diploma Banner Section */}
      <section className="course-dtl-bannr">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12">
              <div className="coursebnnr-lft">
                <h6>{t("Diploma Program")}</h6>
                <h3>{diploma.title}</h3>
                <p className="rating text-white">
                  <i className="fas fa-star"></i>
                  4.5 {t("Rating")}
                  <span className="text-white">(0 {t("Reviews")})</span>
                </p>
                {!purachaseDiploma && (
                  <p className="text-white">
                    {truncate(
                      diploma.description?.replace(/<[^>]*>/g, ""),
                      200
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diploma Detail Section */}
      <section className="tp-space course-dtl-bannr-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              {!purachaseDiploma && (
                <>
                  <h6 className="fw-400">{t("Share this diploma")}:</h6>
                  <ul className="course-media">
                    <li>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          shareUrl
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={faceBook || "/placeholder.svg"}
                          alt="Facebook"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          shareUrl
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={LinkedIn || "/placeholder.svg"}
                          alt="LinkedIn"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                          shareUrl
                        )}&media=${encodeURIComponent(
                          `${baseUrl}/${diploma.image}`
                        )}&description=${encodeURIComponent(description)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={Pinterest || "/placeholder.svg"}
                          alt="Pinterest"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://t.me/share/url?url=${encodeURIComponent(
                          shareUrl
                        )}&text=${encodeURIComponent(description)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={teleGram || "/placeholder.svg"}
                          alt="Telegram"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          shareUrl
                        )}&text=${encodeURIComponent(description)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={twitter || "/placeholder.svg"}
                          alt="Twitter"
                        />
                      </a>
                    </li>
                  </ul>
                </>
              )}

              {/* Diploma Description */}
              {!purachaseDiploma && (
                <>
                  <div className="course-desc-bx">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: diploma?.description,
                      }}
                    />
                  </div>

                  {/* Diploma Value Proposition */}
                  <div className="bundle-value-section mb-4 p-4 bg-light rounded">
                    <h4 className="mb-3">
                      {t("What You Get in This Diploma")}
                    </h4>
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            {diploma.courses?.length || 0}{" "}
                            {t("Complete Courses")}
                          </li>
                          <li className="mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            {diploma.liveCourses?.length || 0}{" "}
                            {t("Live Courses")}
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            {t("Lifetime Access")}
                          </li>
                          <li className="mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            {t("Certificate of Completion")}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Courses in Diploma */}
              {diploma.courses && diploma.courses.length > 0 && (
                <div className="course-lesson">
                  <h2 className="title mb-4">
                    {t("Courses Included in This Diploma")}
                  </h2>
                  <div className="bundle-courses-grid">
                    {diploma.courses.map((course) => (
                      <div className="bundle-course-card" key={course._id}>
                        <div className="course-card-header">
                          <div className="course-thumbnail">
                            <img
                              src={
                                course.thumbnail
                                  ? `${baseUrl}/${course.thumbnail}`
                                  : `/placeholder.svg?height=120&width=200&text=${
                                      course.title.split(" ")[0]
                                    }`
                              }
                              alt={course.title}
                              onError={(e) => {
                                e.target.src = `/placeholder.svg?height=120&width=200&text=${
                                  course.title.split(" ")[0]
                                }`;
                              }}
                            />
                            <div className="course-overlay">
                              <div className="course-badges">
                                {course.certificate && (
                                  <span className="badge badge-certificate">
                                    <i className="fas fa-certificate me-1"></i>
                                    {t("Certificate")}
                                  </span>
                                )}
                                {course.type?.length > 0 && (
                                  <span className="badge badge-level">
                                    {course.type[0]}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="course-info">
                            <Link
                              to={
                                purachaseDiploma
                                  ? `/student/learning/${course?._id}`
                                  : `/course-details/${course?._id}`
                              }
                            >
                              <h4 className="course-title">{course?.title}</h4>
                            </Link>
                            <p className="course-description">
                              {course?.description?.replace(/<[^>]*>/g, "") ||
                                course?.seo_description}
                            </p>
                            <div className="course-meta">
                              <div className="price-info">
                                {course?.discount_price ? (
                                  <>
                                    <span className="current-price">
                                      {formatCurrency(course?.discount_price)}
                                    </span>
                                    <span className="original-price">
                                      {formatCurrency(course?.price)}
                                    </span>
                                    <span className="discount-badge">
                                      {Math.round(
                                        ((course?.price -
                                          course?.discount_price) /
                                          course?.price) *
                                          100
                                      )}
                                      % OFF
                                    </span>
                                  </>
                                ) : (
                                  <span className="current-price">
                                    {formatCurrency(course?.price)}
                                  </span>
                                )}
                              </div>
                              <div className="course-stats">
                                <span className="stat-item">
                                  <i className="fas fa-clock"></i>
                                  {course.duration
                                    ? `${Math.floor(course.duration / 60)}h ${
                                        course.duration % 60
                                      }m`
                                    : "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Courses in Diploma */}
              {diploma.liveCourses && diploma.liveCourses.length > 0 && (
                <div className="course-lesson mt-5">
                  <h2 className="title mb-4">
                    {t("Live Courses Included in This Diploma")}
                  </h2>
                  <div className="bundle-courses-grid">
                    {diploma.liveCourses.map((liveCourse) => (
                      <div className="bundle-course-card" key={liveCourse._id}>
                        <div className="course-card-header">
                          <div className="course-thumbnail">
                            <img
                              src={
                                liveCourse.image
                                  ? `${baseUrl}/${liveCourse.image}`
                                  : `/placeholder.svg?height=120&width=200&text=${
                                      liveCourse.title.split(" ")[0]
                                    }`
                              }
                              alt={liveCourse.title}
                              onError={(e) => {
                                e.target.src = `/placeholder.svg?height=120&width=200&text=${
                                  liveCourse.title.split(" ")[0]
                                }`;
                              }}
                            />
                            <div className="course-overlay">
                              <div className="course-badges">
                                <span className="badge badge-live">
                                  <i className="fas fa-video me-1"></i>
                                  {t("Live Course")}
                                </span>
                                {/* <span
                                                                    className={`badge ${liveCourse.status === "active" ? "badge-success" : "badge-secondary"}`}
                                                                >
                                                                    {liveCourse.status === "active" ? t("Active") : t("Inactive")}
                                                                </span> */}
                              </div>
                            </div>
                          </div>

                          <div className="course-info">
                            <Link
                              to={
                                purachaseDiploma
                                  ? `/student/live-learning/${liveCourse?._id}`
                                  : `/live-course-details/${liveCourse?._id}`
                              }
                            >
                              <h4 className="course-title">
                                {liveCourse?.title}
                              </h4>
                            </Link>
                            <p className="course-description">
                              {liveCourse?.description?.replace(/<[^>]*>/g, "")}
                            </p>
                            <div className="course-meta">
                              <div className="price-info">
                                {liveCourse?.offer_price ? (
                                  <>
                                    <span className="current-price">
                                      {formatCurrency(liveCourse?.offer_price)}
                                    </span>
                                    <span className="original-price">
                                      {formatCurrency(liveCourse?.price)}
                                    </span>
                                    <span className="discount-badge">
                                      {Math.round(
                                        ((liveCourse?.price -
                                          liveCourse?.offer_price) /
                                          liveCourse?.price) *
                                          100
                                      )}
                                      % OFF
                                    </span>
                                  </>
                                ) : (
                                  <span className="current-price">
                                    {formatCurrency(liveCourse?.price)}
                                  </span>
                                )}
                              </div>
                              <div className="course-stats">
                                <span className="stat-item">
                                  <i className="fas fa-play-circle"></i>
                                  {liveCourse?.chapters || 0} {t("Chapters")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Diploma Sidebar */}
            {!purachaseDiploma && (
              <div className="col-lg-4 col-md-12 course-dtl-main">
                <div className="course-dtl-main-innr sticky-top">
                  <div className="course-img">
                    <img
                      className="w-100"
                      src={
                        diploma?.image
                          ? `${baseUrl}/${diploma.image}`
                          : `/placeholder.svg?height=250&width=400&text=Diploma`
                      }
                      alt={diploma?.title}
                      onError={(e) => {
                        e.target.src = `/placeholder.svg?height=250&width=400&text=Diploma`;
                      }}
                    />
                  </div>
                  <div className="course-dtl-main-content">
                    {purachaseDiploma ? null : (
                      <React.Fragment>
                        {" "}
                        {diploma?.offerPrice ? (
                          <p className="price">
                            {formatCurrency(diploma?.offerPrice)}
                            <del> {formatCurrency(diploma?.price)} </del>
                            <span className="badge bg-success ms-2">
                              {Math.round(
                                ((diploma.price - diploma.offerPrice) /
                                  diploma.price) *
                                  100
                              )}
                              % {t("OFF")}
                            </span>
                          </p>
                        ) : (
                          <p className="price">
                            {formatCurrency(diploma?.price)}
                          </p>
                        )}
                        <div className="course-dtl-main-btn">
                          <button
                            className="thm-btn w-75 text-center rounded add-to-cart"
                            onClick={handleAddToCart}
                          >
                            {/* <span className="text">
                              {t("Add Diploma To Cart")}
                            </span> */}
                            {cartLoading ? (
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : courseInCart ? (
                              <span className="text">
                                {t("Remove From Cart")}
                              </span>
                            ) : (
                              <span className="text">
                                {isFree ? t("Enroll Now") : t("Add To Cart")}
                              </span>
                            )}
                          </button>
                          <a
                            href="javascript:void();"
                            className="fav-btn add-to-wish-cart"
                            onClick={handleToggleWishlist}
                          >
                            <i
                              className={
                                inWishlist
                                  ? "fa-solid fa-heart"
                                  : "fa-regular fa-heart"
                              }
                            ></i>
                          </a>
                        </div>
                        <div className="course-dtl-cupon">
                          <h2>{t("Apply Promocode")}</h2>
                          <div className="course-cpn-bx">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={t("Have a Promocode?")}
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <a
                              href="javascript:void(0);"
                              onClick={handleApplyPromoCode}
                            >
                              {t("Apply")}
                            </a>
                          </div>
                        </div>
                      </React.Fragment>
                    )}

                    {/* Diploma Info Section */}
                    <div className="bg-blue-600  p-4 mt-4 course-infos rounded">
                      <h5 className="mb-4  font-semibold">
                        {t("This diploma includes")}
                      </h5>

                      <div className="row g-3">
                        {/* Courses */}
                        <div className="col-12">
                          <div
                            className={`d-flex align-items-center gap-3 ${
                              isRTL ? "flex-row-reverse" : ""
                            }`}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.1667 17.9167H14.1667V1.66675H19.1667V17.9167ZM15.4167 16.6667H17.9167V2.91675H15.4167V16.6667ZM12.9167 17.9167H7.91666V6.66675H12.9167V17.9167ZM9.16666 16.6667H11.6667V7.91675H9.16666V16.6667ZM6.66666 17.9167H1.66666V10.4167H6.66666V17.9167ZM2.91666 16.6667H5.41666V11.6667H2.91666V16.6667Z"
                                fill="currentColor"
                              />
                            </svg>
                            <div className={`${isRTL ? "text-end" : ""}`}>
                              <span className="opacity-80">
                                {t("Courses")} :{" "}
                              </span>
                              <span className="font-medium">
                                {diploma.courses?.length || 0}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Live Courses */}
                        <div className="col-12">
                          <div
                            className={`d-flex align-items-center gap-3 ${
                              isRTL ? "flex-row-reverse" : ""
                            }`}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.33333 6.66667L13.3333 10L8.33333 13.3333V6.66667Z"
                                fill="currentColor"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333ZM10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10C16.6667 6.31810 13.6819 3.33333 10 3.33333C6.31810 3.33333 3.33333 6.31810 3.33333 10C3.33333 13.6819 6.31810 16.6667 10 16.6667Z"
                                fill="currentColor"
                              />
                            </svg>
                            <div className={`${isRTL ? "text-end" : ""}`}>
                              <span className="opacity-80">
                                {t("Live Courses")} :{" "}
                              </span>
                              <span className="font-medium">
                                {diploma.liveCourses?.length || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Diplomas Section */}
      {!purachaseDiploma && (
        <section className="tp-space popular-course most-course">
          <div className="container">
            <div className="heading">
              <h3 className="title">{t("More Diploma Programs")}</h3>
              <p>
                {t(
                  "Discover more comprehensive learning programs to advance your skills."
                )}
              </p>
            </div>
            <DiplomaSlider />
          </div>
        </section>
      )}
      <style>
        {`
                .bundle-courses-grid {
                    display: grid;
                    gap: 2rem;
                    margin-top: 1.5rem;
                }

                .bundle-course-card {
                    background: #fff;
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    overflow: hidden;
                    transition: all 0.3s ease;
                    border: 1px solid #f0f0f0;
                }

                .bundle-course-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
                }

                .course-card-header {
                    display: grid;
                    grid-template-columns: 200px 1fr;
                    gap: 1.5rem;
                    padding: 1.5rem;
                }

                .course-thumbnail {
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    height: 120px;
                }

                .course-thumbnail img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .course-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-end;
                    padding: 0.75rem;
                }

                .course-badges {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .badge-certificate {
                    background: linear-gradient(135deg, #ffd700, #ffed4e);
                    color: #8b5a00;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .badge-level {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .badge-live {
                    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .badge-success {
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .badge-secondary {
                    background: linear-gradient(135deg, #6b7280, #4b5563);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .course-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .course-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1a1a1a;
                    margin-bottom: 0.5rem;
                    line-height: 1.3;
                }

                .course-description {
                    color: #666;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .course-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }

                .price-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .current-price {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #2563eb;
                }

                .original-price {
                    font-size: 1rem;
                    color: #999;
                    text-decoration: line-through;
                }

                .discount-badge {
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    padding: 0.25rem 0.5rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .course-stats {
                    display: flex;
                    gap: 1rem;
                }

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: #666;
                    font-size: 0.85rem;
                }

                .stat-item i {
                    color: #2563eb;
                }

                @media (max-width: 768px) {
                    .course-card-header {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }

                    .course-thumbnail {
                        height: 180px;
                    }

                    .course-meta {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.75rem;
                    }

                    .course-stats {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                }
                `}
      </style>
    </>
  );
};

export default DiplomaDetails;
