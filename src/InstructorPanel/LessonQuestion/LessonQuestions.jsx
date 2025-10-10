import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import courseIMg from "../../assets/images/course-img-01.png"
import InsImg from "../../assets/images/instructor-img-04.png"
const LessonQuestions = () => {
    // State for filters
    const [filters, setFilters] = useState({
        seen: '',
        sort_by: '0'
    });

    // State for questions data
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);


    // State for reply forms
    const [replies, setReplies] = useState({});

    // Mock data for questions
    const mockQuestions = [
        {
            id: 1,
            seen: '0',
            course: {
                id: 101,
                slug: 'web-development-basics',
                title: 'Web Development Basics',
                thumbnail: courseIMg
            },
            lesson: {
                id: 201,
                title: 'Introduction to HTML'
            },
            user: {
                id: 301,
                name: 'John Smith',
                image: InsImg
            },
            question_title: 'How to structure HTML properly?',
            question_description: 'I\'m confused about the proper way to structure HTML documents. Should I use div containers or semantic elements?',
            created_at: '2023-05-15 14:30:00',
            replies_count: 2,
            replies: [
                {
                    id: 401,
                    user: {
                        id: 501,
                        name: 'Instructor Jane',
                        image: InsImg
                    },
                    reply: 'It\'s best practice to use semantic HTML elements like header, nav, main, section, article, and footer whenever possible. This improves accessibility and SEO.',
                    created_at: '2023-05-15 15:20:00'
                },
                {
                    id: 402,
                    user: {
                        id: 301,
                        name: 'John Smith',
                        image: InsImg
                    },
                    reply: 'Thank you for the explanation! That makes sense.',
                    created_at: '2023-05-15 16:05:00'
                }
            ]
        },

    ];

    // Format date helper function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Fetch questions based on filters
    useEffect(() => {
        setLoading(true);


        const filteredQuestions = mockQuestions.filter(question => {
            if (filters.seen === '') return true;
            return question.seen === filters.seen;
        }).sort((a, b) => {
            if (filters.sort_by === '0') {
                return new Date(b.created_at) - new Date(a.created_at); // Newest first
            } else {
                return new Date(a.created_at) - new Date(b.created_at); // Oldest first
            }
        });

        setQuestions(filteredQuestions);

        setLoading(false);
    }, [filters]);

    // Initialize reply state for each question
    useEffect(() => {
        const initialReplies = {};
        questions.forEach(question => {
            initialReplies[question.id] = '';
        });
        setReplies(initialReplies);
    }, [questions]);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Handle marking as read/unread
    const markAsReadUnread = (questionId, currentSeen) => {
        setQuestions(questions.map(question => {
            if (question.id === questionId) {
                return { ...question, seen: currentSeen === '0' ? '1' : '0' };
            }
            return question;
        }));
    };

    // Handle reply input changes
    const handleReplyChange = (questionId, value) => {
        setReplies(prev => ({ ...prev, [questionId]: value }));
    };

    // Handle reply submission
    const handleReplySubmit = (e, questionId) => {
        e.preventDefault();

        if (!replies[questionId].trim()) return;

        const newReply = {
            id: Math.floor(Math.random() * 1000) + 500,
            user: {
                id: 501,
                name: 'Instructor Jane',
                image: '/confident-professional.png'
            },
            reply: replies[questionId],
            created_at: new Date().toISOString()
        };

        setQuestions(questions.map(question => {
            if (question.id === questionId) {
                return {
                    ...question,
                    replies: [...question.replies, newReply],
                    replies_count: question.replies_count + 1
                };
            }
            return question;
        }));

        // Clear the reply input
        setReplies(prev => ({ ...prev, [questionId]: '' }));
    };

    // Handle delete question
    const handleDeleteQuestion = (questionId) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            setQuestions(questions.filter(question => question.id !== questionId));
        }
    };

    // Handle delete reply
    const handleDeleteReply = (questionId, replyId) => {
        if (window.confirm('Are you sure you want to delete this reply?')) {
            setQuestions(questions.map(question => {
                if (question.id === questionId) {
                    return {
                        ...question,
                        replies: question.replies.filter(reply => reply.id !== replyId),
                        replies_count: question.replies_count - 1
                    };
                }
                return question;
            }));
        }
    };



    return (
        <div className="col-lg-9">
            <div className="card p-4">
                <div className="mb-3">
                    <h4 className="fw-bold">Lesson Questions</h4>
                </div>

                {/* Filters */}
                <form className="row mb-3 g-2">
                    <div className="col-md-4">
                        <select
                            name="seen"
                            id="seen"
                            className="form-select"
                            value={filters.seen}
                            onChange={handleFilterChange}
                        >
                            <option value="">All</option>
                            <option value="1">Read</option>
                            <option value="0">Unread</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select
                            name="sort_by"
                            id="sort_by"
                            className="form-select"
                            value={filters.sort_by}
                            onChange={handleFilterChange}
                        >
                            <option value="0">Newest</option>
                            <option value="1">Oldest</option>
                        </select>
                    </div>
                </form>

                {/* Questions List */}
                <div className="row">
                    {loading ? (
                        <p className="text-center">Loading questions...</p>
                    ) : questions.length === 0 ? (
                        <p className="text-center">No questions found!</p>
                    ) : (
                        questions.map(question => (
                            <div className="col-12 mb-4" key={question.id}>
                                <div className="d-flex align-items-start gap-2">
                                    <input
                                        className="form-check-input"
                                        checked={question.seen === '0'}
                                        type="checkbox"
                                        title={question.seen === '0' ? 'Mark as unread' : 'Mark read'}
                                        onChange={() => markAsReadUnread(question.id, question.seen)}
                                    />
                                    <div className="card w-100">
                                        <div className="card-header d-flex justify-content-between">
                                            <div className="d-flex align-items-center gap-2">
                                                <img
                                                    src={question.course.thumbnail || "/placeholder.svg"}
                                                    className="rounded"
                                                    width="50"
                                                    height="50"
                                                    alt={question.course.title}
                                                />
                                                <div>
                                                    <p className="mb-1">
                                                        Student Question In{' '}
                                                        <Link to={`/student/learning/${question.course.slug}`} target="_blank">
                                                            {question.course.title}
                                                        </Link>
                                                    </p>
                                                    <p className="mb-0">
                                                        Lesson{' '}
                                                        <Link to={`/student/learning/${question.course.slug}?lesson=${question.lesson.id}`} target="_blank">
                                                            {question.lesson.title}
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                className="btn btn-link text-danger p-0"
                                                onClick={() => handleDeleteQuestion(question.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex align-items-center gap-2">
                                                <img
                                                    src={question.user.image || "/placeholder.svg"}
                                                    className="rounded-circle"
                                                    width="40"
                                                    height="40"
                                                    alt={question.user.name}
                                                />
                                                <div>
                                                    <strong>{question.user.name}</strong>
                                                    <span className="text-muted ms-2">{formatDate(question.created_at)}</span>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <strong>{question.question_title}</strong>
                                                <p>{question.question_description}</p>
                                            </div>
                                            <h6 className="text-center">( {question.replies_count} answers )</h6>

                                            {/* Replies */}
                                            {question.replies.map(reply => (
                                                <div className="border p-3 rounded mt-3" key={reply.id}>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <img
                                                            src={reply.user.image || "/placeholder.svg"}
                                                            className="rounded-circle"
                                                            width="40"
                                                            height="40"
                                                            alt={reply.user.name}
                                                        />
                                                        <div>
                                                            <strong>{reply.user.name}</strong>
                                                            <span className="text-muted ms-2">{formatDate(reply.created_at)}</span>
                                                        </div>
                                                        <button
                                                            className="btn btn-link text-danger p-0 ms-auto"
                                                            onClick={() => handleDeleteReply(question.id, reply.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </button>
                                                    </div>
                                                    <p className="mt-2">{reply.reply}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Reply Form */}
                                        <div className="card-footer p-3">
                                            <form onSubmit={(e) => handleReplySubmit(e, question.id)}>
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Add reply"
                                                    value={replies[question.id] || ''}
                                                    onChange={(e) => handleReplyChange(question.id, e.target.value)}
                                                ></textarea>
                                                <button type="submit" className="btn btn-primary mt-2">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}


                </div>
            </div>
        </div>
    );
};

export default LessonQuestions;