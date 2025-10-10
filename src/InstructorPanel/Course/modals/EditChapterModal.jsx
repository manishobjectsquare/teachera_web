"use client";

import { useState, useEffect } from "react";
import { baseUrl } from "../../../config/baseUrl";
import toastify from "../../../config/toastify";

const EditChapterModal = ({
  isOpen,
  onClose,
  chapterId,
  chapter,
  setLoader,
}) => {
  const [title, setTitle] = useState(chapter?.title || "");
  const [arabicTitle, setArabicTitle] = useState(chapter?.arabic_title);
  useEffect(() => {
    if (chapter) {
      setTitle(chapter.title);
      setArabicTitle(chapter.arabic_title);
    }
  }, [chapter]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoader(true);
    try {
      const response = await fetch(
        `${baseUrl}/api/v1/admin/course-chapter/course-chapters/${chapterId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title, arabic_title: arabicTitle }),
        }
      );

      const result = await response.json();

      if (result.status) {
        toastify.success("Chapter updated successfully!");
        onClose();
      } else {
        alert(result.message || "Failed to update chapter");
      }
    } catch (error) {
      console.error("Error updating chapter:", error);
      alert("Something went wrong while updating chapter");
    } finally {
      setLoader(false);
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
            <h1 className="modal-title fs-5">Chapter Title</h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="p-3">
            <form className="instructor__profile-form" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <div className="form-grp custom-frm-bx">
                  <label htmlFor="title">
                    Title <code>*</code>
                  </label>
                  <input
                    id="title"
                    name="title"
                    className="form-control"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title"
                  />
                </div>
                <div className="form-grp custom-frm-bx">
                  <label htmlFor="arabic_title">
                    Arabic Title <code>*</code>
                  </label>
                  <input
                    id="arabic_title"
                    name="arabic_title"
                    type="text"
                    value={arabicTitle}
                    onChange={(e) => setArabicTitle(e.target.value)}
                    className="form-control"
                    placeholder="Enter Arabic Title"
                  />
                </div>
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-primary">
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

export default EditChapterModal;
