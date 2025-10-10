"use client";

import { useState, useEffect, useContext } from "react";
import { baseUrl } from "../../../config/baseUrl";
import axios from "axios";
import loaderContext from "../../../context/LoaderContext";
import toastify from "../../../config/toastify";
import { Link } from "react-router-dom";

const EditLessonModal = ({ isOpen, onClose, chapters, chapterItem }) => {
  let { setLoader } = useContext(loaderContext);

  const [formData, setFormData] = useState({
    course_id: chapterItem?.courseId || "",
    type: chapterItem?.type || "lesson",
    chapter: chapterItem?.chapterId || "",
    title: "",
    arabic_title: "",
    source: "",
    file_type: "",
    duration: "",
    is_free: false,
    description: "",
    arabic_description: "",
    upload_path: "",
    link_path: "",
  });

  const [showProgress, setShowProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchChapterItem = async () => {
      if (!chapterItem?.chapterItemId) return;

      try {
        const res = await axios.get(
          `${baseUrl}/api/v1/admin/chapter-lesson/lessons-view/${chapterItem?.chapterItemId}`
        );
        const item = res.data.data;

        setFormData({
          course_id: item.course_id || "",
          type: item.type || "lesson",
          chapter: item.chapter_id || "",
          title: item.title || "",
          arabic_title: item.arabic_title || "",
          source: item.source || "",
          file_type: item.file_type || "",
          duration: item.duration || "",
          is_free: item.is_free || false,
          description: item.description || "",
          arabic_description: item.arabic_description || "",
          upload_path: item.upload_path || "",
          link_path: item.video_link || "",
        });
      } catch (err) {
        console.error("Error fetching chapter item:", err);
      }
    };

    fetchChapterItem();
  }, [chapterItem?.chapterItemId]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const {
  //     course_id,
  //     chapter,
  //     title,
  //     source,
  //     file_type,
  //     duration,
  //     is_free,
  //     description,
  //     upload_path,
  //     link_path,
  //     chapter_item_id,
  //     type,
  //   } = formData;

  //   try {
  //     const data = new FormData();
  //     setLoader(true);

  //     data.append("chapter_id", chapter);
  //     data.append("type", type);
  //     data.append("title", title);
  //     data.append("source", source);
  //     data.append("file_type", file_type);
  //     data.append("duration", duration);
  //     data.append("is_free", is_free);
  //     data.append("description", description);

  //     if (source === "upload") {
  //       // Only append file if it's a File object (upload)
  //       console.log(upload_path);

  //       if (upload_path instanceof File) {
  //         data.append("file", upload_path);
  //       }
  //     } else {
  //       data.append("video_link", link_path);
  //     }

  //     const res = await axios.put(
  //       `${baseUrl}/api/v1/admin/chapter-lesson/lessons-edit/${chapterItem?.chapterItemId}`,
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log("Lesson updated successfully:", res.data);
  //     toastify.success("Lesson updated successfully");
  //     onClose();
  //   } catch (err) {
  //     console.error(
  //       "Error updating lesson:",
  //       err.response?.data || err.message
  //     );
  //     alert("Error updating lesson");
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const uploadToBunny = async (file, title) => {
    const res = await axios.post(
      `${baseUrl}/api/v1/admin/chapter-lesson/get-upload-url`,
      {
        title,
      }
    );
    const { videoId, uploadUrl, playbackUrl } = res.data;

    setShowProgress(true);
    setLoader(false);
    setUploadProgress(1);
    await axios.put(uploadUrl, file, {
      headers: {
        AccessKey: "1be5cb7f-66c3-486d-8cae7792564f-c116-49df",
        "Content-Type": "application/octet-stream",
      },
      onUploadProgress: (e) => {
        const percent = Math.round((e.loaded * 100) / e.total);
        setUploadProgress(percent);
      },
    });

    setShowProgress(false);

    setLoader(true);
    return { videoId, playbackUrl };
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      let videoId = null;
      let playbackUrl = null;
      let newUpload = false;

      // if (formData.source === "youtube" && formData.videoId) {
      //   newUpload = true;
      // }

      if (formData.upload_path) {
        const uploadResult = await uploadToBunny(
          formData.upload_path,
          formData.title
        );
        videoId = uploadResult.videoId;
        playbackUrl = uploadResult.playbackUrl;
        newUpload = true;
      } else {
        playbackUrl = formData.link_path;
      }

      const {
        course_id,
        chapter_id,
        title,
        arabic_title,
        source,
        file_type,
        duration,
        is_free,
        description,
        arabic_description,
      } = formData;
      const res = await axios.put(
        `${baseUrl}/api/v1/admin/chapter-lesson/lessons-edit/${chapterItem?.chapterItemId}`,
        {
          course_id,
          chapter_id,
          title,
          arabic_title,
          source,
          file_type,
          duration,
          is_free,
          description,
          arabic_description,
          videoId,
          video_link: playbackUrl,
          newUpload: newUpload,
        }
      );
      console.log("Lesson created successfully:", res.data);
      toastify.success("Lesson created successfully");
      onClose();
    } catch (err) {
      console.error(
        "Error creating lesson:",
        err.response?.data || err.message
      );
      alert("Error creating lesson");
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Edit Lesson</h1>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="p-3">
              <form
                className="update_lesson_form instructor__profile-form"
                onSubmit={handleSubmit}
              >
                <input
                  type="hidden"
                  name="course_id"
                  value={formData.course_id}
                />
                <input
                  type="hidden"
                  name="chapter_item_id"
                  value={formData.chapter_item_id}
                />
                <input type="hidden" name="type" value={formData.type} />

                <div className="col-md-12">
                  <div className="custom-frm-bx">
                    <label htmlFor="chapter">
                      Chapter <code>*</code>
                    </label>
                    <select
                      name="chapter"
                      id="chapter"
                      className="chapter form-select"
                      value={formData.chapter}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {chapters.map((chapter) => (
                        <option key={chapter._id} value={chapter._id}>
                          {chapter.title}({chapter.arabic_title})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="custom-frm-bx">
                    <label htmlFor="title">
                      Title <code>*</code>
                    </label>
                    <input
                      id="title"
                      name="title"
                      className="form-control"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="custom-frm-bx">
                    <label htmlFor="arabic_title">
                      Arabic Title <code>*</code>
                    </label>
                    <input
                      id="arabic_title"
                      name="arabic_title"
                      className="form-control"
                      type="text"
                      value={formData.arabic_title}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="custom-frm-bx">
                      <label htmlFor="source">
                        Source <code>*</code>
                      </label>
                      <select
                        name="source"
                        id="source"
                        className="source form-select"
                        value={formData.source}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>

                        <option value="upload">Upload</option>
                        <option value="youtube">YouTube</option>
                        {/* <option value="upload">Upload</option>
                      <option value="youtube">YouTube</option>
                      <option value="vimeo">Vimeo</option>
                      <option value="external_link">External Link</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="custom-frm-bx">
                      <label htmlFor="file_type">
                        File Type <code>*</code>
                      </label>
                      <select
                        name="file_type"
                        id="file_type"
                        className="file_type form-select"
                        value={formData.file_type}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="video">Video</option>
                        <option value="file">File</option>
                      </select>
                    </div>
                  </div>

                  <div
                    className={`col-md-9 upload ${
                      formData.source === "upload" ? "" : "d-none"
                    }`}
                  >
                    <div className="from-group mb-3 custom-frm-bx">
                      <label className="form-file-manager-label" htmlFor="">
                        Video Upload <code>*</code>
                        <Link target="_blank" to={formData.link_path}>
                          {" "}
                          <i className="fa fa-eye" />
                        </Link>
                      </label>
                      <div className="input-group">
                        <input
                          id="upload_path"
                          className="form-control file-manager-input"
                          type="file"
                          name="upload_path"
                          accept="video/*"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-md-9 link_path ${
                      formData.source !== "upload" ? "" : "d-none"
                    }`}
                  >
                    <div className="custom-frm-bx">
                      <label htmlFor="meta_description">
                        Path <code>*</code>
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-link"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="input_link"
                          name="link_path"
                          placeholder="paste source url"
                          value={formData.link_path}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="custom-frm-bx">
                      <label htmlFor="duration">
                        Duration <code>* (in minutes)</code>
                      </label>
                      <input
                        id="duration"
                        name="duration"
                        className="form-control"
                        type="text"
                        value={formData.duration}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="row is_free_wrapper">
                <div className="col-md-6 mt-2 mb-3">
                  <span className="toggle-label">Preview</span>
                  <div className="switcher">
                    <label htmlFor="toggle-0">
                      <input
                        type="checkbox"
                        id="toggle-0"
                        value="1"
                        name="is_free"
                        checked={formData.is_free}
                        onChange={handleChange}
                      />
                      <span>
                        <small></small>
                      </span>
                    </label>
                  </div>
                </div>
              </div> */}

                <div className="col-md-12">
                  <div className="custom-frm-bx">
                    <label htmlFor="description">
                      Description <code></code>
                    </label>
                    <textarea
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="custom-frm-bx">
                    <label htmlFor="arabic_description">
                      Arabic Description
                    </label>
                    <textarea
                      name="arabic_description"
                      className="form-control"
                      value={formData.arabic_description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary submit-btn">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showProgress && (
        <div className="upload-progress-overlay">
          <div className="upload-progress-container">
            <div className="upload-progress-title">
              <div className="upload-spinner"></div>
              <span className="upload-file-icon">:video_camera:</span>
              {formData.source === "upload"
                ? "Uploading Video..."
                : "Creating Lesson..."}
            </div>
            <div className="upload-progress-bar-container">
              <div
                className="upload-progress-bar-fill"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="upload-progress-percentage">{uploadProgress}%</div>
            <div className="upload-progress-status">
              {uploadProgress < 25
                ? "Preparing upload..."
                : uploadProgress < 50
                ? "Uploading video file..."
                : uploadProgress < 75
                ? "Processing video..."
                : uploadProgress < 95
                ? "Finalizing lesson..."
                : "Almost done..."}
            </div>
            <div className="upload-progress-details">
              <span>:file_folder: {formData.title || "New Lesson"}</span>
              {/* <span>:stopwatch: {formData.duration} min</span> */}
            </div>
          </div>
        </div>
      )}
      <style>{`
        .upload-progress-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          backdrop-filter: blur(8px);
        }
        .upload-progress-container {
          background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
          text-align: center;
          min-width: 450px;
          color: white;
          animation: slideInScale 0.4s ease-out;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .upload-progress-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .upload-progress-bar-container {
          position: relative;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 30px;
          height: 16px;
          overflow: hidden;
          margin: 2rem 0;
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        .upload-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00F5FF 0%, #00D4FF 50%, #0099FF 100%);
          border-radius: 30px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
        }
        .upload-progress-bar-fill::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: progressShimmer 2.5s infinite;
        }
        @keyframes progressShimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
        .upload-progress-percentage {
          font-size: 2rem;
          font-weight: 800;
          margin: 1rem 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .upload-progress-status {
          font-size: 1rem;
          opacity: 0.9;
          margin-top: 1rem;
          font-weight: 500;
        }
        .upload-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: uploadSpin 1s linear infinite;
        }
        @keyframes uploadSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .upload-file-icon {
          font-size: 1.2rem;
          opacity: 0.8;
        }
        .upload-progress-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 0.9rem;
          opacity: 0.8;
        }
      `}</style>
      <style>{`
        .upload-progress-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          backdrop-filter: blur(8px);
        }
        .upload-progress-container {
          background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
          text-align: center;
          min-width: 450px;
          color: white;
          animation: slideInScale 0.4s ease-out;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .upload-progress-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .upload-progress-bar-container {
          position: relative;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 30px;
          height: 16px;
          overflow: hidden;
          margin: 2rem 0;
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        .upload-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00F5FF 0%, #00D4FF 50%, #0099FF 100%);
          border-radius: 30px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
        }
        .upload-progress-bar-fill::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: progressShimmer 2.5s infinite;
        }
        @keyframes progressShimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
        .upload-progress-percentage {
          font-size: 2rem;
          font-weight: 800;
          margin: 1rem 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .upload-progress-status {
          font-size: 1rem;
          opacity: 0.9;
          margin-top: 1rem;
          font-weight: 500;
        }
        .upload-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: uploadSpin 1s linear infinite;
        }
        @keyframes uploadSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .upload-file-icon {
          font-size: 1.2rem;
          opacity: 0.8;
        }
        .upload-progress-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 0.9rem;
          opacity: 0.8;
        }
      `}</style>
    </>
  );
};

export default EditLessonModal;
