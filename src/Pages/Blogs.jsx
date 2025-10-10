// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import blogImg from '../assets/images/blog-img.svg';
// import { useTranslation } from 'react-i18next';
// const Blogs = () => {

//   const [blogs, setBlogs] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const truncate = (text, maxLength) => {
//     if (!text) return '';
//     return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);

//     if (e.target.value) {
//       window.location.href = e.target.value;
//     }
//   };

//   const fetchBlogCategories = async () => {
//     try {
//       const response = await fetch('/api/blog-category', {

//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       }
//       );
//       const data = await response.json();
//       setCategories(data.data);
//     } catch (error) {
//       console.error('Error fetching blog categories:', error);
//     }

//   }

//   // Blogs fethching

//   const fetchBlogs = async () => {
//     try {
//       const response = await fetch("/api/blog", {
//         method: "GET",

//         headers: {
//           "Content-Type": "application/json",
//         },
//       })

//       const data = await response.json();
//       console.log(data.data)
//       setBlogs(data.data);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   }

//   useEffect(() => {
//     fetchBlogCategories();
//     fetchBlogs();
//   }, [])
//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" }
//     return new Date(dateString).toLocaleDateString(undefined, options)
//   }

//   const { t } = useTranslation();
//   // {`/blog/${blog.id}`}
//   return (
//     <>
//       {/* Banner Section start */}
//       <section className="blog-bnnr mt-85">
//         <div className="container">
//           <div className="blog-bnnr-innr">
//             <div className="row align-items-center">
//               <div className="col-lg-8 col-md-6 col-sm-6">
//                 <h2 className="title text-white">{t("Our Blogs")}</h2>
//                 <p className="text-secondary">
//                   {t("At the Academy, we strive to bring together the best professors for the best courses")}
//                 </p>
//               </div>
//               <div className="col-lg-4 col-md-6 col-sm-6 text-end">
//                 <img src={blogImg || "/placeholder.svg?height=200&width=300&query=blog"} alt="Blog" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Blog Section start*/}
//       <section className="blog-sec tp-space">
//         <div className="container">
//           <div className="product-shop-fltr justify-content-end">
//             <div className="shop-fltr-lft">
//               <div className="custom-frm-bx">
//                 <label htmlFor="category">{t("Categories")}</label>
//                 <select
//                   name="category"
//                   id="category"
//                   className="form-select"
//                   value={selectedCategory}
//                   onChange={handleCategoryChange}
//                 >
//                   <option value="">{t("Select Categories")}</option>
//                   {categories.length > 0 ? (
//                     categories
//                       // .sort((a, b) => a.translation.title.localeCompare(b.translation.title))
//                       .map(category => (
//                         <option
//                           key={category.category_id}
//                           value={`/blogs/${category._id}`}
//                         >
//                           {category.title}
//                         </option>
//                       ))
//                   ) : (
//                     <option value="">{t("No Category Found")}</option>
//                   )}
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             {blogs.length > 0 ? (
//               // blogs.map(blog => (
//               //   <div className="col-lg-6 col-md-12 col-sm-12" key={blog._id}>
//               //     <Link to={`/blog/${blog._id}`} className='text-dark'>
//               //       <div className="blog-card">
//               //         <div className="blog-img">
//               //           <img src={`https://jp4b4xth-8080.inc1.devtunnels.ms/media/${blog.image}`} alt={blog.title} />
//               //         </div>
//               //         <div className="blog-content">
//               //           <h6 className='blog-date'>{formatDate(blog.createdAt)}</h6>
//               //           <h4>{blog.title}</h4>
//               //           <p dangerouslySetInnerHTML={{ __html: truncate(blog.description, 200) }} />
//               //           <span className='text-decoration-none'>
//               //             {t("Read More")} <i className="fal fa-long-arrow-right ms-1"></i>
//               //           </span>
//               //         </div>
//               //       </div>
//               //     </Link>
//               //   </div>
//               // ))
//               blogs.map(blog => (
//                 <div className="col-lg-6 col-6 mt-2" key={blog._id}>
//                   <Link to={`/blog/${blog._id}`}>
//                     <div className="blog-card">
//                       <div className="blog-img">
//                         <img src={`https://api.basementex.com/media/${blog.image}`} alt={blog.title} style={{ width: '250px', maxWidth: '300px' }} />
//                       </div>
//                       <div className="blog-content">
//                         <h6>{formatDate(blog.createdAt)}</h6>
//                         <h4>{truncate(blog.title, 50)}</h4>
//                         {/* <p>{truncate(blog.description, 100)}</p> */}
//                         <p dangerouslySetInnerHTML={{ __html: truncate(blog.description, 200) }} />
//                         <span >{t('Read More')} <i className="fal fa-long-arrow-right ms-1"></i></span>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               ))

//             ) : (
//               <div className="col-12 text-center py-5">
//                 <h3>{t("No blogs found")}</h3>
//                 <p>{t("Check back later for new content")}</p>
//               </div>
//             )}
//           </div>
//         </div >
//       </section >
//     </>
//   );
// };

// export default Blogs;

"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import blogImg from "../assets/images/blog-img.svg";
import { useTranslation } from "react-i18next";
import PostImg from "../assets/images/blog-img-01.png";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);

    if (e.target.value) {
      window.location.href = e.target.value;
    }
  };

  const fetchBlogCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.basementex.com/blog-category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response is ok before parsing
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // For debugging - log the raw response text
      const responseText = await response.text();

      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse category response as JSON:", parseError);
        throw new Error("Invalid JSON response from server");
      }

      setCategories(data.data || []);
    } catch (error) {
      console.error("Error fetching blog categories:", error);
      setError(`Failed to fetch categories: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.basementex.com/blog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response is ok before parsing
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // For debugging - log the raw response text
      const responseText = await response.text();

      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse blog response as JSON:", parseError);
        throw new Error("Invalid JSON response from server");
      }

      setBlogs(data.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(`Failed to fetch blogs: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogCategories();
    fetchBlogs();
  }, []);

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);

  //   const timeOptions = {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   };

  //   const dateOptions = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   };

  //   const time = date.toLocaleTimeString(undefined, timeOptions);
  //   const fullDate = date.toLocaleDateString(undefined, dateOptions);

  //   return `${time}, ${fullDate}`;
  // };
  const formatDate = (dateString, locale = "en") => {
    const date = new Date(dateString);

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const time = date.toLocaleTimeString(locale, timeOptions);
    const fullDate = date.toLocaleDateString(locale, dateOptions);

    return `${time}, ${fullDate}`;
  };
  return (
    <>
      {/* Banner Section start */}
      <section className="blog-bnnr mt-85">
        <div className="container">
          <div className="blog-bnnr-innr">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-6 col-sm-6">
                <h2 className="title text-white">{t("Our Blogs")}</h2>
                <p className="text-secondary">
                  {t(
                    "At the Academy, we strive to bring together the best professors for the best courses"
                  )}
                </p>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 text-end">
                <img
                  src={
                    blogImg ||
                    "/placeholder.svg?height=200&width=300&query=blog"
                  }
                  alt="Blog"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section start*/}
      <section className="blog-sec tp-space">
        <div className="container">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
              <button
                className="btn btn-sm btn-outline-danger ms-3"
                onClick={() => {
                  setError(null);
                  fetchBlogCategories();
                  fetchBlogs();
                }}
              >
                Retry
              </button>
            </div>
          )}

          <div className="product-shop-fltr justify-content-end">
            <div className="shop-fltr-lft">
              <div className="custom-frm-bx">
                <label htmlFor="category">{t("Categories")}</label>
                <select
                  name="category"
                  id="category"
                  className="form-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  disabled={loading}
                >
                  <option value="">{t("Select Categories")}</option>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <option
                        key={category.category_id || category._id}
                        value={`/blogs/${category._id}`}
                      >
                        {category.title}
                      </option>
                    ))
                  ) : (
                    <option value="">
                      {loading ? t("Loading...") : t("No Category Found")}
                    </option>
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            {loading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">{t("Loading blogs...")}</p>
              </div>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <div className="col-lg-6 col-6 mt-2" key={blog._id}>
                  <Link to={`/blog/${blog._id}`}>
                    <div className="blog-card">
                      <div className="blog-img">
                        <img
                          src={`https://api.basementex.com/${blog.image}`}
                          alt={blog.title}
                          style={{ width: "250px", maxWidth: "300px" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = { PostImg };
                          }}
                        />
                      </div>
                      <div className="blog-content">
                        {/* <h6>{formatDate(blog.createdAt)}</h6> */}
                        <h6>{formatDate(blog.createdAt, i18n.language)}</h6>
                        <h4>{truncate(blog.title, 50)}</h4>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: truncate(blog.description, 200),
                          }}
                        />
                        <span>
                          {t("Read More")}{" "}
                          <i className="fal fa-long-arrow-right ms-1"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h3>{t("No blogs found")}</h3>
                <p>{t("Check back later for new content")}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
