import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../../Context/UserContext";
import loaderImg from "../../assets/images/loaderImg.png";
import { baseUrl } from "../../config/baseUrl";

const EnrolledCourses = () => {
  const { t, i18n } = useTranslation();
  const { user } = useUser();
  const userId = localStorage.getItem("userId");

  const [mainTab, setMainTab] = useState("All");
  const [subTab, setSubTab] = useState("");
  const [allCourse, setAllCourse] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [liveCoursesData, setLiveCoursesData] = useState([]);
  const [diplomaCoursesData, setDiplomaCoursesData] = useState([]);
  const [bundleData, setBundleData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTabData = async () => {
      setLoading(true);
      try {
        let url = "";

        if (mainTab === "All") {
          url = `https://api.basementex.com/course/all-list/${userId}`;
        }
        else if (mainTab === "Recorded" && subTab === "Courses") {
          url = `https://api.basementex.com/course/${userId}`;
        }
        else if (mainTab === "Live" && subTab === "Live Courses") {
          url = `https://api.basementex.com/api/v1/admin/live-course-purchase/${userId}`;
        } else if (mainTab === "Live" && subTab === "Live Diplomas") {
          url = `https://api.basementex.com/api/v1/web/courses/diploma-details/${userId}`;
        } else if (mainTab === "Recorded" && subTab === "Bundles") {
          url = `https://api.basementex.com/api/v1/web/bundle/bundle-details/${userId}`;
        }

        const response = await fetch(url);
        const result = await response.json();
        if (mainTab === "All") {
          setAllCourse(result.data || []);
        }
        else if (mainTab === "Recorded" && subTab === "Courses") {
          setCoursesData(result.data || []);
        } else if (mainTab === "Recorded" && subTab === "Bundles") {
          setBundleData(result.data || []);
        } else if (mainTab === "Live" && subTab === "Live Courses") {
          setLiveCoursesData(result.data || []);
        } else if (mainTab === "Live" && subTab === "Live Diplomas") {
          setDiplomaCoursesData(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTabData();
  }, [mainTab, subTab]);

  const renderAllCourses = () => {
    if (!allCourse || Object.keys(allCourse).length === 0) {
      return <h6 className="text-center w-100">{t("No Enrolled Course Found")}</h6>;
    }

    const { purchases = [], bundlePurchase = [], diplomaPurchase = [], liveCoursePurchaseHistory = [] } = allCourse;

    return (
      <>
        {/* Recorded Courses */}
        {purchases.map((item) => {
          const course = item.courseId;
          if (!course) return null; // skip if null
          return (
            <div className="col-lg-4 col-md-6 col-sm-6" key={item._id}>
              <div className="product-card shadow-sm rounded">
                <div className="product-img position-relative">
                  <img
                    src={`https://api.basementex.com/${course.thumbnail}`}
                    className="w-100"
                    alt={course.title}
                    onError={(e) => {
                      e.target.src = "/square_logo.png";
                    }}
                  />
                </div>
                <Link to={`/student/learning/${course._id}`} className="text-decoration-none">
                  <div className="product-content p-3">
                    <h4 className="mb-2">{course.title}</h4>
                    <p className="mb-0 small text-muted">{t("Recorded Course")}</p>
                    <p className="mb-0">
                      <strong>{t("Payment")}:</strong> {item.paymentStatus}
                    </p>
                    <p className="mb-0">
                      <strong>{t("Purchased On")}:</strong> {new Date(item.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}

        {/* Bundles */}
        {bundlePurchase.map((item) => {
          const bundle = item.courseId;
          if (!bundle) return null;
          return (
            <div className="col-lg-4 col-md-6 col-sm-6" key={item._id}>
              <div className="product-card shadow-sm rounded">
                <div className="product-img position-relative">
                  <img
                    src={`https://api.basementex.com/${bundle.thumbnail}`}
                    className="w-100"
                    alt={bundle.title}
                    onError={(e) => {
                      e.target.src = "/square_logo.png";
                    }}
                  />
                </div>
                <Link to={`/bundle-details/${bundle._id}`} className="text-decoration-none">
                  <div className="product-content p-3">
                    <h4 className="mb-2">{bundle.title}</h4>
                    <p className="mb-0 small text-muted">{t("Bundle Course")}</p>
                    <p className="mb-0">
                      <strong>{t("Payment")}:</strong> {item.paymentStatus}
                    </p>
                    <p className="mb-0">
                      <strong>{t("Purchased On")}:</strong> {new Date(item.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}

        {/* Diplomas */}
        {diplomaPurchase.map((item) => {
          const diploma = item.courseId;
          if (!diploma) return null;
          return (
            <div className="col-lg-4 col-md-6 col-sm-6" key={item._id}>
              <div className="product-card shadow-sm rounded">
                <div className="product-img position-relative">
                  <img
                    src={`https://api.basementex.com/${diploma?.image || "square_logo.png"}`}
                    className="w-100"
                    alt={diploma.title}
                    onError={(e) => {
                      e.target.src = "/square_logo.png";
                    }}
                  />
                </div>
                <Link to={`/diploma-details/${diploma._id}`} className="text-decoration-none">
                  <div className="product-content p-3">
                    <h4 className="mb-2">{diploma.title}</h4>
                    <p className="mb-0 small text-muted">{t("Diploma")}</p>
                    <p className="mb-0">
                      <strong>{t("Payment")}:</strong> {item.paymentStatus}
                    </p>
                    <p className="mb-0">
                      <strong>{t("Purchased On")}:</strong> {new Date(item.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}

        {/* Live Courses */}
        {liveCoursePurchaseHistory.map((item) => {
          const course = item.courseId;
          if (!course) return null;
          return (
            <div className="col-lg-4 col-md-6 col-sm-6" key={item._id}>
              <div className="product-card shadow-sm rounded">
                <div className="product-img position-relative">
                  <img
                    src={`https://api.basementex.com/${course?.image || "square_logo.png"}`}
                    className="w-100"
                    alt={course.title}
                    onError={(e) => {
                      e.target.src = "/square_logo.png";
                    }}
                  />
                </div>
                <Link to={`/student/live-learning/${course._id}`} className="text-decoration-none">
                  <div className="product-content p-3">
                    <h4 className="mb-2">{course.title}</h4>
                    <p className="mb-0 small text-muted">{t("Live Course")}</p>
                    <p className="mb-0">
                      <strong>{t("Payment")}:</strong> {item.paymentStatus}
                    </p>
                    <p className="mb-0">
                      <strong>{t("Purchased On")}:</strong> {new Date(item.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const renderCourses = () => {
    if (!coursesData.length)
      return <h6 className="text-center w-100">{t("No Course Found")}</h6>;

    return coursesData.map((course) => (
      <div className="col-lg-4 col-md-6 col-sm-6" key={course._id}>
        <div className="product-card shadow-sm rounded">
          <div className="product-img position-relative">
            <img
              src={`https://api.basementex.com/${i18n.language === "en" || !course.arabic_thumbnail
                ? course.thumbnail
                : course.arabic_thumbnail
                }`}
              className="w-100"
              alt={course.title}
              onError={(e) => {
                e.target.src = "/square_logo.png";
              }}
            />
            <div className="course-usr position-absolute top-0 start-0 p-2 bg-light rounded d-none">
              <span>{course?.course?.category?.translation?.name}</span>
            </div>
          </div>
          <Link
            to={`/student/learning/${course._id}`}
            className="text-decoration-none"
          >
            <div className="product-content p-3">
              <h4 className="mb-2">
                {i18n.language === "en" || !course.arabic_title
                  ? course.title
                  : course.arabic_title}
              </h4>
              <div className="course-list-prog mb-3">
                <p className="mb-1">
                  <span>{t("COMPLETE")} </span>
                  <span className="text-primary">
                    {course?.completedPercent?.toFixed(1) || 0}%
                  </span>
                </p>
                <div className="progress">
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: `${course?.completedPercent}%` }}
                  ></div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img
                    src={`${baseUrl}/${course?.instructor_details?.image}`}
                    onError={(e) => {
                      e.target.src = "/user.jpg";
                    }}
                    alt={course?.instructor_details?.name || "Instructor"}
                    className="rounded-circle instructor_image_"
                    width="40"
                    height="40"
                  />
                  <div>
                    <p className="mb-0 small text-muted">{t("Instructor")}</p>
                    <h6 className="mb-0" style={{ fontSize: "0.7rem" }}>
                      {course?.instructor_details?.name}
                    </h6>
                  </div>
                </div>
                <span className="play-btn btn btn-primary btn-sm">
                  <i className="fas fa-play"></i>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    ));
  };

  const renderLiveCourses = () => {
    if (!liveCoursesData.length)
      return <h6 className="text-center w-100">{t("No Live Course Found")}</h6>;

    return liveCoursesData.map((live) => {
      const course = live?.courseId;
      return (
        <div className="col-lg-4 col-md-6 col-sm-6" key={live._id}>
          <div className="product-card shadow-sm rounded">
            <div className="product-img position-relative">
              <img
                src={`https://api.basementex.com/${course?.image}`}
                className="w-100"
                alt={course?.title}
                onError={(e) => {
                  e.target.src = "/square_logo.png";
                }}
              />
            </div>
            <Link
              to={`/student/live-learning/${course?._id}`}
              onClick={() =>
                sessionStorage.setItem("currentCourse", course?.title)
              }
              className="text-decoration-none"
            >
              <div className="product-content p-3">
                <h4 className="mb-2">{course?.title}</h4>
                <div className="course-list-prog mb-3">
                  <p className="mb-1">
                    <span>{t("Payment")}:</span>{" "}
                    <span className="text-primary">{live?.paymentStatus}</span>
                  </p>
                  <p className="mb-0">
                    <span>{t("Purchased On")}:</span>{" "}
                    <span className="text-muted">
                      {new Date(live?.purchaseDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <span className="play-btn btn btn-primary w-100">
                    <i className="fas fa-play"></i>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      );
    });
  };

  const renderDiplomaCourses = () => {
    if (!diplomaCoursesData?.length)
      return <h6 className="text-center w-100">{t("No Diploma Found")}</h6>;

    // diplomaCoursesData.map((diploma) => (
    //   <div className="col-lg-4 col-md-6 col-sm-6" key={diploma._id}>
    //     <div className="diploma-card border rounded p-3 bg-white">
    //       <h5>{diploma?.title || "Diploma Title"}</h5>
    //       <p>{diploma?.description?.slice(0, 100)}...</p>
    //       <Link
    //         to={`/student/diploma/${diploma._id}`}
    //         className="btn btn-sm btn-success"
    //       >
    //         {t("View Diploma")}
    //       </Link>
    //     </div>
    //   </div>
    // ));
    return diplomaCoursesData.map((diploma) => (
      <div className="col-lg-4 col-md-6 col-sm-6" key={diploma._id}>
        <div className="product-card shadow-sm rounded">
          <div className="product-img position-relative">
            <img
              src={`https://api.basementex.com/${diploma?.courseId.image}`}
              className="w-100"
              alt={diploma?.courseId.title}
              onError={(e) => {
                e.target.src = "/square_logo.png";
              }}
            />
          </div>
          <Link
            // to={{
            //   pathname: `/diploma-details/${diploma?.courseId._id}`,
            //   state: diploma,
            // }}
            to={`/diploma-details/${diploma?.courseId._id}`}
            state={{ diploma }}
            onClick={() =>
              sessionStorage.setItem("currentCourse", diploma?.courseId.title)
            }
            className="text-decoration-none"
          >
            <div className="product-content p-3">
              <h4 className="mb-2">{diploma?.courseId.title}</h4>
              <div className="course-list-prog mb-3">
                <p className="mb-1">
                  <span>{t("Payment")}:</span>{" "}
                  <span className="text-primary">{diploma?.paymentStatus}</span>
                </p>
                <p className="mb-0">
                  <span>{t("Purchased On")}:</span>{" "}
                  <span className="text-muted">
                    {new Date(diploma?.purchaseDate).toLocaleDateString()}
                  </span>
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <span className="play-btn btn btn-primary w-100">
                  <i className="fas fa-play"></i>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    ));
  };
  const renderBundle = () => {
    if (!bundleData?.length)
      return <h6 className="text-center w-100">{t("No Diploma Found")}</h6>;

    // diplomaCoursesData.map((diploma) => (
    //   <div className="col-lg-4 col-md-6 col-sm-6" key={diploma._id}>
    //     <div className="diploma-card border rounded p-3 bg-white">
    //       <h5>{diploma?.title || "Diploma Title"}</h5>
    //       <p>{diploma?.description?.slice(0, 100)}...</p>
    //       <Link
    //         to={`/student/diploma/${diploma._id}`}
    //         className="btn btn-sm btn-success"
    //       >
    //         {t("View Diploma")}
    //       </Link>
    //     </div>
    //   </div>
    // ));
    return bundleData.map((diploma) => (
      <div className="col-lg-4 col-md-6 col-sm-6" key={diploma._id}>
        <div className="product-card shadow-sm rounded">
          <div className="product-img position-relative">
            <img
              src={`https://api.basementex.com/${diploma?.courseId.thumbnail}`}
              className="w-100"
              alt={diploma?.courseId.title}
              onError={(e) => {
                e.target.src = "/square_logo.png";
              }}
            />
          </div>
          <Link
            // to={{
            //   pathname: `/diploma-details/${diploma?.courseId._id}`,
            //   state: diploma,
            // }}
            to={`/bundle-details/${diploma?.courseId._id}`}
            state={{ diploma }}
            onClick={() =>
              sessionStorage.setItem("currentCourse", diploma?.courseId.title)
            }
            className="text-decoration-none"
          >
            <div className="product-content p-3">
              <h4 className="mb-2">{diploma?.courseId.title}</h4>
              <div className="course-list-prog mb-3">
                <p className="mb-1">
                  <span>{t("Payment")}:</span>{" "}
                  <span className="text-primary">{diploma?.paymentStatus}</span>
                </p>
                <p className="mb-0">
                  <span>{t("Purchased On")}:</span>{" "}
                  <span className="text-muted">
                    {new Date(diploma?.purchaseDate).toLocaleDateString()}
                  </span>
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <span className="play-btn btn btn-primary w-100">
                  <i className="fas fa-play"></i>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <div className="col-lg-9">
      <h3 className="user-title mb-3">{t("Enrolled Courses")}</h3>
      <div className="user-cards learning">
        {/* Main Tabs */}
        {/*       
        <div className="main-tabs mb-4">
          {["All", "Recorded", "Live"].map((tab) => (
            <button
              key={tab}
              className={`main-tab-btn ${mainTab === tab ? "active" : ""}`}
              onClick={() => {
                setMainTab(tab);
                setSubTab(tab === "Recorded" ? "Courses" : "Live Courses");
              }}
            >
              {t(tab)}
            </button>
          ))}
        </div>

      
        <div className="sub-tabs mb-4">
          {(mainTab === "Recorded"
            ? ["Courses", "Bundles"]
            : ["Live Courses", "Live Diplomas"]
          ).map((sub) => (
            <button
              key={sub}
              className={`sub-tab-btn ${subTab === sub ? "active" : ""}`}
              onClick={() => setSubTab(sub)}
            >
              {t(sub)}
            </button>
          ))}
        </div> */}

        {/* Main Tabs */}
        <div className="main-tabs mb-4">
          {["All", "Recorded", "Live"].map((tab) => (
            <button
              key={tab}
              className={`main-tab-btn ${mainTab === tab ? "active" : ""}`}
              onClick={() => {
                setMainTab(tab);
                if (tab === "Recorded") {
                  setSubTab("Courses");
                } else if (tab === "Live") {
                  setSubTab("Live Courses");
                } else {
                  setSubTab(null); // Clear subTab when "All" is selected
                }
              }}
            >
              {t(tab)}
            </button>
          ))}
        </div>

        {/* Sub Tabs - Only show when not in "All" tab */}
        {mainTab !== "All" && (
          <div className="sub-tabs mb-4">
            {(mainTab === "Recorded"
              ? ["Courses", "Bundles"]
              : ["Live Courses", "Live Diplomas"]
            ).map((sub) => (
              <button
                key={sub}
                className={`sub-tab-btn ${subTab === sub ? "active" : ""}`}
                onClick={() => setSubTab(sub)}
              >
                {t(sub)}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center">
            <img src={loaderImg} alt="Loading..." width={60} />
          </div>
        ) : (
          <div className="row g-4">
            {mainTab === "All" && renderAllCourses()}
            {subTab === "Courses" && renderCourses()}
            {subTab === "Bundles" && renderBundle()}
            {subTab === "Live Courses" && renderLiveCourses()}
            {subTab === "Live Diplomas" && renderDiplomaCourses()}
          </div>
        )}
      </div>

      <style>
        {`
        .tab-btn {
          background-color: #f4f4f4;
          color: #333;
          border: none;
          padding: 8px 20px;
          border-radius: 5px;
          transition: all 0.2s ease;
        }
        .tab-btn:hover {
          background-color: #e0e0e0;
        }
        .tab-btn.active {
          background-color: #0055d2;
          color: white;
        }
          .main-tabs {
  display: flex;
  gap: 12px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.main-tab-btn {
  background: #f5f5f5;
  border: none;
  padding: 10px 24px;
  border-radius: 25px;
  font-weight: 500;
  color: #333;
  transition: all 0.2s ease;
}

.main-tab-btn:hover {
  background: #e0e0e0;
  color: #333;
}

.main-tab-btn.active {
  background-color: #0055d2;
  color: white;
}

.sub-tabs {
  display: flex;
  gap: 10px;
  padding-left: 10px;
  margin-bottom: 20px;
}

.sub-tab-btn {
  background-color: #eee;
  border: none;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #555;
  transition: 0.2s ease;
}

.sub-tab-btn:hover {
  background-color: #ddd;
  color: #555;
}

.sub-tab-btn.active {
  background-color: #0055d2;
  color: white;
}

        `}
      </style>
    </div>
  );
};

export default EnrolledCourses;
