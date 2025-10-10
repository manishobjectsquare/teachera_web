import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faUsers,
  faClock,
  faCalendarAlt,
  faVideo,
  faChevronDown,
  faChevronUp,
  faCubes,
} from "@fortawesome/free-solid-svg-icons";
import faceBook from "../assets/images/facebook2.svg";
import LinkedIn from "../assets/images/linkden.svg";
import Pinterest from "../assets/images/pintrest.svg";
import teleGram from "../assets/images/telegram.svg";
import twitter from "../assets/images/twitter.svg";
import LiveCourseSlider from "../Components/Layout/Sliders/LiveCourseSlider";
import { baseUrl } from "../../config/baseUrl";
import he from "he";
import { useCart } from "../Context/CartContext";
import { useUser } from "../Context/UserContext";
const LiveCourseDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const Token = localStorage.getItem("Token");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user } = useUser();
  const { isInCart, toggleCartItem, cartLoading } = useCart();
  const shareUrl = `https://teachera.co/live-courses/${id}`;
  const description =
    "Join this amazing live course with interactive sessions!";

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/api/v1/web/liveCourse/liveLession-view/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      const data = await response.json();
      if (data.status) {
        setCourse(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setError("Error loading course data");
      setLoading(false);
    }
  };

  // Helper functions
  const formatCurrency = (amount) => {
    if (!amount) return "$0.00";
    return `$${Number(amount).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const calculateSavings = () => {
    if (
      course?.price &&
      course?.offer_price &&
      course.price > course.offer_price
    ) {
      return Math.round(
        ((course.price - course.offer_price) / course.price) * 100
      );
    }
    return 0;
  };

  const getNextSession = () => {
    if (!course?.chapters || course.chapters.length === 0) return null;

    // Find the next upcoming session from all chapters
    let nextSession = null;
    let nextDate = null;

    course.chapters.forEach((chapter) => {
      if (chapter.liveCourseSession && chapter.liveCourseSession.length > 0) {
        chapter.liveCourseSession.forEach((session) => {
          const sessionDate = new Date(session.date);
          if (
            sessionDate > new Date() &&
            (!nextDate || sessionDate < nextDate)
          ) {
            nextDate = sessionDate;
            nextSession = { ...session, chapterTitle: chapter.title };
          }
        });
      }
    });

    return nextSession;
  };

  const getCompletedSessions = () => {
    if (!course?.chapters) return [];
    let completedSessions = [];

    course.chapters.forEach((chapter) => {
      if (chapter.liveCourseSession && chapter.liveCourseSession.length > 0) {
        const completed = chapter.liveCourseSession.filter(
          (session) =>
            session.status === "completed" ||
            new Date(session.date) < new Date()
        );
        completedSessions = [...completedSessions, ...completed];
      }
    });

    return completedSessions;
  };

  const getTotalDuration = () => {
    if (!course?.chapters) return 0;
    let totalSessions = 0;

    course.chapters.forEach((chapter) => {
      if (chapter.liveCourseSession) {
        totalSessions += chapter.liveCourseSession.length;
      }
    });

    return totalSessions * 2;
  };

  const getTotalSessions = () => {
    if (!course?.chapters) return 0;
    let totalSessions = 0;

    course.chapters.forEach((chapter) => {
      if (chapter.liveCourseSession) {
        totalSessions += chapter.liveCourseSession.length;
      }
    });

    return totalSessions;
  };

  const getSessionStatus = (session) => {
    const sessionDate = new Date(session.date);
    const now = new Date();

    if (sessionDate < now) {
      return "completed";
    } else if (sessionDate.toDateString() === now.toDateString()) {
      return "live";
    } else {
      return "upcoming";
    }
  };

  // Event handlers
  const handleEnroll = () => {
    console.log("Enrolling in live course:", course?._id);
  };

  const handleToggleWishlist = () => {
    setInWishlist(!inWishlist);
    console.log(
      inWishlist ? "Removing from wishlist:" : "Adding to wishlist:",
      course?._id
    );
  };

  const handleApplyPromoCode = () => {
    console.log("Applying promo code:", promoCode);
  };

  const handleJoinSession = (sessionId) => {
    // Find the session across all chapters
    let targetSession = null;
    course.chapters.forEach((chapter) => {
      if (chapter.liveCourseSession) {
        const session = chapter.liveCourseSession.find(
          (s) => s._id === sessionId
        );
        if (session) targetSession = session;
      }
    });

    if (targetSession?.meeting_link) {
      window.open(targetSession.meeting_link, "_blank");
    }
  };

  const handleWatchRecording = (sessionId) => {
    // Find the session across all chapters
    let targetSession = null;
    course.chapters.forEach((chapter) => {
      if (chapter.liveCourseSession) {
        const session = chapter.liveCourseSession.find(
          (s) => s._id === sessionId
        );
        if (session) targetSession = session;
      }
    });

    if (targetSession?.replayLink) {
      // Assuming replayLink contains the video URL or file path
      const videoUrl = targetSession.replayLink.startsWith("http")
        ? targetSession.replayLink
        : `${baseUrl}/${targetSession.replayLink}`;
      window.open(videoUrl, "_blank");
    }
  };

  const isFree = course?.price === 0;
  const courseInCart = isInCart(course?._id);

  const handleAddToCart = async () => {
    if (!user?.Token) return toast.error("Please login to add course to cart");
    await toggleCartItem(course?._id, course?.offer_price, "live-course");
  };

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
          <h4>Error Loading Course</h4>
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

  if (!course) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          <h4>Course Not Found</h4>
          <p>The requested live course could not be found.</p>
        </div>
      </div>
    );
  }

  const nextSession = getNextSession();
  const completedSessions = getCompletedSessions();
  const totalDuration = getTotalDuration();
  const totalSessions = getTotalSessions();
  const isRTL = i18n.dir() === "rtl";
  const isPurchased = course?.isPurchase === true;

  return (
    <>
      {/* Live Course Banner Section */}
      <section className="course-dtl-bannr live-course-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12">
              <div className="coursebnnr-lft">
                <h3>{course.title}</h3>
                <p className="rating text-white">
                  <i className="fas fa-star"></i>
                  {course.averageRating} {t("Rating")}
                  <span className="text-white">
                    ({course.totalReviews} {t("Reviews")})
                  </span>
                </p>
                <div className="course-meta-info text-white mb-3">
                  <div className="meta-item">
                    <FontAwesomeIcon icon={faCubes} className="me-2" />
                    {course?.chapters?.length} {t("Modules")}
                  </div>
                  <div className="meta-item">
                    <FontAwesomeIcon icon={faVideo} className="me-2" />
                    {totalSessions} {t("live sessions")}
                  </div>
                </div>
                <p className="text-white">
                  {course.description
                    ?.replace(/<[^>]*>/g, "")
                    .substring(0, 200)}
                  ...
                </p>

                {nextSession && (
                  <div className="next-session-banner">
                    <h6>{t("Next Live Session")}</h6>
                    <div className="session-info">
                      <span className="session-title text-white">
                        {nextSession.title}
                      </span>
                      <span className="session-datetime text-white">
                        {formatDate(nextSession.date)} at{" "}
                        {formatTime(nextSession.date)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Course Detail Section */}
      <section className="tp-space course-dtl-bannr-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <h6 className="fw-400">{t("Share this live course")}:</h6>
              <ul className="course-media">
                <li>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={faceBook || "/placeholder.svg"} alt="Facebook" />
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
                    <img src={LinkedIn || "/placeholder.svg"} alt="LinkedIn" />
                  </a>
                </li>
                <li>
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                      shareUrl
                    )}&media=${encodeURIComponent(
                      `${baseUrl}/${course.thumbnail}`
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
                    <img src={teleGram || "/placeholder.svg"} alt="Telegram" />
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
                    <img src={twitter || "/placeholder.svg"} alt="Twitter" />
                  </a>
                </li>
              </ul>

              {/* Course Description */}
              <div className="course-desc-bx">
                <div
                  dangerouslySetInnerHTML={{
                    __html: he.decode(course.description),
                  }}
                />
                {course?.about_course && (
                  <div className="mt-3">
                    <h4>{t("About This Live Course")}</h4>
                    <p>{course.about_course}</p>
                  </div>
                )}
              </div>

              {/* Live Course Value Proposition */}
              {/* <div className="live-course-value-section mb-4 p-4 bg-light rounded">
                <h4 className="mb-3">
                  {t("What You Get in This Live Course")}
                </h4>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        {totalSessions} {t("Live Interactive Sessions")}
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        {completedSessions.length} {t("Session Recordings")}
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        {t("Real-time Q&A Support")}
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        {t("Lifetime Access to Recordings")}
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        {course.certificate
                          ? t("Certificate of Completion")
                          : t("No Certificate")}
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        {t("Small Class Size")} ({course.capacity}{" "}
                        {t("max students")})
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}

              {/* Live Sessions Schedule - Updated Accordion */}
              <div className="course-lesson">
                <h2 className="title mb-4">{t("Live Sessions Schedule")}</h2>
                <div className="live-sessions-accordion">
                  {course.chapters && course.chapters.length > 0 ? (
                    course.chapters.map((chapter, chapterIndex) => (
                      <div className="chapter-accordion-item" key={chapter._id}>
                        <div
                          className="chapter-header"
                          onClick={() =>
                            setExpandedChapter(
                              expandedChapter === chapter._id
                                ? null
                                : chapter._id
                            )
                          }
                        >
                          <div className="chapter-info">
                            <div className="chapter-number">
                              {t("Module")} {chapterIndex + 1}
                            </div>
                            <div className="chapter-details">
                              <h4 className="chapter-title">{chapter.title}</h4>
                              <div className="chapter-meta">
                                <span className="sessions-count">
                                  <FontAwesomeIcon
                                    icon={faVideo}
                                    className="me-1"
                                  />
                                  {chapter.liveCourseSession?.length || 0}{" "}
                                  {t("Sessions")}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="expand-icon">
                            <FontAwesomeIcon
                              icon={
                                expandedChapter === chapter._id
                                  ? faChevronUp
                                  : faChevronDown
                              }
                            />
                          </div>
                        </div>

                        {expandedChapter === chapter._id && (
                          <div className="chapter-sessions">
                            {chapter.liveCourseSession &&
                            chapter.liveCourseSession.length > 0 ? (
                              chapter.liveCourseSession.map(
                                (session, sessionIndex) => {
                                  const sessionStatus =
                                    getSessionStatus(session);
                                  return (
                                    <div
                                      className="session-item"
                                      key={session._id}
                                    >
                                      <div className="session-content">
                                        <div className="session-info">
                                          {/* <div className="session-number">{sessionIndex + 1}</div> */}
                                          <div className="session-details">
                                            <h5 className="session-title">
                                              {session.title}
                                            </h5>
                                            <div className="session-meta">
                                              <div className="session-date">
                                                <FontAwesomeIcon
                                                  icon={faCalendarAlt}
                                                  className="me-2"
                                                />
                                                {formatDate(session.date)}
                                              </div>
                                              <div className="session-time">
                                                <FontAwesomeIcon
                                                  icon={faClock}
                                                  className="me-2"
                                                />
                                                {formatTime(session.date)}
                                              </div>
                                              <div
                                                className={`session-status ${sessionStatus}`}
                                              >
                                                {sessionStatus === "completed"
                                                  ? t("Completed")
                                                  : sessionStatus === "live"
                                                  ? t("Live Now")
                                                  : t("Upcoming")}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="session-actions">
                                          {sessionStatus === "completed" &&
                                            session.replayLink && (
                                              <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() =>
                                                  handleWatchRecording(
                                                    session._id
                                                  )
                                                }
                                              >
                                                <FontAwesomeIcon
                                                  icon={faPlay}
                                                  className="me-1"
                                                />
                                                {t("Watch Recording")}
                                              </button>
                                            )}
                                          {(sessionStatus === "live" ||
                                            sessionStatus === "upcoming") &&
                                            isEnrolled && (
                                              <button
                                                className="btn btn-sm btn-success me-2"
                                                onClick={() =>
                                                  handleJoinSession(session._id)
                                                }
                                              >
                                                <FontAwesomeIcon
                                                  icon={faVideo}
                                                  className="me-1"
                                                />
                                                {sessionStatus === "live"
                                                  ? t("Join Now")
                                                  : t("Join Session")}
                                              </button>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <div className="no-sessions">
                                <i className="fas fa-info-circle me-2"></i>
                                {t(
                                  "No sessions scheduled for this Module yet."
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="alert alert-info">
                      <i className="fas fa-info-circle me-2"></i>
                      {t(
                        "No Modules  scheduled yet. Content will be added soon."
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Live Course Sidebar */}
            <div className="col-lg-4 col-md-12 course-dtl-main">
              <div className="course-dtl-main-innr sticky-top">
                <div className="course-img">
                  <img
                    className="w-100"
                    src={
                      course?.image
                        ? `https://api.basementex.com/${course.image}`
                        : `/square_logo.png`
                    }
                    alt={course.title}
                    onError={(e) => {
                      e.target.src = `/square_logo.png`;
                    }}
                  />
                  <div className="course-overlay">
                    <div className="live-indicator">
                      <i className="fas fa-circle live-dot"></i>
                      {t("LIVE")}
                    </div>
                  </div>
                </div>

                <div className="course-dtl-main-content">
                  {course.offer_price ? (
                    <p className="price">
                      {formatCurrency(course.offer_price)}
                      <del>{formatCurrency(course.price)}</del>
                    </p>
                  ) : (
                    <p className="price">{formatCurrency(course.price)}</p>
                  )}

                  {nextSession && (
                    <div className="next-session-info mb-3">
                      <h6>{t("Next Live Session")}</h6>
                      <div className="session-details">
                        <div className="session-name">{nextSession.title}</div>
                        <div className="session-datetime">
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="me-1"
                          />
                          {formatDate(nextSession.date)}
                        </div>
                        <div className="session-time">
                          <FontAwesomeIcon icon={faClock} className="me-1" />
                          {formatTime(nextSession.date)}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="course-dtl-main-btn">
                    {/* {isPurchased ? (
                      <Link
                        to={`/student/learning/${course?._id}`}
                        className="thm-btn w-75 text-center rounded enroll-btn text-white d-inline-block text-decoration-none"
                      >
                        {t("Go to Course")}
                      </Link>
                    ) : (
                      <a
                        href="javascript:;"
                        className="thm-btn w-75 text-center rounded enroll-btn"
                        onClick={handleEnroll}
                      >
                        <span className="text">
                          {isEnrolled
                            ? t("Join Live Session")
                            : t("Enroll in Live Course")}
                        </span>
                      </a>
                    )} */}
                    <button
                      className="thm-btn w-75 text-center rounded add-to-cart"
                      onClick={handleAddToCart}
                    >
                      {cartLoading ? (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : courseInCart ? (
                        <span className="text">{t("Remove From Cart")}</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Live Courses Section */}
      <section className="tp-space popular-course most-course">
        <div className="container">
          <div className="heading">
            <h3 className="title">{t("More Live Courses")}</h3>
            <p>
              {t(
                "Discover more interactive live courses to advance your skills."
              )}
            </p>
          </div>
          <LiveCourseSlider />
        </div>
      </section>

      <style jsx>{`
        .live-course-banner .container {
          position: relative;
          z-index: 2;
        }

        .live-badge {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          top: 0 !important;
        }

        .live-dot {
          color: #fff;
          font-size: 0.6rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        .course-meta-info {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin: 15px 0;
        }

        .meta-item {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
        }

        .next-session-banner {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #efeefe;
          margin-top: 20px;
        }

        .next-session-banner h6 {
          color: #fff;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .session-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .session-title {
          font-weight: 600;
          font-size: 1rem;
        }

        .session-datetime {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        /* New Accordion Styles */
        .live-sessions-accordion {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chapter-accordion-item {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
        }

        .chapter-accordion-item:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .chapter-header {
          padding: 20px;
          background: #f8f9fa;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background-color 0.3s ease;
        }

        .chapter-header:hover {
          background: #e9ecef;
        }

        .chapter-info {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }

        .chapter-number {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          min-width: 100px;
          text-align: center;
        }

        .chapter-details {
          flex: 1;
        }

        .chapter-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        .chapter-meta {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .sessions-count {
          font-size: 0.9rem;
          color: #666;
          display: flex;
          align-items: center;
        }

        .expand-icon {
          color: #666;
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .chapter-sessions {
          background: white;
          border-top: 1px solid #e9ecef;
        }

        .session-item {
          border-bottom: 1px solid #f0f0f0;
          transition: background-color 0.2s ease;
        }

        .session-item:last-child {
          border-bottom: none;
        }

        .session-item:hover {
          background: #f8f9fa;
        }

        .session-content {
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        // .session-info {
        //     display: flex;
        //     align-items: center;
        //     gap: 15px;
        //     flex: 1;
        // }

        .session-number {
          background: #e9ecef;
          color: #495057;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .session-details {
          flex: 1;
        }

        .session-details .session-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        .session-meta {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          align-items: center;
        }

        .session-date,
        .session-time {
          font-size: 0.85rem;
          color: #666;
          display: flex;
          align-items: center;
        }

        .session-status {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .session-status.completed {
          background: #d4edda;
          color: #155724;
        }

        .session-status.upcoming {
          background: #fff3cd;
          color: #856404;
        }

        .session-status.live {
          background: #f8d7da;
          color: #721c24;
          animation: pulse 2s infinite;
        }

        .session-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .no-sessions {
          padding: 20px;
          text-align: center;
          color: #666;
          font-style: italic;
        }

        .course-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 15px;
        }

        .live-indicator {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .next-session-info {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #0055d2;
        }

        .next-session-info h6 {
          margin-bottom: 10px;
          font-weight: 600;
          color: #333;
        }

        .session-details {
          font-size: 0.9rem;
        }

        .session-name {
          font-weight: 600;
          margin-bottom: 5px;
          color: #333;
        }

        .session-datetime,
        .session-time {
          color: #666;
          margin-bottom: 3px;
        }

        .enroll-btn:hover {
          background: linear-gradient(135deg, #c0392b, #a93226) !important;
        }

        @media (max-width: 768px) {
          .course-meta-info {
            flex-direction: column;
            gap: 10px;
          }

          .chapter-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .session-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .session-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            width: 100%;
          }

          .session-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .session-actions {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </>
  );
};

export default LiveCourseDetail;
