import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import OwlCarousel from "react-owl-carousel";
const TestimonialSlider = () => {
  const { t } = useTranslation();
  // Testimonial slider settings matching original Owl Carousel configuration
  const testimonialOptions = {
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 6000,
    smartSpeed: 1000,
    navText: [
      '<span class="fa fa-chevron-left d-none"></span>',
      '<span class="fa fa-chevron-right d-none"></span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.basementex.com/testimonial");

        const data = await response.json();
        setTestimonials(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);
  return (
    <>
      {/* <OwlCarousel className="testimonial-slides owl-carousel" {...testimonialOptions}>
                {testimonials.map(testimonial => (
                    <div className="testimonial-card" key={testimonial?._id}>
                        <div className="testimonial-card-img">
                            <img src={`https://api.basementex.com/${testimonial?.image}`} alt={testimonial?.name} className='h-100' />
                        </div>
                        <div className="testimonial-card-content">
                            <p className="rating">
                                {[...Array(testimonial?.rating)].map((_, i) => (
                                    <i className="fas fa-star" key={i}></i>
                                ))}
                            </p>
                            <p>"{testimonial?.content}"</p>
                            <h5>{testimonial?.name}</h5>
                        </div>
                    </div>
                ))}
            </OwlCarousel> */}
      {testimonials.length > 0 && (
        <OwlCarousel
          className="testimonial-slides owl-carousel"
          {...testimonialOptions}
        >
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial?._id}>
              <div className="testimonial-card-img">
                <img
                  src={`https://api.basementex.com/${testimonial?.image}`}
                  alt={testimonial?.name}
                  className="h-100"
                />
              </div>
              <div className="testimonial-card-content">
                <p className="rating">
                  {[...Array(testimonial?.rating)].map((_, i) => (
                    <i className="fas fa-star" key={i}></i>
                  ))}
                </p>
                <p>"{testimonial?.content}"</p>
                <h5>{testimonial?.name}</h5>
              </div>
            </div>
          ))}
        </OwlCarousel>
      )}
    </>
  );
};

export default TestimonialSlider;
