// import { useState, useEffect } from "react"
// import { Link, useParams } from "react-router-dom"
// import PostImg from "../assets/images/blog-img-01.png"
// import { useTranslation } from "react-i18next"

// const BlogDetails = () => {
//   const { id } = useParams() // Get the ID from the URL
//   const { t, i18n } = useTranslation()
//   const [blog, setBlog] = useState(null)
//   const [latestBlogs, setLatestBlogs] = useState([])
//   const [loading, setLoading] = useState(true)

//   const formatDate = (dateString, locale = 'en') => {
//     const date = new Date(dateString);

//     const timeOptions = {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     };

//     const dateOptions = {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     };

//     const time = date.toLocaleTimeString(locale, timeOptions);
//     const fullDate = date.toLocaleDateString(locale, dateOptions);

//     return `${time}, ${fullDate}`;
//   };
//   const truncate = (text, maxLength) => {
//     if (!text) return ""
//     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
//   }

//   useEffect(() => {
//     // Function to fetch blog data
//     const fetchBlogData = async () => {
//       try {
//         // Fetch from your API endpoint
//         const response = await fetch("https://api.basementex.com/blog")
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`)
//         }

//         const data = await response.json()

//         // Find the specific blog with matching ID
//         const currentBlog = data.data.find((blog) => blog._id === id)

//         if (currentBlog) {
//           console.log("Found blog:", currentBlog)
//           // Set the blog using the actual API structure
//           setBlog(currentBlog)

//           // Get other blogs for the "Recent Blogs" section
//           const otherBlogs = data.data.filter((blog) => blog._id !== id).slice(0, 2) // Get only 2 latest blogs

//           setLatestBlogs(otherBlogs)
//         } else {
//           console.error("Blog not found with ID:", id)
//           setBlog(null)
//         }
//       } catch (error) {
//         console.error("Error fetching blog data:", error)
//         setBlog(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchBlogData()
//   }, [id]) // Re-fetch when ID changes

//   if (loading) {
//     return (
//       <div className="container mt-85 pt-5">
//         <div className="text-center py-5">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-3">Loading blog...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!blog) {
//     return (
//       <div className="container mt-85 pt-5">
//         <div className="text-center py-5">
//           <h2>Blog Not Found</h2>
//           <p>The blog you're looking for doesn't exist or has been removed.</p>
//           <Link to="/blog" className="thm-btn mt-3">
//             Back to Blogs
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <section className="blog-dtl mt-85 pt-2">
//         <div className="container">
//           <div className="blog-card">
//             <div className="blog-img">
//               <img src={`https://api.basementex.com/${blog.image}`} alt={blog.title} />
//             </div>
//             <div className="blog-content">
//               <h6>{formatDate(blog.createdAt, i18n.language)}</h6>
//               <h4>{blog.title}</h4>
//               <div dangerouslySetInnerHTML={{ __html: blog.description }} />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Recent Blogs Section */}
//       <section className="blog-sec tp-space">
//         <div className="container">
//           <div className="heading d-flex justify-content-between align-items-center">
//             <h3 className="title">Our Recent Blog</h3>
//             <Link to="/blog" className="thm-btn">
//               View All
//             </Link>
//           </div>

//           <div className="row">
//             {latestBlogs.length > 0 ? (
//               latestBlogs.map((blog) => (
//                 <div className="col-lg-6 col-md-12 col-sm-12" key={blog._id}>
//                   <div className="blog-card">
//                     <div className="blog-img">
//                       {blog.image ? (
//                         <img src={`https://api.basementex.com/${blog.image}`} alt={blog.title} />
//                       ) : (
//                         <img src={PostImg} alt="Placeholder" />
//                       )}
//                     </div>
//                     <div className="blog-content">
//                       <h6>{formatDate(blog?.createdAt, i18n.language)}</h6>
//                       <h4>{truncate(blog.title, 30)}</h4>
//                       <div dangerouslySetInnerHTML={{ __html: truncate(blog.description, 200) }} />
//                       <Link to={`/blog/${blog._id}`}>
//                         Read More <i className="fal fa-long-arrow-right ms-1"></i>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-12 text-center py-3">
//                 <p>No recent blogs found</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

// export default BlogDetails

"use client";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PostImg from "../assets/images/blog-img-01.png";
import { useTranslation } from "react-i18next";

const BlogDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { t, i18n } = useTranslation();
  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  useEffect(() => {
    // Function to fetch blog data
    const fetchBlogData = async () => {
      try {
        // Fetch from your API endpoint
        const response = await fetch("https://api.basementex.com/blog");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Find the specific blog with matching ID
        const currentBlog = data.data.find((blog) => blog._id === id);

        if (currentBlog) {
          console.log("Found blog:", currentBlog);
          // Set the blog using the actual API structure
          setBlog(currentBlog);

          // Get other blogs for the "Recent Blogs" section
          const otherBlogs = data.data
            .filter((blog) => blog._id !== id)
            .slice(0, 2); // Get only 2 latest blogs

          setLatestBlogs(otherBlogs);
        } else {
          console.error("Blog not found with ID:", id);
          setBlog(null);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]); // Re-fetch when ID changes

  if (loading) {
    return (
      <div className="container mt-85 pt-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">{t("Loading...")}</span>
          </div>
          <p className="mt-3">{t("Loading blog...")}</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mt-85 pt-5">
        <div className="text-center py-5">
          <h2>{t("Blog Not Found")}</h2>
          <p>
            {t(
              "The blog you're looking for doesn't exist or has been removed."
            )}
          </p>
          <Link to="/blog" className="thm-btn mt-3">
            {t("Back to Blogs")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="blog-dtl mt-85 pt-2">
        <div className="container">
          <div className="blog-card">
            <div className="blog-img">
              <img
                src={`https://api.basementex.com/${blog.image}`}
                alt={blog.title}
              />
            </div>
            <div className="blog-content">
              <h6>{formatDate(blog.createdAt, i18n.language)}</h6>
              <h4>{blog.title}</h4>
              <div dangerouslySetInnerHTML={{ __html: blog.description }} />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs Section */}
      <section className="blog-sec tp-space">
        <div className="container">
          <div className="heading d-flex justify-content-between align-items-center">
            <h3 className="title">{t("Our Recent Blog")}</h3>
            <Link to="/blog" className="thm-btn">
              {t("View All")}
            </Link>
          </div>

          <div className="row">
            {latestBlogs.length > 0 ? (
              latestBlogs.map((blog) => (
                <div className="col-lg-6 col-md-12 col-sm-12" key={blog._id}>
                  <div className="blog-card">
                    <div className="blog-img">
                      {blog.image ? (
                        <img
                          src={`https://api.basementex.com/${blog.image}`}
                          alt={blog.title}
                        />
                      ) : (
                        <img
                          src={PostImg || "/placeholder.svg"}
                          alt={t("Placeholder")}
                        />
                      )}
                    </div>
                    <div className="blog-content">
                      <h6>{formatDate(blog?.createdAt, i18n.language)}</h6>
                      <h4>{truncate(blog.title, 30)}</h4>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncate(blog.description, 200),
                        }}
                      />
                      <Link to={`/blog/${blog._id}`}>
                        {t("Read More")}{" "}
                        <i className="fal fa-long-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-3">
                <p>{t("No recent blogs found")}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
