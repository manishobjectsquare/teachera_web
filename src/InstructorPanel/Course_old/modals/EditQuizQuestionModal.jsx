"use client"

import { useState, useEffect } from "react"

const EditQuizQuestionModal = ({ isOpen, onClose, questionId, question }) => {
    const [formData, setFormData] = useState({
        title: "",
        grade: "",
        answers: [{ id: 1, title: "", correct: false }],
    })

    useEffect(() => {
        if (question) {
            setFormData({
                title: question.title || "",
                grade: question.grade || "",
                answers: question.answers || [{ id: 1, title: "", correct: false }],
            })
        }
    }, [question])

    if (!isOpen) return null

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleAnswerChange = (id, value) => {
        setFormData({
            ...formData,
            answers: formData.answers.map((answer) => (answer.id === id ? { ...answer, title: value } : answer)),
        })
    }

    const handleCorrectChange = (id, checked) => {
        setFormData({
            ...formData,
            answers: formData.answers.map((answer) => (answer.id === id ? { ...answer, correct: checked } : answer)),
        })
    }

    const addAnswer = () => {
        const newId = Math.max(0, ...formData.answers.map((a) => a.id)) + 1
        setFormData({
            ...formData,
            answers: [...formData.answers, { id: newId, title: "", correct: false }],
        })
    }

    const removeAnswer = (id) => {
        if (formData.answers.length > 1) {
            setFormData({
                ...formData,
                answers: formData.answers.filter((answer) => answer.id !== id),
            })
        }
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
                        <h1 className="modal-title fs-5">Edit Quiz Question</h1>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="p-3">
                        <form className="add_lesson_form instructor__profile-form" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="form-grp custom-frm-bx">
                                        <label htmlFor="title">
                                            Question Title <code>*</code>
                                        </label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="form-control"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-grp custom-frm-bx">
                                        <label htmlFor="grade">
                                            Grade <code>*</code>
                                        </label>
                                        <input
                                            id="grade"
                                            name="grade"
                                            type="text"
                                            className="form-control"
                                            value={formData.grade}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button className="add-answer btn" type="button" onClick={addAnswer}>
                                    Add Answer
                                </button>
                            </div>

                            <div className="answer-container">
                                {formData.answers.map((answer) => (
                                    <div className="card mt-3" key={answer.id}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-grp custom-frm-bx">
                                                    <div className="d-flex justify-content-between">
                                                        <label htmlFor={`answer-${answer.id}`}>
                                                            Answer Title <code>*</code>
                                                        </label>
                                                        <button className="remove-answer" type="button" onClick={() => removeAnswer(answer.id)}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                    <input
                                                        className="answer form-control"
                                                        id={`answer-${answer.id}`}
                                                        type="text"
                                                        value={answer.title}
                                                        onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="switcher d-flex">
                                                    <p className="me-3">Correct Answer</p>
                                                    <label htmlFor={`toggle-${answer.id}`}>
                                                        <input
                                                            className="correct"
                                                            type="checkbox"
                                                            id={`toggle-${answer.id}`}
                                                            checked={answer.correct}
                                                            onChange={(e) => handleCorrectChange(answer.id, e.target.checked)}
                                                        />
                                                        <span>
                                                            <small></small>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
    )
}

export default EditQuizQuestionModal
