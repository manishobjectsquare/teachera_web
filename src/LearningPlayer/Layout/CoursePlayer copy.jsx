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
} from "@fortawesome/free-solid-svg-icons";
import BottomPanel from "./BottomPanel";
import "../../assets/css/player.css";
import "../../assets/css/playermain.css";
import BunnyPlayer from "../BunnyPlayer";
import PdfViewer from "../PdfViewer";
import DocxViewer from "../DocxViewer";
import loaderImg from "../../assets/images/loaderImg.png";

const CoursePlayer = () => {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // State for course data and progress
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(null);
  const [alreadyWatchedLectures, setAlreadyWatchedLectures] = useState([]);
  const [alreadyCompletedQuiz, setAlreadyCompletedQuiz] = useState([]);
  const [courseLectureCompletedByUser, setCourseLectureCompletedByUser] =
    useState(0);
  const [courseLectureCount, setCourseLectureCount] = useState(0);
  const [courseCompletedPercent, setCourseCompletedPercent] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChapter, setActiveChapter] = useState(null);

  // Add state for content type
  const [currentContentType, setCurrentContentType] = useState("video"); // video, quiz, document
  const [currentLesson, setCurrentLesson] = useState(null);

  // State for content type and file path
  const [currentFilePath, setCurrentFilePath] = useState("");
  const [currentFileType, setCurrentFileType] = useState(""); // pdf, docx, etc.

  // Fetch course data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);

        // Fetch course data from the API
        const response = await fetch(
          `https://api.basementex.com/api/v1/web/course-details/${id}`
        );
        const data = await response.json();

        if (data.status) {
          setCourse({
            id: data.data.courseDetails._id,
            title: data.data.courseDetails.title,
            chapters: data.data.chapterDetails,
          });

          // Calculate total lectures
          let totalLectures = 0;
          data.data.chapterDetails.forEach((chapter) => {
            totalLectures +=
              (chapter.lessonDetails?.length || 0) +
              (chapter.documentDetails?.length || 0) +
              (chapter.liveLessonDetails?.length || 0);
          });

          setCourseLectureCount(totalLectures);

          // Set initial progress to first lesson if available
          if (data.data.chapterDetails.length > 0) {
            const firstChapter = data.data.chapterDetails[0];
            let firstItemId = null;
            let firstItemType = null;

            if (
              firstChapter.lessonDetails &&
              firstChapter.lessonDetails.length > 0
            ) {
              firstItemId = firstChapter.lessonDetails[0]._id;
              firstItemType = "lesson";
              setCurrentLesson(firstChapter.lessonDetails[0]);
              setCurrentContentType("video");
            } else if (
              firstChapter.documentDetails &&
              firstChapter.documentDetails.length > 0
            ) {
              firstItemId = firstChapter.documentDetails[0]._id;
              firstItemType = "document";
              setCurrentLesson(firstChapter.documentDetails[0]);
              setCurrentContentType("document");
              setCurrentFilePath(
                `https://api.basementex.com/${firstChapter.documentDetails[0].path}`
              );
              setCurrentFileType(firstChapter.documentDetails[0].file_type);
            } else if (
              firstChapter.quizDetails &&
              firstChapter.quizDetails.length > 0
            ) {
              firstItemId = firstChapter.quizDetails[0]._id;
              firstItemType = "quiz";
              setCurrentLesson(firstChapter.quizDetails[0]);
              setCurrentContentType("quiz");
            }

            if (firstItemId) {
              setCurrentProgress({
                chapter_id: firstChapter._id,
                lesson_id: firstItemId,
                type: firstItemType,
              });
              setActiveChapter(firstChapter._id);
            }
          }

          // Mock watched lectures and completed quizzes
          // In a real app, you would fetch this from the server
          setAlreadyWatchedLectures([]);
          setAlreadyCompletedQuiz([]);
          setCourseLectureCompletedByUser(0);
          setCourseCompletedPercent(0);
        } else {
          console.error(t("Error fetching course data:"), data.message);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(t("Error fetching course data:"), error);
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, t]);

  // Handle lesson click
  const handleLessonClick = (
    lessonId,
    chapterId,
    courseId,
    type,
    fileType = null,
    filePath = null
  ) => {
    console.log(
      `${t("Loading")} ${t(type)} ${t("with ID")}: ${lessonId} ${t(
        "from chapter"
      )} ${chapterId} ${t("in course")} ${courseId}`
    );

    // Find the chapter
    const chapter = course.chapters.find((ch) => ch._id === chapterId);
    if (!chapter) return;

    // Find the item based on type
    let item = null;
    if (type === "lesson" || type === "live") {
      item = chapter.lessonDetails.find((lesson) => lesson._id === lessonId);
      if (item) {
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

    setCurrentProgress({
      chapter_id: chapterId,
      lesson_id: lessonId,
      type: type,
    });

    // On mobile, close the sidebar after selecting a lesson
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Handle quiz start
  const handleStartQuiz = (quizId) => {
    navigate(`quiz`);
  };

  // Handle lesson completion toggle
  const handleLessonCompletion = (e, lessonId, type) => {
    e.stopPropagation(); // Prevent triggering the lesson click
    const isCompleted = e.target.checked;

    if (type === "lesson" || type === "document" || type === "live") {
      if (isCompleted) {
        setAlreadyWatchedLectures((prev) => [...prev, lessonId]);
        setCourseLectureCompletedByUser((prev) => prev + 1);
      } else {
        setAlreadyWatchedLectures((prev) =>
          prev.filter((id) => id !== lessonId)
        );
        setCourseLectureCompletedByUser((prev) => prev - 1);
      }
    } else if (type === "quiz") {
      if (isCompleted) {
        setAlreadyCompletedQuiz((prev) => [...prev, lessonId]);
      } else {
        setAlreadyCompletedQuiz((prev) => prev.filter((id) => id !== lessonId));
      }
    }

    // Update completion percentage
    const newCompletedCount = isCompleted
      ? courseLectureCompletedByUser + 1
      : courseLectureCompletedByUser - 1;
    const newPercent =
      courseLectureCount > 0
        ? (newCompletedCount / courseLectureCount) * 100
        : 0;
    setCourseCompletedPercent(newPercent);

    // In a real app, you would send this update to the server
    console.log(
      `${t("Marking")} ${t(type)} ${lessonId} ${t("as")} ${
        isCompleted ? t("completed") : t("incomplete")
      }`
    );
  };

  // Toggle chapter accordion
  const toggleChapter = (chapterId) => {
    setActiveChapter(activeChapter === chapterId ? null : chapterId);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Helper function to convert minutes to hours:minutes format
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

  // Handle click outside sidebar to close it on mobile
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  // Render content based on type
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
          <>
            <div className="file-info">
              <div className="text-center">
                <img
                  src={quizIcon || "/placeholder.svg"}
                  alt={t("Quiz icon")}
                />
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
                  // onClick={() => handleStartQuiz(currentLesson._id)}
                  aria-label={t("Start the quiz: {{title}}", {
                    title: currentLesson.title,
                  })}
                >
                  {t("Start Quiz")}
                </Link>
              </div>
            </div>
          </>
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

        // For YouTube videos
        if (currentLesson.source === "youtube" && currentLesson.video_link) {
          // Extract YouTube video ID
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

        // Default to Bunny player or other video player
        return (
          <>
            <BunnyPlayer
              libraryId={currentLesson?.libraryId}
              videoId={currentLesson?.videoId}
              width="100%"
            />
          </>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="preloader-two player">
        <div className="loader-icon-two player">
          <img src={loaderImg} alt={t("Preloader")} />
        </div>
      </div>
    );
  }

  return (
    <section className="wsus__course_video">
      <div className="col-12">
        <div className="wsus__course_header">
          <Link to="/student/enrolled-courses">
            <FontAwesomeIcon icon={faAngleLeft} /> {t("Go back to dashboard")}
          </Link>

          <p>
            {t("Your Progress")}: {courseLectureCompletedByUser} {t("of")}{" "}
            {courseLectureCount} ({Math.round(courseCompletedPercent)}
            %)
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

      <div className="wsus__course_video_player">
        {/* Player */}
        <div className="video-payer">
          <div className="player-placeholder">{renderContent()}</div>
        </div>

        {/* Bottom Panel - show for all content types */}
        <BottomPanel />
      </div>

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
                  <b>{chapter.title}</b>
                  <span></span>
                </button>
              </h2>
              <div
                className={`accordion-collapse collapse ${
                  activeChapter === chapter._id ? "show" : ""
                }`}
                id={`chapter-content-${chapter._id}`}
              >
                <div className="accordion-body course-content">
                  {/* Lessons */}
                  {chapter.lessonDetails &&
                    chapter.lessonDetails.map((lesson) => {
                      const isActive =
                        currentProgress?.lesson_id === lesson._id;
                      const isCompleted = alreadyWatchedLectures.includes(
                        lesson._id
                      );

                      return (
                        <div
                          className={`form-check ${
                            isActive ? "item-active" : ""
                          }`}
                          key={lesson._id}
                        >
                          <input
                            checked={isCompleted}
                            className="form-check-input lesson-completed-checkbox"
                            type="checkbox"
                            onChange={(e) =>
                              handleLessonCompletion(e, lesson._id, "lesson")
                            }
                            data-lesson-id={lesson._id}
                            value="1"
                            data-type="lesson"
                            aria-label={t("Mark as {{status}}", {
                              status: isCompleted
                                ? t("incomplete")
                                : t("completed"),
                            })}
                          />
                          <label
                            className="form-check-label lesson-item"
                            onClick={() =>
                              handleLessonClick(
                                lesson._id,
                                chapter._id,
                                course.id,
                                "lesson"
                              )
                            }
                          >
                            {lesson.title}
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
                      const isCompleted = alreadyWatchedLectures.includes(
                        doc._id
                      );

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
                            data-lesson-id={doc._id}
                            value="1"
                            data-type="document"
                            aria-label={t("Mark as {{status}}", {
                              status: isCompleted
                                ? t("incomplete")
                                : t("completed"),
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
                            {doc.title}
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
                      const isCompleted = alreadyWatchedLectures.includes(
                        liveLesson._id
                      );

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
                            data-lesson-id={liveLesson._id}
                            value="1"
                            data-type="live"
                            aria-label={t("Mark as {{status}}", {
                              status: isCompleted
                                ? t("incomplete")
                                : t("completed"),
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
                            {liveLesson.title}
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
                      const isCompleted = alreadyCompletedQuiz.includes(
                        quiz._id
                      );

                      return (
                        <div
                          className={`form-check ${
                            isActive ? "item-active" : ""
                          }`}
                          key={quiz._id}
                        >
                          <input
                            checked={isCompleted}
                            className="form-check-input lesson-completed-checkbox"
                            type="checkbox"
                            onChange={(e) =>
                              handleLessonCompletion(e, quiz._id, "quiz")
                            }
                            data-lesson-id={quiz._id}
                            value="1"
                            data-type="quiz"
                            aria-label={t("Mark quiz as {{status}}", {
                              status: isCompleted
                                ? t("incomplete")
                                : t("completed"),
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
                            {quiz.title}
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
