import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import quizIcon from "../../assets/images/quiz.png";
import { useTranslation } from "react-i18next";
import { useSearchParams, useLocation } from "react-router-dom";
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
  faFile,
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
import toastify from "../../config/toastify";
import { toast } from "react-toastify";

const CoursePlayer = () => {
  const { t, i18n } = useTranslation();
  const { courseId } = useParams();
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const location = useLocation();
  let locationData = location.state;
  // console.log(queryLesson);

  // Course data and UI states
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeFile, setActiveFile] = useState(false);
  const [description, setDescription] = useState("");
  // Content states
  const [currentContentType, setCurrentContentType] = useState("video"); // video, quiz, document
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentFilePath, setCurrentFilePath] = useState("");
  const [currentFileType, setCurrentFileType] = useState(""); // pdf, docx, etc.

  // Progress tracking states
  const [completedQuizzes, setCompletedQuizzes] = useState([]); // Only for quizzes (no API endpoint yet)
  const [courseLectureCount, setCourseLectureCount] = useState(0);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [courseChapterFileData, setCourseChapterFileData] = useState([]);
  const s3BaseUrl = "https://basementex.sfo3.digitaloceanspaces.com/";

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
  const updateCompletionStatus = async (videoId, completed, handle) => {
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

      if (response.ok && data.message) {
        // await fetchCourseData();
        if (handle !== "click") {
          toast.success(`video ${completed ? "marked" : "unMarked"}`);
        }
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
        `https://api.basementex.com/api/v1/web/course-details/${id}/${userId}`
      );
      const data = await response.json();

      if (data.status) {
        setCourse({
          id: data.data.courseDetails._id,
          title: data.data.courseDetails.title,
          arabic_title: data.data.courseDetails.arabic_title,
          chapters: data.data.chapterDetails,
          courseFile: data.data?.courseFileDeatils,
        });
        setDescription(data.data.courseDetails);
        setCourseChapterFileData(data.data.courseChapterFileData);

        // Calculate total lectures from all chapters
        let totalLectures = 0;
        data.data.chapterDetails.forEach((chapter) => {
          totalLectures +=
            (chapter.lessonDetails?.length || 0) +
            (chapter.documentDetails?.length || 0) +
            (chapter.liveLessonDetails?.length || 0) +
            (chapter.quizDetails?.length || 0);
        });
        setCourseLectureCount(totalLectures);

        // Set initial content to first available item
        if (data.data.chapterDetails.length > 0) {
          const firstChapter = data.data.chapterDetails[0];
          setActiveChapter(firstChapter._id);

          if (
            firstChapter.lessonDetails &&
            firstChapter.lessonDetails.length > 0
          ) {
            const firstLesson = firstChapter.lessonDetails[0];

            setCurrentLesson(firstLesson);
            setCurrentContentType("video");

            setCurrentProgress({
              chapter_id: firstChapter._id,
              lesson_id: firstLesson._id,
              type: "lesson",
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setIsLoading(false);
      if (locationData) {
        setCurrentLesson(locationData.lesson);
        setCurrentContentType(locationData.type);
        setCurrentProgress({
          chapter_id: locationData.lesson.chapter_id,
          lesson_id: locationData.lesson._id,
          type: "lesson",
        });
      }
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
    console.log(`Loading ${type} with ID: ${lessonId}`);
    console.log(lessonId, chapterId, courseId, type);

    const chapter = course.chapters.find((ch) => ch._id === chapterId);
    if (!chapter) return;

    let item = null;

    // Find the specific item based on type
    if (type === "lesson" || type === "live") {
      item = chapter.lessonDetails.find((lesson) => lesson._id === lessonId);
      if (item) {
        setDescription(item);
        setCurrentContentType("video");
        setCurrentLesson(item);
      }
    } else if (type === "document") {
      item = chapter.documentDetails.find((doc) => doc._id === lessonId);
      if (item) {
        setCurrentContentType("document");
        setCurrentLesson(item);
        setCurrentFilePath(`https://api.basementex.com/${item.path}`);
        setCurrentFileType(item.file_type);
      }
    } else if (type === "quiz") {
      item = chapter.quizDetails.find((quiz) => quiz._id === lessonId);
      if (item) {
        setCurrentContentType("quiz");
        setCurrentLesson(item);
      }
    }

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
  const handleLessonCompletion = async (
    e,
    lessonId,
    type,
    chapterId,
    handle = "change"
  ) => {
    e.stopPropagation();
    let isChecked = false;
    if (handle === "click") {
      isChecked = true;
    } else {
      isChecked = e.target.checked;
    }

    const completionStatus = isChecked;

    // console.log(
    //   `Marking ${type} ${lessonId} as ${
    //     completionStatus ? "completed" : "incomplete"
    //   }`
    // );

    if (
      type === "lesson" ||
      type === "document" ||
      type === "live"
      // type === "quiz"
    ) {
      const result = await updateCompletionStatus(
        lessonId,
        completionStatus,
        handle
      );

      let resData = result.data.progress.progress.filter(
        (arr) => arr?.videoId === lessonId
      );

      if (!result.success) {
        // Revert checkbox if API failed
        e.target.checked = !isChecked;
        console.error("Failed to update progress:", result.error);
        alert(`Failed to update progress: ${result.error}`);
      }

      if (handle) {
        const updatedChapters = course?.chapters.map((chapter) => {
          if (chapter._id !== chapterId) return chapter;

          const updatedLessons = chapter.lessonDetails.map((lesson) => {
            if (lesson._id !== lessonId) return lesson;

            return {
              ...lesson,
              isVideoDone: resData[0].completed, // toggle completion
            };
          });

          return {
            ...chapter,
            lessonDetails: updatedLessons,
          };
        });

        setCourse({
          ...course,
          chapters: updatedChapters,
        });
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
          (live) => live.isLiveLessonDone
        ).length;
      }
      if (chapter.quizDetails) {
        completedCount += chapter.quizDetails.filter(
          (live) => live.isQuizDone
        ).length;
      }
    });

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

  // function openFileHandler(fileUrl, filename) {
  //   console.log(fileUrl);
  //   fileUrl = baseUrl + "/" + fileUrl;
  //   const urlParts = fileUrl.split("/");
  //   const originalFileName = urlParts[urlParts.length - 1]; // e.g., course-chapter-xxx.pdf
  //   const [name, ext] = originalFileName.split("."); // ["course-chapter-xxx", "pdf"]

  //   const customFileName = `downloaded-${Date.now()}.${ext}`;
  //   if (fileUrl) {
  //     const link = document.createElement("a");
  //     link.href = fileUrl;
  //     link.download = customFileName;
  //     link.target = "_blank";
  //     link.rel = "noopener noreferrer";

  //     document.body.appendChild(link);

  //     // Trigger click
  //     link.click();

  //     // Remove link from DOM
  //     document.body.removeChild(link);
  //   } else {
  //     console.error("Invalid file URL");
  //   }
  // }

  // Handle click outside sidebar to close on mobile

  // async function openFileHandler(fileUrl, filename) {
  //   try {
  //     const fullUrl = fileUrl;

  //     // Extract extension from URL
  //     const urlParts = fullUrl.split("/");
  //     const originalFileName = urlParts[urlParts.length - 1];
  //     const ext = originalFileName.split(".").pop(); // "pdf", "jpg", etc.

  //     // Custom filename (use passed one or generate)
  //     const customFileName = filename
  //       ? `${filename}.${ext}`
  //       : `downloaded-${Date.now()}.${ext}`;

  //     // Fetch the file as a blob
  //     const response = await fetch(fullUrl, {
  //       mode: "cors", // Ensure CORS is allowed
  //     });

  //     if (!response.ok) {
  //       throw new Error("File download failed.");
  //     }

  //     const blob = await response.blob();

  //     // Create object URL
  //     const blobUrl = URL.createObjectURL(blob);

  //     // Create and trigger a download link
  //     const link = document.createElement("a");
  //     link.href = blobUrl;
  //     link.download = customFileName;

  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);

  //     // Revoke object URL after download
  //     URL.revokeObjectURL(blobUrl);
  //   } catch (error) {
  //     console.error("Download error:", error);
  //   }
  // }

  async function openFileHandler(fileUrl, filename) {
    try {
      console.log(fileUrl, filename);

      const url = new URL(fileUrl);
      const pathname = url.pathname;
      const ext = pathname.split(".").pop(); // handles query strings safely

      const customFileName = filename
        ? `${filename}.${ext}`
        : `downloaded-${Date.now()}.${ext}`;

      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("File download failed.");

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = customFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
    }
  }
  // function handleDownload(fileUrl, filename) {
  //   const link = document.createElement("a");
  //   link.href = fileUrl;
  //   link.download = filename;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

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
        `${baseUrl}/api/v1/admin/course-chapter-file/download/get-url?fileName=${encodeURIComponent(
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
        return (
          <div className="file-info">
            <div className="text-center">
              <img src={quizIcon || "/placeholder.svg"} alt={t("Quiz icon")} />
              <h6 className="mt-2">{currentLesson.title}</h6>
              <p>{t("Please go to quiz page for more information")}</p>
              <p>Time: {currentLesson.time} minutes</p>
              <p>Attempts allowed: {currentLesson.attempt}</p>
              <p>
                Pass mark: {currentLesson.pass_mark} out of{" "}
                {currentLesson.total_mark}
              </p>
              <Link
                to={`/student/learning/quiz/${id}/${currentLesson._id}`}
                className="btn btn-primary btn-lg"
                aria-label={t("Start the quiz: {{title}}", {
                  title: currentLesson.title,
                })}
              >
                {t("Start Quiz")}
              </Link>
            </div>
          </div>
        );

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
            libraryId={currentLesson?.libraryId}
            videoId={currentLesson?.videoId}
            width="100%"
            onEnded={handleVideoEnd}
          />
        );
    }
  };

  let handleVideoEnd = () => {
    console.log("add 2 end");
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
  // async function downloadAllFiles() {
  //   for (const file of courseChapterFileData) {
  //     console.log(file.title, "downlodinng .... file");

  //     try {
  //       const fileUrl = `${file.file}`;

  //       // Extract file extension
  //       const ext = file.file.split(".").pop();

  //       // Use title or fallback name
  //       const fileName = `${
  //         file.title.replace(/\s+/g, "_") || "file"
  //       }_${Date.now()}.${ext}`;

  //       // Fetch file as blob
  //       const response = await fetch(fileUrl, {
  //         mode: "cors",
  //       });

  //       if (!response.ok) throw new Error("Download failed for: " + fileUrl);

  //       const blob = await response.blob();
  //       const blobUrl = URL.createObjectURL(blob);

  //       // Create temporary download link
  //       const link = document.createElement("a");
  //       link.href = blobUrl;
  //       link.download = fileName;
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(blobUrl);
  //     } catch (err) {
  //       console.error(`Error downloading file ${file.title}:`, err);
  //     }
  //   }
  // }

  async function downloadAllFiles() {
    for (const file of courseChapterFileData) {
      const fileKey = file.file_url.replace(s3BaseUrl, "");
      let originalFileName = fileKey;

      try {
        // Call your backend to get a signed download URL
        const apiRes = await fetch(
          `${baseUrl}/api/v1/admin/course-chapter-file/download/get-url?fileName=${encodeURIComponent(
            // `${baseUrl}/api/v1/admin/course-chapter-file/download/get-url?fileName==${encodeURIComponent(
            originalFileName
          )}`
        );
        const { signedUrl } = await apiRes.json();

        if (!signedUrl) {
          console.error(`No signed URL received for ${file.title}`);
          continue;
        }
        console.log(signedUrl);

        // Extract file extension
        const ext = file.file.split(".").pop();

        // Generate a clean filename
        const fileName = `${file.title}_${Date.now()}.${ext}`;

        // Create a hidden <a> tag to trigger download
        const link = document.createElement("a");
        link.href = signedUrl;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Optional: Wait 1 sec between downloads to avoid browser spam block
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (err) {
        console.error(`Error downloading ${file.title}:`, err);
      }
    }
  }

  return (
    <section className="wsus__course_video">
      {/* Header */}
      <div className="col-12">
        <div className="wsus__course_header">
          <Link to="/student/enrolled-courses">
            <FontAwesomeIcon icon={faAngleLeft} /> {t("Go back to dashboard")}
          </Link>
          <span className="text-white">{course?.title}</span>
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
        <BottomPanel courseFile={course?.courseFile} course={description} />
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

        <div className="accordion" id="accordionExample">
          {courseChapterFileData.length > 0 && (
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    activeFile !== true ? "collapsed" : ""
                  }`}
                  type="button"
                  onClick={() => setActiveFile((prev) => !prev)}
                  aria-expanded={activeFile === true}
                  aria-controls={`chapter-content-file`}
                >
                  {t(
                    "Download all the necessary course files, including exercises and practice materials."
                  )}
                </button>
              </h2>
              <div
                className={`accordion-collapse collapse ${
                  activeFile ? "show" : ""
                }`}
                id={`chapter-content-file`}
              >
                <div className="accordion-body course-content ps-2">
                  <span
                    style={{ width: "fit-content" }}
                    onClick={downloadAllFiles}
                    className="d-block btn btn-primary cta-button mb-4 ms-auto bg-primary"
                  >
                    Download all
                  </span>
                  {courseChapterFileData.length ? (
                    courseChapterFileData.map((fileData) => {
                      let isActive = false;

                      return (
                        <div
                          className={`form-check ps-0${
                            isActive ? "item-active" : ""
                          }`}
                          key={fileData._id}
                        >
                          <label
                            className="form-check-label lesson-item d-flex "
                            onClick={() =>
                              handleDownload(fileData.file, fileData.title)
                            }
                          >
                            <span className="me-3 fs-5 text-primary">
                              <FontAwesomeIcon icon={faFile} />
                            </span>
                            {i18n.language == "en" ||
                            fileData.arabic_title === ""
                              ? fileData.title
                              : fileData.arabic_title}

                            <button className="ms-auto text-primary">
                              {" "}
                              <FontAwesomeIcon icon={faDownload} />
                            </button>
                          </label>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center">{t("No data found")}</div>
                  )}
                </div>
              </div>
            </div>
          )}
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
                  {chapter.lessonDetails &&
                    chapter.lessonDetails.map((lesson) => {
                      const isActive =
                        currentProgress?.lesson_id === lesson._id;
                      // Use isVideoDone from API response
                      let isCompleted = lesson.isVideoDone || false;

                      return (
                        <div
                          className={`form-check ${
                            isActive ? "item-active" : ""
                          }`}
                          key={lesson._id}
                        >
                          <input
                            checked={lesson.isVideoDone}
                            className="form-check-input lesson-completed-checkbox"
                            type="checkbox"
                            // onChange={(e) => {
                            //   handleLessonCompletion(
                            //     e,
                            //     lesson._id,
                            //     "lesson",
                            //     chapter._id
                            //   );
                            // }}
                            // disabled={isUpdatingProgress}

                            aria-label={t("Mark as {{status}}", {
                              status: isCompleted
                                ? t("incomplete")
                                : t("complete"),
                            })}
                          />
                          <label
                            className="form-check-label lesson-item"
                            onClick={(e) => {
                              handleLessonClick(
                                lesson._id,
                                chapter._id,
                                course.id,
                                "lesson"
                              );

                              handleLessonCompletion(
                                e,
                                lesson._id,
                                "lesson",
                                chapter._id,
                                "click"
                              );
                            }}
                          >
                            {i18n.language == "en" || lesson.arabic_title === ""
                              ? lesson.title
                              : lesson.arabic_title}{" "}
                            <span>
                              <FontAwesomeIcon icon={faVideo} />
                              {minutesToHours(lesson.duration)}
                            </span>
                          </label>
                        </div>
                      );
                    })}

                  {/* Documents */}
                  {chapter.documentDetails &&
                    chapter.documentDetails.map((doc) => {
                      const isActive = currentProgress?.lesson_id === doc._id;
                      // Use isVideoDone from API response (if available for documents)
                      const isCompleted = doc.isVideoDone || false;

                      return (
                        <div
                          className={`form-check ${
                            isActive ? "item-active" : ""
                          }`}
                          key={doc._id}
                        >
                          <input
                            checked={isCompleted}
                            className="form-check-input lesson-completed-checkbox"
                            type="checkbox"
                            onChange={(e) =>
                              handleLessonCompletion(e, doc._id, "document")
                            }
                            disabled={isUpdatingProgress}
                            aria-label={t("Mark as {{status}}", {
                              status: isCompleted
                                ? t("incomplete")
                                : t("complete"),
                            })}
                          />
                          <label
                            className="form-check-label lesson-item"
                            onClick={() =>
                              handleLessonClick(
                                doc._id,
                                chapter._id,
                                course.id,
                                "document",
                                doc.file_type,
                                doc.path
                              )
                            }
                          >
                            {i18n.language == "en" || doc.arabic_title === ""
                              ? doc.title
                              : doc.arabic_title}
                            <span>
                              <FontAwesomeIcon
                                icon={getFileIcon(doc.file_type)}
                              />
                              --.--
                            </span>
                          </label>
                        </div>
                      );
                    })}

                  {/* Live Lessons */}
                  {chapter.liveLessonDetails &&
                    chapter.liveLessonDetails.map((liveLesson) => {
                      const isActive =
                        currentProgress?.lesson_id === liveLesson._id;
                      // Use isVideoDone from API response (if available for live lessons)
                      const isCompleted = liveLesson.isVideoDone || false;

                      return (
                        <div
                          className={`form-check ${
                            isActive ? "item-active" : ""
                          }`}
                          key={liveLesson._id}
                        >
                          <input
                            checked={isCompleted}
                            className="form-check-input lesson-completed-checkbox"
                            type="checkbox"
                            onChange={(e) =>
                              handleLessonCompletion(e, liveLesson._id, "live")
                            }
                            disabled={isUpdatingProgress}
                            aria-label={t("Mark as {{status}}", {
                              status: isCompleted
                                ? t("incomplete")
                                : t("complete"),
                            })}
                          />
                          <label
                            className="form-check-label lesson-item"
                            onClick={() =>
                              handleLessonClick(
                                liveLesson._id,
                                chapter._id,
                                course.id,
                                "live"
                              )
                            }
                          >
                            {i18n.language == "en" ||
                            liveLesson.arabic_title === ""
                              ? liveLesson.title
                              : liveLesson.arabic_title}
                            <span>
                              <img
                                src="/live.png"
                                alt={t("live")}
                                className="img-fluid"
                              />
                              {minutesToHours(liveLesson.duration)}
                            </span>
                          </label>
                        </div>
                      );
                    })}

                  {/* Quizzes */}
                  {chapter.quizDetails &&
                    chapter.quizDetails.map((quiz) => {
                      const isActive = currentProgress?.lesson_id === quiz._id;
                      // Use local state for quizzes (no API endpoint yet)
                      const isCompleted = completedQuizzes.includes(quiz._id);

                      return (
                        <div
                          className={`form-check ${
                            isActive ? "item-active" : ""
                          }`}
                          key={quiz._id}
                        >
                          <input
                            checked={quiz?.isQuizDone}
                            className="form-check-input lesson-completed-checkbox"
                            type="checkbox"
                            onChange={(e) =>
                              handleLessonCompletion(e, quiz._id, "quiz")
                            }
                            disabled={isUpdatingProgress}
                            aria-label={t("Mark quiz as {{status}}", {
                              status: isCompleted
                                ? t("incomplete")
                                : t("complete"),
                            })}
                          />
                          <label
                            className="form-check-label lesson-item"
                            onClick={() =>
                              handleLessonClick(
                                quiz._id,
                                chapter._id,
                                course.id,
                                "quiz"
                              )
                            }
                          >
                            {i18n.language == "en" || quiz.arabic_title === ""
                              ? quiz.title
                              : quiz.arabic_title}
                            <span>
                              <FontAwesomeIcon icon={faQuestionCircle} />
                              {quiz.time}m
                            </span>
                          </label>
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

export default CoursePlayer;
