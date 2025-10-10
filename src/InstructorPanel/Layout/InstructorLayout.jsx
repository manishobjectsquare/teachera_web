"use client";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import InstructorHeader from "./InstructorHeader";
import InstructorSidebar from "./InstructorSidebar";
import InstructorFooter from "./InstructorFooter";
import "../../assets/css/instructor.css";
import Footer from "../../Components/Layout/Footer";
const InstructorLayout = () => {
  // Set document title
  useEffect(() => {
    document.title = "Instructor Dashboard - Basementex";
  }, []);

  return (
    <div className="instructor-dashboard-layout">
      <InstructorHeader />

      <section className="main-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <InstructorSidebar />
            </div>

            <Outlet />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InstructorLayout;
