import { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import moment from "moment";
import axios from "axios";
import { baseUrl } from "../../config/baseUrl";
import Swal from "sweetalert2";
import toastify from "../../config/toastify";
import loaderContext from "../../Context/LoaderContext";

export default function CourseList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [SequenceChange, setIsSequenceChange] = useState(false);

  const [paginationDetails, setPaginationDetails] = useState({
    currentPage: 1,
    totalPages: 3,
    totalRecords: 25,
  });
  const fileInputRef = useRef(null);
  let { setLoader } = useContext(loaderContext);

  const [testPackage, setTestPackage] = useState([]);

  useEffect(() => {
    fetchLiveData();
  }, []);

  const fetchLiveData = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/admin/course/course-list`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // console.log(response.data.data?.length);
      setTestPackage(response.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  let bulkAddApi = async (file, course) => {
    try {
      let response = await axios({
        method: "POST",
        // url: `${baseUrl}/api/v1/admin/order/bulk-upload`,
        url: `${baseUrl}/api/v1/admin/purchase-history/bulk-add/${course}`,
        data: file,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.data.status) {
        fetchLiveData();
        Swal.fire({
          title: "data uploaded!",
          icon: "success",
          draggable: true,
        });
      } else {
        toastify.error("");
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  const handleUploadFile = (e, id) => {
    let file = e.target.files[0];
    let postData = new FormData();
    postData.append("excel", file);
    e.target.value = "";

    bulkAddApi(postData, id);
  };

  //   const handleUploadFile = (e, courseId) => {
  //   let file = e.target.files[0];
  //   let postData = new FormData();
  //   postData.append("excel", file);
  //   postData.append("course_id", courseId);
  //   apiCall(postData);
  // };

  // Handle status toggle
  const handleStatus = async (id, getstatus) => {
    // setTestPackage((prevPackages) => {
    //   return prevPackages.map((pkg) => {
    //     if (pkg._id === id) {
    //       const newStatus = getstatus === "active" ? "inactive" : "active";

    //       return { ...pkg, status: newStatus };
    //     }
    //     console.log(id, getstatus);

    //     return pkg;
    //   });
    // });
    try {
      await axios(
        `${baseUrl}/api/v1/admin/course-category/category-status/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      fetchLiveData();
      Swal.fire({
        title: "Status Changed!",
        icon: "success",
        draggable: true,
      });
    } catch (error) {}
  };

  const handleApproveDetails = async (id, data) => {
    setLoader(true);
    try {
      await axios(`${baseUrl}/api/v1/admin/course/course-update/${id}`, {
        data: { is_approved: data },
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      fetchLiveData();
      Swal.fire({
        title: "Status Changed!",
        icon: "success",
        draggable: true,
      });
    } catch (error) {}
  };

  const itemsPerPage = 100;
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedPackages = testPackage.slice(startIndex, endIndex);

  const handleDelete = (id) => {
    let apiCall = async () => {
      let res = await fetch(
        `${baseUrl}/api/v1/admin/course/course-delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const result = await res.json();
      if (result.status) {
        fetchLiveData();
      }
    };
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the chapter, along with all lessons and quizzes. You won't be able to undo this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        apiCall();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <section className="main-sec">
        <div className="row">
          <div className="col-lg-6">
            <div className="dashboard-title">
              <h4 className="dash-head">
                <i className="fa fa-chart-bar me-2" />
                Courses
              </h4>
            </div>
            <div className="custom-bredcump">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Courses
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-lg-6 text-end">
            <Link
              to={`${baseUrl}/bulk_upload_sample_courses.xlsx`}
              download
              className="btn btn-info text-white me-3"
            >
              <i className="fa fa-arrow-down me-1"></i>
              Download Format
            </Link>

            <Link
              to="/courses/add"
              className="btn py-2 px-5 text-white btn-for-add"
            >
              <i className="fa fa-plus me-2"></i>
              Add Course
            </Link>
          </div>

          <div className="col-lg-12">
            <div className="cards bus-list">
              <div className="bus-filter">
                <div className="row ">
                  <div className="col-lg-6">
                    <h5 className="card-title">Course List</h5>
                  </div>
                </div>
              </div>
              <div className="table table-responsive custom-table">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>Sr. no.</th>
                      <th>Title</th>
                      <th>Instructor</th>
                      <th>Price</th>
                      <th>Created Date</th>
                      <th>Update Date</th>
                      <th>Status</th>
                      <th>Approve</th>
                      <th>Assign</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedPackages.map((arr, i) => {
                      return (
                        <tr key={arr?._id}>
                          <td>{startIndex + i + 1}</td>
                          <td>
                            <span>{arr?.title}</span>
                          </td>
                          <td>{arr?.instructorDetails?.name}</td>
                          <td>
                            <span>{arr?.price}</span>
                          </td>

                          <td>
                            <span>{moment(arr?.createdAt).format("LLL")}</span>
                          </td>
                          <td>
                            <span>{moment(arr?.updatedAt).format("LLL")}</span>
                          </td>
                          <td>
                            <button
                              // onClick={() =>
                              //   handleStatus(arr?._id, arr?.status)
                              // }

                              className={
                                arr?.status === "active"
                                  ? "btn btn-pill btn btn-primary btn-sm"
                                  : arr?.status === "is_draft"
                                  ? "btn btn-pill btn btn-warning  btn-sm"
                                  : "btn btn-pill btn btn-danger btn-sm"
                              }
                            >
                              <span>{arr?.status}</span>
                            </button>
                          </td>
                          <td className="course-table-approve">
                            <select
                              name="is_approved"
                              value={arr?.is_approved}
                              onChange={(e) =>
                                handleApproveDetails(arr?._id, e.target.value)
                              }
                              className="form-control course-change-status"
                              data-id="82"
                              fdprocessedid="xk72d"
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td>
                            <label
                              htmlFor={`fileUpload-${arr._id}`}
                              className="btn btn-info text-white"
                            >
                              Assign
                            </label>
                            <input
                              type="file"
                              id={`fileUpload-${arr._id}`}
                              onChange={(e) => {
                                console.log(arr?._id);

                                handleUploadFile(e, arr?._id);
                              }}
                              className="d-none"
                            />
                          </td>
                          <td>
                            <div className="action-buttons">
                              <Link
                                className="action-btn edit-btn"
                                to={`/courses/add/${arr?._id}`}
                              >
                                <i className="fa fa-edit" />
                              </Link>
                              {/* <Link
                                to={`/view/${arr?._id}`}
                                className="action-btn edit-btn bg-warning"
                              >
                                <i className="fa fa-eye"></i>
                                <span className="tooltip-text">View</span>
                              </Link> */}
                              <Link
                                onClick={() => handleDelete(arr?._id)}
                                className="action-btn edit-btn bg-danger"
                              >
                                <i className="fa fa-trash"></i>
                                <span className="tooltip-text">delete</span>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* {totalPages > 1 && (
                  <Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    pageLimit={testPackage.length}
                    paginationDetails={paginationDetails}
                    totalPages={totalPages}
                  />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
