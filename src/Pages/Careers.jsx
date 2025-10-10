import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import images
import careerImg from "../assets/images/carrer-img.svg";
import { useTranslation } from "react-i18next";

const Careers = () => {
  // State for job listings and filters

  const [filters, setFilters] = useState({
    department: "All Departments",
    location: "All Location",
  });
  const [loading, setLoading] = useState(false);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle search button click
  const handleSearch = () => {
    // In a real app, you would filter the jobs based on the selected filters
    // For this example, we'll just log the filters
    console.log("Searching with filters:", filters);
  };

  // Format date
  const formatDate = (dateString) => {
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

    const time = date.toLocaleTimeString(undefined, timeOptions);
    const fullDate = date.toLocaleDateString(undefined, dateOptions);

    return `${time}, ${fullDate}`;
  };

  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState([]);
  const [department, setDepartment] = useState([]);

  const fetchDepartment = async () => {
    try {
      const response = await fetch(`https://api.basementex.com/department`);

      const data = await response.json();
      setDepartment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLocation = async () => {
    try {
      const response = await fetch(`https://api.basementex.com/location`);

      const data = await response.json();
      setLocation(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch(`https://api.basementex.com/career`);

      const data = await response.json();
      setJobs(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLocation();
    fetchJobs();
    fetchDepartment();
  });
  const { t } = useTranslation();
  return (
    <>
      {/* Banner Section */}
      <section className="blog-bnnr mt-85">
        <div className="container">
          <div className="blog-bnnr-innr">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-6 col-sm-6">
                <h2 className="title text-white">{t("Careers")}</h2>
                <p className="text-secondary">
                  {t("Explore career opportunities at Teachera.")}
                </p>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 text-end">
                <img
                  src={
                    careerImg ||
                    "/placeholder.svg?height=200&width=300&query=career"
                  }
                  alt="Careers"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career List Section */}
      <section className="carrer-list tp-space">
        <div className="container">
          {/* Filter Form */}
          <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
            <div className="row align-items-end">
              <div className="col-lg-4 col-md-3">
                <div className="custom-frm-bx">
                  <label htmlFor="department">{t("Department")}</label>
                  <select
                    name="department"
                    id="department"
                    className="form-select"
                    value={filters.department}
                    onChange={handleFilterChange}
                  >
                    <option>{t("All Departments")}</option>
                    {department.map((department, index) => (
                      <option key={index} value={department?.department_title}>
                        {department?.department_title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-lg-4 col-md-3">
                <div className="custom-frm-bx">
                  <label htmlFor="location">{t("Location")}</label>
                  <select
                    name="location"
                    id="location"
                    className="form-select"
                    value={filters.location}
                    onChange={handleFilterChange}
                  >
                    <option>{t("All Location")}</option>
                    {location.map((location, index) => (
                      <option key={index} value={location?.location_title}>
                        {location?.location_title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-lg-4 col-md-3">
                <div className="custom-frm-bx">
                  <button
                    className="thm-btn rounded-2 w-100"
                    type="button"
                    onClick={handleSearch}
                  >
                    {t("Search")}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Job Listings */}
          <div className="carrer-list-innr">
            <h5 className="summary-title">{t("Current Openings")}</h5>

            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">{t("Loading...")}</span>
                </div>
                <p className="mt-2">{t("Loading job listings...")}</p>
              </div>
            ) : jobs.length > 0 ? (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>{t("Job title")}</th>
                      <th>{t("Department")}</th>
                      <th>{t("Location")}</th>
                      <th>{t("Job posted on")}</th>
                      <th>{t("Experience")}</th>
                      <th>{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td>
                          <a href="javascript:void(0);">{job.title}</a>
                        </td>
                        <td>{job?.department?.department_title}</td>
                        <td>{job?.location?.location_title}</td>
                        <td>{formatDate(job.createdAt)}</td>
                        <td>{job.experience}</td>
                        <td>
                          <Link
                            to={`/career-detail/${job._id}`}
                            className="thm-btn"
                          >
                            {t("Details")}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4">
                <p>No job openings found. Please check back later.</p>
              </div>
            )}

            {/* Pagination - Commented out as in the original code */}
            {/* <div className="custom-pagination">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link" href="javascript:void(0);" aria-label="Previous">
                    <span className="far fa-chevron-left"></span><i></i>
                  </a>
                </li>
                <li className="page-item"><a className="page-link" href="javascript:void(0);">1</a></li>
                <li className="page-item active"><a className="page-link" href="javascript:void(0);">2</a></li>
                <li className="page-item"><a className="page-link" href="javascript:void(0);">3</a></li>
                <li className="page-item">..</li>
                <li className="page-item"><a className="page-link" href="javascript:void(0);">10</a></li>
                <li className="page-item">
                  <a className="page-link" href="javascript:void(0);" aria-label="Next">
                    <span className="far fa-chevron-right"></span>
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;
