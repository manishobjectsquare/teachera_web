import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Instructor from "../assets/images/instructor-img-04.png";
import Globe from "../assets/images/globe.svg";
import { useTranslation } from "react-i18next";
import CourseSlider from "../Components/Layout/Sliders/CourseSlider";
import Facebook from "../assets/images/facebook2.svg";
import Linkedin from "../assets/images/linkden.svg";
import Twitter from "../assets/images/twitter.svg";
import Telegram from "../assets/images/telegram.svg";
import Pinterest from "../assets/images/pintrest.svg";
import Lock from "../assets/images/lock.svg";
import loaderImg from "../assets/images/loaderImg.png";
import { useUser } from "../Context/UserContext";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishListContext";
// lesson
const CourseDetails = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { user } = useUser();
  const { isInCart, toggleCartItem, cartLoading } = useCart();
  const { isInWishlist, toggleWishlistItem, wishlistLoading } = useWishlist();

  // State
  const [course, setCourse] = useState({
    courseDetails: {},
    chapterDetails: [],
  });
  const [reviews, setReviews] = useState([]);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [promoCode, setPromoCode] = useState("");

  // Fetch course and reviews in parallel
  useEffect(() => {
    if (!id) return;
    const Token = localStorage.getItem("Token");
    const fetchCourse = async () => {
      try {
        setLoadingCourse(true);
        const res = await fetch(
          `https://api.basementex.com/api/v1/web/course-details/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        const data = await res.json();
        if (data.status) setCourse(data.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoadingCourse(false);
      }
    };

    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        const res = await fetch(
          `https://api.basementex.com/course_review/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        const data = await res.json();
        setReviews(data.data || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchCourse();
    fetchReviews();
  }, [id]);

  // Derived states
  const isFree = course?.courseDetails?.price === 0;
  const isPurchased = course?.courseDetails?.isPurchase === true;
  const courseInCart = isInCart(course?.courseDetails?._id);
  const courseInWishlist = isInWishlist(course?.courseDetails?._id);

  // Handlers
  const handleAddToCart = async () => {
    if (!user?.Token) return toast.error("Please login to add course to cart");
    await toggleCartItem(
      course?.courseDetails?._id,
      course?.courseDetails?.discount_price,
      "course"
    );
  };

  const handleToggleWishlist = async () => {
    if (!user?.Token)
      return toast.error("Please login to add course to wishlist");
    await toggleWishlistItem(course?.courseDetails?._id);
  };

  const handleApplyPromoCode = () => {
    console.log("Applying promo code:", promoCode);
    // Real implementation goes here
  };

  // Helpers
  const truncate = (text, length) =>
    !text
      ? ""
      : text.length > length
        ? text.substring(0, length) + "..."
        : text;

  const minutesToHours = (min) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h ? `${h}h ${m}m` : `${m}m`;
  };

  const formatCurrency = (amount) =>
    amount ? `$${Number(amount).toFixed(2)}` : "$0.00";

  const calculateAverageRating = (list) => {
    if (!list.length) return 0;
    const sum = list.reduce((acc, r) => acc + r.rating, 0);
    return (sum / list.length).toFixed(1);
  };

  // Fallback UI
  if (loadingCourse) {
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

  // Deconstruct with fallback
  const { courseDetails, chapterDetails = [] } = course;
  const { title, description, price, thumbnail, instructor_id, type } =
    courseDetails || {};

  const mockInstructor = {
    name: instructor_id?.name || "John Doe",
    image: instructor_id?.image || Instructor,
    job_title: instructor_id?.job_title || "Instructor",
    short_bio:
      instructor_id?.short_bio ||
      "Experienced instructor with expertise in this subject",
  };
  const mockLanguages = [{ language: { name: "English" } }];
  return (
    <>
      {/* Course Banner Section */}
      <section className="course-dtl-bannr">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12">
              <div className="coursebnnr-lft">
                <h6>{t("Bestseller")}</h6>
                <h3>
                  {i18n?.language == "en" || courseDetails?.arabic_title == ""
                    ? courseDetails?.title
                    : courseDetails?.arabic_title}
                </h3>
                {/* <p className="rating text-white">
                                    <i className="fas fa-star"></i>
                                    {calculateAverageRating(course.reviews)} {t('Reviews')}
                                    <span className="text-white">({course.enrollments})</span>
                                </p> */}
                {i18n?.language === "en" ||
                  courseDetails?.arabic_description == "" ? (
                  <p
                    className="text-white course_description______"
                    dangerouslySetInnerHTML={{
                      __html: truncate(courseDetails?.description, 200),
                    }}
                  ></p>
                ) : (
                  <p
                    className="text-white course_description______"
                    dangerouslySetInnerHTML={{
                      __html: truncate(courseDetails?.arabic_description, 200),
                    }}
                  ></p>
                )}
                <div className="coursebnnr-langu">
                  <div className="coursebnnr-langu-lft">
                    <span>
                      <img
                        src={
                          courseDetails?.instructor_id?.image
                            ? `https://api.basementex.com/${courseDetails.instructor_id.image}`
                            : "/favicon.png"
                        }
                        alt={courseDetails?.instructor_id?.name || "Instructor"}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/favicon.png";
                        }}
                      />
                    </span>
                    <span>
                      <p>{t("Instructor")}</p>
                      <h5>{courseDetails?.instructor_id?.name}</h5>
                    </span>
                  </div>
                  <div className="coursebnnr-langu-lft">
                    <span>
                      <img src={Globe || "/placeholder.svg"} alt="Language" />
                    </span>
                    <span>
                      <p>{t("language")}</p>
                      {(mockLanguages || []).map((lang, index) => (
                        <h5 key={index}>{t(`${lang.language.name}`)}</h5>
                      ))}
                    </span>
                  </div>
                </div>
                <div className="bg-blue-600 text-white p-6 md:p-8 mt-4 course-infos">
                  <h5 className="  mb-6 text-white">
                    {t("This course includes")}
                  </h5>

                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="d-flex align-items-center gap-3">
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

                      <div>
                        <span className="opacity-80">{t("Level")} : </span>
                        <span className="font-medium">
                          {course?.courseDetails?.type[0]}
                        </span>
                        {/* {course?.courseDetails?.type.map((type, i) => (
                                                    <p className="font-medium" key={i}>{type}</p>
                                                ))} */}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 ">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_0_2442)">
                          <path
                            d="M19.9983 9.96833C19.9983 10.4059 19.9983 10.8434 19.9359 11.2809C19.8735 11.5934 19.5615 11.8434 19.2495 11.8434C18.9375 11.8434 18.688 11.4684 18.688 11.1559C18.7503 10.7184 18.7503 10.3433 18.7503 9.96833C18.7503 5.15563 14.8193 1.21797 10.0147 1.21797C9.64036 1.21797 9.26598 1.21797 8.8292 1.28047C8.51721 1.34297 8.14283 1.09296 8.14283 0.780451C8.08043 0.467938 8.33002 0.092922 8.64201 0.092922C14.133 -0.657109 19.1247 3.21805 19.8735 8.65578C19.9983 9.0933 19.9983 9.53081 19.9983 9.96833Z"
                            fill="currentcolor"
                          />
                          <path
                            d="M6.6453 18.0312C5.95893 17.7187 5.27256 17.3436 4.64859 16.9061C4.399 16.7186 3.96222 16.7186 3.77503 17.0311C3.58784 17.2811 3.58784 17.7187 3.89982 17.9062C4.58619 18.4062 5.33496 18.9062 6.14612 19.2187C6.45811 19.3437 6.83249 19.2187 6.95728 18.9062C7.14448 18.5312 7.01968 18.1562 6.6453 18.0312Z"
                            fill="currentcolor"
                          />
                          <path
                            d="M4.27421 3.15555C4.399 3.15555 4.52379 3.09305 4.64859 3.03054C5.27256 2.59303 5.89653 2.15551 6.5829 1.9055C6.89489 1.78049 7.08208 1.40548 6.95728 1.09296C6.83249 0.780451 6.45811 0.592943 6.14612 0.717948C5.33496 1.03046 4.58619 1.46798 3.89982 2.0305C3.65023 2.28051 3.58784 2.65553 3.77503 2.90554C3.89982 3.09305 4.08701 3.15555 4.27421 3.15555Z"
                            fill="currentcolor"
                          />
                          <path
                            d="M1.96551 13.3435C1.84072 13.031 1.46633 12.8435 1.15435 12.9685C0.842362 13.0935 0.65517 13.4685 0.779965 13.781C1.09195 14.5935 1.52873 15.3436 2.09031 16.0311C2.2775 16.2811 2.71428 16.3436 2.96387 16.1561C3.21345 15.9686 3.27585 15.5311 3.08866 15.2811C2.65188 14.7185 2.2151 14.031 1.96551 13.3435Z"
                            fill="currentcolor"
                          />
                          <path
                            d="M1.34154 11.1559C1.21674 10.4059 1.21674 9.65582 1.34154 8.84329C1.40394 8.53077 1.15435 8.21826 0.779965 8.15576C0.405582 8.09325 0.155993 8.34327 0.0935958 8.71828C-0.0311986 9.59332 -0.0311986 10.4684 0.0935958 11.3434C0.155993 11.6559 0.405582 11.9059 0.717567 11.9059H0.779965C1.15435 11.7809 1.40394 11.4684 1.34154 11.1559Z"
                            fill="currentcolor"
                          />
                          <path
                            d="M1.09195 6.96821C1.40394 7.09321 1.77832 6.96821 1.90311 6.65569C2.2151 5.96817 2.58948 5.28064 3.02626 4.65561C3.21345 4.4056 3.21345 3.96808 2.90147 3.78058C2.65188 3.59307 2.2775 3.65557 2.09031 3.90558C1.59113 4.59311 1.15435 5.34314 0.779965 6.15567C0.65517 6.46819 0.779965 6.8432 1.09195 6.96821Z"
                            fill="currentcolor"
                          />
                          <path
                            d="M15.3185 16.9061C14.6945 17.3436 14.0706 17.7812 13.3218 18.0312C13.0098 18.1562 12.8226 18.5312 12.9474 18.8437C13.0722 19.1562 13.4466 19.3437 13.7586 19.2187C14.5697 18.9062 15.3185 18.4687 16.0049 17.9062C16.2545 17.7187 16.3169 17.3436 16.1297 17.0311C16.0049 16.7811 15.6305 16.7186 15.3185 16.9061Z"
                            fill="currentcolor"
                          />
                          <path
                            d="M11.1379 18.6562C10.3891 18.7812 9.64036 18.7812 8.8292 18.6562C8.51721 18.5937 8.20523 18.8437 8.14283 19.2187C8.08043 19.5312 8.33002 19.8437 8.70441 19.9062C9.57797 20.0313 10.4515 20.0313 11.3251 19.9062C11.6371 19.8437 11.8867 19.5312 11.8867 19.2187C11.8243 18.8437 11.5123 18.5937 11.1379 18.6562Z"
                            fill="currentcolor"
                          />
                          <path
                            d="M18.8751 13.031C18.5632 12.906 18.1888 13.031 18.064 13.3435C17.752 14.031 17.3776 14.7185 16.9408 15.3436C16.7536 15.5936 16.7536 16.0311 17.0656 16.2186C17.3776 16.4061 17.752 16.4061 17.9392 16.0936C18.5008 15.4061 18.9375 14.656 19.2495 13.8435C19.3743 13.531 19.1871 13.156 18.8751 13.031Z"
                            fill="currentcolor"
                          />
                          <path
                            d="M10.0147 4.4056C9.64036 4.4056 9.39077 4.65561 9.39077 5.03063V10.0308C9.39077 10.4059 9.64036 10.6559 10.0147 10.6559H15.0065C15.3809 10.6559 15.6305 10.4059 15.6305 10.0308C15.6305 9.65582 15.3809 9.40581 15.0065 9.40581H10.6387V5.03063C10.6387 4.65561 10.3891 4.4056 10.0147 4.4056Z"
                            fill="currentcolor"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_0_2442">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <div>
                        <span className="opacity-80">{t("Duration")} : </span>
                        {course?.courseDetails?.duration}
                        {i18n.language === "ar" ? "س" : "h"}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.701 9.00506H15.2923V5.25384C15.2923 4.97633 15.1859 4.71018 14.9966 4.51395C14.8074 4.31772 14.5506 4.20748 14.2829 4.20748H11.255C11.2231 3.57767 10.9787 2.97952 10.5645 2.51761C10.1503 2.05569 9.59271 1.75939 8.98915 1.6805C8.64393 1.64366 8.29509 1.68103 7.96444 1.7903C7.63378 1.89957 7.32843 2.07837 7.06745 2.31554C6.80648 2.5527 6.59551 2.84313 6.44771 3.16866C6.29992 3.4942 6.2185 3.84784 6.20852 4.20748H2.67596C2.40828 4.20748 2.15156 4.31772 1.96227 4.51395C1.77299 4.71018 1.66666 4.97633 1.66666 5.25384V9.52825H3.08473C3.47304 9.51655 3.85189 9.65362 4.14886 9.91324C4.44584 10.1729 4.64012 10.5368 4.69457 10.9356C4.71421 11.1544 4.68933 11.375 4.62152 11.5832C4.55371 11.7914 4.4445 11.9825 4.30094 12.1442C4.15985 12.3077 3.98724 12.4388 3.79427 12.5289C3.6013 12.619 3.39225 12.6662 3.18061 12.6673H1.66666V17.287C1.66666 17.5646 1.77299 17.8307 1.96227 18.0269C2.15156 18.2232 2.40828 18.3334 2.67596 18.3334H14.2829C14.5506 18.3334 14.8074 18.2232 14.9966 18.0269C15.1859 17.8307 15.2923 17.5646 15.2923 17.287V14.2369H15.7969C16.1511 14.2388 16.5017 14.1634 16.8259 14.0156C17.1501 13.8678 17.4407 13.6508 17.6787 13.3789C17.9167 13.107 18.0968 12.7862 18.2073 12.4373C18.3178 12.0885 18.3563 11.7194 18.3202 11.3542C18.2384 10.6973 17.9261 10.0947 17.443 9.66143C16.9599 9.22813 16.3398 8.99447 15.701 9.00506ZM16.9172 12.6673C16.7761 12.8309 16.6035 12.9619 16.4106 13.0521C16.2176 13.1422 16.0085 13.1893 15.7969 13.1905H14.2829V17.287H2.67596V13.7137H3.18061C3.53479 13.7156 3.88538 13.6402 4.20959 13.4924C4.5338 13.3446 4.82436 13.1277 5.06237 12.8557C5.30038 12.5838 5.4805 12.263 5.59103 11.9142C5.70155 11.5653 5.74 11.1962 5.70387 10.831C5.62208 10.1741 5.30982 9.57156 4.82671 9.13825C4.34359 8.70495 3.72346 8.47129 3.08473 8.48188H2.67596V5.25384H7.21782V4.29642C7.21896 4.07701 7.26446 3.86028 7.35138 3.66022C7.43831 3.46016 7.56472 3.28123 7.72248 3.13495C7.87841 2.98612 8.06275 2.8729 8.26356 2.8026C8.46437 2.7323 8.67718 2.7065 8.88822 2.72687C9.27286 2.78331 9.62395 2.98473 9.87438 3.29261C10.1248 3.60049 10.257 3.99325 10.2457 4.39582V5.25384H14.2829V10.0514H15.701C16.0893 10.0397 16.4682 10.1768 16.7652 10.4364C17.0621 10.6961 17.2564 11.06 17.3109 11.4588C17.3305 11.6776 17.3056 11.8982 17.2378 12.1064C17.17 12.3146 17.0608 12.5057 16.9172 12.6673Z"
                          fill="currentcolor"
                        />
                      </svg>

                      <div>
                        <span className="opacity-80">{t("Lessons")} : </span>
                        <span className="font-medium">
                          {course?.courseDetails?.totalLesson ?? 0}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.701 9.00506H15.2923V5.25384C15.2923 4.97633 15.1859 4.71018 14.9966 4.51395C14.8074 4.31772 14.5506 4.20748 14.2829 4.20748H11.255C11.2231 3.57767 10.9787 2.97952 10.5645 2.51761C10.1503 2.05569 9.59271 1.75939 8.98915 1.6805C8.64393 1.64366 8.29509 1.68103 7.96444 1.7903C7.63378 1.89957 7.32843 2.07837 7.06745 2.31554C6.80648 2.5527 6.59551 2.84313 6.44771 3.16866C6.29992 3.4942 6.2185 3.84784 6.20852 4.20748H2.67596C2.40828 4.20748 2.15156 4.31772 1.96227 4.51395C1.77299 4.71018 1.66666 4.97633 1.66666 5.25384V9.52825H3.08473C3.47304 9.51655 3.85189 9.65362 4.14886 9.91324C4.44584 10.1729 4.64012 10.5368 4.69457 10.9356C4.71421 11.1544 4.68933 11.375 4.62152 11.5832C4.55371 11.7914 4.4445 11.9825 4.30094 12.1442C4.15985 12.3077 3.98724 12.4388 3.79427 12.5289C3.6013 12.619 3.39225 12.6662 3.18061 12.6673H1.66666V17.287C1.66666 17.5646 1.77299 17.8307 1.96227 18.0269C2.15156 18.2232 2.40828 18.3334 2.67596 18.3334H14.2829C14.5506 18.3334 14.8074 18.2232 14.9966 18.0269C15.1859 17.8307 15.2923 17.5646 15.2923 17.287V14.2369H15.7969C16.1511 14.2388 16.5017 14.1634 16.8259 14.0156C17.1501 13.8678 17.4407 13.6508 17.6787 13.3789C17.9167 13.107 18.0968 12.7862 18.2073 12.4373C18.3178 12.0885 18.3563 11.7194 18.3202 11.3542C18.2384 10.6973 17.9261 10.0947 17.443 9.66143C16.9599 9.22813 16.3398 8.99447 15.701 9.00506ZM16.9172 12.6673C16.7761 12.8309 16.6035 12.9619 16.4106 13.0521C16.2176 13.1422 16.0085 13.1893 15.7969 13.1905H14.2829V17.287H2.67596V13.7137H3.18061C3.53479 13.7156 3.88538 13.6402 4.20959 13.4924C4.5338 13.3446 4.82436 13.1277 5.06237 12.8557C5.30038 12.5838 5.4805 12.263 5.59103 11.9142C5.70155 11.5653 5.74 11.1962 5.70387 10.831C5.62208 10.1741 5.30982 9.57156 4.82671 9.13825C4.34359 8.70495 3.72346 8.47129 3.08473 8.48188H2.67596V5.25384H7.21782V4.29642C7.21896 4.07701 7.26446 3.86028 7.35138 3.66022C7.43831 3.46016 7.56472 3.28123 7.72248 3.13495C7.87841 2.98612 8.06275 2.8729 8.26356 2.8026C8.46437 2.7323 8.67718 2.7065 8.88822 2.72687C9.27286 2.78331 9.62395 2.98473 9.87438 3.29261C10.1248 3.60049 10.257 3.99325 10.2457 4.39582V5.25384H14.2829V10.0514H15.701C16.0893 10.0397 16.4682 10.1768 16.7652 10.4364C17.0621 10.6961 17.2564 11.06 17.3109 11.4588C17.3305 11.6776 17.3056 11.8982 17.2378 12.1064C17.17 12.3146 17.0608 12.5057 16.9172 12.6673Z"
                          fill="currentcolor"
                        />
                      </svg>

                      <div>
                        <span className="opacity-80">{t("Quizzes")} : </span>
                        <span className="font-medium">
                          {course?.courseDetails?.totalQuiz ?? 0}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.1667 9.37479C19.1674 8.65706 18.9831 7.95019 18.63 7.3165C18.2769 6.68281 17.7659 6.14177 17.1421 5.74108C16.5182 5.3404 15.8007 5.09237 15.0527 5.01887C14.3047 4.94538 13.5493 5.04867 12.853 5.31964C12.1567 5.59061 11.5409 6.02094 11.06 6.57268C10.5791 7.12442 10.2478 7.78063 10.0953 8.48344C9.94276 9.18626 9.97376 9.9141 10.1855 10.6028C10.3973 11.2915 10.7833 11.9198 11.3095 12.4325V16.8746C11.3095 16.9812 11.3379 17.086 11.3923 17.1791C11.4466 17.2722 11.525 17.3505 11.62 17.4066C11.7149 17.4626 11.8234 17.4946 11.9349 17.4994C12.0465 17.5042 12.1574 17.4816 12.2573 17.4339L14.5833 16.323L16.9094 17.4339C17.0092 17.4816 17.1202 17.5042 17.2318 17.4994C17.3433 17.4946 17.4518 17.4626 17.5467 17.4066C17.6417 17.3505 17.7201 17.2722 17.7744 17.1791C17.8288 17.086 17.8572 16.9812 17.8572 16.8746V12.4325C18.6969 11.6167 19.1672 10.5185 19.1667 9.37479ZM14.5833 6.24989C15.2308 6.24989 15.8638 6.43316 16.4022 6.77653C16.9405 7.1199 17.3602 7.60794 17.6079 8.17894C17.8557 8.74995 17.9206 9.37826 17.7942 9.98443C17.6679 10.5906 17.3561 11.1474 16.8983 11.5844C16.4404 12.0215 15.8571 12.3191 15.222 12.4397C14.587 12.5602 13.9287 12.4983 13.3305 12.2618C12.7323 12.0253 12.221 11.6248 11.8613 11.1109C11.5015 10.597 11.3095 9.99284 11.3095 9.37479C11.3095 8.54602 11.6545 7.75119 12.2684 7.16515C12.8824 6.57912 13.7151 6.24989 14.5833 6.24989ZM14.8763 15.0652C14.7854 15.0218 14.6851 14.9992 14.5833 14.9992C14.4816 14.9992 14.3813 15.0218 14.2903 15.0652L12.6191 15.8637V13.327C13.2328 13.6053 13.9038 13.7497 14.5833 13.7497C15.2628 13.7497 15.9338 13.6053 16.5476 13.327V15.8637L14.8763 15.0652ZM10 14.3746C10 14.5404 9.93103 14.6994 9.80823 14.8166C9.68544 14.9338 9.5189 14.9996 9.34525 14.9996H2.14287C1.79556 14.9996 1.46248 14.8679 1.21689 14.6335C0.971311 14.3991 0.833344 14.0812 0.833344 13.7497V3.74996C0.833344 3.41845 0.971311 3.10052 1.21689 2.86611C1.46248 2.63169 1.79556 2.5 2.14287 2.5H16.5476C16.8949 2.5 17.228 2.63169 17.4736 2.86611C17.7192 3.10052 17.8572 3.41845 17.8572 3.74996C17.8572 3.91572 17.7882 4.07468 17.6654 4.19189C17.5426 4.3091 17.376 4.37494 17.2024 4.37494C17.0287 4.37494 16.8622 4.3091 16.7394 4.19189C16.6166 4.07468 16.5476 3.91572 16.5476 3.74996H2.14287V13.7497H9.34525C9.5189 13.7497 9.68544 13.8155 9.80823 13.9327C9.93103 14.0499 10 14.2089 10 14.3746ZM8.69049 9.99978C8.69049 10.1655 8.6215 10.3245 8.49871 10.4417C8.37592 10.5589 8.20938 10.6248 8.03572 10.6248H4.76191C4.58826 10.6248 4.42172 10.5589 4.29893 10.4417C4.17614 10.3245 4.10715 10.1655 4.10715 9.99978C4.10715 9.83402 4.17614 9.67505 4.29893 9.55785C4.42172 9.44064 4.58826 9.37479 4.76191 9.37479H8.03572C8.20938 9.37479 8.37592 9.44064 8.49871 9.55785C8.6215 9.67505 8.69049 9.83402 8.69049 9.99978ZM8.69049 7.49985C8.69049 7.66561 8.6215 7.82457 8.49871 7.94178C8.37592 8.05899 8.20938 8.12483 8.03572 8.12483H4.76191C4.58826 8.12483 4.42172 8.05899 4.29893 7.94178C4.17614 7.82457 4.10715 7.66561 4.10715 7.49985C4.10715 7.3341 4.17614 7.17513 4.29893 7.05792C4.42172 6.94072 4.58826 6.87487 4.76191 6.87487H8.03572C8.20938 6.87487 8.37592 6.94072 8.49871 7.05792C8.6215 7.17513 8.69049 7.3341 8.69049 7.49985Z"
                          fill="currentcolor"
                        />
                      </svg>

                      <div>
                        <span className="opacity-80">
                          {t("Certifications")} :{" "}
                        </span>
                        <span className="font-medium">
                          {course?.courseDetails?.certificate === true
                            ? t("Yes")
                            : t("No")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Detail Section */}
      <section className="tp-space course-dtl-bannr-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <h6 className="fw-400">{t("Share this course")}:</h6>
              <ul className="course-media">
                <li>
                  <Link to="" target="_blank" rel="noopener noreferrer">
                    <img src={Facebook} alt="Facebook" />
                  </Link>
                </li>
                <li>
                  <Link to="" target="_blank" rel="noopener noreferrer">
                    <img src={Linkedin} alt="LinkedIn" />
                  </Link>
                </li>
                <li>
                  <Link to="" target="_blank" rel="noopener noreferrer">
                    <img src={Pinterest} alt="Pinterest" />
                  </Link>
                </li>
                <li>
                  <Link to="" target="_blank" rel="noopener noreferrer">
                    <img src={Telegram} alt="Telegram" />
                  </Link>
                </li>
                <li>
                  <Link to="" target="_blank" rel="noopener noreferrer">
                    <img src={Twitter} alt="Twitter" />
                  </Link>
                </li>
              </ul>

              {/* Course Description */}
              <h4 className="title mt-4">{t("Description")}</h4>
              {/* <div
                className="course-desc-bx"
                dangerouslySetInnerHTML={{ __html: courseDetails?.description }}
              /> */}
              {i18n?.language === "en" ||
                courseDetails?.arabic_description == "" ? (
                <p
                  className="text-white"
                  dangerouslySetInnerHTML={{
                    __html: truncate(courseDetails?.description, 200),
                  }}
                ></p>
              ) : (
                <p
                  className="text-white"
                  dangerouslySetInnerHTML={{
                    __html: truncate(courseDetails?.arabic_description, 200),
                  }}
                ></p>
              )}

              {/* Course Lessons */}
              {/* Course Lessons */}
              <div className="course-lesson">
                <h4 className="title mb-3">{t("Course Curriculum")}</h4>
                <div className="accordion" id="lesson">
                  {(chapterDetails || []).map((chapter, index) => (
                    <div className="accordion-item" key={chapter._id}>
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#lesson-${index}`}
                        >
                          {index + 1}.
                          {i18n?.language === "en" ||
                            courseDetails?.arabic_description == ""
                            ? chapter.title
                            : chapter.arabic_title}
                        </button>
                      </h2>
                      <div
                        id={`lesson-${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""
                          }`}
                        data-bs-parent="#lesson"
                      >
                        <div className="accordion-body">
                          {/* Video Lessons */}
                          {(chapter?.lessonDetails || []).map((lesson) => {
                            const isAccessible = isFree || isPurchased;

                            return (
                              <Link
                                to={
                                  isAccessible
                                    ? `/student/learning/${id}?lesson=${lesson._id}`
                                    : "javascript:;"
                                }
                                state={{
                                  lesson: lesson,
                                  type: "video",
                                }}
                                className="lission-list"
                                key={lesson._id}
                              >
                                <h5>
                                  <i className="fas fa-video me-2"></i>
                                  {index + 1}.
                                  {i18n?.language === "en" ||
                                    courseDetails?.arabic_description == ""
                                    ? lesson.title
                                    : lesson.arabic_title}
                                </h5>
                                <span className="item-meta duration">
                                  {minutesToHours(lesson?.duration)}{" "}
                                  {!isAccessible && (
                                    <img src={Lock} alt="icon" />
                                  )}
                                </span>
                              </Link>
                            );
                          })}

                          {/* Documents */}
                          {(chapter?.documentDetails || []).map((doc) => {
                            const isAccessible = isFree || isPurchased;

                            return (
                              <Link
                                // href={isAccessible ? doc.file_url : "javascript:;"}
                                to={
                                  isAccessible
                                    ? `/student/learning/${id}`
                                    : "javascript:;"
                                }
                                state={{
                                  lesson: doc,
                                  type: "document",
                                }}
                                className="lission-list"
                                key={doc._id}
                              >
                                <h5>
                                  <i className="fas fa-file me-2"></i>
                                  {/* {doc.title} */}
                                  {i18n?.language === "en" ||
                                    courseDetails?.arabic_description == ""
                                    ? doc.title
                                    : doc.arabic_title}
                                </h5>
                                <span className="item-meta duration">
                                  {doc.file_type}{" "}
                                  {!isAccessible && (
                                    <img src={Lock} alt="icon" />
                                  )}
                                </span>
                              </Link>
                            );
                          })}

                          {/* Live Lessons */}
                          {(chapter?.liveLessonDetails || []).map(
                            (liveLesson) => {
                              const isAccessible = isFree || isPurchased;

                              return (
                                <Link
                                  to={
                                    isAccessible
                                      ? `/student/learning/${id}`
                                      : "javascript:"
                                  }
                                  state={{
                                    lesson: liveLesson,
                                    type: "live",
                                  }}
                                  className="lission-list"
                                  key={liveLesson._id}
                                >
                                  <h5>
                                    <i className="fas fa-video-camera me-2"></i>
                                    {i18n?.language === "en" ||
                                      courseDetails?.arabic_description == ""
                                      ? liveLesson.title
                                      : liveLesson.arabic_title}{" "}
                                    <span className="badge bg-primary">
                                      LIVE
                                    </span>
                                  </h5>
                                  <span className="item-meta duration">
                                    {minutesToHours(liveLesson?.duration)}{" "}
                                    {!isAccessible && (
                                      <img src={Lock} alt="icon" />
                                    )}
                                  </span>
                                </Link>
                              );
                            }
                          )}

                          {/* Quizzes */}
                          {(chapter?.quizDetails || []).map((quiz) => {
                            const isAccessible = isFree || isPurchased;

                            return (
                              <Link
                                to={
                                  isAccessible
                                    ? `/student/learning/${id}`
                                    : "javascript:;"
                                }
                                state={{
                                  lesson: quiz,
                                  type: "quiz",
                                }}
                                className="lission-list"
                                key={quiz._id}
                              >
                                <h5>
                                  <i className="fas fa-question-circle me-2"></i>
                                  {/* {quiz.title} */}
                                  {i18n?.language === "en" ||
                                    courseDetails?.arabic_description == ""
                                    ? quiz.title
                                    : quiz.arabic_title}
                                </h5>
                                <span className="item-meta duration">
                                  {quiz.time} min{" "}
                                  {!isAccessible && (
                                    <img src={Lock} alt="icon" />
                                  )}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor Details */}
              <div className="instructor-dtl">
                <h2 className="title mb-3">{t("Instructor")}</h2>
                <div className="instructor-dtl-prfl">
                  <img
                    src={
                      courseDetails?.instructor_id?.image
                        ? `https://api.basementex.com/${courseDetails?.instructor_id?.image}`
                        : "/favicon.png"
                    }
                    alt={courseDetails?.instructor_id?.name || "Instructor"}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop in case favicon.png also fails
                      e.target.src = "/favicon.png";
                    }}
                  />
                  <div>
                    <h5 className="mb-0">
                      <Link
                        to={`/instructor-details/${courseDetails?.instructor_id?._id}`}
                      >
                        {courseDetails?.instructor_id?.name || "Instructor"}
                      </Link>
                    </h5>
                    <p className="mb-0">
                      <Link to="javascript:void(0);">
                        {t(
                          `${courseDetails?.instructor_id?.job_title ||
                          "Instructor"
                          }`
                        )}
                      </Link>
                    </p>
                    <p className="rating">
                      <span>
                        <i className="fas fa-star me-2"></i>4.2
                      </span>
                    </p>
                  </div>
                </div>
                <p className="instructor-txt">
                  <span>
                    <i className="far fa-user me-2"></i>
                    {course?.courseDetails?.student_purchase_list}{" "}
                    {t("Students")}
                  </span>
                </p>
                <p>{mockInstructor.short_bio}</p>
              </div>

              {/* Course Rating */}
              <div className="course-rating">
                <h2 className="title mt-3">{t("Course Rating")}</h2>
                <div className="course-rating-star">
                  <p className="rating">
                    <i className="fas fa-star"></i>
                    {calculateAverageRating(reviews)}
                  </p>
                  <span>
                    ({reviews.length} {t("Ratings")})
                  </span>
                </div>

                {(reviews.slice(0, 3) || []).map((review) => (
                  <div className="course-rating-innr" key={review.id}>
                    <div className="course-rating-innr-img">
                      <img
                        src={review.user?.image || "/square_logo.png"}
                        alt={review.user?.name}
                      />
                    </div>
                    <div className="course-rating-innr-contnt">
                      <h5>{review?.student_name}</h5>
                      <p className="rating">
                        {[...Array(review.rating)].map((_, i) => (
                          <i className="fas fa-star" key={i}></i>
                        ))}
                      </p>
                      <p className="review-content">{review?.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Sidebar */}
            <div className="col-lg-4 col-md-12 course-dtl-main">
              <div className="course-dtl-main-innr sticky-top">
                <div className="course-img">
                  <img
                    className="w-100"
                    src={
                      i18n?.language == "en" ||
                        courseDetails?.arabic_thumbnail == ""
                        ? courseDetails?.thumbnail
                          ? `https://api.basementex.com/${courseDetails.thumbnail}`
                          : "/favicon.png"
                        : courseDetails?.arabic_thumbnail
                          ? `https://api.basementex.com/${courseDetails.arabic_thumbnail}`
                          : "/favicon.png"
                    }
                    alt={courseDetails?.title}
                  />
                  {courseDetails?.demo_video_storage && (
                    <a
                      href={courseDetails?.demo_video_storage}
                      className="popup-video"
                    >
                      <i className="fas fa-play"></i>
                    </a>
                  )}
                </div>
                <div className="course-dtl-main-content">
                  {courseDetails?.price === 0 ? (
                    <p className="price">{t("Free")}</p>
                  ) : (
                    <p className="price">
                      {formatCurrency(courseDetails?.discount_price)}
                      <del className="ms-1">
                        {formatCurrency(courseDetails?.price)}
                      </del>
                    </p>
                  )}

                  <div className="course-dtl-main-btn">
                    {/* <button
                      className="thm-btn w-75 text-center rounded add-to-cart"
                      onClick={handleAddToCart}
                      disabled={cartLoading}
                    >
                      
                      {console.log(isPurchased, "isPurchased")}
                      {cartLoading ? (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : isPurchased ? (
                        <Link
                          to={`/student/learning/${course?.courseDetails?._id}`}
                          className="text-white w-100"
                        >
                          {t("Go to Course")}
                        </Link>
                      ) : courseInCart ? (
                        <span className="text">{t("Remove From Cart")}</span>
                      ) : (
                        <span className="text">
                          {isFree ? t("Enroll Now") : t("Add To Cart")}
                        </span>
                      )}

                    </button> */}
                    {isPurchased ? (
                      <Link
                        to={`/student/learning/${course?.courseDetails?._id}`}
                        className="thm-btn w-75 text-center rounded add-to-cart text-white d-inline-block text-decoration-none"
                      >
                        {t("Go to Course")}
                      </Link>
                    ) : (
                      <button
                        className="thm-btn w-75 text-center rounded add-to-cart"
                        onClick={handleAddToCart}
                        disabled={cartLoading}
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
                    )}

                    <button
                      className="fav-btn add-to-wish-cart"
                      onClick={handleToggleWishlist}
                      disabled={wishlistLoading}
                    >
                      {wishlistLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <i
                          className={
                            courseInWishlist
                              ? "fa-solid fa-heart"
                              : "fa-regular fa-heart"
                          }
                        ></i>
                      )}
                    </button>
                  </div>

                  {!isFree ? (
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
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses Section */}
      <section className="tp-space popular-course most-course">
        <div className="container">
          <div className="heading">
            <h3 className="title">{t("Most Popular Courses")}</h3>
            <p>
              {t(
                "Let's join our famous class, the knowledge provided will definitely be useful for you."
              )}
            </p>
          </div>
          <CourseSlider />
        </div>
      </section>

      {/* Video Modal */}
      <div
        className="modal fade"
        id="videoModal"
        tabIndex="-1"
        aria-labelledby="videoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="videoModalLabel">
                Video Preview
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="ratio ratio-16x9">
                <iframe src="" title="Video Preview" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        
        @media(max-width:767px){
            .course_description______{
            display:none !important;
          }
        }
        
        `}</style>
    </>
  );
};

export default CourseDetails;
