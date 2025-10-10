"use client"

import { useState } from "react"

const AddChapterModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("")

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real app, you would submit the form data to your backend
        console.log("Form submitted:", { title })
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
                    <div className="modal-body">
                        <form className="instructor__profile-form" onSubmit={handleSubmit}>
                            <div className="col-md-12">
                                <div className="form-grp custom-frm-bx">
                                    <label htmlFor="title">
                                        Title <code>*</code>
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="text-end">
                                <button type="submit" className="btn btn-primary">
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

export default AddChapterModal
