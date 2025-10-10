// "use client"

// import { useState } from "react"
// import { Link, useParams } from "react-router-dom"
// import "owl.carousel/dist/assets/owl.carousel.css"
// import "owl.carousel/dist/assets/owl.theme.default.css"
// import Instructor from "../assets/images/instructor-img-04.png"
// import Globe from "../assets/images/globe.svg"
// import { useTranslation } from "react-i18next"
// import CourseSlider from "../Components/Layout/Sliders/CourseSlider"

// const CourseBundleDetails = () => {
//     const id = useParams().id
//     console.log(id)

//     const { t, i18n } = useTranslation()

//     // Mock data for course bundle
//     const [bundle, setBundle] = useState({
//         bundleDetails: {
//             _id: "bundle123",
//             title: "Complete Digital Marketing Mastery Bundle",
//             description:
//                 "<p>Master the complete digital marketing landscape with this comprehensive bundle of 5 courses. From SEO fundamentals to advanced social media strategies, this bundle covers everything you need to become a digital marketing expert.</p><p>Perfect for beginners and professionals looking to upgrade their skills in the digital marketing field.</p>",
//             thumbnail: "bundle-thumbnail.jpg",
//             price: 299,
//             discount: 199,
//             type: ["Beginner", "Intermediate"],
//             duration: "40",
//             certificate: true,
//             instructor_id: "John Smith",
//             totalCourses: 5,
//             totalLessons: 85,
//             totalQuizzes: 15,
//             totalStudents: 2450,
//             rating: 4.8,
//             reviews: 324,
//         },
//         courses: [
//             {
//                 _id: "course1",
//                 title: "SEO Fundamentals & Advanced Strategies",
//                 description: "Complete guide to Search Engine Optimization",
//                 thumbnail: "seo-course.jpg",
//                 duration: "8h",
//                 lessons: 18,
//                 quizzes: 3,
//                 price: 79,
//                 chapters: [
//                     {
//                         _id: "ch1",
//                         title: "Introduction to SEO",
//                         lessonDetails: [
//                             { _id: "l1", title: "What is SEO?", duration: 15, is_free: true, file_type: "video" },
//                             { _id: "l2", title: "How Search Engines Work", duration: 20, is_free: false, file_type: "video" },
//                         ],
//                         documentDetails: [{ _id: "d1", title: "SEO Checklist", file_type: "pdf", is_free: false }],
//                         quizDetails: [{ _id: "q1", title: "SEO Basics Quiz", time: 10, total_mark: 10 }],
//                     },
//                 ],
//             },
//             {
//                 _id: "course2",
//                 title: "Social Media Marketing Mastery",
//                 description: "Master Facebook, Instagram, Twitter, and LinkedIn marketing",
//                 thumbnail: "social-media-course.jpg",
//                 duration: "10h",
//                 lessons: 22,
//                 quizzes: 4,
//                 price: 89,
//                 chapters: [
//                     {
//                         _id: "ch2",
//                         title: "Social Media Strategy",
//                         lessonDetails: [
//                             { _id: "l3", title: "Creating a Social Media Strategy", duration: 25, is_free: true, file_type: "video" },
//                             { _id: "l4", title: "Content Planning", duration: 18, is_free: false, file_type: "video" },
//                         ],
//                         documentDetails: [{ _id: "d2", title: "Social Media Templates", file_type: "pdf", is_free: false }],
//                         quizDetails: [{ _id: "q2", title: "Social Media Strategy Quiz", time: 15, total_mark: 15 }],
//                     },
//                 ],
//             },
//             {
//                 _id: "course3",
//                 title: "Google Ads & PPC Campaigns",
//                 description: "Master paid advertising with Google Ads and PPC strategies",
//                 thumbnail: "google-ads-course.jpg",
//                 duration: "7h",
//                 lessons: 16,
//                 quizzes: 2,
//                 price: 69,
//                 chapters: [
//                     {
//                         _id: "ch3",
//                         title: "Google Ads Fundamentals",
//                         lessonDetails: [
//                             { _id: "l5", title: "Setting up Google Ads Account", duration: 12, is_free: true, file_type: "video" },
//                             { _id: "l6", title: "Keyword Research for Ads", duration: 22, is_free: false, file_type: "video" },
//                         ],
//                     },
//                 ],
//             },
//             {
//                 _id: "course4",
//                 title: "Email Marketing & Automation",
//                 description: "Build effective email campaigns and automation workflows",
//                 thumbnail: "email-marketing-course.jpg",
//                 duration: "6h",
//                 lessons: 14,
//                 quizzes: 3,
//                 price: 59,
//                 chapters: [
//                     {
//                         _id: "ch4",
//                         title: "Email Marketing Basics",
//                         lessonDetails: [
//                             { _id: "l7", title: "Email Marketing Introduction", duration: 18, is_free: true, file_type: "video" },
//                         ],
//                     },
//                 ],
//             },
//             {
//                 _id: "course5",
//                 title: "Content Marketing & Copywriting",
//                 description: "Create compelling content that converts and engages",
//                 thumbnail: "content-marketing-course.jpg",
//                 duration: "9h",
//                 lessons: 15,
//                 quizzes: 3,
//                 price: 75,
//                 chapters: [
//                     {
//                         _id: "ch5",
//                         title: "Content Strategy",
//                         lessonDetails: [
//                             { _id: "l8", title: "Content Marketing Fundamentals", duration: 20, is_free: true, file_type: "video" },
//                         ],
//                     },
//                 ],
//             },
//         ],
//     })

//     const [loading, setLoading] = useState(false)
//     const [inWishlist, setInWishlist] = useState(false)
//     const [promoCode, setPromoCode] = useState("")

//     // Helper functions
//     const truncate = (text, length) => {
//         if (!text) return ""
//         return text.length > length ? text.substring(0, length) + "..." : text
//     }

//     const formatCurrency = (amount) => {
//         if (!amount) return "$0.00"
//         return `$${Number(amount).toFixed(2)}`
//     }

//     const calculateTotalValue = () => {
//         return bundle.courses.reduce((total, course) => total + course.price, 0)
//     }

//     const calculateSavings = () => {
//         const totalValue = calculateTotalValue()
//         const bundlePrice = bundle.bundleDetails.discount || bundle.bundleDetails.price
//         return totalValue - bundlePrice
//     }

//     // Event handlers
//     const handleAddToCart = () => {
//         console.log("Adding bundle to cart:", bundle?.bundleDetails?._id)
//     }

//     const handleToggleWishlist = () => {
//         setInWishlist(!inWishlist)
//         console.log(inWishlist ? "Removing from wishlist:" : "Adding to wishlist:", bundle?.bundleDetails?._id)
//     }

//     const handleApplyPromoCode = () => {
//         console.log("Applying promo code:", promoCode)
//     }

//     // Mock instructor and other data
//     const mockInstructor = {
//         name: bundle.bundleDetails.instructor_id || "John Smith",
//         image: Instructor,
//         job_title: "Digital Marketing Expert",
//         short_bio: "Expert digital marketer with 10+ years of experience helping businesses grow online.",
//     }

//     const mockReviews = [
//         {
//             id: 1,
//             user: { name: "Sarah Johnson", image: "/placeholder.svg" },
//             rating: 5,
//             comment: "Excellent bundle! Learned so much about digital marketing. Highly recommended!",
//         },
//         {
//             id: 2,
//             user: { name: "Mike Chen", image: "/placeholder.svg" },
//             rating: 5,
//             comment: "Great value for money. All courses are well-structured and easy to follow.",
//         },
//     ]

//     const mockLanguages = [{ language: { name: "English" } }]
//     const isRTL = i18n.language === "ar"

//     return (
//         <>
//             {/* Bundle Banner Section */}
//             <section className="course-dtl-bannr">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-7 col-md-12">
//                             <div className="coursebnnr-lft">
//                                 <h6>{t("Bundle Deal")}</h6>
//                                 <h3>{bundle.bundleDetails.title}</h3>
//                                 <p className="rating text-white">
//                                     <i className="fas fa-star"></i>
//                                     {bundle.bundleDetails.rating} {t("Rating")}
//                                     <span className="text-white">
//                                         ({bundle.bundleDetails.reviews} {t("Reviews")})
//                                     </span>
//                                 </p>
//                                 <p className="text-white">{truncate(bundle.bundleDetails.description?.replace(/<[^>]*>/g, ""), 200)}</p>
//                                 <div className="coursebnnr-langu">
//                                     <div className="coursebnnr-langu-lft">
//                                         <span>
//                                             <p>{t("Instructor")}</p>
//                                             <h5>{bundle.bundleDetails.instructor_id}</h5>
//                                         </span>
//                                     </div>
//                                     <div className="coursebnnr-langu-lft">
//                                         <span>
//                                             <img src={Globe || "/placeholder.svg"} alt="Language" />
//                                         </span>
//                                         <span>
//                                             <p>{t("language")}</p>
//                                             {(mockLanguages || []).map((lang, index) => (
//                                                 <h5 key={index}>{t(`${lang.language.name}`)}</h5>
//                                             ))}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Bundle Detail Section */}
//             <section className="tp-space course-dtl-bannr-sec">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-8 col-md-12">
//                             <h6 className="fw-400">{t("Share this bundle")}:</h6>
//                             <ul className="course-media">
//                                 <li>
//                                     <Link to="" target="_blank" rel="noopener noreferrer">
//                                         <img src="../assets/images/facebook.svg" alt="Facebook" />
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link to="" target="_blank" rel="noopener noreferrer">
//                                         <img src="/images/linkden.svg" alt="LinkedIn" />
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link to="" target="_blank" rel="noopener noreferrer">
//                                         <img src="/images/pintrest.svg" alt="Pinterest" />
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link to="" target="_blank" rel="noopener noreferrer">
//                                         <img src="/images/telegram.svg" alt="Telegram" />
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link to="" target="_blank" rel="noopener noreferrer">
//                                         <img src="/images/twitter.svg" alt="Twitter" />
//                                     </Link>
//                                 </li>
//                             </ul>

//                             {/* Bundle Description */}
//                             <div className="course-desc-bx" dangerouslySetInnerHTML={{ __html: bundle.bundleDetails?.description }} />

//                             {/* Bundle Value Proposition */}
//                             <div className="bundle-value-section mb-4 p-4 bg-light rounded">
//                                 <h4 className="mb-3">{t("What You Get in This Bundle")}</h4>
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <ul className="list-unstyled">
//                                             <li className="mb-2">
//                                                 <i className="fas fa-check text-success me-2"></i>
//                                                 {bundle.bundleDetails.totalCourses} {t("Complete Courses")}
//                                             </li>
//                                             <li className="mb-2">
//                                                 <i className="fas fa-check text-success me-2"></i>
//                                                 {bundle.bundleDetails.totalLessons} {t("Video Lessons")}
//                                             </li>
//                                             <li className="mb-2">
//                                                 <i className="fas fa-check text-success me-2"></i>
//                                                 {bundle.bundleDetails.totalQuizzes} {t("Practice Quizzes")}
//                                             </li>
//                                         </ul>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <ul className="list-unstyled">
//                                             <li className="mb-2">
//                                                 <i className="fas fa-check text-success me-2"></i>
//                                                 {t("Lifetime Access")}
//                                             </li>
//                                             <li className="mb-2">
//                                                 <i className="fas fa-check text-success me-2"></i>
//                                                 {t("Certificate of Completion")}
//                                             </li>
//                                             <li className="mb-2">
//                                                 <i className="fas fa-check text-success me-2"></i>
//                                                 {t("30-Day Money Back Guarantee")}
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 <div className="savings-highlight mt-3 p-3 bg-success text-white rounded">
//                                     <h5 className="mb-0">
//                                         {t("Save")} {formatCurrency(calculateSavings())} {t("when you buy this bundle!")}
//                                     </h5>
//                                     <small>
//                                         {t("Individual course value")}: {formatCurrency(calculateTotalValue())} |{t("Bundle price")}:{" "}
//                                         {formatCurrency(bundle.bundleDetails.discount || bundle.bundleDetails.price)}
//                                     </small>
//                                 </div>
//                             </div>

//                             {/* Courses in Bundle */}
//                             <div className="course-lesson">
//                                 <h2 className="title mb-3">{t("Courses Included in This Bundle")}</h2>
//                                 <div className="accordion" id="bundleCourses">
//                                     {(bundle.courses || []).map((course, index) => (
//                                         <div className="accordion-item mb-3" key={course._id}>
//                                             <h2 className="accordion-header">
//                                                 <button
//                                                     className="accordion-button"
//                                                     type="button"
//                                                     data-bs-toggle="collapse"
//                                                     data-bs-target={`#course-${index}`}
//                                                 >
//                                                     <div className="d-flex align-items-center w-100">
//                                                         <div className="course-info me-3">
//                                                             <img
//                                                                 src={`/placeholder.svg?height=60&width=80&text=${course.title.split(" ")[0]}`}
//                                                                 alt={course.title}
//                                                                 className="rounded"
//                                                                 style={{ width: "80px", height: "60px", objectFit: "cover" }}
//                                                             />
//                                                         </div>
//                                                         <div className="flex-grow-1">
//                                                             <h5 className="mb-1">{course.title}</h5>
//                                                             <p className="mb-1 text-muted">{course.description}</p>
//                                                             <small className="text-muted">
//                                                                 {course.lessons} {t("lessons")} • {course.duration} •
//                                                                 <span className="text-decoration-line-through ms-2">
//                                                                     {formatCurrency(course.price)}
//                                                                 </span>
//                                                             </small>
//                                                         </div>
//                                                     </div>
//                                                 </button>
//                                             </h2>
//                                             <div
//                                                 id={`course-${index}`}
//                                                 className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
//                                                 data-bs-parent="#bundleCourses"
//                                             >
//                                                 <div className="accordion-body">
//                                                     {/* Course Chapters */}
//                                                     {(course.chapters || []).map((chapter, chapterIndex) => (
//                                                         <div key={chapter._id} className="mb-3">
//                                                             <h6 className="fw-bold">{chapter.title}</h6>

//                                                             {/* Lessons */}
//                                                             {(chapter.lessonDetails || []).map((lesson) => (
//                                                                 <a href="javascript:;" className="lission-list d-block mb-2" key={lesson._id}>
//                                                                     <h6 className="mb-0">
//                                                                         <i className="fas fa-video me-2"></i>
//                                                                         {lesson.title}
//                                                                     </h6>
//                                                                     <span className="item-meta duration">
//                                                                         <i className="fal fa-clock me-2"></i>
//                                                                         {lesson.duration} min
//                                                                         {!lesson.is_free && <img src="/img/icons/lock.svg" alt="icon" className="ms-2" />}
//                                                                     </span>
//                                                                 </a>
//                                                             ))}

//                                                             {/* Documents */}
//                                                             {(chapter.documentDetails || []).map((doc) => (
//                                                                 <a href="javascript:;" className="lission-list d-block mb-2" key={doc._id}>
//                                                                     <h6 className="mb-0">
//                                                                         <i className="fas fa-file me-2"></i>
//                                                                         {doc.title}
//                                                                     </h6>
//                                                                     <span className="item-meta duration">
//                                                                         {doc.file_type}
//                                                                         {!doc.is_free && <img src="/img/icons/lock.svg" alt="icon" className="ms-2" />}
//                                                                     </span>
//                                                                 </a>
//                                                             ))}

//                                                             {/* Quizzes */}
//                                                             {(chapter.quizDetails || []).map((quiz) => (
//                                                                 <a href="javascript:;" className="lission-list d-block mb-2" key={quiz._id}>
//                                                                     <h6 className="mb-0">
//                                                                         <i className="fas fa-question-circle me-2"></i>
//                                                                         {quiz.title}
//                                                                     </h6>
//                                                                     <span className="item-meta duration">
//                                                                         {quiz.time} min • {quiz.total_mark} {t("points")}
//                                                                     </span>
//                                                                 </a>
//                                                             ))}
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Instructor Details */}
//                             <div className="instructor-dtl">
//                                 <h2 className="title mb-3">{t("Instructor")}</h2>
//                                 <div className="instructor-dtl-prfl">
//                                     <img src={mockInstructor.image || "/placeholder.svg"} alt={mockInstructor.name} />
//                                     <div>
//                                         <h5 className="mb-0">
//                                             <a href="javascript:void(0);">{mockInstructor.name}</a>
//                                         </h5>
//                                         <p className="mb-0">
//                                             <a href="javascript:void(0);">{t(`${mockInstructor.job_title}`)}</a>
//                                         </p>
//                                         <p className="rating">
//                                             <span>
//                                                 <i className="fas fa-star me-2"></i>
//                                                 {bundle.bundleDetails.rating}
//                                             </span>
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <p className="instructor-txt">
//                                     <span>
//                                         <i className="far fa-user me-2"></i>
//                                         {bundle.bundleDetails.totalStudents} {t("Students")}
//                                     </span>
//                                 </p>
//                                 <p>{mockInstructor.short_bio}</p>
//                             </div>

//                             {/* Bundle Reviews */}
//                             <div className="course-rating">
//                                 <h2 className="title mt-3">{t("Bundle Reviews")}</h2>
//                                 <div className="course-rating-star">
//                                     <p className="rating">
//                                         <i className="fas fa-star"></i>
//                                         {bundle.bundleDetails.rating}
//                                     </p>
//                                     <span>
//                                         ({bundle.bundleDetails.reviews} {t("Reviews")})
//                                     </span>
//                                 </div>

//                                 {(mockReviews || []).map((review) => (
//                                     <div className="course-rating-innr" key={review.id}>
//                                         <div className="course-rating-innr-img">
//                                             <img src={review.user?.image || "/placeholder.svg"} alt={review.user?.name} />
//                                         </div>
//                                         <div className="course-rating-innr-contnt">
//                                             <h5>{review.user?.name}</h5>
//                                             <p className="rating">
//                                                 {[...Array(review.rating)].map((_, i) => (
//                                                     <i className="fas fa-star" key={i}></i>
//                                                 ))}
//                                             </p>
//                                             <p>{review.comment}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Bundle Sidebar */}
//                         <div className="col-lg-4 col-md-12 course-dtl-main">
//                             <div className="course-dtl-main-innr sticky-top">
//                                 <div className="course-img">
//                                     <img
//                                         className="w-100"
//                                         src={`/placeholder.svg?height=250&width=400&text=Bundle`}
//                                         alt={bundle.bundleDetails?.title}
//                                     />
//                                 </div>
//                                 <div className="course-dtl-main-content">
//                                     {bundle.bundleDetails?.discount ? (
//                                         <p className="price">
//                                             {formatCurrency(bundle.bundleDetails?.discount)}
//                                             <del>{formatCurrency(bundle.bundleDetails?.price)}</del>
//                                             <span className="badge bg-success ms-2">
//                                                 {Math.round(
//                                                     ((bundle.bundleDetails.price - bundle.bundleDetails.discount) / bundle.bundleDetails.price) *
//                                                     100,
//                                                 )}
//                                                 % {t("OFF")}
//                                             </span>
//                                         </p>
//                                     ) : (
//                                         <p className="price">{formatCurrency(bundle.bundleDetails?.price)}</p>
//                                     )}

//                                     <div className="course-dtl-main-btn">
//                                         <a
//                                             href="javascript:;"
//                                             className="thm-btn w-75 text-center rounded add-to-cart"
//                                             onClick={handleAddToCart}
//                                         >
//                                             <span className="text">{t("Add Bundle To Cart")}</span>
//                                         </a>
//                                         <a href="javascript:void();" className="fav-btn add-to-wish-cart" onClick={handleToggleWishlist}>
//                                             <i className={inWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
//                                         </a>
//                                     </div>

//                                     <div className="course-dtl-cupon">
//                                         <h2>{t("Apply Promocode")}</h2>
//                                         <div className="course-cpn-bx">
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 placeholder={t("Have a Promocode?")}
//                                                 value={promoCode}
//                                                 onChange={(e) => setPromoCode(e.target.value)}
//                                             />
//                                             <a href="javascript:void(0);" onClick={handleApplyPromoCode}>
//                                                 {t("Apply")}
//                                             </a>
//                                         </div>
//                                     </div>

//                                     {/* Bundle Info Section - Responsive and RTL Friendly */}
//                                     <div className="bg-blue-600 text-white p-4 md:p-6 mt-4 course-infos rounded">
//                                         <h5 className="mb-4 text-white font-semibold">{t("This bundle includes")}</h5>

//                                         <div className="row g-3">
//                                             {/* Courses */}
//                                             <div className="col-12 col-md-6 col-lg-12">
//                                                 <div className={`d-flex align-items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
//                                                     <svg
//                                                         width="20"
//                                                         height="20"
//                                                         viewBox="0 0 20 20"
//                                                         fill="none"
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                     >
//                                                         <path
//                                                             d="M19.1667 17.9167H14.1667V1.66675H19.1667V17.9167ZM15.4167 16.6667H17.9167V2.91675H15.4167V16.6667ZM12.9167 17.9167H7.91666V6.66675H12.9167V17.9167ZM9.16666 16.6667H11.6667V7.91675H9.16666V16.6667ZM6.66666 17.9167H1.66666V10.4167H6.66666V17.9167ZM2.91666 16.6667H5.41666V11.6667H2.91666V16.6667Z"
//                                                             fill="currentColor"
//                                                         />
//                                                     </svg>
//                                                     <div className={`${isRTL ? "text-end" : ""}`}>
//                                                         <span className="opacity-80">{t("Courses")} : </span>
//                                                         <span className="font-medium">{bundle.bundleDetails.totalCourses}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Duration */}
//                                             <div className="col-12 col-md-6 col-lg-12">
//                                                 <div className={`d-flex align-items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
//                                                     <svg
//                                                         width="20"
//                                                         height="20"
//                                                         viewBox="0 0 20 20"
//                                                         fill="none"
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                     >
//                                                         <g clipPath="url(#clip0_0_2442)">
//                                                             <path
//                                                                 d="M10.0147 4.4056C9.64036 4.4056 9.39077 4.65561 9.39077 5.03063V10.0308C9.39077 10.4059 9.64036 10.6559 10.0147 10.6559H15.0065C15.3809 10.6559 15.6305 10.4059 15.6305 10.0308C15.6305 9.65582 15.3809 9.40581 15.0065 9.40581H10.6387V5.03063C10.6387 4.65561 10.3891 4.4056 10.0147 4.4056Z"
//                                                                 fill="currentcolor"
//                                                             />
//                                                         </g>
//                                                     </svg>
//                                                     <div className={`${isRTL ? "text-end" : ""}`}>
//                                                         <span className="opacity-80">{t("Duration")} : </span>
//                                                         <span className="font-medium">
//                                                             {bundle.bundleDetails.duration}
//                                                             {isRTL ? "س" : "h"}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Lessons */}
//                                             <div className="col-12 col-md-6 col-lg-12">
//                                                 <div className={`d-flex align-items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
//                                                     <svg
//                                                         width="20"
//                                                         height="20"
//                                                         viewBox="0 0 20 20"
//                                                         fill="none"
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                     >
//                                                         <path
//                                                             d="M15.701 9.00506H15.2923V5.25384C15.2923 4.97633 15.1859 4.71018 14.9966 4.51395C14.8074 4.31772 14.5506 4.20748 14.2829 4.20748H11.255C11.2231 3.57767 10.9787 2.97952 10.5645 2.51761C10.1503 2.05569 9.59271 1.75939 8.98915 1.6805C8.64393 1.64366 8.29509 1.68103 7.96444 1.7903C7.63378 1.89957 7.32843 2.07837 7.06745 2.31554C6.80648 2.5527 6.59551 2.84313 6.44771 3.16866C6.29992 3.4942 6.2185 3.84784 6.20852 4.20748H2.67596C2.40828 4.20748 2.15156 4.31772 1.96227 4.51395C1.77299 4.71018 1.66666 4.97633 1.66666 5.25384V9.52825H3.08473C3.47304 9.51655 3.85189 9.65362 4.14886 9.91324C4.44584 10.1729 4.64012 10.5368 4.69457 10.9356C4.71421 11.1544 4.68933 11.375 4.62152 11.5832C4.55371 11.7914 4.4445 11.9825 4.30094 12.1442C4.15985 12.3077 3.98724 12.4388 3.79427 12.5289C3.6013 12.619 3.39225 12.6662 3.18061 12.6673H1.66666V17.287C1.66666 17.5646 1.77299 17.8307 1.96227 18.0269C2.15156 18.2232 2.40828 18.3334 2.67596 18.3334H14.2829C14.5506 18.3334 14.8074 18.2232 14.9966 18.0269C15.1859 17.8307 15.2923 17.5646 15.2923 17.287V14.2369H15.7969C16.1511 14.2388 16.5017 14.1634 16.8259 14.0156C17.1501 13.8678 17.4407 13.6508 17.6787 13.3789C17.9167 13.107 18.0968 12.7862 18.2073 12.4373C18.3178 12.0885 18.3563 11.7194 18.3202 11.3542C18.2384 10.6973 17.9261 10.0947 17.443 9.66143C16.9599 9.22813 16.3398 8.99447 15.701 9.00506Z"
//                                                             fill="currentcolor"
//                                                         />
//                                                     </svg>
//                                                     <div className={`${isRTL ? "text-end" : ""}`}>
//                                                         <span className="opacity-80">{t("Lessons")} : </span>
//                                                         <span className="font-medium">{bundle.bundleDetails.totalLessons}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Quizzes */}
//                                             <div className="col-12 col-md-6 col-lg-12">
//                                                 <div className={`d-flex align-items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
//                                                     <svg
//                                                         width="20"
//                                                         height="20"
//                                                         viewBox="0 0 20 20"
//                                                         fill="none"
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                     >
//                                                         <path
//                                                             d="M15.701 9.00506H15.2923V5.25384C15.2923 4.97633 15.1859 4.71018 14.9966 4.51395C14.8074 4.31772 14.5506 4.20748 14.2829 4.20748H11.255C11.2231 3.57767 10.9787 2.97952 10.5645 2.51761C10.1503 2.05569 9.59271 1.75939 8.98915 1.6805C8.64393 1.64366 8.29509 1.68103 7.96444 1.7903C7.63378 1.89957 7.32843 2.07837 7.06745 2.31554C6.80648 2.5527 6.59551 2.84313 6.44771 3.16866C6.29992 3.4942 6.2185 3.84784 6.20852 4.20748H2.67596C2.40828 4.20748 2.15156 4.31772 1.96227 4.51395C1.77299 4.71018 1.66666 4.97633 1.66666 5.25384V9.52825H3.08473C3.47304 9.51655 3.85189 9.65362 4.14886 9.91324C4.44584 10.1729 4.64012 10.5368 4.69457 10.9356C4.71421 11.1544 4.68933 11.375 4.62152 11.5832C4.55371 11.7914 4.4445 11.9825 4.30094 12.1442C4.15985 12.3077 3.98724 12.4388 3.79427 12.5289C3.6013 12.619 3.39225 12.6662 3.18061 12.6673H1.66666V17.287C1.66666 17.5646 1.77299 17.8307 1.96227 18.0269C2.15156 18.2232 2.40828 18.3334 2.67596 18.3334H14.2829C14.5506 18.3334 14.8074 18.2232 14.9966 18.0269C15.1859 17.8307 15.2923 17.5646 15.2923 17.287V14.2369H15.7969C16.1511 14.2388 16.5017 14.1634 16.8259 14.0156C17.1501 13.8678 17.4407 13.6508 17.6787 13.3789C17.9167 13.107 18.0968 12.7862 18.2073 12.4373C18.3178 12.0885 18.3563 11.7194 18.3202 11.3542C18.2384 10.6973 17.9261 10.0947 17.443 9.66143C16.9599 9.22813 16.3398 8.99447 15.701 9.00506Z"
//                                                             fill="currentcolor"
//                                                         />
//                                                     </svg>
//                                                     <div className={`${isRTL ? "text-end" : ""}`}>
//                                                         <span className="opacity-80">{t("Quizzes")} : </span>
//                                                         <span className="font-medium">{bundle.bundleDetails.totalQuizzes}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Certifications */}
//                                             <div className="col-12 col-md-6 col-lg-12">
//                                                 <div className={`d-flex align-items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
//                                                     <svg
//                                                         width="20"
//                                                         height="20"
//                                                         viewBox="0 0 20 20"
//                                                         fill="none"
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                     >
//                                                         <path
//                                                             d="M19.1667 9.37479C19.1674 8.65706 18.9831 7.95019 18.63 7.3165C18.2769 6.68281 17.7659 6.14177 17.1421 5.74108C16.5182 5.3404 15.8007 5.09237 15.0527 5.01887C14.3047 4.94538 13.5493 5.04867 12.853 5.31964C12.1567 5.59061 11.5409 6.02094 11.06 6.57268C10.5791 7.12442 10.2478 7.78063 10.0953 8.48344C9.94276 9.18626 9.97376 9.9141 10.1855 10.6028C10.3973 11.2915 10.7833 11.9198 11.3095 12.4325V16.8746C11.3095 16.9812 11.3379 17.086 11.3923 17.1791C11.4466 17.2722 11.525 17.3505 11.62 17.4066C11.7149 17.4626 11.8234 17.4946 11.9349 17.4994C12.0465 17.5042 12.1574 17.4816 12.2573 17.4339L14.5833 16.323L16.9094 17.4339C17.0092 17.4816 17.1202 17.5042 17.2318 17.4994C17.3433 17.4946 17.4518 17.4626 17.5467 17.4066C17.6417 17.3505 17.7201 17.2722 17.7744 17.1791C17.8288 17.086 17.8572 16.9812 17.8572 16.8746V12.4325C18.6969 11.6167 19.1672 10.5185 19.1667 9.37479Z"
//                                                             fill="currentcolor"
//                                                         />
//                                                     </svg>
//                                                     <div className={`${isRTL ? "text-end" : ""}`}>
//                                                         <span className="opacity-80">{t("Certifications")} : </span>
//                                                         <span className="font-medium">
//                                                             {bundle.bundleDetails.certificate === true ? t("Yes") : t("No")}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Related Bundles Section */}
//             <section className="tp-space popular-course most-course">
//                 <div className="container">
//                     <div className="heading">
//                         <h3 className="title">{t("More Course Bundles")}</h3>
//                         <p>{t("Discover more comprehensive learning bundles to advance your skills.")}</p>
//                     </div>
//                     <CourseSlider />
//                 </div>
//             </section>
//         </>
//     )
// }

// export default CourseBundleDetails

"use client";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Instructor from "../assets/images/instructor-img-04.png";
import Globe from "../assets/images/globe.svg";
import { useTranslation } from "react-i18next";
import CourseSlider from "../Components/Layout/Sliders/CourseSlider";
import faceBook from "../assets/images/facebook2.svg";
import LinkedIn from "../assets/images/linkden.svg";
import Pinterest from "../assets/images/pintrest.svg";
import teleGram from "../assets/images/telegram.svg";
import twitter from "../assets/images/twitter.svg";
import BundleSlider from "../Components/Layout/Sliders/BundleSlider";
import { baseUrl } from "../../config/baseUrl";
const shareUrl = "https://teachera.co/courses/graphic-design-bundle";
const description = "Check out this amazing Photoshop & AI course bundle!";

const CourseBundleDetails = () => {
  const id = useParams().id;

  const { t, i18n } = useTranslation();

  // Mock data for course bundle
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  // Fetch bundle data from API
  useEffect(() => {
    const fetchBundleData = async (id) => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://api.basementex.com/api/v1/web/bundle/bundle-view/${id}`
        );
        const result = await response.json();

        if (result.status && result.data) {
          // Transform API data to match component structure
          const transformedData = {
            bundleDetails: {
              _id: result.data._id,
              title: result.data.title,
              description: result.data.description,
              about_bundle: result.data.about_bundle,
              thumbnail: result.data.thumbnail,
              price: Number.parseFloat(result.data.price),
              discount: result.data.discount_price
                ? Number.parseFloat(result.data.discount_price)
                : null,
              validity: result.data.validity,
              status: result.data.status,
              totalCourses: result.data.courses?.length || 0,
              totalLessons:
                result.data.courses?.reduce((total, course) => {
                  // Calculate lessons from course structure if available
                  return total + (course.lessons || 0);
                }, 0) || 0,
              totalQuizzes:
                result.data.courses?.reduce((total, course) => {
                  // Calculate quizzes from course structure if available
                  return total + (course.quizzes || 0);
                }, 0) || 0,
              totalStudents: 0, // Not available in API
              rating: 4.5, // Default rating
              reviews: 0, // Not available in API
              certificate:
                result.data.courses?.some((course) => course.certificate) ||
                false,
              instructor_id:
                result.data.courses?.[0]?.instructor_id || "Unknown",
            },
            courses:
              result.data.courses?.map((course) => ({
                _id: course._id,
                title: course.title,
                description:
                  course.description?.replace(/<[^>]*>/g, "") ||
                  course.seo_description,
                thumbnail: course.thumbnail,
                price: course.price,
                discount_price: course.discount_price,
                certificate: course.certificate,
                instructor_id: course.instructor_id,
                type: course.type || [],
                status: course.status,
                is_approved: course.is_approved,
                duration: course.duration,
                chapters: [], // Will need separate API call for course content
              })) || [],
          };

          setBundle(transformedData);
        } else {
          setError("Failed to fetch bundle data");
        }
      } catch (err) {
        console.error("Error fetching bundle:", err);
        setError("Error loading bundle data");
      } finally {
        setLoading(false);
      }
    };

    fetchBundleData(id);
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
          <h4>Error Loading Bundle</h4>
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

  if (!bundle) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          <h4>Bundle Not Found</h4>
          <p>The requested bundle could not be found.</p>
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
  const handleAddToCart = () => {
    console.log("Adding bundle to cart:", bundle?.bundleDetails?._id);
  };

  const handleToggleWishlist = () => {
    setInWishlist(!inWishlist);
    console.log(
      inWishlist ? "Removing from wishlist:" : "Adding to wishlist:",
      bundle?.bundleDetails?._id
    );
  };

  const handleApplyPromoCode = () => {
    console.log("Applying promo code:", promoCode);
  };

  // Mock instructor and other data
  const mockInstructor = {
    name: bundle.bundleDetails.instructor_id || "John Smith",
    image: Instructor,
    job_title: "Digital Marketing Expert",
    short_bio:
      "Expert digital marketer with 10+ years of experience helping businesses grow online.",
  };

  const mockReviews = [
    {
      id: 1,
      user: { name: "Sarah Johnson", image: "/placeholder.svg" },
      rating: 5,
      comment:
        "Excellent bundle! Learned so much about digital marketing. Highly recommended!",
    },
    {
      id: 2,
      user: { name: "Mike Chen", image: "/placeholder.svg" },
      rating: 5,
      comment:
        "Great value for money. All courses are well-structured and easy to follow.",
    },
  ];

  const mockLanguages = [{ language: { name: "English" } }];
  const isRTL = i18n.language === "ar";

  return (
    <>
      {/* Bundle Banner Section */}
      <section className="course-dtl-bannr">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12">
              <div className="coursebnnr-lft">
                <h6>{t("Bundle Deal")}</h6>
                <h3>{bundle.bundleDetails.title}</h3>
                <p className="rating text-white">
                  <i className="fas fa-star"></i>
                  {bundle.bundleDetails.rating} {t("Rating")}
                  <span className="text-white">
                    ({bundle.bundleDetails.reviews} {t("Reviews")})
                  </span>
                </p>
                <p className="text-white">
                  {truncate(
                    bundle.bundleDetails.description?.replace(/<[^>]*>/g, ""),
                    200
                  )}
                </p>
                {/* <div className="coursebnnr-langu">
                                    <div className="coursebnnr-langu-lft">
                                        <span>
                                            <p>{t("Instructor")}</p>
                                            <h5>{bundle.bundleDetails.instructor_id}</h5>
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
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Detail Section */}
      <section className="tp-space course-dtl-bannr-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <h6 className="fw-400">{t("Share this bundle")}:</h6>
              {/* <ul className="course-media">
                                <li>
                                    <Link to="" target="_blank" rel="noopener noreferrer">
                                        <img src={faceBook} alt="Facebook" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="" target="_blank" rel="noopener noreferrer">
                                        <img src={LinkedIn} alt="LinkedIn" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="" target="_blank" rel="noopener noreferrer">
                                        <img src={Pinterest} alt="Pinterest" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="" target="_blank" rel="noopener noreferrer">
                                        <img src={teleGram} alt="Telegram" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="" target="_blank" rel="noopener noreferrer">
                                        <img src={twitter} alt="Twitter" />
                                    </Link>
                                </li>
                            </ul> */}
              <ul className="course-media">
                <li>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={faceBook} alt="Facebook" />
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
                    <img src={LinkedIn} alt="LinkedIn" />
                  </a>
                </li>
                <li>
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                      shareUrl
                    )}&media=${encodeURIComponent(
                      `${baseUrl}/${bundle.image}`
                    )}&description=${encodeURIComponent(description)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Pinterest} alt="Pinterest" />
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
                    <img src={teleGram} alt="Telegram" />
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
                    <img src={twitter} alt="Twitter" />
                  </a>
                </li>
              </ul>

              {/* Bundle Description */}
              <div className="course-desc-bx">
                <div
                  dangerouslySetInnerHTML={{
                    __html: bundle.bundleDetails?.description,
                  }}
                />
                {bundle.bundleDetails?.about_bundle && (
                  <div className="mt-3">
                    <h4>{t("About This Bundle")}</h4>
                    <p>{bundle.bundleDetails.about_bundle}</p>
                  </div>
                )}
              </div>

              {/* Bundle Value Proposition */}
              <div className="bundle-value-section mb-4 p-4 bg-light rounded">
                <h4 className="mb-3">{t("What You Get in This Bundle")}</h4>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        {bundle.bundleDetails.totalCourses}{" "}
                        {t("Complete Courses")}
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        {bundle.bundleDetails.totalLessons} {t("Video Lessons")}
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        {bundle.bundleDetails.totalQuizzes}{" "}
                        {t("Practice Quizzes")}
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

              {/* Courses in Bundle */}
              <div className="course-lesson">
                <h2 className="title mb-4">
                  {t("Courses Included in This Bundle")}
                </h2>
                <div className="bundle-courses-grid">
                  {(bundle.courses || []).map((course) => (
                    <div className="bundle-course-card" key={course._id}>
                      <div className="course-card-header">
                        <div className="course-thumbnail">
                          <img
                            src={
                              course.thumbnail
                                ? `https://api.basementex.com/${course.thumbnail}`
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
                          <Link to={`/course-details/${course?._id}`}>
                            <h4 className="course-title">{course?.title}</h4>
                          </Link>
                          <p className="course-description">
                            {course?.description}
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
                                <i className="fas fa-play-circle"></i>
                                {course?.chapters?.length || 0} {t("Chapters")}
                              </span>
                              <span className="stat-item">
                                <i className="fas fa-clock"></i>
                                {`${Math.floor(course.duration / 60)}h ${
                                  course.duration % 60
                                }m`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="course-content-preview">
                                                <button
                                                    className="content-toggle-btn"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#course-content-${index}`}
                                                    aria-expanded={index === 0}
                                                >
                                                    <span>{t("View Course Content")}</span>
                                                    <i className="fas fa-chevron-down"></i>
                                                </button>

                                                <div
                                                    id={`course-content-${index}`}
                                                    className={`collapse ${index === 0 ? "show" : ""}`}
                                                >
                                                    <div className="course-curriculum">
                                                        {(course.chapters || []).length > 0 ? (
                                                            (course.chapters || []).map((chapter) => (
                                                                <div key={chapter._id} className="curriculum-chapter">
                                                                    <div className="chapter-header">
                                                                        <h6 className="chapter-title">
                                                                            <i className="fas fa-folder-open me-2"></i>
                                                                            {chapter.title}
                                                                        </h6>
                                                                        <span className="chapter-count">
                                                                            {(chapter.lessonDetails?.length || 0) +
                                                                                (chapter.documentDetails?.length || 0) +
                                                                                (chapter.quizDetails?.length || 0)}{" "}
                                                                            {t("items")}
                                                                        </span>
                                                                    </div>

                                                                    <div className="chapter-content">
                                                                    
                                                                        {(chapter.lessonDetails || []).map((lesson) => (
                                                                            <div
                                                                                className="curriculum-item lesson-item"
                                                                                key={lesson._id}
                                                                            >
                                                                                <div className="item-icon">
                                                                                    <i className="fas fa-play"></i>
                                                                                </div>
                                                                                <div className="item-content">
                                                                                    <h6 className="item-title">{lesson.title}</h6>
                                                                                    <div className="item-meta">
                                                                                        <span className="duration">
                                                                                            <i className="far fa-clock"></i>
                                                                                            {lesson.duration} min
                                                                                        </span>
                                                                                        {lesson.is_free && (
                                                                                            <span className="free-badge">
                                                                                                {t("Free")}
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                                {!lesson.is_free && (
                                                                                    <div className="item-lock">
                                                                                        <i className="fas fa-lock"></i>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        ))}

                                                                    
                                                                        {(chapter.documentDetails || []).map((doc) => (
                                                                            <div
                                                                                className="curriculum-item document-item"
                                                                                key={doc._id}
                                                                            >
                                                                                <div className="item-icon">
                                                                                    <i className="fas fa-file-alt"></i>
                                                                                </div>
                                                                                <div className="item-content">
                                                                                    <h6 className="item-title">{doc.title}</h6>
                                                                                    <div className="item-meta">
                                                                                        <span className="file-type">
                                                                                            {doc.file_type?.toUpperCase()}
                                                                                        </span>
                                                                                        {doc.is_free && (
                                                                                            <span className="free-badge">
                                                                                                {t("Free")}
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                                {!doc.is_free && (
                                                                                    <div className="item-lock">
                                                                                        <i className="fas fa-lock"></i>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        ))}

                                                                        
                                                                        {(chapter.quizDetails || []).map((quiz) => (
                                                                            <div
                                                                                className="curriculum-item quiz-item"
                                                                                key={quiz._id}
                                                                            >
                                                                                <div className="item-icon">
                                                                                    <i className="fas fa-question-circle"></i>
                                                                                </div>
                                                                                <div className="item-content">
                                                                                    <h6 className="item-title">{quiz.title}</h6>
                                                                                    <div className="item-meta">
                                                                                        <span className="duration">
                                                                                            <i className="far fa-clock"></i>
                                                                                            {quiz.time} min
                                                                                        </span>
                                                                                        <span className="points">
                                                                                            {quiz.total_mark} {t("points")}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="no-content-message">
                                                                <i className="fas fa-info-circle"></i>
                                                                <p>{t("Course content will be available after enrollment")}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div> */}
                    </div>
                  ))}
                </div>
              </div>
              {/* Instructor Details */}
              {/* <div className="instructor-dtl">
                                <h2 className="title mb-3">{t("Instructor")}</h2>
                                <div className="instructor-dtl-prfl">
                                    <img src={mockInstructor.image || "/placeholder.svg"} alt={mockInstructor.name} />
                                    <div>
                                        <h5 className="mb-0">
                                            <a href="javascript:void(0);">{mockInstructor.name}</a>
                                        </h5>
                                        <p className="mb-0">
                                            <a href="javascript:void(0);">{t(`${mockInstructor.job_title}`)}</a>
                                        </p>
                                        <p className="rating">
                                            <span>
                                                <i className="fas fa-star me-2"></i>
                                                {bundle.bundleDetails.rating}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <p className="instructor-txt">
                                    <span>
                                        <i className="far fa-user me-2"></i>
                                        {bundle.bundleDetails.totalStudents} {t("Students")}
                                    </span>
                                </p>
                                <p>{mockInstructor.short_bio}</p>
                            </div> */}

              {/* Bundle Reviews */}
              {/* <div className="course-rating">
                                <h2 className="title mt-3">{t("Bundle Reviews")}</h2>
                                <div className="course-rating-star">
                                    <p className="rating">
                                        <i className="fas fa-star"></i>
                                        {bundle.bundleDetails.rating}
                                    </p>
                                    <span>
                                        ({bundle.bundleDetails.reviews} {t("Reviews")})
                                    </span>
                                </div>

                                {(mockReviews || []).map((review) => (
                                    <div className="course-rating-innr" key={review.id}>
                                        <div className="course-rating-innr-img">
                                            <img src={review.user?.image || "/placeholder.svg"} alt={review.user?.name} />
                                        </div>
                                        <div className="course-rating-innr-contnt">
                                            <h5>{review.user?.name}</h5>
                                            <p className="rating">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <i className="fas fa-star" key={i}></i>
                                                ))}
                                            </p>
                                            <p>{review.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
            </div>

            {/* Bundle Sidebar */}
            <div className="col-lg-4 col-md-12 course-dtl-main">
              <div className="course-dtl-main-innr sticky-top">
                <div className="course-img">
                  <img
                    className="w-100"
                    src={
                      bundle.bundleDetails?.thumbnail
                        ? `https://api.basementex.com/${
                            bundle.bundleDetails.thumbnail || "/placeholder.svg"
                          }`
                        : `/placeholder.svg?height=250&width=400&text=Bundle`
                    }
                    alt={bundle.bundleDetails?.title}
                    onError={(e) => {
                      e.target.src = `/placeholder.svg?height=250&width=400&text=Bundle`;
                    }}
                  />
                </div>
                <div className="course-dtl-main-content">
                  {bundle.bundleDetails?.discount ? (
                    <p className="price">
                      {formatCurrency(bundle.bundleDetails?.discount)}
                      <del>{formatCurrency(bundle.bundleDetails?.price)}</del>
                      {/* <span className="badge bg-success ms-2">
                                                {Math.round(
                                                    ((bundle.bundleDetails.price - bundle.bundleDetails.discount) / bundle.bundleDetails.price) *
                                                    100,
                                                )}
                                                % {t("OFF")}
                                            </span> */}
                    </p>
                  ) : (
                    <p className="price">
                      {formatCurrency(bundle.bundleDetails?.price)}
                    </p>
                  )}

                  <div className="course-dtl-main-btn">
                    <a
                      href="javascript:;"
                      className="thm-btn w-75 text-center rounded add-to-cart"
                      onClick={handleAddToCart}
                    >
                      <span className="text">{t("Add Bundle To Cart")}</span>
                    </a>
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

                  {/* Bundle Info Section - Responsive and RTL Friendly */}
                  <div className="bg-blue-600 text-white p-4 md:p-6 mt-4 course-infos rounded d-none">
                    <h5 className="mb-4 text-white font-semibold">
                      {t("This bundle includes")}
                    </h5>

                    <div className="row g-3">
                      {/* Courses */}
                      <div className="col-12 col-md-6 col-lg-12">
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
                              {bundle.bundleDetails.totalCourses}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="col-12 col-md-6 col-lg-12">
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
                            <g clipPath="url(#clip0_0_2442)">
                              <path
                                d="M10.0147 4.4056C9.64036 4.4056 9.39077 4.65561 9.39077 5.03063V10.0308C9.39077 10.4059 9.64036 10.6559 10.0147 10.6559H15.0065C15.3809 10.6559 15.6305 10.4059 15.6305 10.0308C15.6305 9.65582 15.3809 9.40581 15.0065 9.40581H10.6387V5.03063C10.6387 4.65561 10.3891 4.4056 10.0147 4.4056Z"
                                fill="currentcolor"
                              />
                            </g>
                          </svg>
                          <div className={`${isRTL ? "text-end" : ""}`}>
                            <span className="opacity-80">
                              {t("Duration")} :{" "}
                            </span>
                            <span className="font-medium">
                              {bundle.bundleDetails.duration}
                              {isRTL ? "س" : "h"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Lessons */}
                      <div className="col-12 col-md-6 col-lg-12">
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
                              d="M15.701 9.00506H15.2923V5.25384C15.2923 4.97633 15.1859 4.71018 14.9966 4.51395C14.8074 4.31772 14.5506 4.20748 14.2829 4.20748H11.255C11.2231 3.57767 10.9787 2.97952 10.5645 2.51761C10.1503 2.05569 9.59271 1.75939 8.98915 1.6805C8.64393 1.64366 8.29509 1.68103 7.96444 1.7903C7.63378 1.89957 7.32843 2.07837 7.06745 2.31554C6.80648 2.5527 6.59551 2.84313 6.44771 3.16866C6.29992 3.4942 6.2185 3.84784 6.20852 4.20748H2.67596C2.40828 4.20748 2.15156 4.31772 1.96227 4.51395C1.77299 4.71018 1.66666 4.97633 1.66666 5.25384V9.52825H3.08473C3.47304 9.51655 3.85189 9.65362 4.14886 9.91324C4.44584 10.1729 4.64012 10.5368 4.69457 10.9356C4.71421 11.1544 4.68933 11.375 4.62152 11.5832C4.55371 11.7914 4.4445 11.9825 4.30094 12.1442C4.15985 12.3077 3.98724 12.4388 3.79427 12.5289C3.6013 12.619 3.39225 12.6662 3.18061 12.6673H1.66666V17.287C1.66666 17.5646 1.77299 17.8307 1.96227 18.0269C2.15156 18.2232 2.40828 18.3334 2.67596 18.3334H14.2829C14.5506 18.3334 14.8074 18.2232 14.9966 18.0269C15.1859 17.8307 15.2923 17.5646 15.2923 17.287V14.2369H15.7969C16.1511 14.2388 16.5017 14.1634 16.8259 14.0156C17.1501 13.8678 17.4407 13.6508 17.6787 13.3789C17.9167 13.107 18.0968 12.7862 18.2073 12.4373C18.3178 12.0885 18.3563 11.7194 18.3202 11.3542C18.2384 10.6973 17.9261 10.0947 17.443 9.66143C16.9599 9.22813 16.3398 8.99447 15.701 9.00506Z"
                              fill="currentcolor"
                            />
                          </svg>
                          <div className={`${isRTL ? "text-end" : ""}`}>
                            <span className="opacity-80">
                              {t("Lessons")} :{" "}
                            </span>
                            <span className="font-medium">
                              {bundle.bundleDetails.totalLessons}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quizzes */}
                      <div className="col-12 col-md-6 col-lg-12">
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
                              d="M15.701 9.00506H15.2923V5.25384C15.2923 4.97633 15.1859 4.71018 14.9966 4.51395C14.8074 4.31772 14.5506 4.20748 14.2829 4.20748H11.255C11.2231 3.57767 10.9787 2.97952 10.5645 2.51761C10.1503 2.05569 9.59271 1.75939 8.98915 1.6805C8.64393 1.64366 8.29509 1.68103 7.96444 1.7903C7.63378 1.89957 7.32843 2.07837 7.06745 2.31554C6.80648 2.5527 6.59551 2.84313 6.44771 3.16866C6.29992 3.4942 6.2185 3.84784 6.20852 4.20748H2.67596C2.40828 4.20748 2.15156 4.31772 1.96227 4.51395C1.77299 4.71018 1.66666 4.97633 1.66666 5.25384V9.52825H3.08473C3.47304 9.51655 3.85189 9.65362 4.14886 9.91324C4.44584 10.1729 4.64012 10.5368 4.69457 10.9356C4.71421 11.1544 4.68933 11.375 4.62152 11.5832C4.55371 11.7914 4.4445 11.9825 4.30094 12.1442C4.15985 12.3077 3.98724 12.4388 3.79427 12.5289C3.6013 12.619 3.39225 12.6662 3.18061 12.6673H1.66666V17.287C1.66666 17.5646 1.77299 17.8307 1.96227 18.0269C2.15156 18.2232 2.40828 18.3334 2.67596 18.3334H14.2829C14.5506 18.3334 14.8074 18.2232 14.9966 18.0269C15.1859 17.8307 15.2923 17.5646 15.2923 17.287V14.2369H15.7969C16.1511 14.2388 16.5017 14.1634 16.8259 14.0156C17.1501 13.8678 17.4407 13.6508 17.6787 13.3789C17.9167 13.107 18.0968 12.7862 18.2073 12.4373C18.3178 12.0885 18.3563 11.7194 18.3202 11.3542C18.2384 10.6973 17.9261 10.0947 17.443 9.66143C16.9599 9.22813 16.3398 8.99447 15.701 9.00506Z"
                              fill="currentcolor"
                            />
                          </svg>
                          <div className={`${isRTL ? "text-end" : ""}`}>
                            <span className="opacity-80">
                              {t("Quizzes")} :{" "}
                            </span>
                            <span className="font-medium">
                              {bundle.bundleDetails.totalQuizzes}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="col-12 col-md-6 col-lg-12">
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
                              d="M19.1667 9.37479C19.1674 8.65706 18.9831 7.95019 18.63 7.3165C18.2769 6.68281 17.7659 6.14177 17.1421 5.74108C16.5182 5.3404 15.8007 5.09237 15.0527 5.01887C14.3047 4.94538 13.5493 5.04867 12.853 5.31964C12.1567 5.59061 11.5409 6.02094 11.06 6.57268C10.5791 7.12442 10.2478 7.78063 10.0953 8.48344C9.94276 9.18626 9.97376 9.9141 10.1855 10.6028C10.3973 11.2915 10.7833 11.9198 11.3095 12.4325V16.8746C11.3095 16.9812 11.3379 17.086 11.3923 17.1791C11.4466 17.2722 11.525 17.3505 11.62 17.4066C11.7149 17.4626 11.8234 17.4946 11.9349 17.4994C12.0465 17.5042 12.1574 17.4816 12.2573 17.4339L14.5833 16.323L16.9094 17.4339C17.0092 17.4816 17.1202 17.5042 17.2318 17.4994C17.3433 17.4946 17.4518 17.4626 17.5467 17.4066C17.6417 17.3505 17.7201 17.2722 17.7744 17.1791C17.8288 17.086 17.8572 16.9812 17.8572 16.8746V12.4325C18.6969 11.6167 19.1672 10.5185 19.1667 9.37479Z"
                              fill="currentcolor"
                            />
                          </svg>
                          <div className={`${isRTL ? "text-end" : ""}`}>
                            <span className="opacity-80">
                              {t("Certifications")} :{" "}
                            </span>
                            <span className="font-medium">
                              {bundle.bundleDetails.certificate === true
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
          </div>
        </div>
      </section>

      {/* Related Bundles Section */}
      <section className="tp-space popular-course most-course">
        <div className="container">
          <div className="heading">
            <h3 className="title">{t("More Course Bundles")}</h3>
            <p>
              {t(
                "Discover more comprehensive learning bundles to advance your skills."
              )}
            </p>
          </div>
          <BundleSlider />
        </div>
      </section>

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

.course-content-preview {
    border-top: 1px solid #f0f0f0;
}

.content-toggle-btn {
    width: 100%;
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    color: #2563eb;
    cursor: pointer;
    transition: all 0.3s ease;
}

.content-toggle-btn:hover {
    background: #f8fafc;
}

.content-toggle-btn i {
    transition: transform 0.3s ease;
}

.content-toggle-btn[aria-expanded="true"] i {
    transform: rotate(180deg);
}

.course-curriculum {
    padding: 0 1.5rem 1.5rem;
}

.curriculum-chapter {
    margin-bottom: 1.5rem;
}

.chapter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: linear-gradient(135deg, #f8fafc, #e2e8f0);
    border-radius: 8px;
    margin-bottom: 0.75rem;
}

.chapter-title {
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
}

.chapter-count {
    font-size: 0.8rem;
    color: #666;
    background: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
}

.chapter-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.curriculum-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    border: 1px solid transparent;
}

.curriculum-item:hover {
    background: #f8fafc;
    border-color: #e2e8f0;
}

.item-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
}

.lesson-item .item-icon {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
}

.document-item .item-icon {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
}

.quiz-item .item-icon {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white;
}

.item-content {
    flex: 1;
}

.item-title {
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 0.25rem 0;
    font-size: 0.9rem;
}

.item-meta {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.item-meta span {
    font-size: 0.8rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.free-badge {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white !important;
    padding: 0.125rem 0.5rem;
    border-radius: 10px;
    font-weight: 600;
}

.item-lock {
    color: #999;
    font-size: 0.9rem;
}

.no-content-message {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.no-content-message i {
    font-size: 2rem;
    color: #cbd5e0;
    margin-bottom: 0.5rem;
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

export default CourseBundleDetails;
