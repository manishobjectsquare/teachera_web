import React from 'react';
import StudentSidebar from './StudentSidebar';
import "../../assets/css/student-dashboard.css"
const StudentDashboardLayout = ({ children }) => {

  return (
    <section className="user-main mt-85">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 d-lg-block d-xl-block d-none">
            <StudentSidebar />
          </div>

          <div className="col-lg-9">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentDashboardLayout;