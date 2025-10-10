// "use client"

// import { useEffect, useState } from "react"
// import { Modal } from "react-bootstrap"
// import { useParams } from "react-router-dom"
// import { toast } from "react-toastify"

// const CareerDetails = () => {
//   const [showModal, setShowModal] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const { id } = useParams()
//   const [jobData, setJobData] = useState({})
//   const [formSubmitting, setFormSubmitting] = useState(false)
//   const [formSuccess, setFormSuccess] = useState(false)
//   const [formError, setFormError] = useState(null)

//   useEffect(() => {
//     const fetchCareerDetails = async () => {
//       try {
//         // Fetch from your API endpoint
//         const response = await fetch("https://api.basementex.com/career")
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`)
//         }
//         const data = await response.json()

//         const currentJob = data.data.find((job) => job._id === id)

//         if (currentJob) {
//           setJobData(currentJob)
//         } else {
//           console.error("Job not found with ID:", id)
//           setJobData(null)
//         }
//       } catch (error) {
//         console.error("Error fetching job data:", error)
//         setJobData(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCareerDetails()
//   }, [id])

//   const formatDate = (dateString) => {
//     const date = new Date(dateString)

//     const dateOptions = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }

//     const fullDate = date.toLocaleDateString(undefined, dateOptions)

//     return ` ${fullDate}`
//   }

//   const handleModalClose = () => setShowModal(false)
//   const handleModalShow = () => setShowModal(true)

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile_number: "",
//     resume: null,
//   })

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       resume: e.target.files[0],
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setFormSubmitting(true)
//     setFormError(null)

//     try {

//       const formPayload = new FormData()
//       formPayload.append("id", jobData._id)
//       formPayload.append("name", formData.name)
//       formPayload.append("email", formData.email)
//       formPayload.append("mobile_number", formData.mobile_number)
//       formPayload.append("resume", formData.resume)

//       const response = await fetch("https://api.basementex.com/job", {
//         method: "POST",

//         body: formPayload,
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! Status: ${response.status}`)
//       }

//       const data = await response.json()
//       setFormSuccess(true)
//       toast.success("Job applied successfully")
//       setTimeout(() => {
//         handleModalClose()
//         setFormSuccess(false)
//       }, 2000)

//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         mobile_number: "",
//         resume: null,
//       })
//     } catch (error) {
//       console.error("Error submitting application:", error)
//       setFormError(error.message || "Failed to submit application. Please try again.")
//     } finally {
//       setFormSubmitting(false)
//     }
//   }

//   if (loading) {
//     return <div className="container mt-5 pt-5 text-center">Loading job details...</div>
//   }

//   if (!jobData) {
//     return <div className="container mt-5 pt-5 text-center">Job not found</div>
//   }

//   return (
//     <>
//       <section className="carrer-list tp-space mt-85 pt-3">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="carrer-list-innr">
//                 <h2 className="title mb-4">{jobData.title || ""}</h2>
//                 <div className="carrer-list-innr-option">
//                   <div className="d-flex">
//                     <p>
//                       <span className="text-left">Department</span>
//                       {jobData?.department?.department_title || ""}
//                     </p>
//                     <p>
//                       <span>Job posted on</span>
//                       {jobData?.createdAt ? formatDate(jobData.createdAt) : ""}
//                     </p>
//                     <p>
//                       <span>Experience </span>
//                       {jobData?.experience || ""}
//                     </p>
//                   </div>
//                   <div>
//                     <button onClick={handleModalShow} className="thm-btn">
//                       Apply for this job
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="summary-card">
//                 <h5 className="summary-title">Job Description</h5>
//                 <div dangerouslySetInnerHTML={{ __html: jobData?.description || "" }} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Job Apply form  start */}
//       <Modal show={showModal} onHide={handleModalClose} centered size="lg" className="appyl-job-model" id="appy-job">
//         <Modal.Header>
//           <Modal.Title id="exampleModalLabel">Job Application</Modal.Title>
//           <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
//         </Modal.Header>
//         <Modal.Body>
//           {/* {formSuccess ? (
//             <div className="alert alert-success text-center">Application submitted successfully!</div>
//           ) : ( */}
//           <form onSubmit={handleSubmit}>
//             <input type="hidden" name="carrer_id" id="carrer_id" value={jobData._id} />
//             {formError && <div className="alert alert-danger">{formError}</div>}
//             <div className="custom-frm-bx">
//               <label htmlFor="name">Full Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter Full Name"
//                 name="name"
//                 id="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="custom-frm-bx">
//               <label htmlFor="email">Email Id</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Enter Email Id"
//                 name="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="custom-frm-bx">
//               <label htmlFor="mobile_number">Mobile Number</label>
//               <input
//                 type="tel"
//                 className="form-control"
//                 placeholder="Enter Mobile Number"
//                 name="mobile_number"
//                 id="mobile_number"
//                 value={formData.mobile_number}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="custom-frm-bx">
//               <label htmlFor="resume">Add CV</label>
//               <input
//                 type="file"
//                 className="form-control"
//                 name="resume"
//                 id="resume"
//                 accept="application/pdf"
//                 onChange={handleFileChange}
//                 required
//               />
//               <small className="text-muted">Please upload PDF files only</small>
//             </div>
//             <div className="custom-frm-bx text-center">
//               <button className="thm-btn" type="submit" disabled={formSubmitting}>
//                 {formSubmitting ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </form>
//           {/* )} */}
//         </Modal.Body>
//       </Modal>
//     </>
//   )
// }

// export default CareerDetails

"use client";

import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import loaderImg from "../assets/images/loaderImg.png";
import { useTranslation } from "react-i18next";
const CareerDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [jobData, setJobData] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loadingAppliedJobs, setLoadingAppliedJobs] = useState(true);
  const { t } = useTranslation();
  // Fetch job details
  useEffect(() => {
    const fetchCareerDetails = async () => {
      try {
        const response = await fetch("https://api.basementex.com/career");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const currentJob = data.data.find((job) => job._id === id);

        if (currentJob) {
          setJobData(currentJob);
        } else {
          console.error("Job not found with ID:", id);
          setJobData(null);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
        setJobData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerDetails();
  }, [id]);

  // Fetch user's applied jobs
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setLoadingAppliedJobs(true);
        const response = await fetch("https://api.basementex.com/job");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAppliedJobs(data.data || []);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setAppliedJobs([]);
      } finally {
        setLoadingAppliedJobs(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  // Check if user has already applied for this job
  const hasApplied = appliedJobs.some(
    (job) => job.job_id === id || job._id === id
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const fullDate = date.toLocaleDateString(undefined, dateOptions);

    return ` ${fullDate}`;
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => {
    if (hasApplied) {
      // If already applied, show an alert instead of opening the modal
      alert("You have already applied for this job.");
      return;
    }
    setShowModal(true);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    resume: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasApplied) {
      setFormError("You have already applied for this job.");
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    try {
      const formPayload = new FormData();
      formPayload.append("id", jobData._id);
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("mobile_number", formData.mobile_number);
      formPayload.append("resume", formData.resume);

      const response = await fetch("https://api.basementex.com/job", {
        method: "POST",

        body: formPayload,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();

      setAppliedJobs([...appliedJobs, { job_id: jobData._id, ...data.data }]);

      setFormSuccess(true);
      setTimeout(() => {
        handleModalClose();
        setFormSuccess(false);
      }, 2000);

      setFormData({
        name: "",
        email: "",
        mobile_number: "",
        resume: null,
      });
    } catch (error) {
      console.error("Error submitting application:", error);

      if (
        error.message &&
        error.message.toLowerCase().includes("already applied")
      ) {
        setFormError("You have already applied for this job.");

        if (!hasApplied) {
          setAppliedJobs([...appliedJobs, { job_id: jobData._id }]);
        }
      } else {
        setFormError(
          error.message || "Failed to submit application. Please try again."
        );
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
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

  if (!jobData) {
    return <div className="container mt-5 pt-5 text-center">Job not found</div>;
  }

  return (
    <>
      <section className="carrer-list tp-space mt-85 pt-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="carrer-list-innr">
                <h2 className="title mb-4">{jobData.title || ""}</h2>
                <div className="carrer-list-innr-option">
                  <div className="d-flex">
                    <p>
                      <span className="text-left">Department</span>
                      {jobData?.department?.department_title || ""}
                    </p>
                    <p>
                      <span>Job posted on</span>
                      {jobData?.createdAt ? formatDate(jobData.createdAt) : ""}
                    </p>
                    <p>
                      <span>Experience </span>
                      {jobData?.experience || ""}
                    </p>
                  </div>
                  <div>
                    {hasApplied ? (
                      <button className="thm-btn thm-btn-disabled" disabled>
                        Already Applied
                      </button>
                    ) : (
                      <button onClick={handleModalShow} className="thm-btn">
                        Apply for this job
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="summary-card">
                <h5 className="summary-title">Job Description</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobData?.description || "",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Apply form  start */}
      <Modal
        show={showModal}
        onHide={handleModalClose}
        centered
        size="lg"
        className="appyl-job-model"
        id="appy-job"
      >
        <Modal.Header>
          <Modal.Title id="exampleModalLabel">Job Application</Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={handleModalClose}
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          {formSuccess ? (
            <div className="alert alert-success text-center">
              Application submitted successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="carrer_id"
                id="carrer_id"
                value={jobData._id}
              />
              {formError && (
                <div className="alert alert-danger">{formError}</div>
              )}
              <div className="custom-frm-bx">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full Name"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="custom-frm-bx">
                <label htmlFor="email">Email Id</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email Id"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="custom-frm-bx">
                <label htmlFor="mobile_number">Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter Mobile Number"
                  name="mobile_number"
                  id="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="custom-frm-bx">
                <label htmlFor="resume">Add CV</label>
                <input
                  type="file"
                  className="form-control"
                  name="resume"
                  id="resume"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                />
                <small className="text-muted">
                  Please upload PDF files only
                </small>
              </div>
              <div className="custom-frm-bx text-center">
                <button
                  className="thm-btn"
                  type="submit"
                  disabled={formSubmitting || hasApplied}
                >
                  {formSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CareerDetails;
