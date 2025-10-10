"use client"

import { useState, useEffect } from "react"

const AddLiveLessonModal = ({ isOpen, onClose, chapters, chapterId, type }) => {
    const [formData, setFormData] = useState({
        course_id: "",
        chapter_id: chapterId || "",
        type: type || "live",
        chapter: chapterId || "",
        title: "",
        live_type: "zoom",
        start_time: "",
        duration: "",
        meeting_id: "",
        password: "",
        join_url: "",
        description: "",
        student_mail_sent: false,
    })

    useEffect(() => {
        setFormData({
            ...formData,
            chapter_id: chapterId || "",
            chapter: chapterId || "",
            type: type || "live",
        })
    }, [chapterId, type])

    if (!isOpen) return null

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real app, you would submit the form data to your backend
        console.log("Form submitted:", formData)
        onClose()
    }

    return (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-modal="true" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Add live lesson</h1>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="p-3">
                        <form className="add_lesson_form instructor__profile-form" onSubmit={handleSubmit}>
                            <input type="hidden" name="course_id" value={formData.course_id} />
                            <input type="hidden" name="chapter_id" value={formData.chapter_id} />
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
                                            <option key={chapter.id} value={chapter.id}>
                                                {chapter.title}
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
                            </div>
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
                                            className="form-control"
                                            type="text"
                                            value={formData.duration}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`col-12 zoom-alert-box ${formData.live_type === "jitsi" ? "d-none" : ""}`}>
                                <div className="alert alert-warning" role="alert">
                                    The meeting ID, password, and Zoom settings must be configured using the same Zoom account. The course
                                    creator needs to set up the <a href="#">Zoom live setting</a>.
                                </div>
                            </div>
                            <div className={`col-12 jitsi-alert-box ${formData.live_type === "zoom" ? "d-none" : ""}`}>
                                <div className="alert alert-warning" role="alert">
                                    The meeting ID and Jitsi settings must be configured. The course creator needs to set up the{" "}
                                    <a href="#">Jitsi setting</a>.
                                </div>
                            </div>
                            <div className="row">
                                <div className={`col-md-${formData.live_type === "jitsi" ? "12" : "6"} meeting-id-box`}>
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
                                <div className={`col-md-6 zoom-box ${formData.live_type === "jitsi" ? "d-none" : ""}`}>
                                    <div className="custom-frm-bx">
                                        <label htmlFor="password">
                                            Password <code>*</code>
                                        </label>
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
                                <div className={`col-md-12 zoom-box ${formData.live_type === "jitsi" ? "d-none" : ""}`}>
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
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="account__check-remember">
                                    <input
                                        id="student_mail_sent"
                                        type="checkbox"
                                        className="form-check-input"
                                        name="student_mail_sent"
                                        checked={formData.student_mail_sent}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="student_mail_sent" className="form-check-label">
                                        Email to all students.
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary submit-btn">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddLiveLessonModal
