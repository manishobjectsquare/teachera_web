"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toastify from "../../../config/toastify";
import { baseUrl } from "../../../config/baseUrl";

const EditLiveLessonModal = ({
  isOpen,
  onClose,
  chapterItem,
  chapters,
  courseId,
}) => {
  const [formData, setFormData] = useState({
    course_id: courseId || "",
    chapter_item_id: chapterItem?.chapterItemId || "",
    type: chapterItem?.type || "live",
    chapter: chapterItem?.chapter_id || "",
    title: chapterItem?.lesson?.title || "",
    arabic_title: chapterItem?.lesson?.arabic_title || "",
    live_type: chapterItem?.lesson?.live?.type || "zoom",
    start_time: chapterItem?.lesson?.live?.start_time || "",
    duration: chapterItem?.lesson?.duration || "",
    meeting_id: chapterItem?.lesson?.live?.meeting_id || "",
    password: chapterItem?.lesson?.live?.password || "",
    join_url: chapterItem?.lesson?.live?.join_url || "",
    source: chapterItem?.lesson?.storage || "",
    description: chapterItem?.lesson?.description || "",
    arabic_description: chapterItem?.lesson?.arabic_description || "",
    student_mail_sent: false,
    upload_path:
      chapterItem?.lesson?.storage === "upload"
        ? chapterItem?.lesson?.file_path
        : "",
    link_path:
      chapterItem?.lesson?.storage !== "upload"
        ? chapterItem?.lesson?.file_path
        : "",
  });
  console.log(chapters);

  useEffect(() => {
    const fetchLessonData = async () => {
      if (!chapterItem?.chapterItemId) return;

      try {
        const res = await axios.get(
          `${baseUrl}/api/v1/admin/live-lesson/live-lession-view/${chapterItem?.chapterItemId}`
        );
        const lesson = res.data.data;
        setFormData({
          ...lesson,
          chapter: lesson?.chapter_id,
          student_mail_sent: lesson.email_to_all_students,
          start_time: lesson.start_time
            ? new Date(lesson.start_time).toISOString().slice(0, 16)
            : "",
        });
      } catch (err) {
        console.error("Error fetching live lesson:", err);
      }
    };

    if (isOpen && chapterItem?.chapterItemId) {
      fetchLessonData();
    }
  }, [isOpen, chapterItem?.chapterItemId]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      course_id: formData.course_id,
      chapter_id: formData.chapter,
      title: formData.title,
      arabic_title: formData.arabic_title.trim(),
      live_platform_type: formData.live_type,
      start_time: formData.start_time,
      duration: formData.duration,
      meeting_id: formData.meeting_id,
      password: formData.password,
      join_url: formData.join_url,
      description: formData.description,
      arabic_description: formData.arabic_description.trim(),
      email_to_all_students: formData.student_mail_sent,
      is_free: formData.is_free,
      status: "active", // Keeping status as active, modify as per your requirement
    };

    try {
      const res = await axios.put(
        `${baseUrl}/api/v1/admin/live-lesson/live-lession-edit/${chapterItem?.chapterItemId}`,
        data
      );

      if (res.data.status) {
        toastify.success("Live lesson updated successfully!");
        onClose();
      } else {
        toastify.error(res.data.message || "Failed to update live lesson");
      }
    } catch (err) {
      console.error("Error updating live lesson:", err);
      toastify.error("An error occurred while updating the live lesson");
    }
  };

  return (
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
            <h1 className="modal-title fs-5">Edit Live Lesson</h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="p-3">
            <form
              onSubmit={handleSubmit}
              className="update_lesson_form instructor__profile-form"
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
                    {chapters?.map((chapter) => (
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
                    placeholder="Enter Arabic Title"
                  />
                </div>
              </div>

              {/* Additional form fields and logic for live lesson */}
              <div className="row">
                <div className="col-md-3">
                  <div className="custom-frm-bx">
                    <label htmlFor="live_type">
                      Live Platform <code>*</code>
                    </label>
                    <select
                      name="live_type"
                      id="live_type"
                      className="form-select"
                      value={formData.live_type}
                      onChange={handleChange}
                    >
                      <option value="zoom">Zoom</option>
                      <option value="jitsi">Jitsi</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="custom-frm-bx">
                    <label htmlFor="start_time">
                      Start Time <code>*</code>
                    </label>
                    <input
                      id="start_time"
                      name="start_time"
                      className="form-control"
                      type="datetime-local"
                      value={formData.start_time}
                      onChange={handleChange}
                    />
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
                      type="text"
                      className="form-control"
                      value={formData.duration}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Meeting ID, Password, Join URL */}
              <div className="row">
                <div className="col-md-6">
                  <div className="custom-frm-bx">
                    <label htmlFor="meeting_id">
                      Meeting ID <code>*</code>
                    </label>
                    <input
                      id="meeting_id"
                      name="meeting_id"
                      className="form-control"
                      type="text"
                      value={formData.meeting_id}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="custom-frm-bx">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      name="password"
                      className="form-control"
                      type="text"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="custom-frm-bx">
                    <label htmlFor="join_url">Join URL</label>
                    <input
                      id="join_url"
                      name="join_url"
                      className="form-control"
                      type="url"
                      value={formData.join_url}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="col-md-12">
                <div className="custom-frm-bx">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter Description"
                  ></textarea>
                </div>
                <div className="custom-frm-bx">
                  <label htmlFor="description">Arabic Description</label>
                  <textarea
                    name="arabic_description"
                    className="form-control"
                    value={formData.arabic_description}
                    onChange={handleChange}
                    placeholder="Enter Arabic Description"
                  ></textarea>
                </div>
              </div>

              {/* Email to all students */}
              <div className="col-md-12 mb-3">
                <div className="account__check-remember custom-frm-bx">
                  <input
                    id="student_mail_sent"
                    type="checkbox"
                    className="form-check-input "
                    name="student_mail_sent"
                    checked={formData.student_mail_sent}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="student_mail_sent"
                    className="form-check-label"
                  >
                    Email to all students.
                  </label>
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
  );
};

export default EditLiveLessonModal;
