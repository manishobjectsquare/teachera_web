import { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import courseUser from "../../../assets/images/course-user.png";

const BundleSlider = () => {
  const { t } = useTranslation();

  const [bundles, setBundles] = useState([]);

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

  useEffect(() => {
    const fetchBundles = async () => {
      try {
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

  return (
    <>
      {bundles.length > 0 && (
        <OwlCarousel
          className="course-slide owl-carousel"
          {...courseSliderOptions}
        >
          {bundles.map((bundle) => (
            <div className="item" key={bundle._id}>
              <div className="product-card">
                <Link to={`/bundle-details/${bundle._id}`}>
                  <div className="product-img">
                    <img
                      src={`https://api.basementex.com/${bundle.thumbnail}`}
                      alt={bundle.title}
                      className="w-100"
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
                          {calculateSavings(
                            bundle.price,
                            bundle.discount_price
                          )}
                          % {t("OFF")}
                        </div>
                      )}
                  </div>

                  <div className="product-content">
                    <h4 className="bundle-title">{bundle.title}</h4>
                    <p className="price">
                      {formatCurrency(bundle.discount_price)}
                      <del className="ms-1">{formatCurrency(bundle.price)}</del>
                    </p>
                    <div className="course-bttm">
                      <div className="bundle-stats">
                        <div className="stat-item">
                          <i className="fas fa-play-circle"></i>
                          <span>
                            {getTotalLessons(bundle.courses)} {t("Lessons")}
                          </span>
                        </div>
                        <div className="stat-item">
                          <i className="fas fa-certificate"></i>
                          <span>
                            {bundle.courses?.some(
                              (course) => course.certificate
                            )
                              ? t("Certificate")
                              : t("No Certificate")}
                          </span>
                        </div>
                        <div className="stat-item">
                          <i className="fas fa-clock"></i>
                          <span>
                            {bundle.validity} {t("Year Access")}
                          </span>
                        </div>
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
                /* Bundle Slider Specific Styles */
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

/* Fixed height for bundle title to maintain consistent card sizes */
.bundle-title {
  height: 48px; /* Fixed height for 2 lines */
  line-height: 1.2;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Ensure consistent card heights */
.product-card {
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
  margin-bottom: auto; /* Push stats to bottom */
  font-weight: 600;
  font-size: 1.1rem;
}

.bundle-stats {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  margin-top: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #666;
  min-height: 18px; /* Consistent height for each stat */
}

.stat-item i {
  color: #2563eb;
  font-size: 0.75rem;
  width: 12px;
  flex-shrink: 0; /* Prevent icon from shrinking */
}

.stat-item span {
  font-size: 0.75rem;
  line-height: 1.2;
}

.course-bttm {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: auto; /* Push to bottom of card */
}

/* Ensure all cards in the carousel have the same height */
.owl-carousel .item {
  height: auto;
}

.owl-carousel .item .product-card {
  min-height: 320px; /* Minimum card height */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .bundle-title {
    height: 40px;
    font-size: 0.9rem;
  }

  .product-card {
    min-height: 280px;
  }

  .bundle-stats {
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
  .bundle-title {
    height: 36px;
    font-size: 0.85rem;
  }

  .product-card {
    min-height: 260px;
  }
}

                `}
      </style>
    </>
  );
};

export default BundleSlider;
