import React from 'react';
import { Link } from 'react-router-dom';

const ReviewDetail = () => {

    const review = {
        id: 1,
        rating: 4,
        review: "This course was excellent! The instructor explained complex concepts in a clear and concise manner. The practical exercises were very helpful in reinforcing the material. I particularly enjoyed the sections on advanced techniques and real-world applications. Would definitely recommend to anyone looking to improve their skills in this area.",
        status: 1,
        created_at: '2023-05-15T10:30:00Z',
        course: {
            title: 'Web Development Fundamentals'
        }
    };



    // Render stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<i key={i} className="fa fa-star text-warning"></i>);
        }
        return stars;
    };

    return (
        <div className=" mx-auto">
            <Link to="/student/reviews" className="btn btn-outline-primary mb-3">
                <i className="fa fa-arrow-left"></i> Back to My Reviews
            </Link>

            <div className="dashboard__content-wrap">
                <div className="dashboard__content-title">
                    <h4 className="title">Review Details</h4>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold">Course</td>
                                        <td>{review.course.title}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Rating</td>
                                        <td>{renderStars(review.rating)}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Review</td>
                                        <td>{review.review}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Date</td>
                                        <td>29 April 2025</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Status</td>
                                        <td>
                                            <span className={`badge ${review.status === 1 ? 'bg-success' : 'bg-warning'} text-uppercase`}>
                                                {review.status === 1 ? 'Approved' : 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetail;