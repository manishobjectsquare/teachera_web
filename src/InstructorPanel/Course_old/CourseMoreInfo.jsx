// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import CourseNavigation from './CourseNavigation';
// import Select from 'react-select'; // For multi-select dropdowns

// const CourseMoreInfo = () => {
//     const { id: courseId } = useParams();

//     // State for form data
//     const [formData, setFormData] = useState({
//         capacity: '',
//         course_duration: '',
//         qna: false,
//         certificate: false,
//         partner_instructor: false,
//         partner_instructors: [],
//         category: '',
//         levels: [],
//         languages: []
//     });

//     // Mock data for categories, levels, languages, and instructors
//     const categories = [
//         {
//             id: 1,
//             name: 'Web Development',
//             subCategories: [
//                 { id: 101, name: 'Frontend Development' },
//                 { id: 102, name: 'Backend Development' },
//                 { id: 103, name: 'Full Stack Development' }
//             ]
//         },
//         {
//             id: 2,
//             name: 'Data Science',
//             subCategories: [
//                 { id: 201, name: 'Machine Learning' },
//                 { id: 202, name: 'Data Analysis' },
//                 { id: 203, name: 'Big Data' }
//             ]
//         }
//     ];

//     const levels = [
//         { id: 1, name: 'Beginner' },
//         { id: 2, name: 'Intermediate' },
//         { id: 3, name: 'Advanced' },
//         { id: 4, name: 'All Levels' }
//     ];

//     const languages = [
//         { id: 1, name: 'English' },
//         { id: 2, name: 'Spanish' },
//         { id: 3, name: 'French' },
//         { id: 4, name: 'German' },
//         { id: 5, name: 'Chinese' }
//     ];

//     const instructors = [
//         { id: 1, name: 'John Doe' },
//         { id: 2, name: 'Jane Smith' },
//         { id: 3, name: 'Robert Johnson' },
//         { id: 4, name: 'Emily Davis' }
//     ];

//     // Fetch course data if editing
//     useEffect(() => {
//         if (courseId) {
//             // In a real app, you would fetch the course data from an API
//             // For now, we'll use mock data
//             const mockCourseData = {
//                 id: courseId,
//                 capacity: '50',
//                 duration: '120',
//                 qna: true,
//                 certificate: true,
//                 partner_instructor: true,
//                 partnerInstructors: [{ instructor: { id: 2, name: 'Jane Smith' } }],
//                 category_id: 102,
//                 levels: [{ level_id: 1 }, { level_id: 2 }],
//                 languages: [{ language_id: 1 }]
//             };

//             setFormData({
//                 capacity: mockCourseData.capacity,
//                 course_duration: mockCourseData.duration,
//                 qna: mockCourseData.qna,
//                 certificate: mockCourseData.certificate,
//                 partner_instructor: mockCourseData.partner_instructor,
//                 partner_instructors: mockCourseData.partnerInstructors.map(pi => pi.instructor.id),
//                 category: mockCourseData.category_id.toString(),
//                 levels: mockCourseData.levels.map(l => l.level_id),
//                 languages: mockCourseData.languages.map(l => l.language_id)
//             });
//         }
//     }, [courseId]);

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;

//         if (type === 'checkbox') {
//             if (name === 'levels[]' || name === 'languages[]') {
//                 const fieldName = name.replace('[]', '');
//                 const valueInt = parseInt(value);

//                 setFormData(prev => {
//                     const currentValues = [...prev[fieldName]];
//                     if (checked) {
//                         if (!currentValues.includes(valueInt)) {
//                             currentValues.push(valueInt);
//                         }
//                     } else {
//                         const index = currentValues.indexOf(valueInt);
//                         if (index !== -1) {
//                             currentValues.splice(index, 1);
//                         }
//                     }
//                     return { ...prev, [fieldName]: currentValues };
//                 });
//             } else {
//                 setFormData({ ...formData, [name]: checked });
//             }
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     // Handle partner instructors selection
//     const handlePartnerInstructorsChange = (selectedOptions) => {
//         const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
//         setFormData({ ...formData, partner_instructors: selectedIds });
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form submitted:', formData);
//         // In a real app, you would send this data to your API
//     };

//     // Handle step change
//     const handleStepChange = (nextStep) => {
//         console.log(`Navigating to step ${nextStep}`);
//         // In a real app, you would handle navigation between steps
//     };

//     return (
//         <div className="col-lg-9">
//             <CourseNavigation onStepChange={handleStepChange} />
//             <div className="">
//                 <div className="card shadow p-4">
//                     <form onSubmit={handleSubmit} className="course-form">
//                         {/* Hidden fields */}
//                         <input type="hidden" name="course_id" value={courseId} />
//                         <input type="hidden" name="step" value="2" />
//                         <input type="hidden" name="next_step" value="3" />

//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="custom-frm-bx">
//                                     <label htmlFor="capacity" className="form-label">Capacity</label>
//                                     <input
//                                         id="capacity"
//                                         name="capacity"
//                                         type="text"
//                                         className="form-control"
//                                         value={formData.capacity}
//                                         onChange={handleChange}
//                                     />
//                                     <small className="text-muted">Leave blank for unlimited</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="custom-frm-bx">
//                                     <label htmlFor="course_duration" className="form-label">
//                                         Course Duration (Minutes) <span className="text-danger">*</span>
//                                     </label>
//                                     <input
//                                         id="course_duration"
//                                         name="course_duration"
//                                         type="text"
//                                         className="form-control"
//                                         value={formData.course_duration}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Toggle Switches */}
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <label className="form-label">Q&A</label>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-check form-switch">
//                                     <input
//                                         type="checkbox"
//                                         className="form-check-input"
//                                         id="toggle-qna"
//                                         name="qna"
//                                         checked={formData.qna}
//                                         onChange={handleChange}
//                                     />
//                                     <label className="form-check-label" htmlFor="toggle-qna"></label>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="row mt-2">
//                             <div className="col-md-6">
//                                 <label className="form-label">Completion Certificate</label>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-check form-switch">
//                                     <input
//                                         type="checkbox"
//                                         className="form-check-input"
//                                         id="toggle-cert"
//                                         name="certificate"
//                                         checked={formData.certificate}
//                                         onChange={handleChange}
//                                     />
//                                     <label className="form-check-label" htmlFor="toggle-cert"></label>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="row mt-2">
//                             <div className="col-md-6">
//                                 <label className="form-label">Partner Instructor</label>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-check form-switch">
//                                     <input
//                                         type="checkbox"
//                                         className="form-check-input partner_instructor_btn"
//                                         id="toggle-partner"
//                                         name="partner_instructor"
//                                         checked={formData.partner_instructor}
//                                         onChange={handleChange}
//                                     />
//                                     <label className="form-check-label" htmlFor="toggle-partner"></label>
//                                 </div>
//                             </div>
//                         </div>

//                         {formData.partner_instructor && (
//                             <div className="mb-3 mt-3 partner_instructor_list">
//                                 <label htmlFor="partner_instructors" className="form-label">Select a Partner Instructor</label>
//                                 <Select
//                                     isMulti
//                                     name="partner_instructors"
//                                     options={instructors.map(instructor => ({
//                                         value: instructor.id,
//                                         label: instructor.name
//                                     }))}
//                                     className="basic-multi-select"
//                                     classNamePrefix="select"
//                                     value={instructors
//                                         .filter(instructor => formData.partner_instructors.includes(instructor.id))
//                                         .map(instructor => ({ value: instructor.id, label: instructor.name }))}
//                                     onChange={handlePartnerInstructorsChange}
//                                 />
//                             </div>
//                         )}

//                         {/* Category Selection */}
//                         <div className="custom-frm-bx">
//                             <label htmlFor="category" className="form-label">
//                                 Category <span className="text-danger">*</span>
//                             </label>
//                             <select
//                                 className="form-select"
//                                 name="category"
//                                 value={formData.category}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">Select</option>
//                                 {categories.map(category => (
//                                     <optgroup key={category.id} label={category.name}>
//                                         {category.subCategories.map(subCategory => (
//                                             <option key={subCategory.id} value={subCategory.id}>
//                                                 {subCategory.name}
//                                             </option>
//                                         ))}
//                                     </optgroup>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Filters */}
//                         <div className="row">
//                             <div className="col-md-4">
//                                 <div className="card">
//                                     <div className="card-body">
//                                         <h5 className="card-title">Level</h5>
//                                         {levels.map(level => (
//                                             <div className="form-check" key={level.id}>
//                                                 <input
//                                                     className="form-check-input"
//                                                     type="checkbox"
//                                                     name="levels[]"
//                                                     value={level.id}
//                                                     id={`level-${level.id}`}
//                                                     checked={formData.levels.includes(level.id)}
//                                                     onChange={handleChange}
//                                                 />
//                                                 <label className="form-check-label" htmlFor={`level-${level.id}`}>
//                                                     {level.name}
//                                                 </label>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="col-md-4">
//                                 <div className="card">
//                                     <div className="card-body">
//                                         <h5 className="card-title">Language</h5>
//                                         {languages.map(language => (
//                                             <div className="form-check" key={language.id}>
//                                                 <input
//                                                     className="form-check-input"
//                                                     type="checkbox"
//                                                     name="languages[]"
//                                                     value={language.id}
//                                                     id={`lang-${language.id}`}
//                                                     checked={formData.languages.includes(language.id)}
//                                                     onChange={handleChange}
//                                                 />
//                                                 <label className="form-check-label" htmlFor={`lang-${language.id}`}>
//                                                     {language.name}
//                                                 </label>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Submit Button */}
//                         <div className="mt-4 text-end">
//                             <button className="btn btn-primary" type="submit">Save</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CourseMoreInfo;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CourseNavigation from './CourseNavigation';
import Select from 'react-select'; // For multi-select dropdowns

const CourseMoreInfo = () => {
    const { t } = useTranslation();
    const { id: courseId } = useParams();

    // State for form data
    const [formData, setFormData] = useState({
        capacity: '',
        course_duration: '',
        qna: false,
        certificate: false,
        partner_instructor: false,
        partner_instructors: [],
        category: '',
        levels: [],
        languages: []
    });

    // Mock data for categories, levels, languages, and instructors
    const categories = [
        {
            id: 1,
            name: t('Web Development'),
            subCategories: [
                { id: 101, name: t('Frontend Development') },
                { id: 102, name: t('Backend Development') },
                { id: 103, name: t('Full Stack Development') }
            ]
        },
        {
            id: 2,
            name: t('Data Science'),
            subCategories: [
                { id: 201, name: t('Machine Learning') },
                { id: 202, name: t('Data Analysis') },
                { id: 203, name: t('Big Data') }
            ]
        }
    ];

    const levels = [
        { id: 1, name: t('Beginner') },
        { id: 2, name: t('Intermediate') },
        { id: 3, name: t('Advanced') },
        { id: 4, name: t('All Levels') }
    ];

    const languages = [
        { id: 1, name: t('English') },
        { id: 2, name: t('Spanish') },
        { id: 3, name: t('French') },
        { id: 4, name: t('German') },
        { id: 5, name: t('Chinese') }
    ];

    const instructors = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Robert Johnson' },
        { id: 4, name: 'Emily Davis' }
    ];

    // Fetch course data if editing
    useEffect(() => {
        if (courseId) {
            // In a real app, you would fetch the course data from an API
            // For now, we'll use mock data
            const mockCourseData = {
                id: courseId,
                capacity: '50',
                duration: '120',
                qna: true,
                certificate: true,
                partner_instructor: true,
                partnerInstructors: [{ instructor: { id: 2, name: 'Jane Smith' } }],
                category_id: 102,
                levels: [{ level_id: 1 }, { level_id: 2 }],
                languages: [{ language_id: 1 }]
            };

            setFormData({
                capacity: mockCourseData.capacity,
                course_duration: mockCourseData.duration,
                qna: mockCourseData.qna,
                certificate: mockCourseData.certificate,
                partner_instructor: mockCourseData.partner_instructor,
                partner_instructors: mockCourseData.partnerInstructors.map(pi => pi.instructor.id),
                category: mockCourseData.category_id.toString(),
                levels: mockCourseData.levels.map(l => l.level_id),
                languages: mockCourseData.languages.map(l => l.language_id)
            });
        }
    }, [courseId]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'levels[]' || name === 'languages[]') {
                const fieldName = name.replace('[]', '');
                const valueInt = parseInt(value);

                setFormData(prev => {
                    const currentValues = [...prev[fieldName]];
                    if (checked) {
                        if (!currentValues.includes(valueInt)) {
                            currentValues.push(valueInt);
                        }
                    } else {
                        const index = currentValues.indexOf(valueInt);
                        if (index !== -1) {
                            currentValues.splice(index, 1);
                        }
                    }
                    return { ...prev, [fieldName]: currentValues };
                });
            } else {
                setFormData({ ...formData, [name]: checked });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle partner instructors selection
    const handlePartnerInstructorsChange = (selectedOptions) => {
        const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData({ ...formData, partner_instructors: selectedIds });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(t('Form submitted:'), formData);
        // In a real app, you would send this data to your API
    };

    // Handle step change
    const handleStepChange = (nextStep) => {
        console.log(t('Navigating to step {{nextStep}}', { nextStep }));
        // In a real app, you would handle navigation between steps
    };

    return (
        <div className="col-lg-9">
            <CourseNavigation onStepChange={handleStepChange} />
            <div className="">
                <div className="card shadow p-4">
                    <form onSubmit={handleSubmit} className="course-form">
                        {/* Hidden fields */}
                        <input type="hidden" name="course_id" value={courseId} />
                        <input type="hidden" name="step" value="2" />
                        <input type="hidden" name="next_step" value="3" />

                        <div className="row">
                            <div className="col-md-6">
                                <div className="custom-frm-bx">
                                    <label htmlFor="capacity" className="form-label">{t('Capacity')}</label>
                                    <input
                                        id="capacity"
                                        name="capacity"
                                        type="text"
                                        className="form-control"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        aria-label={t('Course capacity')}
                                    />
                                    <small className="text-muted">{t('Leave blank for unlimited')}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="custom-frm-bx">
                                    <label htmlFor="course_duration" className="form-label">
                                        {t('Course Duration (Minutes)')} <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="course_duration"
                                        name="course_duration"
                                        type="text"
                                        className="form-control"
                                        value={formData.course_duration}
                                        onChange={handleChange}
                                        required
                                        aria-label={t('Course duration in minutes')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Toggle Switches */}
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label">{t('Q&A')}</label>
                            </div>
                            <div className="col-md-6">
                                <div className="form-check form-switch">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="toggle-qna"
                                        name="qna"
                                        checked={formData.qna}
                                        onChange={handleChange}
                                        aria-label={t('Enable Q&A')}
                                    />
                                    <label className="form-check-label" htmlFor="toggle-qna"></label>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="form-label">{t('Completion Certificate')}</label>
                            </div>
                            <div className="col-md-6">
                                <div className="form-check form-switch">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="toggle-cert"
                                        name="certificate"
                                        checked={formData.certificate}
                                        onChange={handleChange}
                                        aria-label={t('Enable completion certificate')}
                                    />
                                    <label className="form-check-label" htmlFor="toggle-cert"></label>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="form-label">{t('Partner Instructor')}</label>
                            </div>
                            <div className="col-md-6">
                                <div className="form-check form-switch">
                                    <input
                                        type="checkbox"
                                        className="form-check-input partner_instructor_btn"
                                        id="toggle-partner"
                                        name="partner_instructor"
                                        checked={formData.partner_instructor}
                                        onChange={handleChange}
                                        aria-label={t('Enable partner instructor')}
                                    />
                                    <label className="form-check-label" htmlFor="toggle-partner"></label>
                                </div>
                            </div>
                        </div>

                        {formData.partner_instructor && (
                            <div className="mb-3 mt-3 partner_instructor_list">
                                <label htmlFor="partner_instructors" className="form-label">{t('Select a Partner Instructor')}</label>
                                <Select
                                    isMulti
                                    name="partner_instructors"
                                    options={instructors.map(instructor => ({
                                        value: instructor.id,
                                        label: instructor.name
                                    }))}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    value={instructors
                                        .filter(instructor => formData.partner_instructors.includes(instructor.id))
                                        .map(instructor => ({ value: instructor.id, label: instructor.name }))}
                                    onChange={handlePartnerInstructorsChange}
                                    placeholder={t('Select instructors')}
                                    aria-label={t('Partner instructors')}
                                    noOptionsMessage={() => t('No instructors available')}
                                />
                            </div>
                        )}

                        {/* Category Selection */}
                        <div className="custom-frm-bx">
                            <label htmlFor="category" className="form-label">
                                {t('Category')} <span className="text-danger">*</span>
                            </label>
                            <select
                                className="form-select"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                aria-label={t('Course category')}
                            >
                                <option value="">{t('Select')}</option>
                                {categories.map(category => (
                                    <optgroup key={category.id} label={category.name}>
                                        {category.subCategories.map(subCategory => (
                                            <option key={subCategory.id} value={subCategory.id}>
                                                {subCategory.name}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>

                        {/* Filters */}
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{t('Level')}</h5>
                                        {levels.map(level => (
                                            <div className="form-check" key={level.id}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="levels[]"
                                                    value={level.id}
                                                    id={`level-${level.id}`}
                                                    checked={formData.levels.includes(level.id)}
                                                    onChange={handleChange}
                                                    aria-label={t('Level: {{name}}', { name: level.name })}
                                                />
                                                <label className="form-check-label" htmlFor={`level-${level.id}`}>
                                                    {level.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{t('Language')}</h5>
                                        {languages.map(language => (
                                            <div className="form-check" key={language.id}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="languages[]"
                                                    value={language.id}
                                                    id={`lang-${language.id}`}
                                                    checked={formData.languages.includes(language.id)}
                                                    onChange={handleChange}
                                                    aria-label={t('Language: {{name}}', { name: language.name })}
                                                />
                                                <label className="form-check-label" htmlFor={`lang-${language.id}`}>
                                                    {language.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4 text-end">
                            <button className="btn btn-primary" type="submit">{t('Save')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CourseMoreInfo;