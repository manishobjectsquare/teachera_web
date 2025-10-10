import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./Components/Layout/HomeLayout";
import Home from "./Pages/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Courses from "./Pages/Courses";
import CourseDetails from "./Pages/CourseDetails";
import Instructors from "./Pages/Instructors";
import InstructorDetails from "./Pages/InstructorDetails";
import InstructorBecome from "./Pages/InstructorBecome";
import Blogs from "./Pages/Blogs";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Careers from "./Pages/Careers";
import BlogDetails from "./Pages/BlogDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
import CustomPage from "./Pages/CustomPage";
import OrderFailed from "./Pages/OrderFailed";
import OrderSuccess from "./Pages/OrderSuccess";
import CareerDetails from "./Pages/CareerDetails";
import QuizResult from "./LearningPlayer/QuizResult";
import StudentDashboardLayout from "./StudentDashboard/Layout/StudentDashboardLayout";
import ProfileSettings from "./StudentDashboard/ProfileSetting/ProfileSetting";
import Dashboard from "./StudentDashboard/Dashboard/Dashboard";
import EnrolledCourses from "./StudentDashboard/EnrolledCourses/EnrolledCourses";
import PurchaseHistory from "./StudentDashboard/Orders/PurchaseHistory";
import OrderInvoice from "./StudentDashboard/Orders/OrderInvoice";
import QuizAttempts from "./StudentDashboard/Quiz/QuizAttempts";
import MyReviews from "./StudentDashboard/Review/MyReviews";
import ReviewDetail from "./StudentDashboard/Review/ReviewDetail";
import Wishlist from "./StudentDashboard/Wishlist/WishList";
import InstructorLayout from "./InstructorPanel/Layout/InstructorLayout";
import InstructorDashboard from "./InstructorPanel/Dashboard/InstructorDashboard";
import InstructorCourses from "./InstructorPanel/Course/InstructorCourses";
import CourseForm from "./InstructorPanel/Course/CourseForm";
import CourseMoreInfo from "./InstructorPanel/Course/CourseMoreInfo";
import CourseContent from "./InstructorPanel/Course/CourseContent";
import Finish from "./InstructorPanel/Course/Finish";
import LessonQuestions from "./InstructorPanel/LessonQuestion/LessonQuestions";
import Payout from "./InstructorPanel/Payout/Payout";
import PayoutRequest from "./InstructorPanel/Payout/RequestPayout";
import InstructorProfile from "./InstructorPanel/Profile/InstructorProfile";
import MySells from "./InstructorPanel/Mysells/MySells";
import Announcements from "./InstructorPanel/Announcement/Announcement";
import CreateAnnounce from "./InstructorPanel/Announcement/CreateAnnounce";
import EditAnnouncement from "./InstructorPanel/Announcement/EditAnnouncement";
import InstituteLayout from "./Institute/Layout/InstituteLayout";
import Institute from "./Institute/Institute";
import InstituteLogin from "./Institute/Auth/InstituteLogin";
import InstituteRegister from "./Institute/Auth/InstituteRegister";
import InstituteCourses from "./Institute/InstituteCourses";
import AdditionalDetails from "./Institute/Auth/AdditionalDetails";
import QuizResultPage from "./LearningPlayer/QuizResult";
import CoursePlayer from "./LearningPlayer/Layout/CoursePlayer";
import QuizPlayer from "./LearningPlayer/QuizPlayer";
import ScrollToTop from "./ScrollToTop";
import Testimonial from "./Pages/Testimonial";
import ProtectedRoute from "./Components/protected-route";
import InvoicePrint from "./StudentDashboard/Orders/InvoicePrint";
import CourseBundleDetails from "./Pages/CourseBundleDetails";
import LiveCourseDetail from "./Pages/LiveCourseDetail";
import DiplomaDetails from "./Pages/DiplomaDetails";
import ChatPage from "./Pages/ChatPage";
import LiveCoursesPage from "./Pages/LiveCoursePage";
import Recorded from "./Pages/Recorded";
import CoursePlayerLive from "./LearningPlayer/Layout/CoursePlayerLive";
import InactiveUser from "./Auth/InactiveUser";
import BundleDetails from "./Pages/BundleDetails";
import { Navigate } from "react-router-dom";
import { useUser } from "./Context/UserContext";

const AppRoutes = () => {
  const { user } = useUser();
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* auth page routes */}
        <Route path="/" element={<Navigate to={user.Token ? `/student/enrolled-courses` : "/home"} replace />} />

        {/* <Route
          path="/"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        /> */}
        <Route
          path="recorded"
          element={
            <HomeLayout>
              <Recorded />
            </HomeLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <HomeLayout>
              <ChatPage />
            </HomeLayout>
          }
        />
        <Route
          path="/login"
          element={
            <HomeLayout>
              <Login />
            </HomeLayout>
          }
        />
        <Route
          path="/deactivated"
          element={
            <HomeLayout>
              <InactiveUser />
            </HomeLayout>
          }
        />
        <Route
          path="/register"
          element={
            <HomeLayout>
              <Register />
            </HomeLayout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <HomeLayout>
              <ForgotPassword />
            </HomeLayout>
          }
        />
        {/* <Route path="/reset-password" element={
                    <HomeLayout>
                        <ResetPassword />
                    </HomeLayout>
                } /> */}

        {/* page routes */}

        <Route
          path="/home"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <HomeLayout>
              <Courses />
            </HomeLayout>
          }
        />
        <Route
          path="/home/course"
          element={
            <HomeLayout>
              <Courses />
            </HomeLayout>
          }
        />
        <Route
          path="/course"
          element={
            <HomeLayout>
              <Courses />
            </HomeLayout>
          }
        />
        <Route
          path="/courses?category=:id`"
          element={
            <HomeLayout>
              <Courses />
            </HomeLayout>
          }
        />
        <Route
          path="/courses/search/?q=`"
          element={
            <HomeLayout>
              <Courses />
            </HomeLayout>
          }
        />
        <Route
          path="/live-courses"
          element={
            <HomeLayout>
              <LiveCoursesPage />
            </HomeLayout>
          }
        />

        <Route
          path="/course-details/:id"
          element={
            <HomeLayout>
              <CourseDetails />
            </HomeLayout>
          }
        />
        <Route
          path="/bundle-details/:id"
          element={
            <HomeLayout>
              <CourseBundleDetails />
            </HomeLayout>
          }
        />
        <Route
          path="/live-course-details/:id"
          element={
            <HomeLayout>
              <LiveCourseDetail />
            </HomeLayout>
          }
        />
        <Route
          path="/diploma-details/:id"
          element={
            <HomeLayout>
              <DiplomaDetails />
            </HomeLayout>
          }
        />
        {/* <Route
          path="/bundle-details/:id"
          element={
            <HomeLayout>
              <BundleDetails />
            </HomeLayout>
          }
        /> */}
        <Route
          path="/all-instructors"
          element={
            <HomeLayout>
              <Instructors />
            </HomeLayout>
          }
        />
        <Route
          path="/instructor-details/:id"
          element={
            <HomeLayout>
              <InstructorDetails />
            </HomeLayout>
          }
        />
        <Route
          path="/become-instructor"
          element={
            <HomeLayout>
              <InstructorBecome />
            </HomeLayout>
          }
        />

        <Route
          path="/blog"
          element={
            <HomeLayout>
              <Blogs />
            </HomeLayout>
          }
        />
        {/* <Route path="/blog-details" element={
                    <HomeLayout>
                        <BlogDetails />
                    </HomeLayout>
                } /> */}
        <Route
          path="/blog/:id"
          element={
            <HomeLayout>
              <BlogDetails />
            </HomeLayout>
          }
        />
        <Route
          path="/about-us"
          element={
            <HomeLayout>
              <AboutUs />
            </HomeLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <HomeLayout>
              <ContactUs />
            </HomeLayout>
          }
        />
        <Route
          path="/career"
          element={
            <HomeLayout>
              <Careers />
            </HomeLayout>
          }
        />
        <Route
          path="/career-detail/:id"
          element={
            <HomeLayout>
              <CareerDetails />
            </HomeLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <HomeLayout>
              <Cart />
            </HomeLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <HomeLayout>
              <Checkout />
            </HomeLayout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <HomeLayout>
              <CustomPage pageType="privacy-policy" />
            </HomeLayout>
          }
        />
        <Route
          path="/terms-and-conditions"
          element={
            <HomeLayout>
              <CustomPage pageType="terms-conditions" />
            </HomeLayout>
          }
        />
        <Route
          path="/page/:type"
          element={
            <HomeLayout>
              <CustomPage />
            </HomeLayout>
          }
        />
        <Route
          path="/testimonial"
          element={
            <HomeLayout>
              <Testimonial />
            </HomeLayout>
          }
        />
        <Route
          path="/order-failed"
          element={
            <HomeLayout>
              <OrderFailed />
            </HomeLayout>
          }
        />
        <Route
          path="/order-completed"
          element={
            <HomeLayout>
              <OrderSuccess />
            </HomeLayout>
          }
        />
        <Route
          path="/quiz-result"
          element={
            <HomeLayout>
              <QuizResult />
            </HomeLayout>
          }
        />

        {/* Student Dashboard ROUTES */}
        <Route
          path="student/*"
          element={
            <>
              <HomeLayout>
                <StudentDashboardLayout>
                  <Routes>
                    <Route
                      path="setting"
                      element={
                        <ProtectedRoute>
                          <ProfileSettings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="enrolled-courses"
                      index
                      element={
                        <ProtectedRoute>
                          <EnrolledCourses />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="orders"
                      element={
                        <ProtectedRoute>
                          <PurchaseHistory />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="print-invoice"
                      element={
                        <ProtectedRoute>
                          <OrderInvoice />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="quiz-attempts"
                      element={
                        <ProtectedRoute>
                          <QuizAttempts />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="reviews"
                      element={
                        <ProtectedRoute>
                          <MyReviews />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="reviews/show"
                      element={
                        <ProtectedRoute>
                          <ReviewDetail />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="wishlist"
                      element={
                        <ProtectedRoute>
                          <Wishlist />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/student/purchase-history"
                      element={<PurchaseHistory />}
                    />

                    <Route
                      path="order/invoice/:purchaseId"
                      element={<OrderInvoice />}
                    />

                    {/* Print Invoice Route - Using purchaseId instead of orderId */}
                    <Route
                      path="order/print-invoice/:purchaseId"
                      element={<InvoicePrint />}
                    />
                  </Routes>
                </StudentDashboardLayout>
              </HomeLayout>
            </>
          }
        />
        {/* LEARNING PLAYER ROUTES */}
        <Route path="/student/quiz-result" element={<QuizResultPage />} />
        {/* <Route path='/student/learning' element={<CoursePlayer />} /> */}
        <Route path="/student/learning/:id" element={<CoursePlayer />} />
        <Route
          path="/student/live-learning/:id"
          element={<CoursePlayerLive />}
        />
        <Route path="/student/learning/" element={<CoursePlayer />} />
        <Route
          path="/student/learning/quiz/:courseId/:id"
          element={<QuizPlayer />}
        />
        {/* Instructor ROUTES */}
        <Route path="instructor/*" element={<InstructorLayout />}>
          <Route
            index
            path="dashboard"
            element={
              <ProtectedRoute requireInstructor={true}>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            index
            element={
              <ProtectedRoute requireInstructor={true}>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses"
            element={
              <ProtectedRoute requireInstructor={true}>
                <InstructorCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses/add"
            element={
              <ProtectedRoute requireInstructor={true}>
                <CourseForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses/add/:id"
            element={
              <ProtectedRoute requireInstructor={true}>
                <CourseForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses/add/:id/step=2"
            element={
              <ProtectedRoute requireInstructor={true}>
                <CourseMoreInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses/add/:id/step=3"
            element={
              <ProtectedRoute requireInstructor={true}>
                <CourseContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses/add/:id/step=4"
            element={
              <ProtectedRoute requireInstructor={true}>
                <Finish />
              </ProtectedRoute>
            }
          />
          <Route
            path="lesson-questions"
            element={
              <ProtectedRoute requireInstructor={true}>
                <LessonQuestions />
              </ProtectedRoute>
            }
          />
          <Route
            path="payout"
            element={
              <ProtectedRoute requireInstructor={true}>
                <Payout />
              </ProtectedRoute>
            }
          />
          <Route
            path="payout/create"
            element={
              <ProtectedRoute requireInstructor={true}>
                <PayoutRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="setting"
            element={
              <ProtectedRoute requireInstructor={true}>
                <InstructorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-sells"
            element={
              <ProtectedRoute requireInstructor={true}>
                <MySells />
              </ProtectedRoute>
            }
          />
          <Route
            path="announcements"
            element={
              <ProtectedRoute requireInstructor={true}>
                <Announcements />
              </ProtectedRoute>
            }
          />
          <Route
            path="announcements/create"
            element={
              <ProtectedRoute requireInstructor={true}>
                <CreateAnnounce />
              </ProtectedRoute>
            }
          />
          <Route
            path="announcements/edit/:id"
            element={
              <ProtectedRoute requireInstructor={true}>
                <EditAnnouncement />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* INSTITUTION ROUTES */}
        <Route path="/institute" element={<InstituteLayout />}>
          <Route index element={<Institute />} />
          <Route path="login" element={<InstituteLogin />} />
          <Route path="register" element={<InstituteRegister />} />
          <Route path="additional-details" element={<AdditionalDetails />} />
          <Route path="courses" element={<InstituteCourses />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
