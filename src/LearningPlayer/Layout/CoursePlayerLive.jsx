import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import quizIcon from "../../assets/images/quiz.png";
import { useTranslation } from "react-i18next";
import {
  faAngleLeft,
  faStream,
  faTimes,
  faVideo,
  faFileAlt,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faQuestionCircle,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import BottomPanel from "./BottomPanel";
import "../../assets/css/player.css";
import "../../assets/css/playermain.css";
import BunnyPlayer from "../BunnyPlayer";
import PdfViewer from "../PdfViewer";
import DocxViewer from "../DocxViewer";
import loaderImg from "../../assets/images/loaderImg.png";
import { baseUrl } from "../../config/baseUrl";

const CoursePlayerLive = () => {
  const { t, i18n } = useTranslation();
  const { courseId } = useParams();
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Course data and UI states
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChapter, setActiveChapter] = useState(null);

  // Content states
  const [currentContentType, setCurrentContentType] = useState("video"); // video, quiz, document
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentFilePath, setCurrentFilePath] = useState("");
  const [currentFileType, setCurrentFileType] = useState(""); // pdf, docx, etc.

  // Progress tracking states
  const [completedQuizzes, setCompletedQuizzes] = useState([]); // Only for quizzes (no API endpoint yet)
  const [courseLectureCount, setCourseLectureCount] = useState(0);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const s3BaseUrl = "https://basementex.sfo3.digitaloceanspaces.com/";

  // Get user ID from localStorage
  const getUserId = () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage");
        return null;
      }
      return userId;
    } catch (error) {
      console.error("Error getting userId from localStorage:", error);
      return null;
    }
  };

  // API function to update completion status
  const updateCompletionStatus = async (videoId, completed) => {
    const userId = getUserId();
    if (!userId) {
      return { success: false, error: "User ID not found" };
    }

    try {
      setIsUpdatingProgress(true);

      const response = await fetch(
        `https://api.basementex.com/api/v1/web/course-progress/${userId}/${id}/video/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: completed,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && data.message) {
        // API success - refresh course data to get updated isVideoDone status
        await fetchCourseData();
        return { success: true, data };
      } else {
        console.error("API Error:", data);
        return {
          success: false,
          error: data.message || "Failed to update progress",
        };
      }
    } catch (error) {
      console.error("Network Error:", error);
      return { success: false, error: error.message };
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  // Fetch course data with user-specific progress
  const fetchCourseData = async () => {
    const userId = getUserId();

    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      // Updated API endpoint with userId
      const response = await fetch(
        `https://api.basementex.com/api/v1/web/liveCourse/live-course-details/${id}/${userId}`
        // `https://api.basementex.com/api/v1/web/liveCourse/liveLession-view/${id}/${userId}`
      );
      const data = await response.json();

      if (data.status) {
        setCourse({
          id: data.data._id,
          title: data.data.title,
          arabic_title: data.data.arabic_title || "",
          chapters: data.data.chapters,
          courseFile: null, // new API doesn't have courseFileDeatils
        });

        if (data.data.chapters.length > 0) {
          // console.log(data.data.chapters[0].liveCourseSession.length > 0);
          if (data.data.chapters[0].liveCourseSession.length > 0) {
            const firstChapter = data.data.chapters[0].liveCourseSession[0];
            // console.log(firstChapter, "firstChapter");

            setActiveChapter(data.data.chapters[0]._id);
            // console.log("woking");
            if (firstChapter?.video_link) {
              setCurrentContentType("video");
              setCurrentLesson(firstChapter);
              setCurrentProgress({
                chapter_id: data.data.chapters[0]._id,
                lesson_id: firstChapter._id,
                type: "video",
              });
            } else {
              setCurrentContentType("google_meet");
              setCurrentLesson(firstChapter);
              setCurrentProgress({
                chapter_id: data.data.chapters[0]._id,
                lesson_id: firstChapter._id,
                type: "google_meet",
              });
            }
          }
          // setActiveChapter(firstChapter._id);

          // // Find first lesson/content to display
          // if (
          //   firstChapter.lessonDetails &&
          //   firstChapter.lessonDetails.length > 0
          // ) {
          //   const firstLesson = firstChapter.lessonDetails[0];
          //   setCurrentLesson(firstLesson);
          //   setCurrentContentType("video");
          //   setCurrentProgress({
          //     chapter_id: firstChapter._id,
          //     lesson_id: firstLesson._id,
          //     type: "lesson",
          //   });
          // }
          // console.log(firstChapter);

          // const firstChapter = data.data.chapters[0];
          // if (
          //   firstChapter.liveCourseSession &&
          //   firstChapter.liveCourseSession.length > 0
          // ) {
          //   const firstSession = firstChapter.liveCourseSession[0];
          //   setCurrentLesson(firstSession);
          //   setCurrentContentType("live");
          //   setCurrentProgress({
          //     chapter_id: firstChapter._id,
          //     lesson_id: firstSession._id,
          //     type: "live",
          //   });
          // }
        }
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize course data on component mount
  useEffect(() => {
    fetchCourseData();
  }, [id]);

  // Handle lesson/content click
  const handleLessonClick = (
    lessonId,
    chapterId,
    courseId,
    type,
    fileType = null,
    filePath = null
  ) => {
    // console.log(`Loading ${type} with ID: ${lessonId}`);

    // Find the chapter and item
    const chapter = course.chapters.find((ch) => ch._id === chapterId);
    // console.log(chapter);

    if (!chapter) return;

    let item = null;

    // Find the specific item based on type
    if (type === "lesson" || type === "live") {
      item = chapter.liveCourseSession.find(
        (lesson) => lesson._id === lessonId
      );
      if (item) {
        console.log(item, "item");
        if (item.video_link) {
          setCurrentLesson(item);
          setCurrentContentType("video");
        } else {
          setCurrentLesson(item);
          setCurrentContentType("google_meet");
        }
      }
    }
    // } else if (type === "document") {
    //   item = chapter.documentDetails.find((doc) => doc._id === lessonId);
    //   if (item) {
    //     setCurrentContentType("document");
    //     setCurrentLesson(item);
    //     setCurrentFilePath(`https://api.basementex.com/${item.path}`);
    //     setCurrentFileType(item.file_type);
    //   }
    // } else if (type === "quiz") {
    //   item = chapter.quizDetails.find((quiz) => quiz._id === lessonId);
    //   if (item) {
    //     setCurrentContentType("quiz");
    //     setCurrentLesson(item);
    //   }
    // }

    // Update current progress
    setCurrentProgress({
      chapter_id: chapterId,
      lesson_id: lessonId,
      type: type,
    });

    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Handle completion checkbox toggle
  const handleLessonCompletion = async (e, lessonId, type) => {
    e.stopPropagation(); // Prevent lesson click

    const isChecked = e.target.checked;
    // Reverse the logic: checked = false (incomplete), unchecked = true (complete)
    const completionStatus = !isChecked;

    console.log(
      `Marking ${type} ${lessonId} as ${
        completionStatus ? "completed" : "incomplete"
      }`
    );

    // For videos/lessons, call the API
    if (type === "lesson" || type === "document" || type === "live") {
      const result = await updateCompletionStatus(lessonId, completionStatus);

      if (!result.success) {
        // Revert checkbox if API failed
        e.target.checked = !isChecked;
        console.error("Failed to update progress:", result.error);
        alert(`Failed to update progress: ${result.error}`);
      }
    }
    // For quizzes, handle locally (you might have a different API for quizzes)
    else if (type === "quiz") {
      if (!completionStatus) {
        // If marking as incomplete (checked)
        setCompletedQuizzes((prev) => [...prev, lessonId]);
      } else {
        // If marking as complete (unchecked)
        setCompletedQuizzes((prev) => prev.filter((id) => id !== lessonId));
      }
    }
  };

  // Calculate completion percentage using isVideoDone from API
  const getCompletionPercentage = () => {
    if (!course || courseLectureCount === 0) return 0;

    let completedCount = 0;

    // Count completed videos from API data (isVideoDone property)
    course.chapters.forEach((chapter) => {
      // Count completed lessons
      if (chapter.lessonDetails) {
        completedCount += chapter.lessonDetails.filter(
          (lesson) => lesson.isVideoDone
        ).length;
      }
      // Count completed documents (if they have isVideoDone property)
      if (chapter.documentDetails) {
        completedCount += chapter.documentDetails.filter(
          (doc) => doc.isVideoDone
        ).length;
      }
      // Count completed live lessons (if they have isVideoDone property)
      if (chapter.liveLessonDetails) {
        completedCount += chapter.liveLessonDetails.filter(
          (live) => live.isVideoDone
        ).length;
      }
    });

    // Add completed quizzes (local state)
    completedCount += completedQuizzes.length;

    return Math.round((completedCount / courseLectureCount) * 100);
  };

  // Get total completed count for display
  const getCompletedCount = () => {
    if (!course) return 0;

    let completedCount = 0;

    // Count completed videos from API data
    course.chapters.forEach((chapter) => {
      if (chapter.lessonDetails) {
        completedCount += chapter.lessonDetails.filter(
          (lesson) => lesson.isVideoDone
        ).length;
      }
      if (chapter.documentDetails) {
        completedCount += chapter.documentDetails.filter(
          (doc) => doc.isVideoDone
        ).length;
      }
      if (chapter.liveLessonDetails) {
        completedCount += chapter.liveLessonDetails.filter(
          (live) => live.isVideoDone
        ).length;
      }
    });

    // Add completed quizzes
    completedCount += completedQuizzes.length;

    return completedCount;
  };

  // Toggle chapter accordion
  const toggleChapter = (chapterId) => {
    setActiveChapter(activeChapter === chapterId ? null : chapterId);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Convert minutes to hours:minutes format
  const minutesToHours = (minutes) => {
    if (!minutes) return "--.--";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? hours + t("h") + " " : ""}${mins}${t("m")}`;
  };

  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return faFilePdf;
      case "doc":
      case "docx":
        return faFileWord;
      case "xls":
      case "xlsx":
        return faFileExcel;
      default:
        return faFileAlt;
    }
  };

  // Handle click outside sidebar to close on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768 &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  // Render content based on current type
  const renderContent = () => {
    // console.log(currentContentType);
    // console.log(currentProgress, "currentProgress");

    if (!currentProgress) {
      return (
        <div className="preloader-two player">
          <div className="loader-icon-two player">
            <img src={loaderImg} alt={t("Preloader")} />
          </div>
        </div>
      );
    }

    switch (currentContentType) {
      case "quiz":
        if (!currentLesson)
          return <div className="text-center p-5">{t("Quiz not found")}</div>;

      case "document":
        if (!currentFilePath)
          return (
            <div className="text-center p-5">{t("Document not found")}</div>
          );

        if (currentFileType === "pdf") {
          return <PdfViewer filePath={currentFilePath} />;
        } else if (currentFileType === "docx") {
          return <DocxViewer filePath={currentFilePath} />;
        } else {
          return (
            <div className="text-center p-5">
              {t("Unsupported document type")}
            </div>
          );
        }
      case "google_meet":
        return (
          // <div
          //   className="d-flex justify-content-center align-items-center"
          //   style={{ minHeight: "300px" }}
          // >
          //   <div
          //     className="card text-center shadow p-4"
          //     style={{ maxWidth: "400px" }}
          //   >
          //     <h5 className="mb-3">
          //       {currentLesson.title || t("Google Meet Session")}
          //     </h5>
          //     <p>
          //       {t("Session Date")}:{" "}
          //       {new Date(currentLesson.date).toLocaleString()}
          //     </p>
          //     <a
          //       href={currentLesson.meeting_link}
          //       target="_blank"
          //       rel="noopener noreferrer"
          //       className="btn btn-success"
          //     >
          //       {t("Join Meet Now")}
          //     </a>
          //   </div>
          // </div>
          <div className="container d-flex justify-content-center mt-5">
            <div
              className="card shadow-sm"
              style={{ maxWidth: "500px", width: "100%" }}
            >
              <div className="card-body text-center">
                <img
                  src="https://admin.basementex.com/static/media/logo.f33558fd9d0d1b3dee2e.png"
                  alt="Google Meet"
                  style={{
                    marginBottom: "15px",
                  }}
                />
                <h5 className="card-title mb-3">{t("Join Live Class")}</h5>
                <p className="card-text">
                  {t("You have a live class session. Click below to join.")}
                </p>
                <Link
                  to={currentLesson.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success"
                  style={{
                    boxShadow: "none",
                    fontSize: "12px",
                    borderRadius: "8px",
                    background: "#0055d2",
                  }}
                >
                  {t("Join Live Session")}
                </Link>
              </div>
            </div>
          </div>
        );

        if (currentFileType === "pdf") {
          return <PdfViewer filePath={currentFilePath} />;
        } else if (currentFileType === "docx") {
          return <DocxViewer filePath={currentFilePath} />;
        } else {
          return (
            <div className="text-center p-5">
              {t("Unsupported document type")}
            </div>
          );
        }

      case "live":
        if (!currentLesson)
          return (
            <div className="text-center p-5">{t("Session not found")}</div>
          );

        if (currentLesson.replayLink) {
          return (
            <BunnyPlayer
              libraryId={currentLesson.libraryId}
              videoId={currentLesson.replayLink}
              width="100%"
            />
          );
        }

        if (currentLesson.meeting_link && currentLesson.status === "active") {
          return (
            <div className="text-center p-5">
              <h4>{currentLesson.title}</h4>
              <p>
                {t("Session Date")}:{" "}
                {new Date(currentLesson.date).toLocaleString()}
              </p>
              <a
                href={currentLesson.meeting_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {t("Join Live Session")}
              </a>
            </div>
          );
        }

        return (
          <div className="text-center p-5">{t("This session has ended.")}</div>
        );

      case "video":
      default:
        if (!currentLesson)
          return <div className="text-center p-5">{t("Video not found")}</div>;

        // Handle YouTube videos
        if (currentLesson.source === "youtube" && currentLesson.video_link) {
          const getYouTubeID = (url) => {
            const regExp =
              /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            return match && match[2].length === 11 ? match[2] : null;
          };

          const videoId = getYouTubeID(currentLesson.video_link);
          if (videoId) {
            return (
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            );
          }
        }

        // Default to Bunny player
        return (
          <BunnyPlayer
            libraryId={currentLesson?.liveLibraryId}
            videoId={currentLesson?.videoId}
            width="100%"
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="preloader-two player">
        <div className="loader-icon-two player">
          <img src={loaderImg || "/placeholder.svg"} alt={t("Preloader")} />
        </div>
      </div>
    );
  }

  function has24HoursPassed(dateString) {
    const pastDate = new Date(dateString);
    const now = new Date();

    const millisecondsIn24Hours = 24 * 60 * 60 * 1000;

    return now - pastDate >= millisecondsIn24Hours;
  }

  // Show error if no userId found
  if (!getUserId()) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4>Authentication Required</h4>
          <p>Please log in to access this course.</p>
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }
  let handleLiveSession = async () => {
    const sessionStartISO = "2025-08-04T16:08:00.000Z"; // ISO datetime from your data
    const sessionStart = new Date(sessionStartISO);

    const sessionDurationInMinutes = 60; // default duration (can be dynamic if needed)
    const sessionEnd = new Date(
      sessionStart.getTime() + sessionDurationInMinutes * 60 * 1000
    );

    const now = new Date();

    if (now >= sessionStart && now <= sessionEnd) {
      alert("✅ Live session chal raha hai!");
    } else if (now < sessionStart) {
      alert("📅 Live session abhi aane wala hai.");
    } else {
      alert("❌ Live session expire ho gaya hai.");
    }
  };
  function downloadFileFromS3(signedUrl, filename) {
    const link = document.createElement("a");
    link.href = signedUrl;
    link.setAttribute("download", filename || "downloaded-file");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleDownload = async (fileUrl, filename) => {
    const fileKey = fileUrl.replace(s3BaseUrl, "");
    let originalFileName = fileKey;
    try {
      const res = await fetch(
        `${baseUrl}/api/v1/admin/liveSession/download/get-url?fileName=${encodeURIComponent(
          originalFileName
        )}`
      );

      const data = await res.json();

      if (data.signedUrl) {
        downloadFileFromS3(data.signedUrl, filename);
      } else {
        alert("Download URL not received.");
      }
    } catch (err) {
      console.error("Error fetching download URL:", err);
      alert("Download failed.");
    }
  };

  return (
    <section className="wsus__course_video">
      {/* Header */}
      <div className="col-12">
        <div className="wsus__course_header">
          <Link to="/student/enrolled-courses">
            <FontAwesomeIcon icon={faAngleLeft} /> {t("Go back to dashboard")}
          </Link>
          <span className="text-white">{course.title}</span>
          <p>
            {t("Your Progress")}: {getCompletedCount()} {t("of")}{" "}
            {courseLectureCount} ({getCompletionPercentage()}%)
            {isUpdatingProgress && (
              <span className="ms-2 text-muted">{t("Updating...")}</span>
            )}
          </p>
          <div
            className="wsus__course_header_btn"
            onClick={toggleSidebar}
            role="button"
            aria-label={t(
              sidebarOpen
                ? "Close course content sidebar"
                : "Open course content sidebar"
            )}
            tabIndex={0}
          >
            <FontAwesomeIcon icon={faStream} />
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="wsus__course_video_player">
        <div className="video-payer">
          <div className="player-placeholder">{renderContent()}</div>
        </div>
        {/* <BottomPanel courseFile={course?.courseFile} /> */}
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`wsus__course_sidebar ${sidebarOpen ? "show" : ""}`}
      >
        <div
          className="wsus__course_sidebar_btn"
          onClick={toggleSidebar}
          role="button"
          aria-label={t("Close sidebar")}
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <h2 className="video_heading">{t("Course Content")}</h2>

        {/* Course chapters and content */}
        <div className="accordion" id="accordionExample">
          {course?.chapters.map((chapter) => (
            <div className="accordion-item" key={chapter._id}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    activeChapter !== chapter._id ? "collapsed" : ""
                  }`}
                  type="button"
                  onClick={() => toggleChapter(chapter._id)}
                  aria-expanded={activeChapter === chapter._id}
                  aria-controls={`chapter-content-${chapter._id}`}
                >
                  <b>
                    {i18n.language == "en" || chapter.arabic_title === ""
                      ? chapter.title
                      : chapter.arabic_title}
                  </b>
                </button>
              </h2>
              <div
                className={`accordion-collapse collapse ${
                  activeChapter === chapter._id ? "show" : ""
                }`}
                id={`chapter-content-${chapter._id}`}
              >
                <div className="accordion-body course-content">
                  {/* Video Lessons */}

                  {chapter.liveCourseSession &&
                    chapter.liveCourseSession.map((session) => {
                      const isActive =
                        currentProgress?.lesson_id === session._id;
                      return (
                        <div
                          className={` d-flex form-check ${
                            isActive ? "item-active" : ""
                          }`}
                          key={session._id}
                        >
                          <label
                            className="form-check-label lesson-item"
                            onClick={() =>
                              handleLessonClick(
                                session._id,
                                chapter._id,
                                course.id,
                                "live"
                              )
                            }
                          >
                            {/* <Link to={session?.meeting_link} target="__blank">
                            </Link> */}
                            {session.title}
                            <span>
                              <FontAwesomeIcon icon={faVideo} />{" "}
                              {new Date(session.date).toLocaleDateString()}
                            </span>
                          </label>
                          {session.file_url && (
                            <button
                              onClick={() =>
                                handleDownload(session.file_url, session.title)
                              }
                              className="ms-auto text-primary"
                            >
                              {" "}
                              <FontAwesomeIcon icon={faDownload} />
                            </button>
                          )}
                          <div>
                            {/* <span
                              className="btn px-3 py-2"
                              onClick={() => handleLiveSession(session.date)}
                            >
                              Join Live session
                            </span> */}
                            {!has24HoursPassed(session?.date) && (
                              <Link
                                className="btn px-3 py-2"
                                style={{
                                  boxShadow: "none",
                                  fontSize: "12px",
                                  borderRadius: "8px",
                                  background: "#0055d2",
                                }}
                                to={session.meeting_link}
                                target="_blank"
                              >
                                {" "}
                                {t("Join Live Session")}
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursePlayerLive;
