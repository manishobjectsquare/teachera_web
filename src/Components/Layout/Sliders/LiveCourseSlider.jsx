import { useEffect, useState } from "react"
import OwlCarousel from "react-owl-carousel"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.default.css"
import courseUser from "../../../assets/images/course-user.png"
import { baseUrl } from "../../../config/baseUrl"

const LiveCourseSlider = () => {
  const { t } = useTranslation()
  const [liveCourses, setLiveCourses] = useState([])

  const courseSliderOptions = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: false,
    smartSpeed: 500,
    navText: ['<span class="fa fa-chevron-left"></span>', '<span class="fas fa-chevron-right"></span>'],
    responsive: {
      0: {
        items: 1.3
      },
      500: {
        items: 1.5
      },
      770: {
        items: 2
      },
      1000: {
        items: 4
      },
      1600: {
        items: 4
      }
    }
  }

  useEffect(() => {
    const fetchLiveCourses = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/v1/web/liveCourse/liveLession-list`)
        const json = await res.json()
        if (json.status) {
          const activeCourses = json.data.filter(course => course.status === "active")
          setLiveCourses(activeCourses)
        } else {
          console.error("API returned an error status:", json)
        }
      } catch (error) {
        console.error("Error fetching live courses:", error)
      }
    }

    fetchLiveCourses()
  }, [])

  const formatCurrency = (amount) => `$${Number.parseFloat(amount).toFixed(2)}`

  return (
    <>
      {liveCourses.length > 0 && (
        <OwlCarousel className="course-slide owl-carousel" {...courseSliderOptions}>
          {liveCourses.map((course) => (
            <div className="item" key={course._id}>
              <div className="product-card live-course-card">
                <Link to={`/live-course-details/${course?._id}`}>
                  <div className="product-img">
                    <img
                      src={`https://api.basementex.com/${course.image}`}
                      alt={course.title}
                      className="w-100"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/square_logo.png"
                      }}
                    />
                    <div className="course-usr">
                      <img src={courseUser || "/placeholder.svg"} className="w-auto" alt="Live" />
                      <span>
                        <i className="fas fa-video live-icon"></i>
                        {course.chapters || 0} {t("Chapters")}
                      </span>
                    </div>

                    <div className="live-badge">
                      <i className="fas fa-circle live-dot"></i>
                      {t("LIVE")}
                    </div>
                  </div>

                  <div className="product-content">
                    <h4 className="course-title">{course.title}</h4>
                    <p className="price">
                      {formatCurrency(course.offer_price)}
                      <del className="ms-1">{formatCurrency(course.price)}</del>
                    </p>
                    <div className="course-bttm">
                      <div className="live-course-stats">
                        {/* <div className="stat-item upcoming-session">
                          <i className="fas fa-calendar-alt"></i>
                          <span>{t("Next")}: {t("TBA")}</span>
                        </div> */}
                        <div className="stat-item">
                          <i className="fas fa-play-circle"></i>
                          <span>{course.chapters} {t("Modules")}</span>
                        </div>
                        <div className="stat-item">
                          <i className="fas fa-users"></i>
                          {course.sessions}
                          <span>{t("Interactive Sessions")}</span>
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

          .live-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 600;
            z-index: 2;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .live-dot {
            color: #fff;
            font-size: 0.5rem;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }

          .live-icon {
            color: #e74c3c;
            margin-right: 2px;
          }

          .course-title {
            height: 48px;
            line-height: 1.2;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 8px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .course-description {
            height: 40px;
            line-height: 1.3;
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 10px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .live-course-card {
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
            margin-bottom: 12px;
            font-weight: 600;
            font-size: 1.1rem;
          }

          .live-course-stats {
            display: flex;
            flex-direction: column;
            gap: 6px;
            width: 100%;
            margin-bottom: 12px;
          }

          .stat-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.8rem;
            color: #666;
            min-height: 18px;
          }

          .stat-item.upcoming-session {
            background: #f8f9fa;
            padding: 6px 8px;
            border-radius: 6px;
            border-left: 3px solid #e74c3c;
            font-weight: 500;
          }

          .stat-item i {
            color: #2563eb;
            font-size: 0.75rem;
            width: 12px;
            flex-shrink: 0;
          }

          .stat-item.upcoming-session i {
            color: #e74c3c;
          }

          .stat-item span {
            font-size: 0.75rem;
            line-height: 1.2;
          }

          .course-bttm {
            display: flex;
            align-items: flex-start;
            gap: 10px;
          }

          .owl-carousel .item {
            height: auto;
          }

          .owl-carousel .item .live-course-card {
            min-height: 400px;
          }

          @media (max-width: 768px) {
            .course-title {
              height: 40px;
              font-size: 0.9rem;
            }

            .course-description {
              height: 36px;
              font-size: 0.8rem;
            }

            .live-course-card {
              min-height: 360px;
            }

            .live-course-stats {
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
            .course-title {
              height: 36px;
              font-size: 0.85rem;
            }

            .course-description {
              height: 32px;
              font-size: 0.75rem;
            }

            .live-course-card {
              min-height: 340px;
            }
          }
            @media (max-width: 576px) {
              .owl-carousel .item .live-course-card {
              min-height: auto;}
            }
        `}
      </style>
    </>
  )
}

export default LiveCourseSlider
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import courseUser from "../../../assets/images/course-user.png";
// import { baseUrl } from "../../../config/baseUrl";

// const LiveCourseSlider = () => {
//   const { t } = useTranslation();
//   const [liveCourses, setLiveCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLiveCourses = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           `${baseUrl}/api/v1/web/liveCourse/liveLession-list`
//         );
//         const json = await res.json();
//         if (json.status) {
//           const activeCourses = json.data.filter(
//             (course) => course.status === "active"
//           );
//           setLiveCourses(activeCourses);
//         } else {
//           console.error("API returned an error status:", json);
//         }
//       } catch (error) {
//         console.error("Error fetching live courses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLiveCourses();
//   }, []);

//   const formatCurrency = (amount) => `$${Number.parseFloat(amount).toFixed(2)}`;

//   if (loading) {
//     return (
//       <div className="diploma-slider-loading">
//         <div className="loading-cards">
//           {[...Array(3)].map((_, index) => (
//             <div key={index} className="loading-card-horizontal">
//               <div className="loading-image-horizontal"></div>
//               <div className="loading-content-horizontal">
//                 <div className="loading-title-horizontal"></div>
//                 <div className="loading-instructor-horizontal"></div>
//                 <div className="loading-price-horizontal"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {liveCourses.length > 0 && (
//         <div className="diploma-slider-container">
//           <div className="row">
//             {liveCourses.map((course) => (
//               <div className="col-lg-6 diploma_card_" key={course._id}>
//                 <div className="diploma-card-horizontal">
//                   <Link
//                     to={`/live-course-details/${course?._id}`}
//                     className="diploma-link-horizontal"
//                   >
//                     <div className="diploma-card-inner">
//                       <div className="diploma-image-section">
//                         <img
//                           src={`https://api.basementex.com/${course?.image}`}
//                           alt={course?.title}
//                           className="diploma-image-horizontal"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = "/square_logo.png";
//                           }}
//                         />

//                         <div className="live-badge-horizontal">
//                           <span className="badge-live">
//                             <i className="fas fa-circle live-dot"></i>{" "}
//                             {t("LIVE")}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="diploma-content-horizontal">
//                         <div className="diploma-header">
//                           <h4 className="diploma-title-horizontal">
//                             {course?.title}
//                           </h4>
//                         </div>

//                         <div className="diploma-meta">
//                           <div className="diploma-stats-horizontal">
//                             <span className="stat-item-horizontal">
//                               <i className="fas fa-play-circle"></i>
//                               {course?.chapters || 0} {t("Modules")}
//                             </span>
//                             <span className="stat-item-horizontal">
//                               <i className="fas fa-users"></i>
//                               {course?.sessions || 0}{" "}
//                               {t("Interactive Sessions")}
//                             </span>
//                           </div>

//                           <div className="diploma-pricing-horizontal">
//                             <span className="current-price-horizontal">
//                               {formatCurrency(course?.offer_price)}
//                             </span>
//                             {course?.price > course?.offer_price && (
//                               <span className="original-price-horizontal">
//                                 {formatCurrency(course?.price)}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//       <style>{`
//         .diploma-slider-container {
//           position: relative;
//           padding: 0 10px;
//         }

//         .diploma-slider-loading {
//           padding: 20px 0;
//         }

//         .loading-cards {
//           display: flex;
//           gap: 20px;
//           overflow: hidden;
//         }

//         .loading-card-horizontal {
//           display: flex;
//           background: #f8f9fa;
//           border-radius: 12px;
//           overflow: hidden;
//           min-width: 400px;
//           height: 160px;
//           animation: pulse 1.5s ease-in-out infinite;
//         }

//         .loading-image-horizontal {
//           width: 140px;
//           height: 100%;
//           background: #e9ecef;
//           flex-shrink: 0;
//         }

//         .loading-content-horizontal {
//           padding: 20px;
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }

//         .loading-title-horizontal {
//           height: 20px;
//           background: #e9ecef;
//           border-radius: 4px;
//           width: 80%;
//         }

//         .loading-instructor-horizontal {
//           height: 16px;
//           background: #e9ecef;
//           border-radius: 4px;
//           width: 60%;
//         }

//         .loading-price-horizontal {
//           height: 18px;
//           background: #e9ecef;
//           border-radius: 4px;
//           width: 40%;
//           margin-top: auto;
//         }

//         @keyframes pulse {
//           0% { opacity: 1; }
//           50% { opacity: 0.7; }
//           100% { opacity: 1; }
//         }

//         .diploma-card-horizontal {
//           background: #ffffff;
//           border-radius: 12px;
//           overflow: hidden;
//           box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
//           transition: all 0.3s ease;
//           height: 200px;
//           border: 1px solid #f0f0f0;
//         }

//         .diploma-card-horizontal:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
//           border-color: #e0e0e0;
//         }

//         .diploma-link-horizontal {
//           text-decoration: none;
//           color: inherit;
//           height: 100%;
//           display: block;
//         }

//         .diploma-card-inner {
//           display: flex;
//           height: 100%;
//         }

//         .diploma-image-section {
//           position: relative;
//           width: 250px;
//           height: 100%;
//           flex-shrink: 0;
//           overflow: hidden;
//         }

//         .diploma-image-horizontal {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.3s ease;
//         }

//         .diploma-card-horizontal:hover .diploma-image-horizontal {
//           transform: scale(1.05);
//         }

//         .new-badge-horizontal {
//           position: absolute;
//           top: 8px;
//           left: 8px;
//           z-index: 3;
//         }

//         .badge-new {
//           background: #ff4757;
//           color: white;
//           padding: 4px 8px;
//           border-radius: 4px;
//           font-size: 0.7rem;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .bookmark-btn-horizontal {
//           position: absolute;
//           top: 8px;
//           right: 8px;
//           width: 28px;
//           height: 28px;
//           background: rgba(255, 255, 255, 0.9);
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           z-index: 4;
//         }

//         .bookmark-btn-horizontal:hover {
//           background: #ffffff;
//           transform: scale(1.1);
//         }

//         .bookmark-btn-horizontal i {
//           color: #666;
//           font-size: 0.8rem;
//         }

//         .diploma-content-horizontal {
//           padding: 20px;
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//         }

//         .diploma-header {
//           margin-bottom: 12px;
//         }

//         .diploma-title-horizontal {
//           font-size: 1.1rem;
//           font-weight: 600;
//           color: #2d3748;
//           margin-bottom: 6px;
//           line-height: 1.3;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           max-height: 2.6em;
//         }

//         .diploma-instructor {
//           font-size: 0.85rem;
//           color: #718096;
//           margin: 0;
//           font-weight: 500;
//         }

//         .diploma-meta {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }

//         .diploma-stats-horizontal {
//           display: flex;
//           gap: 12px;
//           flex-wrap: wrap;
//         }

//         .stat-item-horizontal {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           font-size: 0.75rem;
//           color: #718096;
//           font-weight: 500;
//         }

//         .stat-item-horizontal i {
//           color: #4299e1;
//           font-size: 0.7rem;
//           width: 10px;
//         }

//         .diploma-pricing-horizontal {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           flex-wrap: wrap;
//         }

//         .current-price-horizontal {
//           font-size: 1.1rem;
//           font-weight: 700;
//           color: #2b6cb0;
//         }

//         .original-price-horizontal {
//           font-size: 0.85rem;
//           color: #a0aec0;
//           text-decoration: line-through;
//         }

//         .savings-text {
//           font-size: 0.75rem;
//           color: #38a169;
//           font-weight: 600;
//           background: #f0fff4;
//           padding: 2px 6px;
//           border-radius: 4px;
//         }

//         // /* Owl Carousel Customization */
//         // .diploma-carousel-horizontal.owl-carousel {
//         //   padding: 0;
//         // }

//         // .diploma-carousel-horizontal .owl-nav {
//         //   position: absolute;
//         //   top: 50%;
//         //   transform: translateY(-50%);
//         //   width: 100%;
//         //   pointer-events: none;
//         // }

//         // .diploma-carousel-horizontal .owl-nav button {
//         //   position: absolute;
//         //   width: 40px;
//         //   height: 40px;
//         //   background: #ffffff;
//         //   border: 2px solid #e2e8f0;
//         //   border-radius: 50%;
//         //   display: flex;
//         //   align-items: center;
//         //   justify-content: center;
//         //   pointer-events: all;
//         //   transition: all 0.3s ease;
//         //   z-index: 5;
//         //   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//         // }

//         // .diploma-carousel-horizontal .owl-nav button:hover {
//         //   background: #4299e1;
//         //   border-color: #4299e1;
//         //   color: white;
//         //   transform: scale(1.1);
//         // }

//         // .diploma-carousel-horizontal .owl-nav .owl-prev {
//         //   left: -20px;
//         // }

//         // .diploma-carousel-horizontal .owl-nav .owl-next {
//         //   right: -20px;
//         // }

//         // .diploma-carousel-horizontal .owl-nav button span {
//         //   font-size: 0.9rem;
//         //   color: #718096;
//         // }

//         // .diploma-carousel-horizontal .owl-nav button:hover span {
//         //   color: white;
//         // }

//         /* Responsive Design */
//         @media (max-width: 768px) {
//           .diploma-slider-container {
//             padding: 0 5px;
//           }

//           .diploma-card-horizontal {
//             height: 140px;
//           }

//           .diploma-image-section {
//             width: 120px;
//           }

//           .diploma-content-horizontal {
//             padding: 15px;
//           }

//           .diploma-title-horizontal {
//             font-size: 1rem;
//           }

//           .diploma-stats-horizontal {
//             gap: 8px;
//           }

//           .stat-item-horizontal {
//             font-size: 0.7rem;
//           }

//           .current-price-horizontal {
//             font-size: 1rem;
//           }

//           // .diploma-carousel-horizontal .owl-nav button {
//           //   width: 36px;
//           //   height: 36px;
//           // }

//           // .diploma-carousel-horizontal .owl-nav .owl-prev {
//           //   left: -18px;
//           // }

//           // .diploma-carousel-horizontal .owl-nav .owl-next {
//           //   right: -18px;
//           // }

//           .loading-card-horizontal {
//             min-width: 350px;
//             height: 140px;
//           }

//           .loading-image-horizontal {
//             width: 120px;
//           }
//         }

//         @media (max-width: 480px) {
//           .diploma-card-horizontal {
//             height: 130px;
//           }

//           .diploma-image-section {
//             width: 100px;
//           }

//           .diploma-content-horizontal {
//             padding: 12px;
//           }

//           .diploma-title-horizontal {
//             font-size: 0.9rem;
//             -webkit-line-clamp: 1;
//             max-height: 1.3em;
//           }

//           .diploma-stats-horizontal {
//             // flex-direction: column;
//             gap: 4px;
//           }

//           .diploma-pricing-horizontal {
//             gap: 6px;
//           }

//           .current-price-horizontal {
//             font-size: 0.95rem;
//           }

//           .loading-card-horizontal {
//             min-width: 300px;
//             height: 120px;
//           }

//           .loading-image-horizontal {
//             width: 100px;
//           }
//         }
//         .diploma_card_ {
// 	margin-bottom: 20px;
// }
//       `}</style>
//     </>
//   );
// };

// export default LiveCourseSlider;
