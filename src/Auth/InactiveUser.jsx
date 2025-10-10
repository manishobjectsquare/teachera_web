// import React from 'react';

// const InactiveUser = () => {
//     return (
//         <div
//             style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 minHeight: '100vh',
//                 textAlign: 'center',
//                 padding: '20px',
//                 backgroundColor: '#f8f9fa' // A light background color
//             }}
//         >
//             <div
//                 style={{
//                     maxWidth: '500px',
//                     padding: '40px',
//                     borderRadius: '10px',
//                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                     backgroundColor: '#ffffff'
//                 }}
//             >
//                 <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>
//                     Account Deactivated 😔
//                 </h1>
//                 <p style={{ fontSize: '1.1rem', color: '#6c757d', lineHeight: '1.6' }}>
//                     Your account has been deactivated. This may be due to a violation of our terms of service or for security reasons.
//                 </p>
//                 <p style={{ fontSize: '1.1rem', color: '#6c757d', lineHeight: '1.6' }}>
//                     Please contact our support team for further assistance.
//                 </p>
//                 <div style={{ marginTop: '30px' }}>
//                     <a
//                         href="mailto:support@basementex.com"
//                         style={{
//                             textDecoration: 'none',
//                             backgroundColor: '#007bff',
//                             color: '#ffffff',
//                             padding: '12px 24px',
//                             borderRadius: '5px',
//                             fontSize: '1rem',
//                             fontWeight: 'bold',
//                             transition: 'background-color 0.3s'
//                         }}
//                     >
//                         Contact Support
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default InactiveUser;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';


const InactiveUser = () => {
    const navigate = useNavigate();
    const { user, profileData, authLoading } = useUser();

    useEffect(() => {
        // This effect runs on component mount
        if (!authLoading) {
            // Check if the user is authenticated and their status is NOT 'inactive'
            if (user?.Token && profileData?.status !== 'inactive') {
                // Redirect active users away from this page
                navigate('/student/dashboard'); // Or any other appropriate route
            }
            // If there's no token, they're not logged in, so they can stay on this page
            // If they are logged in but have a different status (e.g., 'active'), redirect them
        }
    }, [authLoading, user, profileData, navigate]);

    // Render the content only after authLoading is complete
    if (authLoading) {
        return <div>Loading...</div>; // You can use a more sophisticated loading component
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#f8f9fa'
            }}
        >
            <div
                style={{
                    maxWidth: '500px',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#ffffff'
                }}
            >
                <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>
                    Account Deactivated
                </h1>
                <p style={{ fontSize: '1.1rem', color: '#6c757d', lineHeight: '1.6' }}>
                    Your account has been deactivated. This may be due to a violation of our terms of service or for security reasons.
                </p>
                <p style={{ fontSize: '1.1rem', color: '#6c757d', lineHeight: '1.6' }}>
                    Please contact our support team for further assistance.
                </p>
                <div style={{ marginTop: '30px' }}>
                    <a
                        href="mailto:support@basementex.com"
                        style={{
                            textDecoration: 'none',
                            backgroundColor: '#007bff',
                            color: '#ffffff',
                            padding: '12px 24px',
                            borderRadius: '5px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InactiveUser;