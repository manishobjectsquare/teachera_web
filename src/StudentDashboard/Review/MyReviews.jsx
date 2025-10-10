import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import loaderImg from "../../assets/images/loaderImg.png";
const MyReviews = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState([]);
  const userId = localStorage.getItem("userId");
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.basementex.com/course_review/student/${userId}`
      );
      const data = await response.json();
      setReviews(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle delete confirmation
  const handleDelete = (id) => {
    if (window.confirm(t("Are you sure you want to delete this review?"))) {
      console.log(`Delete review with id: ${id}`);
      // In a real app, you would make an API call to delete the review
    }
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="fa fa-star text-warning"></i>);
    }
    return stars;
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
    <div className=" mx-auto">
      <div className="dashboard__content-wrap">
        <div className="dashboard__content-title">
          <h4 className="title">{t("My Reviews")}</h4>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>{t("#")}</th>
                    <th>{t("Course")}</th>
                    <th>{t("Rating")}</th>
                    <th>{t("Status")}</th>
                    <th>{t("Action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <tr key={review?._id}>
                        <td>{index + 1}</td>
                        <td>
                          <>
                            <span className="text-center">
                              {review?.review}
                            </span>{" "}
                            <br />
                            <p className="" style={{ fontSize: "0.7rem" }}>
                              ({review?.course_name})
                            </p>
                          </>
                        </td>
                        <td>{renderStars(review?.rating)}</td>
                        <td>
                          <span
                            className={`badge ${
                              review.status === "active"
                                ? "bg-success"
                                : review.status === "inactive"
                                ? "bg-danger"
                                : "bg-warning"
                            }`}
                          >
                            {t(
                              review.status === "active"
                                ? "Approved"
                                : review.status === "inactive"
                                ? "Inactive"
                                : "Pending"
                            )}
                          </span>
                        </td>
                        <td>
                          {/* <Link
                                                        to={`/student/reviews/${review.id}`}
                                                        className="btn btn-sm btn-outline-primary me-2"
                                                        title={t('View Review')}
                                                        aria-label={t('View Review')}
                                                    >
                                                        <i className="fa fa-eye"></i>
                                                    </Link> */}
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(review.id)}
                            title={t("Delete Review")}
                            aria-label={t("Delete Review")}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        {t("No reviews found!")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* {totalPages > 1 && (
                            <div className="d-flex justify-content-center mt-3">
                                <nav>
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => paginate(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                {t('Previous')}
                                            </button>
                                        </li>

                                        {[...Array(totalPages).keys()].map(number => (
                                            <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                                <button
                                                    onClick={() => paginate(number + 1)}
                                                    className="page-link"
                                                >
                                                    {number + 1}
                                                </button>
                                            </li>
                                        ))}

                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => paginate(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                {t('Next')}
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
