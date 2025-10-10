import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// Import images
import aboutShapeImg from '../assets/images/about_shape.svg';
import aboutTeamImg from '../assets/images/about-team-img.png';
import aboutIcon1 from '../assets/images/about-icon-01.svg';
import aboutIcon2 from '../assets/images/about-icon-02.svg';
import aboutIcon3 from '../assets/images/about-icon-03.svg';
import aboutIcon4 from '../assets/images/about-icon-04.svg';
import educatioon from "../assets/images/education.png";
import { useTranslation } from 'react-i18next';
import TestimonialSlider from '../Components/Layout/Sliders/TestimonialSlider';
const AboutUs = () => {
  // State for about section data
  const [aboutSection, setAboutSection] = useState({
    // content: {
    //   description: 'Teachera is on a mission to democratize education by making high-quality learning accessible to everyone. We believe that education is a fundamental right, not a privilege. Our platform connects learners with expert instructors from around the world, offering courses in various subjects and skills.<br/><br/>Founded in 2018, Teachera has grown to become India\'s largest online learning platform, serving millions of students across the country and beyond. We offer courses in multiple languages, making education accessible to a diverse audience regardless of their background or location.'
    // },
    global_content: {
      image: educatioon,
      button_url: '#'
    }
  });

  // State for FAQ section data
  const [faqSection, setFaqSection] = useState({
    // content: {
    //   short_title: 'Why Choose Teachera?',
    //   description: 'We provide a comprehensive learning experience with features designed to help you achieve your goals.'
    // },
    global_content: {
      image: educatioon
    }
  });
  const { t } = useTranslation();
  return (
    <>
      {/* Banner Section */}
      <section className="about-bnnr mt-85">
        <div className="container">
          <div className="about-bnnr-innr">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-12">
                <h1 className="text-center text-white">
                  {t("TEACHERA is India's largest")} <span>{t('online learning Platform')}</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      {aboutSection?.global_content?.button_url && (
        <section className="about-content tp-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="heading">
                  <h2 className="title">{t('Democratise access to high quality education')}</h2>
                </div>
                {/* <div dangerouslySetInnerHTML={{ __html: aboutSection.content.description }} /> */}
                <div>{t('Teachera is on a mission to democratize education by making high-quality learning accessible to everyone. We believe that education is a fundamental right, not a privilege. Our platform connects learners with expert instructors from around the world, offering courses in various subjects and skills.')}</div>
              </div>
              <div className="col-lg-6 text-end d-xl-block d-lg-block d-none">
                <img
                  src={aboutSection.global_content.image || "/placeholder.svg"}
                  alt="About Teachera"
                  className="main-img"
                />
                <img src={aboutShapeImg || "/placeholder.svg"} alt="Shape" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <div className="container">
        <div className="row justify-content-center pb-4">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                <div className="about-card">
                  <img src={aboutIcon1 || "/placeholder.svg"} alt="Learners" />
                  <div className="about-txt">
                    <h5><span className="counts">20</span>M+</h5>
                    <p>{t('Learners')}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                <div className="about-card">
                  <img src={aboutIcon2 || "/placeholder.svg"} alt="Instructors" />
                  <div className="about-txt">
                    <h5><span className="counts">20</span>K+</h5>
                    <p>{t('Instructors')}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                <div className="about-card">
                  <img src={aboutIcon3 || "/placeholder.svg"} alt="Courses" />
                  <div className="about-txt">
                    <h5><span className="counts">1000</span>+</h5>
                    <p>{t('Courses')}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                <div className="about-card">
                  <img src={aboutIcon4 || "/placeholder.svg"} alt="Languages" />
                  <div className="about-txt">
                    <h5><span className="counts">10</span></h5>
                    <p>{t('Languages')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="choose-sec tp-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img
                src={faqSection.global_content.image || "/placeholder.svg"}
                alt="Why Choose Teachera"
              />
            </div>
            <div className="col-lg-6">
              <div className="choose-content">
                <div className="heading">
                  <h3 className="title">{t('Why Choose Teachera?')}</h3>
                  {/* <div dangerouslySetInnerHTML={{ __html: faqSection.content.description }} /> */}
                </div>
                <ul className="choose-content-list">
                  <ul className="choose-content-list">
                    <li key="expert-instructors">
                      <span className="fas fa-chalkboard-teacher"></span>
                      <div>
                        <h6>{t('Expert Instructors')}</h6>
                        <p>{t('Learn from industry professionals with real-world experience and proven teaching skills.')}</p>
                      </div>
                    </li>

                    <li key="flexible-learning">
                      <span className="fas fa-chalkboard-teacher"></span>
                      <div>
                        <h6>{t('Flexible Learning')}</h6>
                        <p>{t('Study at your own pace, on your own schedule, from anywhere in the world.')}</p>
                      </div>
                    </li>

                    <li key="comprehensive-courses">
                      <span className="fas fa-chalkboard-teacher"></span>
                      <div>
                        <h6>{t('Comprehensive Courses')}</h6>
                        <p>{t('Access a wide range of courses covering everything from technical skills to creative pursuits.')}</p>
                      </div>
                    </li>

                    <li key="practical-skills">
                      <span className="fas fa-chalkboard-teacher"></span>
                      <div>
                        <h6>{t('Practical Skills')}</h6>
                        <p>{t('Gain hands-on experience through interactive projects and real-world applications.')}</p>
                      </div>
                    </li>
                  </ul>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="tp-space">
        <div className="container">
          <div className="about-team">
            <div className="row">
              <div className="col-lg-6">
                <div className="about-team-img">
                  <img
                    src={aboutTeamImg || "/placeholder.svg?height=400&width=600&query=team"}
                    className="rounded"
                    alt="Team"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-team-content">
                  <h5>{t('COME JOIN US')}</h5>
                  <h2 className="title">{t("Let's build the future of education together")}</h2>
                  <p>
                    {t("Whether you want to learn a new skill, train your teams, or share what you know with the world, you're in the right place. As a leader in online learning, we're here to help you achieve your goals and transform your life.")}
                  </p>
                  <Link to="/careers" className="thm-btn">{t('See Open Positions')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonial tp-space">
        <div className="container">
          <div className="heading text-center">
            <h3 className="title">{t('Testimonial')}</h3>
            <p>{t('Hear from Our Successful Learners')}</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-12">
              <TestimonialSlider />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;