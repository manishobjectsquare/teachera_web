// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import CourseNavigation from './CourseNavigation';

// const Finish = () => {
//     const { id: courseId } = useParams();

//     // State for form data
//     const [formData, setFormData] = useState({
//         message_for_reviewer: '',
//         status: ''
//     });

//     // Fetch course data if editing
//     useEffect(() => {
//         if (courseId) {
//             // In a real app, you would fetch the course data from an API
//             // For now, we'll use mock data
//             const mockCourseData = {
//                 id: courseId,
//                 message_for_reviewer: 'Please review this course at your earliest convenience.',
//                 status: 'active'
//             };

//             setFormData({
//                 message_for_reviewer: mockCourseData.message_for_reviewer,
//                 status: mockCourseData.status
//             });
//         }
//     }, [courseId]);

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form submitted:', formData);
//         // In a real app, you would send this data to your API
//     };

//     return (
//         <div className="col-lg-6">
//             <CourseNavigation />
//             <div className="container">
//                 <div className="card shadow p-4">
//                     <form onSubmit={handleSubmit} className="course-form">
//                         {/* Hidden fields */}
//                         <input type="hidden" name="course_id" value={courseId} />
//                         <input type="hidden" name="step" value="4" />
//                         <input type="hidden" name="next_step" value="4" />

//                         {/* Message for Reviewer */}
//                         <div className="mb-3 custom-frm-bx">
//                             <label className="form-label">Message for Reviewer</label>
//                             <textarea
//                                 name="message_for_reviewer"
//                                 className="form-control"
//                                 rows="4"
//                                 value={formData.message_for_reviewer}
//                                 onChange={handleChange}
//                             ></textarea>
//                         </div>

//                         {/* Course Status */}
//                         <div className="mb-3 custom-frm-bx">
//                             <label className="form-label">
//                                 Status <span className="text-danger">*</span>
//                             </label>
//                             <select
//                                 name="status"
//                                 className="form-select"
//                                 value={formData.status}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">Select</option>
//                                 <option value="active">Publish</option>
//                                 <option value="inactive">UnPublish</option>
//                                 <option value="is_draft">Draft</option>
//                             </select>
//                         </div>

//                         {/* Submit Button */}
//                         <div className="mt-3 text-end">
//                             <button className="btn btn-primary" type="submit">Save</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Finish;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CourseNavigation from './CourseNavigation';

const Finish = () => {
    const { t } = useTranslation();
    const { id: courseId } = useParams();

    // State for form data
    const [formData, setFormData] = useState({
        message_for_reviewer: '',
        status: ''
    });

    // Fetch course data if editing
    useEffect(() => {
        if (courseId) {
            // In a real app, you would fetch the course data from an API
            // For now, we'll use mock data
            const mockCourseData = {
                id: courseId,
                message_for_reviewer: t('Please review this course at your earliest convenience.'),
                status: 'active'
            };

            setFormData({
                message_for_reviewer: mockCourseData.message_for_reviewer,
                status: mockCourseData.status
            });
        }
    }, [courseId, t]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(t('Form submitted:'), formData);
        // In a real app, you would send this data to your API
    };

    // Status options with translations
    const statusOptions = [
        { value: '', label: t('Select') },
        { value: 'active', label: t('Publish') },
        { value: 'inactive', label: t('UnPublish') },
        { value: 'is_draft', label: t('Draft') }
    ];

    return (
        <div className="col-lg-6">
            <CourseNavigation />
            <div className="container">
                <div className="card shadow p-4">
                    <form onSubmit={handleSubmit} className="course-form">
                        {/* Hidden fields */}
                        <input type="hidden" name="course_id" value={courseId} />
                        <input type="hidden" name="step" value="4" />
                        <input type="hidden" name="next_step" value="4" />

                        {/* Message for Reviewer */}
                        <div className="mb-3 custom-frm-bx">
                            <label htmlFor="message_for_reviewer" className="form-label">
                                {t('Message for Reviewer')}
                            </label>
                            <textarea
                                id="message_for_reviewer"
                                name="message_for_reviewer"
                                className="form-control"
                                rows="4"
                                value={formData.message_for_reviewer}
                                onChange={handleChange}
                                aria-label={t('Message for the course reviewer')}
                                placeholder={t('Enter a message for the reviewer')}
                            ></textarea>
                        </div>

                        {/* Course Status */}
                        <div className="mb-3 custom-frm-bx">
                            <label htmlFor="status" className="form-label">
                                {t('Status')} <span className="text-danger">*</span>
                            </label>
                            <select
                                id="status"
                                name="status"
                                className="form-select"
                                value={formData.status}
                                onChange={handleChange}
                                required
                                aria-label={t('Course publication status')}
                            >
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <small className="text-muted">
                                {formData.status === 'active' && t('Your course will be available to students.')}
                                {formData.status === 'inactive' && t('Your course will be hidden from students.')}
                                {formData.status === 'is_draft' && t('Your course will be saved as a draft.')}
                            </small>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-3 text-end">
                            <button className="btn btn-primary" type="submit">
                                {t('Save')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Finish;