"use client"

import { useState, useEffect } from "react"

const EditChapterModal = ({ isOpen, onClose, chapterId, chapter }) => {
    const [title, setTitle] = useState(chapter?.title || "")

    useEffect(() => {
        if (chapter) {
            setTitle(chapter.title)
        }
    }, [chapter])

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real app, you would submit the form data to your backend
        console.log("Form submitted:", { id: chapterId, title })
        onClose()
    }

    return (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-modal="true" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Chapter Title</h1>
                        <button type="button" className="btn-close" onClick={onClose}></button>
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
    )
}

export default EditChapterModal
