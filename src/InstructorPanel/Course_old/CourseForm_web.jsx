import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faLink } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import CourseNavigation from "./CourseNavigation_web";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const CourseForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const editMode = !!id;

  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    seo_description: "",
    thumbnail: "",
    demo_video_storage: "upload",
    upload_path: "",
    external_path: "",
    price: "",
    discount_price: "",
    description: "",
  });

  useEffect(() => {
    if (editMode) {
      //  API FETCH KRNI HAI
      const mockCourseData = {
        id: 1,
        title: "Complete Web Development Bootcamp",
        seo_description:
          "Learn web development from scratch with this comprehensive bootcamp",
        thumbnail: "/coding-on-laptop.png",
        demo_video_storage: "youtube",
        demo_video_source: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        price: 89.99,
        discount_price: 69.99,
        description:
          "<p>This course covers everything you need to know about web development.</p>",
      };

      setFormData({
        title: mockCourseData.title,
        seo_description: mockCourseData.seo_description,
        thumbnail: mockCourseData.thumbnail,
        demo_video_storage: mockCourseData.demo_video_storage,
        upload_path:
          mockCourseData.demo_video_storage === "upload"
            ? mockCourseData.demo_video_source
            : "",
        external_path:
          mockCourseData.demo_video_storage !== "upload"
            ? mockCourseData.demo_video_source
            : "",
        price: mockCourseData.price,
        discount_price: mockCourseData.discount_price,
        description: mockCourseData.description,
      });
    }
  }, [editMode]);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(t("Form submitted:"), formData);
    // In a real app, you would send this data to your API
  };

  // Handle file manager clicks
  const handleFileManagerClick = (inputId) => {
    // In a real app, this would open a file manager
    console.log(t("File manager clicked for {{inputId}}", { inputId }));
    // For demo purposes, let's set a placeholder value
    if (inputId === "thumbnail") {
      setFormData({ ...formData, thumbnail: "/placeholder-image.jpg" });
    } else if (inputId === "path") {
      setFormData({ ...formData, upload_path: "/videos/demo-video.mp4" });
    }
  };

  // Video storage options
  const videoStorageOptions = [
    { value: "upload", label: t("Upload") },
    { value: "youtube", label: t("YouTube") },
    { value: "vimeo", label: t("Vimeo") },
    { value: "external_link", label: t("External Link") },
  ];

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
                  <label className="form-label">
                    {t("Thumbnail")} <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <button
                      type="button"
                      className="btn btn-outline-secondary file-manager-image"
                      onClick={() => handleFileManagerClick("thumbnail")}
                      aria-label={t("Choose thumbnail")}
                    >
                      <FontAwesomeIcon icon={faImage} /> {t("Choose")}
                    </button>
                    <input
                      id="thumbnail"
                      name="thumbnail"
                      type="text"
                      className="form-control file-manager-input"
                      readOnly
                      value={formData.thumbnail}
                      aria-label={t("Thumbnail path")}
                    />
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
                    <button
                      type="button"
                      className="btn btn-outline-secondary file-manager"
                      onClick={() => handleFileManagerClick("path")}
                      aria-label={t("Choose video file")}
                    >
                      <FontAwesomeIcon icon={faImage} /> {t("Choose")}
                    </button>
                    <input
                      id="path"
                      name="upload_path"
                      type="text"
                      className="form-control file-manager-input"
                      readOnly
                      value={formData.upload_path}
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
                  {/* <ReactQuill
                                        value={formData.description}
                                        onChange={handleEditorChange}
                                        theme="snow"
                                        className="text-editor"
                                        placeholder={t('Enter course description')}
                                    /> */}
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
