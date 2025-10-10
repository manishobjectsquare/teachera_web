import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useUser } from "../../Context/UserContext";
import moment from "moment";
import toastify from "../../config/toastify";
const QuizAttempts = () => {
  const { t } = useTranslation();
  let { user } = useUser();

  // Mock data for quiz attempts
  const allQuizAttempts = [
    {
      id: 1,
      user_grade: 85,
      status: "pass",
      created_at: "2023-05-10T14:30:00Z",
      quiz: {
        id: 101,
        title: "JavaScript Fundamentals Quiz",
        total_mark: 100,
        course: {
          title: "Web Development Fundamentals",
        },
      },
    },
    {
      id: 2,
      user_grade: 65,
      status: "fail",
      created_at: "2023-05-15T09:45:00Z",
      quiz: {
        id: 102,
        title: "Advanced CSS Concepts",
        total_mark: 100,
        course: {
          title: "CSS Masterclass",
        },
      },
    },
    {
      id: 3,
      user_grade: 92,
      status: "pass",
      created_at: "2023-05-20T16:15:00Z",
      quiz: {
        id: 103,
        title: "React Hooks Quiz",
        total_mark: 100,
        course: {
          title: "React.js for Beginners",
        },
      },
    },
    {
      id: 4,
      user_grade: 78,
      status: "pass",
      created_at: "2023-05-25T11:20:00Z",
      quiz: {
        id: 104,
        title: "Database Design Principles",
        total_mark: 100,
        course: {
          title: "SQL Fundamentals",
        },
      },
    },
    {
      id: 5,
      user_grade: 45,
      status: "fail",
      created_at: "2023-05-30T13:10:00Z",
      quiz: {
        id: 105,
        title: "Python Data Structures",
        total_mark: 100,
        course: {
          title: "Python Programming",
        },
      },
    },
  ];

  let [quiz, setQuiz] = useState([]);

  useEffect(() => {
    fatchQuizData();
  }, []);

  let fatchQuizData = async () => {
    let response = await axios.get(
      `https://api.basementex.com/api/v1/web/quiz-get/${user?.userId}`
    );

    setQuiz(response.data.data);
  };
  // Simulate fetching data from an API

  const [currentPage, setCurrentPage] = useState(1);
  const attemptsPerPage = 3;

  const indexOfLastAttempt = currentPage * attemptsPerPage;
  const indexOfFirstAttempt = indexOfLastAttempt - attemptsPerPage;
  const currentAttempts = allQuizAttempts.slice(
    indexOfFirstAttempt,
    indexOfLastAttempt
  );

  const totalPages = Math.ceil(allQuizAttempts.length / attemptsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=" mx-auto">
      <div className="dashboard__content-wrap">
        <div className="dashboard__content-title">
          <h4 className="title">{t("My Quiz Attempts")}</h4>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>{t("#")}</th>
                    <th>{t("Course")}</th>
                    <th>{t("Quiz")}</th>
                    <th>{t("Quiz Grade")}</th>
                    {/* <th>{t("My Grade")}</th> */}
                    {/* <th>{t("Status")}</th> */}
                    <th>{t("Date")}</th>
                    <th>{t("Action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {quiz.length > 0 ? (
                    quiz.map((attempt, index) => (
                      <tr key={attempt._id}>
                        <td>{indexOfFirstAttempt + index + 1}</td>
                        <td>{attempt?.course_id?.title}</td>
                        <td>{attempt?.quiz_id?.title}</td>
                        <td>{attempt?.total_score}</td>
                        {/* <td>{attempt.user_grade}</td> */}
                        {/* <td>
                          <span
                            className={`badge ${
                              attempt.status === "pass"
                                ? "bg-success"
                                : "bg-danger"
                            } text-uppercase`}
                          >
                            {t(attempt.status)}
                          </span>
                        </td> */}
                        <td>{t(moment(attempt.createdAt).format("LLL"))} </td>
                        <td>
                          <button
                            onClick={() => toastify.info("Wait till Update")}
                            // to={`/student/quiz/result/${attempt?.quiz_id?._id}/${attempt._id}`}
                            className="text-primary"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        {t("No data found!")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* {totalPages > 1 && (
              <div className="mt-3">
                <nav>
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        {t("Previous")}
                      </button>
                    </li>

                    {[...Array(totalPages).keys()].map((number) => (
                      <li
                        key={number + 1}
                        className={`page-item ${
                          currentPage === number + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          onClick={() => paginate(number + 1)}
                          className="page-link"
                        >
                          {number + 1}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        {t("Next")}
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAttempts;
