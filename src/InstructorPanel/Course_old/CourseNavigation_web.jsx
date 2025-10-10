// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const CourseNavigation = ({ onStepChange }) => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     // Extract step from URL query parameters
//     const getStepFromUrl = () => {
//         const searchParams = new URLSearchParams(location.search);
//         const step = searchParams.get('step');
//         return step ? parseInt(step) : 1; // Default to step 1
//     };

//     const [activeStep, setActiveStep] = useState(getStepFromUrl());

//     // Update active step when URL changes
//     useEffect(() => {
//         setActiveStep(getStepFromUrl());
//     }, [location.search]);

//     // Navigation steps
//     const steps = [
//         { id: 1, name: 'Basic Infos' },
//         { id: 2, name: 'More Infos' },
//         { id: 3, name: 'Course Contents' },
//         { id: 4, name: 'Finish' }
//     ];

//     // Handle navigation click
//     const handleNavClick = (step) => {

//         if (location.pathname.includes('/create')) {
//             if (onStepChange) {
//                 onStepChange(step);
//                 console.log(step);
//             }

//         } else {
//             // Otherwise, just navigate to the step
//             const searchParams = new URLSearchParams(location.search);
//             searchParams.set('step', step);
//             console.log(searchParams);

//             navigate({ search: searchParams.toString() });
//         }

//         setActiveStep(step);
//     };

//     return (
//         <div className="dashboard__review-table">
//             <div className="dashboard__nav-wrap">
//                 <ul className="nav" id="myTab" role="tablist">
//                     {steps.map(step => (
//                         <li key={step.id} className="nav-item" role="presentation">
//                             <button
//                                 className={`nav-link navigation-btn ${activeStep === step.id ? 'active' : ''}`}
//                                 id={`item${step.id}-tab`}
//                                 data-step={step.id}
//                                 onClick={() => handleNavClick(step.id)}
//                             >
//                                 {step.name}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default CourseNavigation;



import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CourseNavigation = ({ onStepChange }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    // Extract step from URL query parameters
    const getStepFromUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        const step = searchParams.get('step');
        return step ? parseInt(step) : 1; // Default to step 1
    };

    const [activeStep, setActiveStep] = useState(getStepFromUrl());

    // Update active step when URL changes
    useEffect(() => {
        setActiveStep(getStepFromUrl());
    }, [location.search]);

    // Navigation steps
    const steps = [
        { id: 1, name: t('Basic Infos') },
        { id: 2, name: t('More Infos') },
        { id: 3, name: t('Course Contents') },
        { id: 4, name: t('Finish') }
    ];

    // Handle navigation click
    const handleNavClick = (step) => {
        if (location.pathname.includes('/create')) {
            if (onStepChange) {
                onStepChange(step);
                console.log(step);
            }
        } else {
            // Otherwise, just navigate to the step
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('step', step);
            console.log(searchParams);

            navigate({ search: searchParams.toString() });
        }

        setActiveStep(step);
    };

    return (
        <div className="dashboard__review-table">
            <div className="dashboard__nav-wrap">
                <ul className="nav" id="myTab" role="tablist" aria-label={t('Course creation steps')}>
                    {steps.map(step => (
                        <li key={step.id} className="nav-item" role="presentation">
                            <button
                                className={`nav-link navigation-btn ${activeStep === step.id ? 'active' : ''}`}
                                id={`item${step.id}-tab`}
                                data-step={step.id}
                                onClick={() => handleNavClick(step.id)}
                                aria-selected={activeStep === step.id}
                                aria-controls={`item${step.id}-content`}
                                aria-label={t('Navigate to step: {{stepName}}', { stepName: step.name })}
                            >
                                {step.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CourseNavigation;