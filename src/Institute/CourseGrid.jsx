import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import courseImg from "../assets/images/course-img-01.png"
import instituteLogo from "../assets/images/institute_banner_img.png"
import courseUser from "../assets/images/course-user.png"
const CourseGrid = ({
  title = "My Courses",
  subtitle = "Let's join our famous class, the knowledge provided will definitely be useful for you.",
}) => {
  // Mock data for courses
  const courses = [
    {
      id: 1,
      slug: "data-analysis-with-r-for-business-intelligence",
      title: "Data Analysis with R for Business Intelligence",
      image: courseImg,
      students: 40,
      rating: 4.0,
      reviews: 867855,
      price: 187.0,
      originalPrice: 199,
      institution: {
        name: "Institute of Management Research and Development",
        logo: instituteLogo,
      },
      instructor: "Jonas Schmedtmann",
    },
    {
      id: 2,
      slug: "data-analysis-with-r-for-business-intelligence",
      title: "Data Analysis with R for Business Intelligence",
      image: courseImg,
      students: 40,
      rating: 4.0,
      reviews: 867855,
      price: 187.0,
      originalPrice: 199,
      institution: {
        name: "Institute of Management Research and Development",
        logo: instituteLogo,
      },
      instructor: "Jonas Schmedtmann",
    },
    {
      id: 3,
      slug: "data-analysis-with-r-for-business-intelligence",
      title: "Data Analysis with R for Business Intelligence",
      image: courseImg,
      students: 40,
      rating: 4.0,
      reviews: 867855,
      price: 187.0,
      originalPrice: 199,
      institution: {
        name: "Institute of Management Research and Development",
        logo: instituteLogo,
      },
      instructor: "Jonas Schmedtmann",
    },
    {
      id: 4,
      slug: "data-analysis-with-r-for-business-intelligence",
      title: "Data Analysis with R for Business Intelligence",
      image: courseImg,
      students: 40,
      rating: 4.0,
      reviews: 867855,
      price: 187.0,
      originalPrice: 199,
      institution: {
        name: "Institute of Management Research and Development",
        logo: instituteLogo,
      },
      instructor: "Jonas Schmedtmann",
    },
  ]

  // Helper function to render star ratings
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />)
    }

    return stars
  }

  return (
    <section className="my-course py-5 mt-85">
      <div className="container">
        <div className="mb-4">
          <h2 className="fw-bold">{title}</h2>
          <p className="text-muted">{subtitle}</p>
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
                <Link to={`/course/${course.slug}`}>
                  <div className="product-content">
                    <h4>{course.title}</h4>
                    <p className="rating">
                      {renderStars(course.rating)}
                      {course.rating.toFixed(1)}
                      <span>({course.reviews.toLocaleString()})</span>
                    </p>
                    <p className="price">
                      <span>${course.price.toFixed(2)}</span>
                      <del>${course.originalPrice}</del>
                    </p>
                    <div className="course-bttm">
                      <img src={course.institution.logo || "/placeholder.svg"} alt={course.institution.name} />
                      <div>
                        <p>Institution</p>
                        <h6 className="course-name">{course.institution.name}</h6>
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
  )
}

export default CourseGrid
