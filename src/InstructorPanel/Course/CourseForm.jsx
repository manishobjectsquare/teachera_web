import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faLink } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import CourseNavigation from "./CourseNavigation";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { baseUrl } from "../../config/baseUrl";
import axios from "axios";
import toastify from "../../config/toastify";
import "../../assets/css/instructor.css";
import { useUser } from "../../Context/UserContext";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import loaderContext from "../../context/LoaderContext";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const CourseForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const editMode = !!id;
  let navigate = useNavigate();
  let { setLoader } = useContext(loaderContext);

  let { profileData } = useUser();
  const [formData, setFormData] = useState({
    title: "",
    arabic_title: "",
    arabic_seo_description: "",
    arabic_thumbnail: "",
    seo_description: "",
    thumbnail: "",
    demo_video_storage: "upload",
    upload_path: "",
    external_path: "",
    price: "",
    instructor_id: "",
    discount_price: "",
    description: "",
    arabic_description: "",
  });

  useEffect(() => {
    if (editMode && id) {
      const fetchCourse = async () => {
        setLoader(true);
        try {
          const res = await axios.get(
            `${baseUrl}/api/v1/admin/course/course-get/${id}`
          );
          if (res.data.status) {
            const course = res.data.data;
            let disc = course.description
              .replace("<p>", "")
              .replace("</p>", "");
            let arabic_disc = course.arabic_description
              .replace("<p>", "")
              .replace("</p>", "");
            setSelectedFile(course.thumbnail);
            setSelectedArabicFile(course.arabic_thumbnail);
            setFormData({
              instructor_id: course?.instructor_id,
              title: course.title || "",
              arabic_title: course.arabic_title || "",
              seo_description: course.seo_description || "",
              arabic_seo_description: course.arabic_seo_description || "",
              thumbnail: course.thumbnail || "",
              arabic_thumbnail: course.arabic_thumbnail || "",
              demo_video_storage: course.demo_video_storage || "",
              upload_path:
                course.demo_video_storage === "upload"
                  ? course.demo_video_source || ""
                  : "",
              external_path:
                course.demo_video_storage !== "upload"
                  ? course.demo_video_source || course?.external_path
                  : "",
              price: course.price || 0,
              discount_price: course.discount_price || 0,
              description: disc || "",
              arabic_description: arabic_disc || "",
            });
            setLoader(false);
          } else {
            setLoader(false);
            console.error("Failed to fetch course:", res.data.message);
          }
        } catch (error) {
          setLoader(false);
          console.error("Error fetching course:", error);
        }
      };

      fetchCourse();
    }
  }, [editMode, id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle rich text editor changes
  const handleEditorChange = (content) => {
    setFormData({ ...formData, description: content });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(t("Form submitted:"), formData);
    let postData = new FormData();
    postData.append("title", formData.title);
    postData.append("arabic_title", formData.arabic_title);
    postData.append("instructor_id", profileData._id);
    postData.append("upload_path", formData.upload_path);
    postData.append("thumbnail", selectedFile);
    postData.append("arabic_thumbnail", selectedArabicFile);
    postData.append("demo_video_storage", formData.demo_video_storage);
    postData.append("seo_description", formData.seo_description);
    postData.append("arabic_seo_description", formData.arabic_seo_description);
    postData.append("external_path", formData.external_path || null);
    postData.append("discount_price", formData.discount_price);
    postData.append("price", formData.price);
    postData.append("description", `<p>${formData.description}</p>`);
    postData.append(
      "arabic_description",
      `<p>${formData.arabic_description}</p>`
    );
    postData.append("course_owner", "instructor");

    try {
      setLoader(true);
      let response = await axios(
        editMode && id
          ? `${baseUrl}/api/v1/admin/course/course-update/${id}`
          : `${baseUrl}/api/v1/admin/course/course-store`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          data: postData,
        }
      );

      if (!response?.data?.status) {
        setLoader(false);
        toastify.error(response?.data?.message);
        return;
      }
      toastify.success("course updated");
      navigate(`/instructor/courses/add/${response?.data.data?._id}/step=2`);
    } catch (error) {
      setLoader(false);
      console.error("Error :", error);
    }
    // In a real app, you would send this data to your API
  };

  const handleFileManagerClick = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (e.target.name === "thumbnail") {
      setFormData({ ...formData, thumbnail: file });
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else if (e.target.name === "arabic_thumbnail") {
      setFormData({ ...formData, arabic_thumbnail: file });
      setSelectedArabicFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewArabicUrl(reader.result);
      reader.readAsDataURL(file);
    } else if (e.target.name === "upload_path") {
      setFormData({ ...formData, upload_path: file });
    }
  };

  // Video storage options
  const videoStorageOptions = [
    { value: "upload", label: t("Upload") },
    { value: "youtube", label: t("YouTube") },
    { value: "vimeo", label: t("Vimeo") },
    { value: "external_link", label: t("External Link") },
  ];
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedArabicFile, setSelectedArabicFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewArabicUrl, setPreviewArabicUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isArabicDragging, setIsArabicDragging] = useState(false);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);

  //     // Create preview URL
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setPreviewUrl(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleArabicDragOver = (e) => {
    e.preventDefault();
    setIsArabicDragging(true);
  };

  const handleArabicDragLeave = () => {
    setIsArabicDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArabicDrop = (e) => {
    e.preventDefault();
    setIsArabicDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedArabicFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewArabicUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };
  const removeArabicFile = () => {
    setSelectedArabicFile(null);
    setPreviewArabicUrl(null);
  };
  return (
    <div className="col-lg-9">
      <CourseNavigation />
      <div className="">
        <div className="instructor__profile-form-wrap">
          <form
            onSubmit={handleSubmit}
            className="instructor__profile-form course-form"
          >
            {/* Hidden fields */}
            <input type="hidden" name="step" value="1" />
            <input type="hidden" name="next_step" value="2" />
            <input
              type="hidden"
              name="edit_mode"
              value={editMode ? "true" : "false"}
            />

            <div className="row g-3">
              <div className="col-md-12">
                {/* <div className="custom-frm-bx">
                  <label htmlFor="instructor_id" className="form-label">
                    Instructor <span className="text-danger">*</span>
                  </label>
                  <select
                    name="instructor_id"
                    id="instructor_id"
                    className="form-select"
                    value={formData.instructor_id}
                    onChange={handleChange}
                    aria-label={t("Select demo video storage type")}
                  >
                    <option value="">Select Instructor</option>
                    {instructorsList?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option?.name}
                      </option>
                    ))}
                  </select>
                </div> */}
              </div>
              <div className="col-md-12">
                <div className="custom-frm-bx">
                  <label htmlFor="title" className="form-label">
                    {t("Title")} <span className="text-danger">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    aria-label={t("Course title")}
                  />
                </div>
                <div className="custom-frm-bx">
                  <label htmlFor="title" className="form-label">
                    {t("Arabic Title")} <span className="text-danger">*</span>
                  </label>
                  <input
                    id="arabic_title"
                    name="arabic_title"
                    type="text"
                    className="form-control"
                    value={formData.arabic_title}
                    onChange={handleChange}
                    required
                    aria-label={t("Course arabic title")}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="custom-frm-bx">
                  <label htmlFor="seo_description" className="form-label">
                    {t("SEO Description")}
                  </label>
                  <input
                    id="seo_description"
                    name="seo_description"
                    type="text"
                    className="form-control"
                    value={formData.seo_description}
                    onChange={handleChange}
                    placeholder={t("150 - 160 characters recommended")}
                    aria-label={t("SEO description")}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="custom-frm-bx">
                  <label
                    htmlFor="arabic_seo_description"
                    className="form-label"
                  >
                    {t("Arabic SEO Description")}
                  </label>
                  <input
                    id="arabic_seo_description"
                    name="arabic_seo_description"
                    type="text"
                    className="form-control"
                    value={formData.arabic_seo_description}
                    onChange={handleChange}
                    placeholder={t("Arabic 150 - 160 characters recommended")}
                    aria-label={t("arabic_SEO description")}
                  />
                </div>
              </div>
              {/* <div className="col-md-12">
                <div className="custom-frm-bx">
                  <label className="form-label">
                    {t("Thumbnail")} <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      id="thumbnail"
                      name="thumbnail"
                      type="file"
                      className="form-control file-manager-input"
                      readOnly
                      onChange={handleFileManagerClick}
                      accept="image/*"
                      //   value={formData.thumbnail}
                      aria-label={t("Thumbnail path")}
                    />
                  </div>
                </div>
              </div> */}
              <div className="col-lg-12 mb-4">
                <label htmlFor="image" className="form-label">
                  Thumbnail<sup className="text-danger">*</sup>
                </label>
                <div className="file-upload-container">
                  <div
                    className={`file-upload-area ${
                      isDragging ? "dragging" : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {!selectedFile ? (
                      <>
                        <div className="file-upload-icon">
                          <i className="fa fa-cloud-upload"></i>
                        </div>
                        <div className="file-upload-text">
                          Drag & Drop your image here
                        </div>
                        <div className="file-upload-subtext">
                          or click to browse files
                        </div>
                        <input
                          type="file"
                          className="file-upload-input"
                          id="thumbnail"
                          name="thumbnail"
                          accept="image/*"
                          onChange={handleFileManagerClick}
                        />
                      </>
                    ) : (
                      <div className="file-preview-container">
                        <img
                          src={previewUrl || `${baseUrl}/${formData.thumbnail}`}
                          alt="Preview"
                          className="file-preview"
                        />
                        <button
                          type="button"
                          className="file-remove-btn"
                          onClick={removeFile}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                        {previewUrl && (
                          <div className="file-info">
                            {selectedFile.name} (
                            {Math.round(selectedFile.size / 1024)} KB)
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-12 mb-4">
                <label htmlFor="image" className="form-label">
                  Arabic Thumbnail<sup className="text-danger">*</sup>
                </label>
                <div className="file-upload-container">
                  <div
                    className={`file-upload-area ${
                      isDragging ? "dragging" : ""
                    }`}
                    onDragOver={handleArabicDragOver}
                    onDragLeave={handleArabicDragLeave}
                    onDrop={handleArabicDrop}
                  >
                    {!selectedArabicFile ? (
                      <>
                        <div className="file-upload-icon">
                          <i className="fa fa-cloud-upload"></i>
                        </div>
                        <div className="file-upload-text">
                          Drag & Drop your image here
                        </div>
                        <div className="file-upload-subtext">
                          or click to browse files
                        </div>
                        <input
                          type="file"
                          className="file-upload-input"
                          id="arabic_thumbnail"
                          name="arabic_thumbnail"
                          accept="image/*"
                          onChange={handleFileManagerClick}
                        />
                      </>
                    ) : (
                      <div className="file-preview-container">
                        <img
                          src={
                            previewArabicUrl ||
                            `${baseUrl}/${formData.arabic_thumbnail}`
                          }
                          alt="Preview"
                          className="file-preview"
                        />
                        <button
                          type="button"
                          className="file-remove-btn"
                          onClick={removeArabicFile}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                        {previewArabicUrl && (
                          <div className="file-info">
                            {selectedArabicFile.name} (
                            {Math.round(selectedArabicFile.size / 1024)} KB)
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="custom-frm-bx">
                  <label htmlFor="demo_video_storage" className="form-label">
                    {t("Demo Video Storage")}
                  </label>
                  <select
                    name="demo_video_storage"
                    id="demo_video_storage"
                    className="form-select"
                    value={formData.demo_video_storage}
                    onChange={handleChange}
                    aria-label={t("Select demo video storage type")}
                  >
                    {videoStorageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Upload Path */}
              <div
                className={`col-md-6 upload ${
                  formData.demo_video_storage === "upload" ? "" : "d-none"
                }`}
              >
                <div className="custom-frm-bx">
                  <label className="form-label">{t("Upload Path")}</label>
                  <div className="input-group">
                    {/* <button
                      type="button"
                      className="btn btn-outline-secondary file-manager"
                      onClick={() => handleFileManagerClick("path")}
                      aria-label={t("Choose video file")}
                    >
                      <FontAwesomeIcon icon={faImage} /> {t("Choose")}
                    </button> */}
                    <input
                      id="path"
                      name="upload_path"
                      type="file"
                      className="form-control file-manager-input"
                      readOnly
                      onChange={handleFileManagerClick}
                      accept="image/*"
                      aria-label={t("Video file path")}
                    />
                  </div>
                </div>
              </div>

              {/* External Link Path */}
              <div
                className={`col-md-6 external_link ${
                  formData.demo_video_storage !== "upload" ? "" : "d-none"
                }`}
              >
                <div className="custom-frm-bx">
                  <label className="form-label">{t("External Link")}</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLink} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="external_path"
                      placeholder={t("Paste your external link")}
                      value={formData.external_path}
                      onChange={handleChange}
                      aria-label={t("External video link")}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="custom-frm-bx">
                  <label htmlFor="price" className="form-label">
                    {t("Price")} <span className="text-danger">*</span>
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    aria-label={t("Course price")}
                  />
                  <small className="text-muted">{t("Put 0 for free")}</small>
                </div>
              </div>

              <div className="col-md-6">
                <div className="custom-frm-bx">
                  <label htmlFor="discount_price" className="form-label">
                    {t("Discount Price")}
                  </label>
                  <input
                    id="discount_price"
                    name="discount_price"
                    type="number"
                    className="form-control"
                    value={formData.discount_price}
                    onChange={handleChange}
                    aria-label={t("Course discount price")}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="custom-frm-bx">
                  <label htmlFor="description" className="form-label">
                    {t("Description")}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    cols={10}
                    rows={10}
                    style={{ height: "auto" }}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12">
                <div className="custom-frm-bx">
                  <label htmlFor="arabic_description" className="form-label">
                    {t("Arabic Description")}
                  </label>
                  <textarea
                    name="arabic_description"
                    value={formData.arabic_description}
                    onChange={handleChange}
                    cols={10}
                    rows={10}
                    style={{ height: "auto" }}
                  ></textarea>
                </div>
              </div>

              <div className="col-md-12">
                <button className="thm-btn w-100" type="submit">
                  {t("Save")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
