// import React, { useEffect, useState } from 'react'
// import bannerBg from '../../../assets/images/banner-new-bg.png';
// import OwlCarousel from 'react-owl-carousel';
// import { Link } from 'react-router-dom';
// const BannerSlider = () => {
//     const [banner, setBanner] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [carouselLoaded, setCarouselLoaded] = useState(false)
//     const fetchBanner = async () => {
//         try {
//             const response = await fetch("https://api.basementex.com/api/v1/web/banner-list")
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`)
//             }
//             const data = await response.json()

//             // Check if data.data exists and is an array
//             if (data.data && Array.isArray(data.data) && data.data.length > 0) {
//                 setBanner(data.data)
//                 setTimeout(() => {
//                     setCarouselLoaded(true)
//                 }, 100)
//             } else {
//                 console.warn("Banner data is empty or not in expected format:", data)
//                 // Use fallback banner
//                 setBanner([{ image: "assets/images/banner-new-bg.png" }])
//                 setCarouselLoaded(true)
//             }
//         } catch (error) {
//             console.error("Error fetching banner:", error)
//             // Use fallback banner on error
//             setBanner([{ image: "assets/images/banner-new-bg.png" }])
//             setCarouselLoaded(true)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchBanner()

//         // Cleanup function
//         return () => {
//             setCarouselLoaded(false)
//         }
//     }, [])
//     const bannerSliderOptions = {
//         loop: false,
//         // slidesToShow: 1,
//         // slidesToScroll: 1,
//         nav: true,
//         dots: true,
//         autoplay: true,
//         autoplayTimeout: 4000,
//         smartSpeed: 1000,
//         navText: [
//             '<span class="fa fa-chevron-left "></span>',
//             '<span class="fa fa-chevron-right "></span>'
//         ],
//         responsive: {
//             0: {
//                 items: 1,
//             },
//             600: {
//                 items: 1,
//             },
//             1000: {
//                 items: 1,
//             },
//             1200: {
//                 items: 1,
//             },
//             1400: {
//                 items: 1,
//             },
//             1600: {
//                 items: 1,
//             },
//         },

//     };
//     // Function to render banner with error handling
//     const renderBanner = () => {
//         if (loading) {
//             return (
//                 <div className="loader-wrap">
//                     <div className="spin-loader"></div>
//                 </div>
//             )
//         }

//         if (!banner || banner.length === 0) {
//             // Fallback to static banner if no data
//             return <img src={bannerBg || "/placeholder.svg"} alt="Banner" />
//         }

//         if (carouselLoaded) {
//             return (
//                 <OwlCarousel className="banner-new-h owl-carousel" {...bannerSliderOptions}>
//                     {banner.map((item, index) => (

//                         <Link to={item?.link || ""} key={index}>
//                             <img
//                                 src={`https://api.basementex.com/${item?.image}`}
//                                 alt={`Banner ${index + 1}`}
//                                 onError={(e) => {
//                                     console.warn(`Failed to load banner image ${index}`, e)
//                                     e.target.src = bannerBg // Fallback image
//                                 }}
//                             />
//                         </Link>

//                     ))}
//                 </OwlCarousel>
//             )
//         }

//         // Show first banner while waiting for carousel to initialize
//         return (
//             <img
//                 src={banner[0]?.image ? `https://api.basementex.com/${banner[0].image}` : bannerBg}
//                 alt="Banner"
//                 onError={(e) => {
//                     console.warn("Failed to load banner image", e)
//                     e.target.src = bannerBg // Fallback image
//                 }}
//             />
//         )
//     }
//     useEffect(() => {
//         // Add custom styles for Owl Carousel navigation
//         const style = document.createElement("style")
//         style.innerHTML = `
//     .banner-new-h .owl-nav {
//       position: absolute;
//       top: 50%;
//       width: 100%;
//       transform: translateY(-50%);
//       display: flex;
//       justify-content: space-between;
//       pointer-events: none;
//     }
//     .banner-new-h .owl-nav button {
//       width: 40px;
//       height: 40px;
//       background: #0055D2 !important;
//       border-radius: 50%;
//       display: flex !important;
//       align-items: center;
//       justify-content: center;
//       pointer-events: auto;
//       color: #fff !important;
//     }
//     .banner-new-h .owl-nav button:hover {
//       background: #0055D2 !important;
//     }
//     .banner-new-h .owl-nav button i {
//       font-size: 20px;
//       color: #fff;
//     }
//   `
//         document.head.appendChild(style)

//         return () => {
//             document.head.removeChild(style)
//         }
//     }, [])
//     return (
//         <>
//             <style>{`.home-page .banner-new-h .owl-nav {
//       position: absolute;
//       top: 50%;
//       width: 100%;
//       transform: translateY(-50%);
//       display: flex !important;
//       justify-content: space-between;
//       pointer-events: none;
//       display:none !important;
//     }

//     .home-page .banner-new-h .owl-dots {
//                 display: flex !important;
//     justify-content: center !important;
//     position: absolute !important;
//     border: 0;
//     bottom: 15px !important;
//     width: 100% !important;
//     gap: 10px !important;
//     }
//     .home-page .banner-new-h .owl-dots .owl-dot{

//     width: 10px !important;
//     height: 10px !important;
//     border-radius: 50% !important;
//     background: #615151;
// }
//     .home-page .banner-new-h .owl-dots .owl-dot.active{

//     background: #0055D2;
// }
//     .owl-carousel .owl-item{
//         padding-left:0 !important;
//         padding-right:0 !important;
//     }

//     `}</style>
//             <div className="banner-h-main">
//                 <div className="container-fluid px-0">
//                     <div className="banner-new-h" >{renderBanner()}</div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default BannerSlider

// import React, { useEffect, useState } from 'react';
// import OwlCarousel from 'react-owl-carousel';
// import { Link } from 'react-router-dom';

// const TeacheraBanner = () => {
//     const [banners, setBanners] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [carouselLoaded, setCarouselLoaded] = useState(false);

//     // Default banner data structure
//     const defaultBanners = [
//         {
//             title: "Transform Your Teaching Journey with Teachera Plus",
//             description1: "Access premium teaching resources, expert-led courses, and innovative classroom tools.",
//             description2: "Join thousands of educators who have elevated their teaching skills and student engagement.",
//             buttonText: "Start Your Free Trial",
//             image: "https://via.placeholder.com/500x400/4285f4/ffffff?text=Happy+Teacher",
//             link: "/signup"
//         }
//     ];

//     const fetchBanners = async () => {
//         try {
//             const response = await fetch("https://api.basementex.com/api/v1/web/banner-list");

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();

//             if (data.data && Array.isArray(data.data) && data.data.length > 0) {
//                 // Map API data to our banner structure
//                 const mappedBanners = data.data.map((item, index) => ({
//                     title: item.title || `Achieve your teaching goals with Teachera Plus`,
//                     description1: item.description1 || "Subscribe to build world-class teaching skills from expert educators.",
//                     description2: item.description2 || null,
//                     buttonText: item.buttonText || "Start 7-day Free Trial",
//                     image: item.image ? `https://api.basementex.com/${item.image}` : defaultBanners[0].image,
//                     link: item.link || "/signup"
//                 }));

//                 setBanners(mappedBanners);
//                 setTimeout(() => {
//                     setCarouselLoaded(true);
//                 }, 100);
//             } else {
//                 console.warn("Banner data is empty or not in expected format:", data);
//                 setBanners(defaultBanners);
//                 setCarouselLoaded(true);
//             }
//         } catch (error) {
//             console.error("Error fetching banners:", error);
//             setBanners(defaultBanners);
//             setCarouselLoaded(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchBanners();
//         return () => {
//             setCarouselLoaded(false);
//         };
//     }, []);

//     const bannerSliderOptions = {
//         loop: banners.length > 1,
//         nav: true,
//         dots: true,
//         autoplay: false,
//         autoplayTimeout: 5000,
//         smartSpeed: 1000,
//         navText: [
//             '<span class="fa fa-chevron-left"></span>',
//             '<span class="fa fa-chevron-right"></span>'
//         ],
//         responsive: {
//             0: { items: 1 },
//             600: { items: 1 },
//             1000: { items: 1 },
//             1200: { items: 1 },
//             1400: { items: 1 },
//             1600: { items: 1 },
//         },
//     };

//     const renderBannerContent = (banner, index) => (
//         <div className="teachera-banner-slide" key={index}>
//             <div className="container-fluid">
//                 <div className="row align-items-center min-vh-60">
//                     {/* Content Section */}
//                     <div className="col-lg-6 col-md-12 order-2 order-lg-1">
//                         <div className="banner-content p-4">
//                             {/* Title */}
//                             <h1 className="banner-title mb-4">{banner.title}</h1>

//                             {/* Description 1 */}
//                             <p className="banner-description mb-3">{banner.description1}</p>

//                             {/* Description 2 (Optional) */}
//                             {banner.description2 && (
//                                 <p className="banner-description-secondary mb-4">{banner.description2}</p>
//                             )}

//                             {/* CTA Button */}
//                             <div className="cta-section mb-3">
//                                 <Link to={banner.link || "/signup"}>
//                                     <button className="btn btn-primary btn-lg cta-button">
//                                         {banner.buttonText}
//                                     </button>
//                                 </Link>
//                             </div>

//                             {/* Additional Info */}
//                             <p className="additional-info">
//                                 or ₹2,999/year with 14-day money-back guarantee
//                             </p>
//                         </div>
//                     </div>

//                     {/* Hero Image Section */}
//                     <div className="col-lg-6 col-md-12 order-1 order-lg-2">
//                         <div className="hero-image-container p-4">
//                             <div className="image-wrapper position-relative">
//                                 {/* Background decorative elements */}
//                                 <div className="bg-decoration bg-decoration-1"></div>
//                                 <div className="bg-decoration bg-decoration-2"></div>

//                                 {/* Main image */}
//                                 <img
//                                     src={banner.image || "/placeholder.svg"}
//                                     alt={`Banner ${index + 1}`}
//                                     className="hero-image img-fluid rounded-3 shadow-lg"
//                                     onError={(e) => {
//                                         console.warn(`Failed to load banner image ${index}`, e);
//                                         e.target.src = defaultBanners[0].image;
//                                     }}
//                                 />

//                                 {/* Floating elements */}
//                                 <div className="floating-element floating-element-1">
//                                     📚
//                                 </div>
//                                 <div className="floating-element floating-element-2">
//                                     🎓
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

//     const renderBanner = () => {
//         if (loading) {
//             return (
//                 <div className="loader-wrap">
//                     <div className="spin-loader"></div>
//                 </div>
//             );
//         }

//         if (!banners || banners.length === 0) {
//             return renderBannerContent(defaultBanners[0], 0);
//         }

//         if (banners.length === 1) {
//             return renderBannerContent(banners[0], 0);
//         }

//         if (carouselLoaded) {
//             return (
//                 <OwlCarousel className="teachera-banner-carousel owl-carousel" {...bannerSliderOptions}>
//                     {banners.map((banner, index) => renderBannerContent(banner, index))}
//                 </OwlCarousel>
//             );
//         }

//         return renderBannerContent(banners[0], 0);
//     };

//     return (
//         <>
//             <style>{`
//                 .teachera-banner-carousel .owl-nav {
//                     position: absolute;
//                     top: 50%;
//                     width: 100%;
//                     transform: translateY(-50%);
//                     display: flex !important;
//                     justify-content: space-between;
//                     pointer-events: none;
//                     z-index: 10;
//                 }

//                 .teachera-banner-carousel .owl-nav button {
//                     width: 50px;
//                     height: 50px;
//                     background: #0055D2 !important;
//                     border-radius: 50%;
//                     display: flex !important;
//                     align-items: center;
//                     justify-content: center;
//                     pointer-events: auto;
//                     color: #fff !important;
//                     border: none;
//                     margin: 0 20px;
//                 }

//                 .teachera-banner-carousel .owl-nav button:hover {
//                     background: #003d99 !important;
//                     transform: scale(1.1);
//                 }

//                 .teachera-banner-carousel .owl-dots {
//                     display: flex !important;
//                     justify-content: center !important;
//                     position: absolute !important;
//                     bottom: 30px !important;
//                     width: 100% !important;
//                     gap: 10px !important;
//                     z-index: 10;
//                 }

//                 .teachera-banner-carousel .owl-dots .owl-dot {
//                     width: 12px !important;
//                     height: 12px !important;
//                     border-radius: 50% !important;
//                     background: rgba(255, 255, 255, 0.5) !important;
//                     border: 2px solid #0055D2;
//                     transition: all 0.3s ease;
//                 }

//                 .teachera-banner-carousel .owl-dots .owl-dot.active {
//                     background: #0055D2 !important;
//                     transform: scale(1.2);
//                 }

//                 .owl-carousel .owl-item {
//                     padding-left: 0 !important;
//                     padding-right: 0 !important;
//                 }

//                 .loader-wrap {
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     height: 400px;
//                 }

//                 .spin-loader {
//                     width: 50px;
//                     height: 50px;
//                     border: 4px solid #f3f3f3;
//                     border-top: 4px solid #0055D2;
//                     border-radius: 50%;
//                     animation: spin 1s linear infinite;
//                 }

//                 @keyframes spin {
//                     0% { transform: rotate(0deg); }
//                     100% { transform: rotate(360deg); }
//                 }
//             `}</style>

//             <div className="teachera-banner-main">
//                 <div className="container-fluid px-0">
//                     <div className="teachera-banner-wrapper">
//                         {renderBanner()}
//                     </div>
//                 </div>
//             </div>
//             <style>
//                 {`
//                 /* Teachera Banner Styles */
// .teachera-banner-slide {
//   background: linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 100%);
//   min-height: 70vh;
//   padding: 60px 0;
//   position: relative;
// }

// .teachera-banner-main {
//   position: relative;
//   overflow: hidden;
// }

// /* Typography */
// .banner-title {
//   font-size: 3rem;
//   font-weight: 700;
//   color: #212529;
//   line-height: 1.2;
//   margin-bottom: 1.5rem;
// }

// .banner-description {
//   font-size: 1.25rem;
//   color: #495057;
//   line-height: 1.6;
//   max-width: 500px;
// }

// .banner-description-secondary {
//   font-size: 1.1rem;
//   color: #6c757d;
//   line-height: 1.5;
//   max-width: 500px;
// }

// /* CTA Button */
// .cta-button {
//   background: #0055D2;
//   border: none;
//   padding: 15px 30px;
//   font-size: 1.1rem;
//   font-weight: 600;
//   border-radius: 8px;
//   box-shadow: 0 4px 15px rgba(0, 85, 210, 0.3);
//   transition: all 0.3s ease;
//   text-decoration: none;
// }

// .cta-button:hover {
//   background: #003d99;
//   transform: translateY(-2px);
//   box-shadow: 0 6px 20px rgba(0, 85, 210, 0.4);
// }

// /* Additional Info */
// .additional-info {
//   color: #0055D2;
//   font-weight: 500;
//   font-size: 0.9rem;
// }

// /* Hero Image Section */
// .hero-image-container {
//   position: relative;
// }

// .image-wrapper {
//   position: relative;
//   z-index: 2;
// }

// .hero-image {
//   width: 100%;
//   max-width: 500px;
//   height: auto;
//   border-radius: 15px !important;
//   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
// }

// /* Background Decorations */
// .bg-decoration {
//   position: absolute;
//   border-radius: 50%;
//   z-index: 1;
// }

// .bg-decoration-1 {
//   width: 120px;
//   height: 120px;
//   background: rgba(0, 85, 210, 0.1);
//   top: -20px;
//   right: -20px;
// }

// .bg-decoration-2 {
//   width: 80px;
//   height: 80px;
//   background: rgba(63, 81, 181, 0.15);
//   bottom: -20px;
//   left: -20px;
// }

// /* Floating Elements */
// .floating-element {
//   position: absolute;
//   background: #0055D2;
//   color: white;
//   width: 50px;
//   height: 50px;
//   border-radius: 12px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.2rem;
//   box-shadow: 0 8px 25px rgba(0, 85, 210, 0.3);
//   z-index: 3;
//   animation: float 3s ease-in-out infinite;
// }

// .floating-element-1 {
//   top: 60px;
//   right: 60px;
//   transform: rotate(15deg);
//   animation-delay: 0s;
// }

// .floating-element-2 {
//   bottom: 60px;
//   left: 60px;
//   background: #3f51b5;
//   transform: rotate(-15deg);
//   animation-delay: 1.5s;
// }

// /* Float Animation */
// @keyframes float {
//   0%, 100% {
//     transform: translateY(0px) rotate(15deg);
//   }
//   50% {
//     transform: translateY(-10px) rotate(15deg);
//   }
// }

// .floating-element-2 {
//   animation-name: float-reverse;
// }

// @keyframes float-reverse {
//   0%, 100% {
//     transform: translateY(0px) rotate(-15deg);
//   }
//   50% {
//     transform: translateY(-10px) rotate(-15deg);
//   }
// }

// /* Responsive Design */
// @media (max-width: 991.98px) {
//   .banner-title {
//     font-size: 2.5rem;
//     text-align: center;
//   }

//   .banner-description,
//   .banner-description-secondary {
//     text-align: center;
//     margin: 0 auto 1rem auto;
//   }

//   .cta-section {
//     text-align: center;
//   }

//   .additional-info {
//     text-align: center;
//   }

//   .teachera-banner-slide {
//     padding: 40px 0;
//   }
// }

// @media (max-width: 767.98px) {
//   .banner-title {
//     font-size: 2rem;
//   }

//   .banner-description {
//     font-size: 1.1rem;
//   }

//   .floating-element-1 {
//     top: 30px;
//     right: 30px;
//   }

//   .floating-element-2 {
//     bottom: 30px;
//     left: 30px;
//   }

//   .bg-decoration-1 {
//     width: 80px;
//     height: 80px;
//   }

//   .bg-decoration-2 {
//     width: 60px;
//     height: 60px;
//   }

//   .teachera-banner-carousel .owl-nav button {
//     width: 40px;
//     height: 40px;
//     margin: 0 10px;
//   }
// }

// @media (max-width: 575.98px) {
//   .banner-title {
//     font-size: 1.75rem;
//   }

//   .cta-button {
//     width: 100%;
//     max-width: 300px;
//   }

//   .teachera-banner-slide {
//     padding: 30px 0;
//     min-height: 60vh;
//   }
// }
//                 `}
//             </style>
//         </>
//     );
// };

// export default TeacheraBanner;

import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const TeacheraBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselLoaded, setCarouselLoaded] = useState(false);
  const { t, i18n } = useTranslation();
  // Default banner data
  const defaultBanners = [
    {
      title: "Transform Your Teaching Journey with Teachera Plus",
      description1:
        "Subscribe to build world-class teaching skills from expert educators.",
      description2:
        "Join thousands of educators who have elevated their teaching skills.",
      buttonText: "Start 7-day Free Trial",
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/DMFk42PH8L9y9MeQ5xc7I/c55cade640bb097b0e5429b780ff7c98/redesigned-hero-image.png?auto=format%2Ccompress&dpr=2&w=679",
      link: "/signup",
    },
  ];

  const fetchBanners = async () => {
    try {
      const response = await fetch(
        "https://api.basementex.com/api/v1/web/banner-list"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        const mappedBanners = data.data.map((item) => ({
          title:
            item.title || "Transform Your Teaching Journey with Teachera Plus",
          arabic_title: item.arabic_title || "",
          description1:
            item.description1 ||
            "Subscribe to build world-class teaching skills from expert educators.",
          arabic_description1: item.arabic_description1,
          description2: item.description2 || null,
          arabic_description2: item.arabic_description2,
          buttonText: item.buttonText || "Start 7-day Free Trial",
          arabic_buttonText: item.arabic_buttonText,
          image: item.image
            ? `https://api.basementex.com/${item.image}`
            : defaultBanners[0].image,
          arabic_image: item?.arabic_image
            ? `https://api.basementex.com/${item.arabic_image}`
            : "",
          link: item.link || "/signup",
        }));

        setBanners(mappedBanners);
        setTimeout(() => setCarouselLoaded(true), 100);
      } else {
        setBanners(defaultBanners);
        setCarouselLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      setBanners(defaultBanners);
      setCarouselLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
    return () => setCarouselLoaded(false);
  }, []);

  const bannerSliderOptions = {
    loop: banners.length > 1,
    nav: false,
    dots: true,
    autoplay: false,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    navText: [
      '<span class="fa fa-chevron-left"></span>',
      '<span class="fa fa-chevron-right"></span>',
    ],
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
      1200: { items: 1 },
      1400: { items: 1 },
      1600: { items: 1 },
    },
  };

  const renderBannerContent = (banner, index) => (
    <div className="teachera-banner-slide" key={index}>
      <div className="container">
        <div className="row align-items-center">
          {/* Content Section */}
          <div className="col-lg-6 col-md-12">
            <div className="banner-content">
              <h1 className="banner-title">
                {i18n?.language == "en" || banner?.arabic_title == ""
                  ? banner.title
                  : banner.arabic_title}
              </h1>
              <p className="banner-description">
                {i18n?.language == "en" || banner?.arabic_description1 == ""
                  ? banner.description1
                  : banner?.arabic_description1}
              </p>

              <div className="cta-section">
                <Link to={banner.link || "/signup"}>
                  <button className="btn btn-primary cta-button">
                    {i18n?.language == "en" || banner?.arabic_buttonText == ""
                      ? banner.buttonText
                      : banner.arabic_buttonText}
                  </button>
                </Link>
              </div>
              {banner.description2 && (
                <p className="banner-description-secondary">
                  {i18n?.language == "en" || banner?.arabic_description2 == ""
                    ? banner?.description2
                    : banner?.arabic_description2}
                </p>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 col-md-12">
            <div className="heroo-image-container">
              <img
                src={
                  i18n?.language == "en" || banner?.arabic_image == ""
                    ? banner.image
                    : banner?.arabic_image
                }
                alt={`Banner ${index + 1}`}
                className="heroo-image"
                onError={(e) => {
                  e.target.src = defaultBanners[0].image;
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
               
                /* Simple Teachera Banner Styles */
.teachera-banner-slide {
  background: linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 100%);
  padding: 90px 0;
  padding-bottom: 0;
}

.teachera-banner-main {
  position: relative;
}

/* Content Styles */
.banner-content {
  padding:30PX 0 20px 0;
}

.banner-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 25px;
}

.banner-description {
  font-size: 1.2rem;
  color: #495057;
  margin-bottom: 20px;
}

.banner-description-secondary {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 20px;
  margin-top: 20px;
}

.cta-button {
  background: #0055D2;
  border: none;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 5px;
  color: white;
  text-decoration: none;
}

.cta-button:hover {
  background: #003d99;
  color: white;
}

.additional-info {
  color: #0055D2;
  font-size: 0.9rem;
  margin-top: 15px;
}

/* Image Styles */
.heroo-image-container {
  text-align: end;
  padding: 20px 0;
}

.hero-image {
  width: 100%;
  max-width: 500px;
  height: auto;
}

/* Carousel Navigation */
.teachera-banner-carousel .owl-nav {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  display: flex !important;
  justify-content: space-between;
  pointer-events: none;
}

.teachera-banner-carousel .owl-nav button {
  width: 40px;
  height: 40px;
  background: #0055D2 !important;
  border-radius: 50%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  color: #fff !important;
  border: none;
  margin: 0 15px;
}

.teachera-banner-carousel .owl-nav button:hover {
  background: #003d99 !important;
}

.teachera-banner-carousel .owl-dots {
  display: flex !important;
  justify-content: center !important;
  margin-top: 20px;
  gap: 8px;
}

.teachera-banner-carousel .owl-dots .owl-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 85, 210, 0.3);
}

.teachera-banner-carousel .owl-dots .owl-dot.active {
  background: #0055D2;
}
.teachera-banner-main .owl-nav.disabled{
               display:none !important; 
               }
/* Loading Spinner */
.loader-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.spin-loader {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #0055D2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 991.98px) {
  .banner-title {
    font-size: 2rem;
    text-align: center;
  }
  
  .banner-description,
  .banner-description-secondary {
    text-align: center;
  }
  
  .cta-section {
    text-align: center;
  }
  
  .additional-info {
    text-align: center;
  }
}

@media (max-width: 767.98px) {
  .banner-title {
    font-size: 1.8rem;
  }
  
  .teachera-banner-slide {
    padding: 60px 0;
    padding-bottom: 0;
  }
  
  .teachera-banner-carousel .owl-nav button {
    width: 35px;
    height: 35px;
    margin: 0 10px;
  }
  .banner-content {
    padding:70PX 0 20px 0;
  }
}

@media (max-width: 575.98px) {
  .banner-title {
    font-size: 1.5rem;
  }
  
  .cta-button {
    width: 100%;
    max-width: 250px;
  }
}
                `}
      </style>
    </div>
  );

  if (loading) {
    return (
      <div className="loader-wrap">
        <div className="spin-loader"></div>
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return renderBannerContent(defaultBanners[0], 0);
  }

  if (banners.length === 1) {
    return renderBannerContent(banners[0], 0);
  }

  if (carouselLoaded) {
    return (
      <div className="teachera-banner-main">
        <OwlCarousel
          className="teachera-banner-carousel owl-carousel"
          {...bannerSliderOptions}
        >
          {banners.map((banner, index) => renderBannerContent(banner, index))}
        </OwlCarousel>
      </div>
    );
  }

  return renderBannerContent(banners[0], 0);
};

export default TeacheraBanner;
