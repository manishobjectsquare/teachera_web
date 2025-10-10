"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import courseUser from "../../../assets/images/course-user.png";

const BundleSlider = () => {
  const { t } = useTranslation();

  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://api.basementex.com/api/v1/web/bundle/bundle-list"
        );
        const json = await res.json();

        // Optional: filter out only active bundles with approved & non-deleted courses
        const filtered = json.data.filter(
          (bundle) =>
            bundle.status &&
            bundle.courses?.some(
              (course) => course.status === "active" && !course.isDelete
            )
        );

        setBundles(filtered);
      } catch (error) {
        console.error("Error fetching bundles:", error);
        setBundles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, []);

  const formatCurrency = (amount) => `$${Number.parseFloat(amount).toFixed(2)}`;

  const calculateSavings = (originalPrice, discountPrice) => {
    const savings = ((originalPrice - discountPrice) / originalPrice) * 100;
    return Math.round(savings);
  };

  const getTotalLessons = (courses) => {
    return (
      courses?.reduce((total, course) => {
        return (
          total +
          (course.chapters?.reduce((chapterTotal, chapter) => {
            return chapterTotal + (chapter.lessonDetails?.length || 0);
          }, 0) || 0)
        );
      }, 0) || 0
    );
  };

  if (loading) {
    return (
      <div className="bundle-slider-loading">
        <div className="loading-cards">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="loading-card-horizontal">
              <div className="loading-image-horizontal"></div>
              <div className="loading-content-horizontal">
                <div className="loading-title-horizontal"></div>
                <div className="loading-instructor-horizontal"></div>
                <div className="loading-price-horizontal"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {bundles.length > 0 && (
        <div className="bundle-slider-container">
          <div className="row">
            {bundles.map((bundle) => {
              const savingsPercentage = calculateSavings(
                bundle?.price,
                bundle?.discount_price
              );

              return (
                <div className="col-lg-6 bundle_card_" key={bundle._id}>
                  <div className="item">
                    <div className="bundle-card-horizontal">
                      <Link
                        to={`/bundle-details/${bundle._id}`}
                        className="bundle-link-horizontal"
                      >
                        <div className="bundle-card-inner">
                          <div className="bundle-image-section">
                            <img
                              src={`https://api.basementex.com/${bundle.thumbnail}`}
                              alt={bundle.title}
                              className="bundle-image-horizontal"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/square_logo.png";
                              }}
                            />
                            <div className="course-usr">
                              <img
                                src={courseUser || "/placeholder.svg"}
                                className="w-auto"
                                alt="Users"
                              />
                              <span>
                                + {bundle.courses?.length || 0} {t("Courses")}
                              </span>
                            </div>
                            {/* Savings Badge */}
                            {bundle.discount_price &&
                              bundle.price > bundle.discount_price && (
                                <div className="savings-badge">
                                  {savingsPercentage}% {t("OFF")}
                                </div>
                              )}
                          </div>
                          <div className="bundle-content-horizontal">
                            <div className="bundle-header">
                              <h4 className="bundle-title-horizontal">
                                {bundle.title}
                              </h4>
                            </div>
                            <div className="bundle-meta">
                              <div className="bundle-stats-horizontal">
                                <span className="stat-item-horizontal">
                                  <i className="fas fa-play-circle"></i>
                                  {getTotalLessons(bundle.courses)}{" "}
                                  {t("Lessons")}
                                </span>
                                <span className="stat-item-horizontal">
                                  <i className="fas fa-certificate"></i>
                                  {bundle.courses?.some(
                                    (course) => course.certificate
                                  )
                                    ? t("Certificate")
                                    : t("No Certificate")}
                                </span>
                                <span className="stat-item-horizontal">
                                  <i className="fas fa-clock"></i>
                                  {bundle.validity} {t("Year Access")}
                                </span>
                              </div>
                              <div className="bundle-pricing-horizontal">
                                <span className="current-price-horizontal">
                                  {formatCurrency(bundle.discount_price)}
                                </span>
                                {bundle.price > bundle.discount_price && (
                                  <span className="original-price-horizontal">
                                    {formatCurrency(bundle.price)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <style>{`
        .bundle-slider-container {
          position: relative;
          padding: 0 10px;
        }

        .bundle-slider-loading {
          padding: 20px 0;
        }

        .loading-cards {
          display: flex;
          gap: 20px;
          overflow: hidden;
        }

        .loading-card-horizontal {
          display: flex;
          background: #f8f9fa;
          border-radius: 12px;
          overflow: hidden;
          min-width: 400px;
          height: 160px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .loading-image-horizontal {
          width: 140px;
          height: 100%;
          background: #e9ecef;
          flex-shrink: 0;
        }

        .loading-content-horizontal {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .loading-title-horizontal {
          height: 20px;
          background: #e9ecef;
          border-radius: 4px;
          width: 80%;
        }

        .loading-instructor-horizontal {
          height: 16px;
          background: #e9ecef;
          border-radius: 4px;
          width: 60%;
        }

        .loading-price-horizontal {
          height: 18px;
          background: #e9ecef;
          border-radius: 4px;
          width: 40%;
          margin-top: auto;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        .bundle-card-horizontal {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          height: 200px;
          border: 1px solid #f0f0f0;
        }

        .bundle-card-horizontal:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
          border-color: #e0e0e0;
        }

        .bundle-link-horizontal {
          text-decoration: none;
          color: inherit;
          height: 100%;
          display: block;
        }

        .bundle-card-inner {
          display: flex;
          height: 100%;
        }

        .bundle-image-section {
          position: relative;
          // width: 250px;
          height: 100%;
          flex-shrink: 0;
          overflow: hidden;
        }

        .bundle-image-horizontal {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .bundle-card-horizontal:hover .bundle-image-horizontal {
          transform: scale(1.05);
        }

        .course-usr {
          position: absolute;
          bottom: 8px;
          left: 8px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .course-usr img {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .savings-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: linear-gradient(135deg, #ff6b6b, #ee5a24);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 2;
        }

        .bundle-content-horizontal {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .bundle-header {
          margin-bottom: 12px;
        }

        .bundle-title-horizontal {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 6px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 2.6em;
        }

        .bundle-meta {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bundle-stats-horizontal {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .stat-item-horizontal {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: #718096;
          font-weight: 500;
        }

        .stat-item-horizontal i {
          color: #0055D2;
          font-size: 0.7rem;
          width: 10px;
        }

        .bundle-pricing-horizontal {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .current-price-horizontal {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0055D2;
        }

        .original-price-horizontal {
          font-size: 0.85rem;
          color: #a0aec0;
          text-decoration: line-through;
        }

        .bundle_card_ {
          margin-bottom: 20px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .bundle-slider-container {
            padding: 0 5px;
          }

          .bundle-card-horizontal {
            height: 140px;
          }

          .bundle-image-section {
            // width: 120px;
          }

          .bundle-content-horizontal {
            padding: 15px;
          }

          .bundle-title-horizontal {
            font-size: 1rem;
          }

          .bundle-stats-horizontal {
            gap: 8px;
          }

          .stat-item-horizontal {
            font-size: 0.7rem;
          }

          .current-price-horizontal {
            font-size: 1rem;
          }

          .loading-card-horizontal {
            min-width: 350px;
            height: 140px;
          }

          .loading-image-horizontal {
            width: 120px;
          }
        }

        @media (max-width: 480px) {
          .bundle-card-horizontal {
            height: 130px;
          }

          .bundle-image-section {
            // width: 100px;
          }

          .bundle-content-horizontal {
            padding: 12px;
          }

          .bundle-title-horizontal {
            font-size: 0.9rem;
            -webkit-line-clamp: 1;
            max-height: 1.3em;
          }

          .bundle-stats-horizontal {
            gap: 4px;
          }

          .bundle-pricing-horizontal {
            gap: 6px;
          }

          .current-price-horizontal {
            font-size: 0.95rem;
          }

          .loading-card-horizontal {
            min-width: 300px;
            height: 120px;
          }

          .loading-image-horizontal {
            width: 100px;
          }
        }
      `}</style>
    </>
  );
};

export default BundleSlider;
