import { useState } from "react"
import {
    FolderIcon,
    VideoIcon,
    FileIcon,
    PencilIcon,
    TrashIcon,
    ArrowUpDownIcon as ArrowsUpDownIcon,
    PlusIcon,
} from "lucide-react"
import SortChaptersModal from "./modals/SortChaptersModal"
import AddLessonModal from "./modals/AddLessonModal"
import AddDocumentModal from "./modals/AddDocumentModal"
import AddLiveLessonModal from "./modals/AddLiveLessonModal"
import AddQuizModal from "./modals/AddQuizModal"
import EditChapterModal from "./modals/EditChapterModal"
import EditLessonModal from "./modals/EditLessonModal"
import EditLiveLessonModal from "./modals/EditLiveLessonModal"
import EditDocumentModal from "./modals/EditDocumentModal"
import EditQuizModal from "./modals/EditQuizModal"
import AddQuizQuestionModal from "./modals/AddQuizQuestionModal"
import EditQuizQuestionModal from "./modals/EditQuizQuestionModal"
import AddChapterModal from "./modals/AddChapterModal"
import CourseNavigation from "./CourseNavigation"
import { useTranslation } from "react-i18next"

const CourseContent = () => {
    const { t } = useTranslation()
    // Sample data for demonstration
    const [chapters, setChapters] = useState([
        {
            id: 1,
            title: "Introduction to the Course",
            isOpen: true,
            chapterItems: [
                {
                    id: 101,
                    type: "lesson",
                    lesson: { title: "Welcome to the Course" },
                },
                {
                    id: 102,
                    type: "document",
                    lesson: { title: "Course Syllabus" },
                },
                {
                    id: 103,
                    type: "quiz",
                    isOpen: false,
                    quiz: {
                        id: 201,
                        title: "Introduction Quiz",
                        questions: [
                            { id: 301, title: "What is this course about?" },
                            { id: 302, title: "What will you learn in this course?" },
                        ],
                    },
                },
            ],
        },
    ])

    // State for modals
    const [activeModal, setActiveModal] = useState(null)
    const [modalData, setModalData] = useState({})
    const [dropdownOpen, setDropdownOpen] = useState({})

    // Function to open a modal
    const openModal = (modalName, data = {}) => {
        setActiveModal(modalName)
        setModalData(data)
    }

    // Function to close a modal
    const closeModal = () => {
        setActiveModal(null)
        setModalData({})
    }

    const toggleChapter = (chapterId) => {
        setChapters(
            chapters.map((chapter) => (chapter.id === chapterId ? { ...chapter, isOpen: !chapter.isOpen } : chapter)),
        )
    }

    const toggleQuiz = (chapterId, itemId) => {
        setChapters(
            chapters.map((chapter) =>
                chapter.id === chapterId
                    ? {
                        ...chapter,
                        chapterItems: chapter.chapterItems.map((item) =>
                            item.id === itemId ? { ...item, isOpen: !item.isOpen } : item,
                        ),
                    }
                    : chapter,
            ),
        )
    }

    const toggleDropdown = (id) => {
        setDropdownOpen({
            ...dropdownOpen,
            [id]: !dropdownOpen[id],
        })
    }

    const truncate = (text) => {
        return text && text.length > 40 ? text.substring(0, 40) + "..." : text
    }

    return (
        // <div className="col-lg-9">
        //     <CourseNavigation />
        //     <form className="instructor__profile-form course-form">
        //         <input type="hidden" name="step" value="3" />
        //         <input type="hidden" name="next_step" value="4" />
        //     </form>

        //     <div className="instructor__profile-form-wrap">
        //         <form>
        //             <div className="mb-3 d-flex flex-wrap justify-content-between">
        //                 <button type="button" className="thm-btn" onClick={() => openModal("addChapter")}>
        //                     Add new chapter
        //                 </button>

        //                 <button type="button" className="thm-btn info" onClick={() => openModal("sortChapters")}>
        //                     Sort chapter
        //                 </button>
        //             </div>
        //             <div className="accordion draggable-list" id="accordionPanelsStayOpenExample">
        //                 {chapters.length > 0 ? (
        //                     chapters.map((chapter) => (
        //                         <div key={chapter.id} className="accordion-item course-section add_course_section_area">
        //                             <h2 className="accordion-header" id={`panelsStayOpen-heading${chapter.id}`}>
        //                                 <div className="accordion_header_content d-flex flex-wrap">
        //                                     <button
        //                                         className={`accordion-button course-section-btn ${chapter.isOpen ? "" : "collapsed"}`}
        //                                         type="button"
        //                                         onClick={() => toggleChapter(chapter.id)}
        //                                     >
        //                                         <div className="icon_area d-flex flex-wrap justify-content-between align-items-center w-100">
        //                                             <div className="d-flex flex-wrap align-items-center">
        //                                                 <span className="icon-container">
        //                                                     <FolderIcon size={16} />
        //                                                 </span>
        //                                                 <p className="mb-0 ms-2 bold-text">{chapter.title}</p>
        //                                             </div>
        //                                         </div>
        //                                     </button>

        //                                     <div className="item-action item_action_header d-flex flex-wrap">
        //                                         <div className="dropdown action-item">
        //                                             <span
        //                                                 className="dropdown-toggle btn btn-small small-more-btn"
        //                                                 onClick={() => toggleDropdown(`chapter-${chapter.id}`)}
        //                                             >
        //                                                 <PlusIcon size={16} />
        //                                             </span>
        //                                             {dropdownOpen[`chapter-${chapter.id}`] && (
        //                                                 <ul className="dropdown-menu dropdown-menu-end show">
        //                                                     <li>
        //                                                         <a
        //                                                             className="dropdown-item add-lesson-btn"
        //                                                             onClick={() =>
        //                                                                 openModal("addLesson", {
        //                                                                     chapterId: chapter.id,
        //                                                                     type: "lesson",
        //                                                                 })
        //                                                             }
        //                                                             href="javascript:;"
        //                                                         >
        //                                                             Add Lesson
        //                                                         </a>
        //                                                     </li>
        //                                                     <li>
        //                                                         <a
        //                                                             className="dropdown-item add-lesson-btn"
        //                                                             onClick={() =>
        //                                                                 openModal("addDocument", {
        //                                                                     chapterId: chapter.id,
        //                                                                     type: "document",
        //                                                                 })
        //                                                             }
        //                                                             href="javascript:;"
        //                                                         >
        //                                                             Add Document
        //                                                         </a>
        //                                                     </li>
        //                                                     <li>
        //                                                         <a
        //                                                             className="dropdown-item add-lesson-btn"
        //                                                             onClick={() =>
        //                                                                 openModal("addLiveLesson", {
        //                                                                     chapterId: chapter.id,
        //                                                                     type: "live",
        //                                                                 })
        //                                                             }
        //                                                             href="javascript:;"
        //                                                         >
        //                                                             Add Live lesson
        //                                                         </a>
        //                                                     </li>
        //                                                     <li>
        //                                                         <a
        //                                                             className="dropdown-item add-lesson-btn"
        //                                                             onClick={() =>
        //                                                                 openModal("addQuiz", {
        //                                                                     chapterId: chapter.id,
        //                                                                     type: "quiz",
        //                                                                 })
        //                                                             }
        //                                                             href="javascript:;"
        //                                                         >
        //                                                             Add Quiz
        //                                                         </a>
        //                                                     </li>
        //                                                 </ul>
        //                                             )}
        //                                         </div>
        //                                         <a
        //                                             href="javascript:;"
        //                                             className="text-dark action-item edit-chapter-btn"
        //                                             onClick={() => openModal("editChapter", { chapterId: chapter.id })}
        //                                         >
        //                                             <PencilIcon size={16} />
        //                                         </a>
        //                                         <a href="javascript:;" className="text-danger action-item delete-item">
        //                                             <TrashIcon size={16} />
        //                                         </a>
        //                                     </div>
        //                                 </div>
        //                             </h2>
        //                             <div
        //                                 id={`panelsStayOpen-collapse${chapter.id}`}
        //                                 className={`accordion-collapse collapse ${chapter.isOpen ? "show" : ""}`}
        //                                 aria-labelledby={`panelsStayOpen-heading${chapter.id}`}
        //                             >
        //                                 <div className="accordion-body">
        //                                     {chapter.chapterItems && chapter.chapterItems.length > 0 ? (
        //                                         chapter.chapterItems.map((chapterItem) => {
        //                                             if (
        //                                                 chapterItem.type === "lesson" ||
        //                                                 chapterItem.type === "live" ||
        //                                                 chapterItem.type === "document"
        //                                             ) {
        //                                                 return (
        //                                                     <div
        //                                                         key={chapterItem.id}
        //                                                         className="card course-section-item create_couese_item mb-3"
        //                                                         data-chapter-item-id={chapterItem.id}
        //                                                         data-chapterid={chapter.id}
        //                                                     >
        //                                                         <div className="d-flex flex-wrap justify-content-between align-items-center">
        //                                                             <div className="edit_course_icons d-flex flex-wrap align-items-center">
        //                                                                 <span className="icon-container">
        //                                                                     {chapterItem.type === "lesson" && <VideoIcon size={16} />}
        //                                                                     {chapterItem.type === "live" && <VideoIcon size={16} />}
        //                                                                     {chapterItem.type === "document" && <FileIcon size={16} />}
        //                                                                 </span>
        //                                                                 <p className="mb-0 ms-2 bold-text">{truncate(chapterItem?.lesson?.title)}</p>
        //                                                             </div>
        //                                                             <div className="item-action">
        //                                                                 <a
        //                                                                     href="javascript:;"
        //                                                                     className="ms-2 text-dark edit-lesson-btn"
        //                                                                     onClick={() =>
        //                                                                         openModal(
        //                                                                             chapterItem.type === "lesson"
        //                                                                                 ? "editLesson"
        //                                                                                 : chapterItem.type === "live"
        //                                                                                     ? "editLiveLesson"
        //                                                                                     : "editDocument",
        //                                                                             {
        //                                                                                 type: chapterItem.type,
        //                                                                                 courseId: chapter.id,
        //                                                                                 chapterId: chapter.id,
        //                                                                                 chapterItemId: chapterItem.id,
        //                                                                             },
        //                                                                         )
        //                                                                     }
        //                                                                 >
        //                                                                     <PencilIcon size={16} />
        //                                                                 </a>
        //                                                                 <a href="javascript:;" className="ms-2 text-danger delete-item">
        //                                                                     <TrashIcon size={16} />
        //                                                                 </a>
        //                                                                 <a href="javascript:;" className="ms-2 dragger">
        //                                                                     <ArrowsUpDownIcon size={16} />
        //                                                                 </a>
        //                                                             </div>
        //                                                         </div>
        //                                                     </div>
        //                                                 )
        //                                             } else if (chapterItem.type === "quiz") {
        //                                                 return (
        //                                                     <div
        //                                                         key={chapterItem.id}
        //                                                         className="accordion card mb-2"
        //                                                         id="accordionExample"
        //                                                         data-chapter-item-id={chapterItem.id}
        //                                                         data-chapterid={chapter.id}
        //                                                     >
        //                                                         <div className="accordion-item">
        //                                                             <h2 className="accordion-header">
        //                                                                 <div className="d-flex flex-wrap justify-content-between">
        //                                                                     <button
        //                                                                         className={`accordion-button course-quiz-btn ${chapterItem.isOpen ? "" : "collapsed"
        //                                                                             }`}
        //                                                                         type="button"
        //                                                                         onClick={() => toggleQuiz(chapter.id, chapterItem.id)}
        //                                                                     >
        //                                                                         <div className="d-flex flex-wrap justify-content-between align-items-center">
        //                                                                             <div className="d-flex flex-wrap align-items-center">
        //                                                                                 <span className="icon-container">
        //                                                                                     <i className="fas fa-question"></i>
        //                                                                                 </span>
        //                                                                                 <p className="mb-0 ms-2 bold-text">{chapterItem?.quiz?.title}</p>
        //                                                                             </div>
        //                                                                         </div>
        //                                                                     </button>
        //                                                                     <div className="item-action d-flex flex-wrap">
        //                                                                         <div className="dropdown action-item">
        //                                                                             <span
        //                                                                                 className="dropdown-toggle btn btn-small small-more-btn"
        //                                                                                 onClick={() => toggleDropdown(`quiz-${chapterItem.id}`)}
        //                                                                             >
        //                                                                                 <PlusIcon size={16} />
        //                                                                             </span>
        //                                                                             {dropdownOpen[`quiz-${chapterItem.id}`] && (
        //                                                                                 <ul className="dropdown-menu dropdown-menu-end show">
        //                                                                                     <li>
        //                                                                                         <a
        //                                                                                             className="dropdown-item add-quiz-question-btn"
        //                                                                                             onClick={() =>
        //                                                                                                 openModal("addQuizQuestion", {
        //                                                                                                     quizId: chapterItem.quiz?.id,
        //                                                                                                 })
        //                                                                                             }
        //                                                                                             href="javascript:;"
        //                                                                                         >
        //                                                                                             Add Question
        //                                                                                         </a>
        //                                                                                     </li>
        //                                                                                 </ul>
        //                                                                             )}
        //                                                                         </div>
        //                                                                         <a
        //                                                                             href="javascript:;"
        //                                                                             onClick={() =>
        //                                                                                 openModal("editQuiz", {
        //                                                                                     type: chapterItem.type,
        //                                                                                     courseId: chapter.id,
        //                                                                                     chapterId: chapter.id,
        //                                                                                     chapterItemId: chapterItem.id,
        //                                                                                 })
        //                                                                             }
        //                                                                             className="text-dark action-item edit-lesson-btn"
        //                                                                         >
        //                                                                             <PencilIcon size={16} />
        //                                                                         </a>
        //                                                                         <a href="javascript:;" className="text-danger action-item delete-item">
        //                                                                             <TrashIcon size={16} />
        //                                                                         </a>
        //                                                                         <a href="javascript:;" className="ms-2 dragger">
        //                                                                             <ArrowsUpDownIcon size={16} />
        //                                                                         </a>
        //                                                                     </div>
        //                                                                 </div>
        //                                                             </h2>
        //                                                             <div
        //                                                                 id={`panelsStayOpen-collapse${chapterItem.id}`}
        //                                                                 className={`accordion-collapse collapse ${chapterItem.isOpen ? "show" : ""}`}
        //                                                                 data-bs-parent="#accordionExample"
        //                                                             >
        //                                                                 <div className="accordion-body">
        //                                                                     {chapterItem?.quiz?.questions && chapterItem.quiz.questions.length > 0 ? (
        //                                                                         chapterItem.quiz.questions.map((question) => (
        //                                                                             <div
        //                                                                                 key={question.id}
        //                                                                                 className="card course-section-item mb-3"
        //                                                                                 data-chapter-item-id=""
        //                                                                                 data-chapterid=""
        //                                                                             >
        //                                                                                 <div className="d-flex flex-wrap justify-content-between align-items-center">
        //                                                                                     <div className="edit_course_icons d-flex flex-wrap align-items-center">
        //                                                                                         <span className="icon-container">
        //                                                                                             <i className="far fa-question-circle"></i>
        //                                                                                         </span>
        //                                                                                         <p className="mb-0 ms-2 bold-text">{question.title}</p>
        //                                                                                     </div>
        //                                                                                     <div className="item-action">
        //                                                                                         <a
        //                                                                                             href="javascript:;"
        //                                                                                             className="ms-2 text-dark edit-question-btn"
        //                                                                                             onClick={() =>
        //                                                                                                 openModal("editQuizQuestion", {
        //                                                                                                     questionId: question.id,
        //                                                                                                 })
        //                                                                                             }
        //                                                                                         >
        //                                                                                             <PencilIcon size={16} />
        //                                                                                         </a>
        //                                                                                         <a href="javascript:;" className="ms-2 text-danger delete-item">
        //                                                                                             <TrashIcon size={16} />
        //                                                                                         </a>
        //                                                                                     </div>
        //                                                                                 </div>
        //                                                                             </div>
        //                                                                         ))
        //                                                                     ) : (
        //                                                                         <p className="text-center">No questions found.</p>
        //                                                                     )}
        //                                                                 </div>
        //                                                             </div>
        //                                                         </div>
        //                                                     </div>
        //                                                 )
        //                                             }
        //                                             return null
        //                                         })
        //                                     ) : (
        //                                         <p className="text-center">No lessons found.</p>
        //                                     )}
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     ))
        //                 ) : (
        //                     <p className="text-center p-5">No chapters found.</p>
        //                 )}
        //             </div>
        //         </form>
        //     </div>

        //     {/* Render modals based on activeModal state */}
        //     {activeModal === "addChapter" && <AddChapterModal isOpen={true} onClose={closeModal} />}

        //     {activeModal === "sortChapters" && <SortChaptersModal isOpen={true} onClose={closeModal} chapters={chapters} />}

        //     {activeModal === "addLesson" && (
        //         <AddLessonModal
        //             isOpen={true}
        //             onClose={closeModal}
        //             chapters={chapters}
        //             chapterId={modalData.chapterId}
        //             type={modalData.type}
        //         />
        //     )}

        //     {activeModal === "addDocument" && (
        //         <AddDocumentModal
        //             isOpen={true}
        //             onClose={closeModal}
        //             chapters={chapters}
        //             chapterId={modalData.chapterId}
        //             type={modalData.type}
        //         />
        //     )}

        //     {activeModal === "addLiveLesson" && (
        //         <AddLiveLessonModal
        //             isOpen={true}
        //             onClose={closeModal}
        //             chapters={chapters}
        //             chapterId={modalData.chapterId}
        //             type={modalData.type}
        //         />
        //     )}

        //     {activeModal === "addQuiz" && (
        //         <AddQuizModal
        //             isOpen={true}
        //             onClose={closeModal}
        //             chapters={chapters}
        //             chapterId={modalData.chapterId}
        //             type={modalData.type}
        //         />
        //     )}

        //     {activeModal === "editChapter" && (
        //         <EditChapterModal
        //             isOpen={true}
        //             onClose={closeModal}
        //             chapterId={modalData.chapterId}
        //             chapter={chapters.find((c) => c.id === modalData.chapterId)}
        //         />
        //     )}

        //     {activeModal === "editLesson" && (
        //         <EditLessonModal isOpen={true} onClose={closeModal} chapters={chapters} chapterItem={modalData} />
        //     )}

        //     {activeModal === "editLiveLesson" && (
        //         <EditLiveLessonModal
        //             isOpen={true}
        //             onClose={closeModal}
        //             chapters={chapters}
        //             chapterItem={modalData}
        //             courseId={modalData.courseId}
        //         />
        //     )}

        //     {activeModal === "editDocument" && (
        //         <EditDocumentModal isOpen={true} onClose={closeModal} chapters={chapters} chapterItem={modalData} />
        //     )}

        //     {activeModal === "editQuiz" && (
        //         <EditQuizModal isOpen={true} onClose={closeModal} chapters={chapters} chapterItem={modalData} />
        //     )}

        //     {activeModal === "addQuizQuestion" && (
        //         <AddQuizQuestionModal isOpen={true} onClose={closeModal} quizId={modalData.quizId} />
        //     )}

        //     {activeModal === "editQuizQuestion" && (
        //         <EditQuizQuestionModal
        //             isOpen={true}
        //             onClose={closeModal}
        //             questionId={modalData.questionId}
        //             question={modalData}
        //         />
        //     )}
        // </div>


        <div className="col-lg-9">
            <CourseNavigation />
            <form className="instructor__profile-form course-form">
                <input type="hidden" name="step" value="3" />
                <input type="hidden" name="next_step" value="4" />
            </form>

            <div className="instructor__profile-form-wrap">
                <form>
                    <div className="mb-3 d-flex flex-wrap justify-content-between">
                        <button type="button" className="thm-btn" onClick={() => openModal("addChapter")}>
                            {t('Add new chapter')}
                        </button>

                        <button type="button" className="thm-btn info" onClick={() => openModal("sortChapters")}>
                            {t('Sort chapter')}
                        </button>
                    </div>
                    <div className="accordion draggable-list" id="accordionPanelsStayOpenExample">
                        {chapters.length > 0 ? (
                            chapters.map((chapter) => (
                                <div key={chapter.id} className="accordion-item course-section add_course_section_area">
                                    <h2 className="accordion-header" id={`panelsStayOpen-heading${chapter.id}`}>
                                        <div className="accordion_header_content d-flex flex-wrap">
                                            <button
                                                className={`accordion-button course-section-btn ${chapter.isOpen ? "" : "collapsed"}`}
                                                type="button"
                                                onClick={() => toggleChapter(chapter.id)}
                                            >
                                                <div className="icon_area d-flex flex-wrap justify-content-between align-items-center w-100">
                                                    <div className="d-flex flex-wrap align-items-center">
                                                        <span className="icon-container">
                                                            <FolderIcon size={16} />
                                                        </span>
                                                        <p className="mb-0 ms-2 bold-text">{chapter.title}</p>
                                                    </div>
                                                </div>
                                            </button>

                                            <div className="item-action item_action_header d-flex flex-wrap">
                                                <div className="dropdown action-item">
                                                    <span
                                                        className="dropdown-toggle btn btn-small small-more-btn"
                                                        onClick={() => toggleDropdown(`chapter-${chapter.id}`)}
                                                        aria-label={t('Add content')}
                                                    >
                                                        <PlusIcon size={16} />
                                                    </span>
                                                    {dropdownOpen[`chapter-${chapter.id}`] && (
                                                        <ul className="dropdown-menu dropdown-menu-end show">
                                                            <li>
                                                                <a
                                                                    className="dropdown-item add-lesson-btn"
                                                                    onClick={() =>
                                                                        openModal("addLesson", {
                                                                            chapterId: chapter.id,
                                                                            type: "lesson",
                                                                        })
                                                                    }
                                                                    href="javascript:;"
                                                                >
                                                                    {t('Add Lesson')}
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item add-lesson-btn"
                                                                    onClick={() =>
                                                                        openModal("addDocument", {
                                                                            chapterId: chapter.id,
                                                                            type: "document",
                                                                        })
                                                                    }
                                                                    href="javascript:;"
                                                                >
                                                                    {t('Add Document')}
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item add-lesson-btn"
                                                                    onClick={() =>
                                                                        openModal("addLiveLesson", {
                                                                            chapterId: chapter.id,
                                                                            type: "live",
                                                                        })
                                                                    }
                                                                    href="javascript:;"
                                                                >
                                                                    {t('Add Live lesson')}
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item add-lesson-btn"
                                                                    onClick={() =>
                                                                        openModal("addQuiz", {
                                                                            chapterId: chapter.id,
                                                                            type: "quiz",
                                                                        })
                                                                    }
                                                                    href="javascript:;"
                                                                >
                                                                    {t('Add Quiz')}
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    )}
                                                </div>
                                                <a
                                                    href="javascript:;"
                                                    className="text-dark action-item edit-chapter-btn"
                                                    onClick={() => openModal("editChapter", { chapterId: chapter.id })}
                                                    aria-label={t('Edit chapter')}
                                                >
                                                    <PencilIcon size={16} />
                                                </a>
                                                <a
                                                    href="javascript:;"
                                                    className="text-danger action-item delete-item"
                                                    aria-label={t('Delete chapter')}
                                                >
                                                    <TrashIcon size={16} />
                                                </a>
                                            </div>
                                        </div>
                                    </h2>
                                    <div
                                        id={`panelsStayOpen-collapse${chapter.id}`}
                                        className={`accordion-collapse collapse ${chapter.isOpen ? "show" : ""}`}
                                        aria-labelledby={`panelsStayOpen-heading${chapter.id}`}
                                    >
                                        <div className="accordion-body">
                                            {chapter.chapterItems && chapter.chapterItems.length > 0 ? (
                                                chapter.chapterItems.map((chapterItem) => {
                                                    if (
                                                        chapterItem.type === "lesson" ||
                                                        chapterItem.type === "live" ||
                                                        chapterItem.type === "document"
                                                    ) {
                                                        return (
                                                            <div
                                                                key={chapterItem.id}
                                                                className="card course-section-item create_couese_item mb-3"
                                                                data-chapter-item-id={chapterItem.id}
                                                                data-chapterid={chapter.id}
                                                            >
                                                                <div className="d-flex flex-wrap justify-content-between align-items-center">
                                                                    <div className="edit_course_icons d-flex flex-wrap align-items-center">
                                                                        <span className="icon-container">
                                                                            {chapterItem.type === "lesson" && <VideoIcon size={16} />}
                                                                            {chapterItem.type === "live" && <VideoIcon size={16} />}
                                                                            {chapterItem.type === "document" && <FileIcon size={16} />}
                                                                        </span>
                                                                        <p className="mb-0 ms-2 bold-text">{truncate(chapterItem?.lesson?.title)}</p>
                                                                    </div>
                                                                    <div className="item-action">
                                                                        <a
                                                                            href="javascript:;"
                                                                            className="ms-2 text-dark edit-lesson-btn"
                                                                            onClick={() =>
                                                                                openModal(
                                                                                    chapterItem.type === "lesson"
                                                                                        ? "editLesson"
                                                                                        : chapterItem.type === "live"
                                                                                            ? "editLiveLesson"
                                                                                            : "editDocument",
                                                                                    {
                                                                                        type: chapterItem.type,
                                                                                        courseId: chapter.id,
                                                                                        chapterId: chapter.id,
                                                                                        chapterItemId: chapterItem.id,
                                                                                    },
                                                                                )
                                                                            }
                                                                            aria-label={t('Edit item')}
                                                                        >
                                                                            <PencilIcon size={16} />
                                                                        </a>
                                                                        <a
                                                                            href="javascript:;"
                                                                            className="ms-2 text-danger delete-item"
                                                                            aria-label={t('Delete item')}
                                                                        >
                                                                            <TrashIcon size={16} />
                                                                        </a>
                                                                        <a
                                                                            href="javascript:;"
                                                                            className="ms-2 dragger"
                                                                            aria-label={t('Drag to reorder')}
                                                                        >
                                                                            <ArrowsUpDownIcon size={16} />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    } else if (chapterItem.type === "quiz") {
                                                        return (
                                                            <div
                                                                key={chapterItem.id}
                                                                className="accordion card mb-2"
                                                                id="accordionExample"
                                                                data-chapter-item-id={chapterItem.id}
                                                                data-chapterid={chapter.id}
                                                            >
                                                                <div className="accordion-item">
                                                                    <h2 className="accordion-header">
                                                                        <div className="d-flex flex-wrap justify-content-between">
                                                                            <button
                                                                                className={`accordion-button course-quiz-btn ${chapterItem.isOpen ? "" : "collapsed"
                                                                                    }`}
                                                                                type="button"
                                                                                onClick={() => toggleQuiz(chapter.id, chapterItem.id)}
                                                                            >
                                                                                <div className="d-flex flex-wrap justify-content-between align-items-center">
                                                                                    <div className="d-flex flex-wrap align-items-center">
                                                                                        <span className="icon-container">
                                                                                            <i className="fas fa-question"></i>
                                                                                        </span>
                                                                                        <p className="mb-0 ms-2 bold-text">{chapterItem?.quiz?.title}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </button>
                                                                            <div className="item-action d-flex flex-wrap">
                                                                                <div className="dropdown action-item">
                                                                                    <span
                                                                                        className="dropdown-toggle btn btn-small small-more-btn"
                                                                                        onClick={() => toggleDropdown(`quiz-${chapterItem.id}`)}
                                                                                        aria-label={t('Add question')}
                                                                                    >
                                                                                        <PlusIcon size={16} />
                                                                                    </span>
                                                                                    {dropdownOpen[`quiz-${chapterItem.id}`] && (
                                                                                        <ul className="dropdown-menu dropdown-menu-end show">
                                                                                            <li>
                                                                                                <a
                                                                                                    className="dropdown-item add-quiz-question-btn"
                                                                                                    onClick={() =>
                                                                                                        openModal("addQuizQuestion", {
                                                                                                            quizId: chapterItem.quiz?.id,
                                                                                                        })
                                                                                                    }
                                                                                                    href="javascript:;"
                                                                                                >
                                                                                                    {t('Add Question')}
                                                                                                </a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    )}
                                                                                </div>
                                                                                <a
                                                                                    href="javascript:;"
                                                                                    onClick={() =>
                                                                                        openModal("editQuiz", {
                                                                                            type: chapterItem.type,
                                                                                            courseId: chapter.id,
                                                                                            chapterId: chapter.id,
                                                                                            chapterItemId: chapterItem.id,
                                                                                        })
                                                                                    }
                                                                                    className="text-dark action-item edit-lesson-btn"
                                                                                    aria-label={t('Edit quiz')}
                                                                                >
                                                                                    <PencilIcon size={16} />
                                                                                </a>
                                                                                <a
                                                                                    href="javascript:;"
                                                                                    className="text-danger action-item delete-item"
                                                                                    aria-label={t('Delete quiz')}
                                                                                >
                                                                                    <TrashIcon size={16} />
                                                                                </a>
                                                                                <a
                                                                                    href="javascript:;"
                                                                                    className="ms-2 dragger"
                                                                                    aria-label={t('Drag to reorder')}
                                                                                >
                                                                                    <ArrowsUpDownIcon size={16} />
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </h2>
                                                                    <div
                                                                        id={`panelsStayOpen-collapse${chapterItem.id}`}
                                                                        className={`accordion-collapse collapse ${chapterItem.isOpen ? "show" : ""}`}
                                                                        data-bs-parent="#accordionExample"
                                                                    >
                                                                        <div className="accordion-body">
                                                                            {chapterItem?.quiz?.questions && chapterItem.quiz.questions.length > 0 ? (
                                                                                chapterItem.quiz.questions.map((question) => (
                                                                                    <div
                                                                                        key={question.id}
                                                                                        className="card course-section-item mb-3"
                                                                                        data-chapter-item-id=""
                                                                                        data-chapterid=""
                                                                                    >
                                                                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                                                                            <div className="edit_course_icons d-flex flex-wrap align-items-center">
                                                                                                <span className="icon-container">
                                                                                                    <i className="far fa-question-circle"></i>
                                                                                                </span>
                                                                                                <p className="mb-0 ms-2 bold-text">{question.title}</p>
                                                                                            </div>
                                                                                            <div className="item-action">
                                                                                                <a
                                                                                                    href="javascript:;"
                                                                                                    className="ms-2 text-dark edit-question-btn"
                                                                                                    onClick={() =>
                                                                                                        openModal("editQuizQuestion", {
                                                                                                            questionId: question.id,
                                                                                                        })
                                                                                                    }
                                                                                                    aria-label={t('Edit question')}
                                                                                                >
                                                                                                    <PencilIcon size={16} />
                                                                                                </a>
                                                                                                <a
                                                                                                    href="javascript:;"
                                                                                                    className="ms-2 text-danger delete-item"
                                                                                                    aria-label={t('Delete question')}
                                                                                                >
                                                                                                    <TrashIcon size={16} />
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                <p className="text-center">{t('No questions found.')}</p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                })
                                            ) : (
                                                <p className="text-center">{t('No lessons found.')}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center p-5">{t('No chapters found.')}</p>
                        )}
                    </div>
                </form>
            </div>

            {/* Render modals based on activeModal state */}
            {activeModal === "addChapter" && <AddChapterModal isOpen={true} onClose={closeModal} />}

            {activeModal === "sortChapters" && <SortChaptersModal isOpen={true} onClose={closeModal} chapters={chapters} />}

            {activeModal === "addLesson" && (
                <AddLessonModal
                    isOpen={true}
                    onClose={closeModal}
                    chapters={chapters}
                    chapterId={modalData.chapterId}
                    type={modalData.type}
                />
            )}

            {activeModal === "addDocument" && (
                <AddDocumentModal
                    isOpen={true}
                    onClose={closeModal}
                    chapters={chapters}
                    chapterId={modalData.chapterId}
                    type={modalData.type}
                />
            )}

            {activeModal === "addLiveLesson" && (
                <AddLiveLessonModal
                    isOpen={true}
                    onClose={closeModal}
                    chapters={chapters}
                    chapterId={modalData.chapterId}
                    type={modalData.type}
                />
            )}

            {activeModal === "addQuiz" && (
                <AddQuizModal
                    isOpen={true}
                    onClose={closeModal}
                    chapters={chapters}
                    chapterId={modalData.chapterId}
                    type={modalData.type}
                />
            )}

            {activeModal === "editChapter" && (
                <EditChapterModal
                    isOpen={true}
                    onClose={closeModal}
                    chapterId={modalData.chapterId}
                    chapter={chapters.find((c) => c.id === modalData.chapterId)}
                />
            )}

            {activeModal === "editLesson" && (
                <EditLessonModal isOpen={true} onClose={closeModal} chapters={chapters} chapterItem={modalData} />
            )}

            {activeModal === "editLiveLesson" && (
                <EditLiveLessonModal
                    isOpen={true}
                    onClose={closeModal}
                    chapters={chapters}
                    chapterItem={modalData}
                    courseId={modalData.courseId}
                />
            )}

            {activeModal === "editDocument" && (
                <EditDocumentModal isOpen={true} onClose={closeModal} chapters={chapters} chapterItem={modalData} />
            )}

            {activeModal === "editQuiz" && (
                <EditQuizModal isOpen={true} onClose={closeModal} chapters={chapters} chapterItem={modalData} />
            )}

            {activeModal === "addQuizQuestion" && (
                <AddQuizQuestionModal isOpen={true} onClose={closeModal} quizId={modalData.quizId} />
            )}

            {activeModal === "editQuizQuestion" && (
                <EditQuizQuestionModal
                    isOpen={true}
                    onClose={closeModal}
                    questionId={modalData.questionId}
                    question={modalData}
                />
            )}
        </div>
    )
}

export default CourseContent
