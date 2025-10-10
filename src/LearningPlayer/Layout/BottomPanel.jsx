import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useUser } from "../../Context/UserContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { baseUrl } from "../../../config/baseUrl";
import { Link, useParams } from "react-router-dom";
import html2canvas from "html2canvas";

const BottomPanel = ({ courseId, courseFile, course }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const { t, i18n } = useTranslation();

  const { user } = useUser();

  const submitReview = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const reviewData = {
      course_Id: courseId || "682b2cb8e914a0b8f8d562c5",
      student_Id: user.userId,
      rating: Number.parseInt(formData.get("rating")),
      review: formData.get("review"),
      status: "inactive",
    };

    try {
      const response = await fetch("https://api.basementex.com/course_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Review submitted:", data);
        toast.success(t("Review submitted successfully!"));
        e.target.reset();
      } else {
        console.error("Server error:", data);
        toast.error(data.message || t("Failed to submit review."));
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(t("Something went wrong. Please try again."));
    }
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setAnnouncements([]);
      setLoading(false);
    }, 1000);
  }, []);

  const tabKeys = ["overview", "q&a", "announcements", "reviews"];
  const tabLabels = [t("Overview"), t("Q&A"), t("Announcements"), t("Reviews")];

  const certificateRef = useRef();
  const [certificate, setCertificate] = useState({
    title: "",
    sub_title: "",
    description: "",
    background: "",
    signature: "",
  });
  const student_Id = localStorage.getItem("userId");
  const { id } = useParams();

  // This loads the certificate content and images
  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/admin/certificateRouter/user-details/${student_Id}/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch certificate");
        const data = await response.json();
        setCertificate(data.data);
      } catch (error) {
        console.error("Certificate load failed.", error);
      }
    };

    if (student_Id && id) {
      fetchCertificate();
    }
  }, [student_Id, id]);

  // Check course completion status
  const checkCourseCompletion = async () => {
    try {
      const response = await fetch(
        `https://api.basementex.com/api/v1/web/course-progress/get-progress/${student_Id}/${id}`
      );
      const data = await response.json();

      if (response.ok) {
        return data.isCourseCompleted;
      } else {
        console.error("Error checking course completion:", data);
        return false;
      }
    } catch (error) {
      console.error("Error fetching course progress:", error);
      return false;
    }
  };

  const handleDownloadCertificate = async () => {
    if (!student_Id) {
      toast.error(t("Please log in to download certificate."));
      return;
    }
    setIsDownloading(true);
    try {
      // Check if course is completed
      const isCourseCompleted = await checkCourseCompletion();

      if (!isCourseCompleted) {
        toast.warning(t("Course Not completed"));
        setIsDownloading(false);
        return;
      }

      // Check if certificate is ready
      if (!certificate.background) {
        toast.warning(t("Certificate not ready."));
        setIsDownloading(false);
        return;
      }

      // Generate and download certificate
      const canvas = await html2canvas(certificateRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `certificate-${courseId || id}.png`;
      link.click();

      toast.success(t("Certificate downloaded successfully!"));
    } catch (err) {
      console.error("Download error:", err);
      toast.error(t("Failed to download certificate."));
    } finally {
      setIsDownloading(false);
    }
  };
  const handleDownload = async () => {
    try {
      const response = await fetch(`${baseUrl}/${courseFile?.file}`, {
        method: "GET",
        headers: {
          // Authorization headers ya koi aur agar zarurat ho
        },
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = courseFile?.file?.split("/").pop(); // file name extract kar raha
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <>
      <div className="video_tabs_area">
        <ul className="nav nav-pills" id="pills-tab2" role="tablist">
          {tabKeys.map((tabKey, idx) => (
            <li className="nav-item" role="presentation" key={tabKey}>
              <button
                className={`nav-link ${idx === 0 ? "active" : ""}`}
                id={`pills-${tabKey}-tab`}
                data-bs-toggle="pill"
                data-bs-target={`#pills-${tabKey}`}
                type="button"
                role="tab"
                aria-controls={`pills-${tabKey}`}
                aria-selected={idx === 0 ? "true" : "false"}
              >
                {tabLabels[idx]}
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content" id="pills-tabContent">
          {/* Overview Tab */}
          <div
            className="tab-pane fade show active"
            id="pills-overview"
            role="tabpanel"
          >
            <div className="video_about">
              <h1>{t("About this Lecture")}</h1>
              {course.description || course.arabic_description ? (
                <div
                  className="about-lecture"
                  dangerouslySetInnerHTML={{
                    __html:
                      i18n.language === "en" || course.arabic_description === ""
                        ? course.description
                        : course.arabic_description,
                  }}
                />
              ) : (
                <div className="about-lecture">{t("No description")}</div>
              )}
              <div className="mt-4">
                {courseFile && (
                  <button onClick={handleDownload} className="btn btn-success">
                    <i className="fas fa-download me-2"></i>
                    {t("Download Files")}
                  </button>
                )}
              </div>
              <div className="mt-4">
                <button
                  className="btn btn-success"
                  onClick={handleDownloadCertificate}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      {t("Checking...")}
                    </>
                  ) : (
                    <>
                      <i className="fas fa-download me-2"></i>
                      {t("Download Certificate")}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Q&A Tab */}
          <div className="tab-pane fade" id="pills-q&a" role="tabpanel">
            <div className="video_qna">
              <div className="video_qna_top d-flex flex-wrap">
                <form className="query-form">
                  <input type="text" placeholder={t("Search...")} />
                  <button type="submit">
                    <i className="fas fa-search" />
                  </button>
                </form>
                <ul className="d-flex flex-wrap">
                  <li>
                    <p>{t("Filters:")}</p>
                  </li>
                  <li>
                    <div className="select_box">
                      <select className="filter-type">
                        <option value="current_lecture">
                          {t("Current lecture")}
                        </option>
                        <option value="all_lectures">
                          {t("All lectures")}
                        </option>
                      </select>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="video_qna_list">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <h3>{t("All questions.")}</h3>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#askQuestionModal"
                  >
                    {t("Ask a Question")}
                  </button>
                </div>

                <div className="text-center pt-3 pb-3">
                  {loading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">{t("Loading...")}</span>
                    </div>
                  ) : (
                    <p>{t("No questions found.")}</p>
                  )}
                </div>

                <div className="text-center p-5">
                  <form className="load-more-form">
                    <button type="submit" className="btn load-more-btn">
                      {t("Load More")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Announcements Tab */}
          <div
            className="tab-pane fade"
            id="pills-announcements"
            role="tabpanel"
          >
            {loading ? (
              <div className="text-center pt-3 pb-3">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">{t("Loading...")}</span>
                </div>
              </div>
            ) : announcements.length === 0 ? (
              <p className="text-center mt-2">
                {t("No announcement available")}
              </p>
            ) : (
              announcements.map((announcement, idx) => (
                <div className="video_about" key={idx}>
                  <div className="announcement_item">
                    <span>{announcement.date}</span>
                    <h1>{announcement.title}</h1>
                    <div
                      dangerouslySetInnerHTML={{ __html: announcement.content }}
                    />
                  </div>
                  <div className="border border-1" />
                </div>
              ))
            )}
          </div>

          {/* Reviews Tab */}
          <div className="tab-pane fade" id="pills-reviews" role="tabpanel">
            <div className="video_review">
              <h2>{t("Reviews")}</h2>
              <div className="review-holder"></div>

              <div className="text-center mt-3">
                <form className="load-more-rating">
                  <button className="btn btn-primary" type="submit">
                    {t("Load More")}
                  </button>
                </form>
              </div>

              <div className="video_review_imput mt-2">
                <h2 className="mb-2">{t("Write a review")}</h2>
                <form
                  className="instructor__profile-form"
                  method="POST"
                  onSubmit={submitReview}
                >
                  <input type="hidden" name="course_id" value={courseId} />
                  <div className="col-md-12">
                    <div className="form-grp">
                      <label>{t("Rating")}</label>
                      <select name="rating" id="rating" required>
                        {[5, 4, 3, 2, 1].map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-grp">
                      <label>
                        {t("Review")} <code>*</code>
                      </label>
                      <textarea
                        name="review"
                        id="review"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn arrow-btn">
                    {t("Submit")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Q&A */}
        <div
          className="modal fade"
          id="askQuestionModal"
          tabIndex="-1"
          aria-labelledby="askQuestionModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="askQuestionModalLabel">
                  {t("Ask a Question")}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form
                  className="instructor__profile-form qna-form"
                  method="POST"
                >
                  <input type="hidden" name="course_id" value={courseId} />
                  <div className="form-grp">
                    <label>
                      {t("Question")} <code>*</code>
                    </label>
                    <input name="question" type="text" required />
                  </div>
                  <div className="form-grp">
                    <label>
                      {t("Description")} <code>*</code>
                    </label>
                    <textarea
                      name="description"
                      className="text-editor-img"
                      required
                    />
                  </div>
                  <div className="text-end">
                    <button className="btn btn-primary" type="submit">
                      {t("Submit")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Certificate Template */}
      <div
        ref={certificateRef}
        style={{
          position: "absolute",
          left: "-9999px", // hide from view
          top: 0,
          width: "930px",
          height: "600px",
          backgroundImage: `url(${baseUrl}/${certificate?.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "black",
          fontFamily: "Arial",
          padding: "30px",
        }}
      >
        <h1
          style={{
            position: "absolute",
            top: "180px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "32px",
            fontWeight: "bold",
            color: "#0055d2",
          }}
        >
          {certificate?.title}
        </h1>
        <h3
          style={{
            position: "absolute",
            top: "250px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "20px",
          }}
        >
          {certificate?.sub_title}
        </h3>

        <p
          style={{
            position: "absolute",
            top: "290px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            textAlign: "center",
            fontSize: "16px",
            lineHeight: 1.5,
          }}
        >
          {certificate?.description}
        </p>

        {certificate?.signature && (
          <img
            src={`${baseUrl}/${certificate?.signature}`}
            alt="signature"
            style={{
              position: "absolute",
              bottom: "100px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "120px",
            }}
          />
        )}
      </div>
    </>
  );
};

export default BottomPanel;
