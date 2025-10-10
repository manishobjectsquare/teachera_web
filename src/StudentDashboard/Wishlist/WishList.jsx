// import React, { useState } from 'react';
// import courseImg from "../../assets/images/course-img-01.png"
// import { useTranslation } from 'react-i18next';

// const Wishlist = () => {
//     const { t } = useTranslation();

//     // Mock data for wishlist items
//     const [wishlistItems, setWishlistItems] = useState([
//         {
//             id: 1,
//             title: "Complete Web Development Bootcamp",
//             instructor: "John Smith",
//             image: courseImg,
//             price: "$89.99",
//             rating: 4.8,
//             students: 12500,
//         }
//     ]);

//     // Function to remove item from wishlist
//     const removeFromWishlist = (id) => {
//         setWishlistItems(wishlistItems.filter(item => item.id !== id));
//     };

//     return (
//         <div className="col-lg-9">
//             <h3 className="user-title">{t('Wishlist')}</h3>
//             <div className="user-cards wishlist">
//                 <div className="row">
//                     {/* Wishlist cards */}
//                     {wishlistItems.length > 0 ? (
//                         wishlistItems.map(item => (
//                             <div key={item.id} className="col-lg-4 col-md-6 col-sm-6 mb-4">
//                                 <div className="product-card">
//                                     <div className="product-img position-relative">
//                                         <img
//                                             src={item.image || "http://104.248.23.97:8100/uploads/website-images/frontend-avatar.png"}
//                                             alt={item.title}
//                                         />
//                                         <div className="course-usr">
//                                             <span>+ {item.students.toLocaleString()} {t('students')}</span>
//                                         </div>
//                                     </div>
//                                     <a href={item.link || "#"}>
//                                         <div className="product-content">
//                                             <h4>{item.title}</h4>
//                                             <p className="rating">
//                                                 {Array.from({ length: 5 }).map((_, i) => (
//                                                     <i
//                                                         key={i}
//                                                         className={`fas fa-star ${i < Math.round(item.rating) ? "text-warning" : "text-muted"}`}
//                                                     />
//                                                 ))}
//                                                 ({item.rating.toFixed(1)} <span>{t('Reviews')}</span>)
//                                             </p>
//                                             <p className="courses__price">{item.price}</p>

//                                             <div className="course-bttm d-flex align-items-center justify-content-between">
//                                                 <div className="d-flex align-items-center">
//                                                     <img
//                                                         src="http://104.248.23.97:8100/uploads/website-images/frontend-avatar.png"
//                                                         alt={t('Instructor')}
//                                                         className="me-2"
//                                                     />
//                                                     <div>
//                                                         <p className="mb-0">{t('Instructor')}</p>
//                                                         <h6 className="mb-0">{item.instructor}</h6>
//                                                     </div>
//                                                 </div>
//                                                 <button
//                                                     className="fav-btn wsus-wishlist-remove"
//                                                     onClick={() => removeFromWishlist(item.id)}
//                                                     aria-label={t('Remove from wishlist')}
//                                                     title={t('Remove from wishlist')}
//                                                 >
//                                                     <i className="fas fa-heart"></i>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </a>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="col-12 text-center py-5">
//                             <h4>{t('Your wishlist is empty')}</h4>
//                             <p className="text-muted">{t('Browse courses and add them to your wishlist')}</p>
//                             <button className="btn btn-primary mt-3">{t('Browse Courses')}</button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Wishlist;

"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import courseImg from "../../assets/images/course-img-01.png";
import { useUser } from "../../Context/UserContext";
import { useWishlist } from "../../Context/WishListContext";
import { WindowDash } from "react-bootstrap-icons";
import loaderImg from "../../assets/images/loaderImg.png";
import userImg from "../../assets/images/course-user.png";

const Wishlist = () => {
  const { t, i18n } = useTranslation();
  const { user } = useUser();
  const { wishlist, removeFromWishlist, wishlistLoading, fetchWishlistData } =
    useWishlist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      if (user?.Token) {
        await fetchWishlistData();
      }
      setLoading(false);
    };

    loadWishlist();
  }, [user?.Token]);

  const handleRemoveFromWishlist = async (courseId) => {
    await removeFromWishlist(courseId);
  };

  if (loading || wishlistLoading) {
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
  console.log(i18n.language);

  return (
    <div className="col-lg-9">
      <h3 className="user-title">{t("Wishlist")}</h3>
      <div className="user-cards wishlist">
        <div className="row">
          {/* Wishlist cards */}
          {wishlist && wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div
                key={item.courseId?._id}
                className="col-lg-4 col-md-6 col-sm-6 mb-4"
              >
                <div className="product-card">
                  <Link to={`/course-details/${item?.courseId?._id}`}>
                    <div className="product-img position-relative">
                      <img
                        src={
                          i18n.language == "en" ||
                          item.courseId?.arabic_thumbnail == ""
                            ? item.courseId?.thumbnail
                              ? `https://api.basementex.com/${item?.courseId?.thumbnail}`
                              : courseImg || "/square_logo.png"
                            : item.courseId?.arabic_thumbnail
                            ? `https://api.basementex.com/${item?.courseId?.arabic_thumbnail}`
                            : courseImg || "/square_logo.png"
                        }
                        alt={item?.courseId?.title || "Course"}
                      />

                      <div className="course-usr">
                        <span>
                          <img src={userImg} alt="" className="w-auto" />+{" "}
                          {item?.studentCount || 0} {t("students")}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="product-content">
                    <Link to={`/course-details/${item.courseId?._id}`}>
                      <h4>
                        {i18n.language == "en" ||
                        item?.courseId.arabic_title === ""
                          ? item?.courseId?.title
                          : item?.courseId?.arabic_title}
                      </h4>
                    </Link>
                    <p className="rating">
                      <i className={`fas fa-star "text-warning" `} />(
                      {item?.averageRating})
                    </p>
                    {/* <p className="courses_price">{item?.courseId?.price ? `$${item?.courseId?.price}` : "Free"}</p> */}
                    <p className="price">
                      {item?.courseId?.price === 0 ? (
                        <span>Free</span>
                      ) : item?.courseId?.price > 0 ? (
                        <>
                          <span>
                            ${item?.courseId?.discount_price.toFixed(2)}
                          </span>{" "}
                          <del className="ms-1">${item?.courseId?.price}</del>
                        </>
                      ) : (
                        <span>
                          ${item?.courseId?.discount_price.toFixed(2)}
                        </span>
                      )}
                    </p>

                    <div className="course-bttm d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            item?.courseId?.instructor_id?.image
                              ? `https://api.basementex.com/${item?.courseId?.instructor_id?.image}`
                              : "/placeholder.svg"
                          }
                          alt={t("Instructor")}
                          className="me-2"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/square_logo.png";
                          }}
                        />
                        <div>
                          <p className="mb-0">{t("Instructor")}</p>
                          <h6 className="mb-0">
                            {item?.courseId?.instructor_id?.name ||
                              "Instructor"}
                          </h6>
                        </div>
                      </div>
                      <button
                        className="fav-btn wsus-wishlist-remove"
                        onClick={() => handleRemoveFromWishlist(item?.courseId)}
                        aria-label={t("Remove from wishlist")}
                        title={t("Remove from wishlist")}
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4>{t("Your wishlist is empty")}</h4>
              <p className="text-muted">
                {t("Browse courses and add them to your wishlist")}
              </p>
              <Link to="/courses" className="btn btn-primary mt-3">
                {t("Browse Courses")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
