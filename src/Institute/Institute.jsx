import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import BannerImage from "../assets/images/institute_banner_img.png"
import icon1 from "../assets/images/institute_icon1.png"
import icon2 from "../assets/images/institute_icon2.png"
import icon3 from "../assets/images/institute_icon3.png"
import icon4 from "../assets/images/institute_icon4.png"
import courseImg from "../assets/images/course-img-01.png"
import courseUser from "../assets/images/course-user.png"
import instructor from "../assets/images/instructor-img-04.png"
const Institute = () => {
  // Mock data for institute details
  const institute = {
    name: "Institute of Management Research and Development",
    rating: 4.2,
    description: "ATMA 2024 July session result has been announced for admission to MBA/MMS/PGDM courses",
    logo: BannerImage,
    stats: [
      { icon: icon1, count: "20K+", label: "Instructors" },
      { icon: icon2, count: "10K+", label: "Learners" },
      { icon: icon3, count: "100+", label: "Courses" },
      { icon: icon4, count: "20K+", label: "Students" },
    ],
    about: `I'm Jonas, I'm a developer with a passion for teaching. I'm the lead instructor at the London App Brewery, London's leading Programming Bootcamp. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I've been invited by companies such as Twitter, Facebook and Google to teach their employees.

My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I've made hundred of websites, apps and games. But most importantly, I realised that my greatest passion is teaching.

I spend most of my time researching how to make learning to code fun and make hard concepts easy to understand. I apply everything I discover into my bootcamp courses. In my courses, you'll find lots of geeky humour but also lots of explanations and animations to make sure everything is easy to understand.

I'll be there for you every step of the way.`,
  }

  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: "Data Analysis with R for Business Intelligence",
      image: courseImg,
      students: 40,
      rating: 4.0,
      reviews: 867855,
      price: 187.0,
      originalPrice: 199,
      institute: "Institute of Management Research and Development",
      instituteLogo: BannerImage,
      instructor: "Jonas Schmedtmann",
    },
  ]

  // Mock data for instructors
  const instructors = Array(10).fill({
    id: 1002,
    name: "Mark Davenport",
    role: "Developer",
    image:instructor,
    slug: "mark-davenport",
  })

  return (
    <>
      {/* Institute Banner Section */}
      <section className="institute-banner blog-bnnr mt-85">
        <div className="container">
          <div className="blog-bnnr-innr">
            <div className="row align-items-center">
              <div className="col-lg-2 col-md-6 col-sm-6">
                <img src={institute.logo || "/placeholder.svg"} alt={institute.name} />
              </div>
              <div className="col-lg-10 col-md-6 col-sm-6">
                <div className="institute_banner-right text-start">
                  <h6>Institution</h6>
                  <div className="institute-title">
                    <h3>{institute.name}</h3>
                    <p className="rating">
                      <span>
                        <FontAwesomeIcon icon={faStar} className="me-2" />
                        {institute.rating}
                      </span>
                    </p>
                  </div>
                  <p>{institute.description}</p>

                  <div className="featured-box-section">
                    {institute.stats.map((stat, index) => (
                      <div className="featured-box" key={index}>
                        <img src={stat.icon} alt={stat.label} />
                        <div className="text-content">
                          <h3>{stat.count}</h3>
                          <p>{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="title mb-4">Details</h2>
          <p style={{ whiteSpace: "pre-line" }}>{institute.about}</p>
        </div>
      </section>

      {/* My Courses Section */}
      <section className="my-course py-5">
        <div className="container">
          <div className="mb-4">
            <h2 className="fw-bold">My Courses</h2>
            <p className="text-muted">
              Let's join our famous class, the knowledge provided will definitely be useful for you.
            </p>
          </div>
          <div className="row g-4">
            {courses.map((course) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={course.id}>
                <div className="product-card">
                  <div className="product-img">
                    <img src={course.image || "/placeholder.svg"} alt={course.title} />
                    <div className="course-usr">
                      <img src={courseUser} className="w-auto" alt="Students" />
                      <span>+ {course.students} students</span>
                    </div>
                  </div>
                  <Link to={`/course/${course.id}`}>
                    <div className="product-content">
                      <h4>{course.title}</h4>
                      <p className="rating">
                        {[...Array(Math.floor(course.rating))].map((_, i) => (
                          <FontAwesomeIcon icon={faStar} key={i} />
                        ))}
                        {course.rating}
                        <span>({course.reviews.toLocaleString()})</span>
                      </p>
                      <p className="price">
                        <span>${course.price.toFixed(2)}</span>
                        <del>${course.originalPrice}</del>
                      </p>
                      <div className="course-bttm">
                        <img src={course.instituteLogo || "/placeholder.svg"} alt={course.institute} />
                        <div>
                          <p>Institution</p>
                          <h6 className="course-name">{course.institute}</h6>
                          <p className="text-muted small mb-0">Instructor: {course.instructor}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="institute-instructores py-5 bg-light">
        <div className="container">
          <div className="mb-4">
            <h2 className="fw-bold">Instructors</h2>
            <p className="text-muted">
              At the Academy, we strive to bring together the best professors for the best courses
            </p>
          </div>
          <div className="d-flex gap-3" style={{ overflowX: "scroll", scrollbarWidth: "none" }}>
            {instructors.map((instructor, index) => (
              <div className="col-lg-2 col-md-4 col-sm-6" key={index}>
                <Link to={`/instructor-details/${instructor.id}/${instructor.slug}`}>
                  <div className="instructor-card">
                    <img src={instructor.image || "/placeholder.svg"} alt={instructor.name} />
                    <p>
                      <span>{instructor.name}</span>
                      <span>{instructor.role}</span>
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Institute
