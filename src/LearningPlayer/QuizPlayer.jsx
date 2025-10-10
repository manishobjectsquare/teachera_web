"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import grdeIcon from "../assets/images/student-grades.png";
import testIcon from "../assets/images/test.png";
import questionIcon from "../assets/images/question.png";
import clockIcon from "../assets/images/clock.png";
import axios from "axios";
import { useUser } from "../Context/UserContext";
import loaderImg from "../assets/images/loaderImg.png";
import loaderContext from "../context/LoaderContext";
const QuizPlayer = () => {
  const { courseId, id } = useParams();
  const formRef = useRef(null);
  let { user } = useUser();
  let navigate = useNavigate();
  let { setLoader } = useContext(loaderContext);

  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState({
    slug: "",
    title: "",
  });
  const [attempt, setAttempt] = useState(0);

  // State for timer
  const [timer, setTimer] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });

  useEffect(() => {
    fatchQuizData();
    return () => {};
  }, []);

  let fatchQuizData = async () => {
    // Simulate fetching quiz data
    // console.log("Fetching quiz data for ID:", id);
    let response = await axios.get(
      `https://api.basementex.com/api/v1/web/quiz-details/${id}`
    );
    // console.log( , response.data.data);
    setQuiz(response.data.data);

    setCourseInfo(response.data.data.course_id?.title);
    setAttempt(1);
    // You can replace this with actual API call logic
  };

  // State for quiz data

  // Timer interval ref
  const timerRef = useRef(null);

  // Load quiz data
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock quiz data
        const mockQuiz = {
          id: 1,
          title: "HTML Fundamentals Quiz",
          description: "Test your knowledge of HTML basics",
          pass_mark: 70,
          total_mark: 100,
          attempt: 3,
          questions_count: 5,
          time_limit: 600, // 10 minutes in seconds
          questions: [
            {
              id: 101,
              title: "What does HTML stand for?",
              answers: [
                { id: 1001, title: "Hyper Text Markup Language" },
                { id: 1002, title: "High Tech Modern Language" },
                { id: 1003, title: "Hyper Transfer Markup Language" },
                { id: 1004, title: "Home Tool Markup Language" },
              ],
            },
            {
              id: 102,
              title:
                "Which HTML tag is used to define an internal style sheet?",
              answers: [
                { id: 2001, title: "<style>" },
                { id: 2002, title: "<script>" },
                { id: 2003, title: "<css>" },
                { id: 2004, title: "<link>" },
              ],
            },
            {
              id: 103,
              title: "Which HTML attribute is used to define inline styles?",
              answers: [
                { id: 3001, title: "style" },
                { id: 3002, title: "class" },
                { id: 3003, title: "font" },
                { id: 3004, title: "styles" },
              ],
            },
            {
              id: 104,
              title:
                "Which HTML element is used to specify a header for a document or section?",
              answers: [
                { id: 4001, title: "<header>" },
                { id: 4002, title: "<head>" },
                { id: 4003, title: "<top>" },
                { id: 4004, title: "<section>" },
              ],
            },
            {
              id: 105,
              title: "Which HTML element defines navigation links?",
              answers: [
                { id: 5001, title: "<nav>" },
                { id: 5002, title: "<navigation>" },
                { id: 5003, title: "<navigate>" },
                { id: 5004, title: "<links>" },
              ],
            },
          ],
        };

        // Mock course info
        const mockCourseInfo = {
          slug: "web-development-bootcamp",
          title: "Complete Web Development Bootcamp",
        };

        // Mock attempt data
        const mockAttempt = 1;

        // Set state
        // setQuiz(mockQuiz);
        // setCourseInfo(mockCourseInfo);
        // setAttempt(mockAttempt);

        // Initialize timer
        const hours = Math.floor(mockQuiz.time_limit / 3600);
        const minutes = Math.floor((mockQuiz.time_limit % 3600) / 60);
        const seconds = mockQuiz.time_limit % 60;

        setTimer({
          hour: hours,
          minute: minutes,
          second: seconds,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setIsLoading(false);
      }
    };

    fetchQuizData();

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Start timer when quiz is loaded
  useEffect(() => {
    if (!isLoading && quiz) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          const { hour, minute, second } = prevTimer;

          if (second > 0) {
            return { ...prevTimer, second: second - 1 };
          } else if (minute > 0) {
            return { hour, minute: minute - 1, second: 59 };
          } else if (hour > 0) {
            return { hour: hour - 1, minute: 59, second: 59 };
          } else {
            // Time's up, submit the form
            clearInterval(timerRef.current);
            if (formRef.current) {
              formRef.current.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              );
            }
            return prevTimer;
          }
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isLoading, quiz]);

  let [formVal, setFormVal] = useState([]);

  let handleRadioChange = (e) => {
    const { name, value } = e.target;

    setFormVal((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const questionIndex = updatedAnswers.findIndex(
        (ans) => ans.question === name
      );
      if (questionIndex !== -1) {
        updatedAnswers[questionIndex].answer = value;
      } else {
        updatedAnswers.push({ question: name, answer: value });
      }
      return updatedAnswers;
    });
    console.log("Updated answers:", formVal);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let postData = {
      course_id: courseId,
      user_id: user?.userId,
      answers: formVal,
    };
    setIsLoading(true);

    try {
      let response = await axios(
        // `http://localhost:8201/api/v1/web/quiz-question/${id}/submit`,
        `https://api.basementex.com/api/v1/web/quiz-question/${id}/submit`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          data: postData,
        }
      );

      if (response?.data?.status) {
        alert("Quiz submitted successfully!");
        navigate("/student/quiz-attempts");
      }
    } catch (error) {
      alert("something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format number with leading zero
  const formatNumber = (num) => {
    return num.toString().padStart(2, "0");
  };

  if (isLoading) {
    return (
      <div className="preloader-two">
        <div className="loader-icon-two">
          <img src={loaderImg} alt="Preloader" />
        </div>
      </div>
    );
  }
  if (!quiz) {
    return;
  }
  return (
    <section className="wsus__course_video">
      <div className="col-12">
        <div className="wsus__course_header">
          {courseInfo.slug && (
            <Link to={`/student/learning`}>
              <FontAwesomeIcon icon={faAngleLeft} /> {courseInfo.title}
            </Link>
          )}
        </div>
      </div>

      <div className="container">
        <div className="question-container">
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="card text-center">
                <div className="info-col text-center">
                  <img src={grdeIcon} alt="Minimum Marks" />
                </div>
                <div className="card-body">
                  <h6 className="card-title count">
                    {console.log(quiz, "quiz")}
                    {quiz?.pass_mark}/{quiz.total_mark}
                  </h6>
                  <p className="card-text">Minimum Marks</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card text-center">
                <div className="info-col text-center">
                  <img src={testIcon} alt="Attempts" />
                </div>
                <div className="card-body">
                  <h6 className="card-title count">
                    {attempt}/{quiz.attempt}
                  </h6>
                  <p className="card-text">Attempts</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card text-center">
                <div className="info-col text-center">
                  <img src={questionIcon} alt="Questions" />
                </div>
                <div className="card-body">
                  <h6 className="card-title count">{quiz.questions_count}</h6>
                  <p className="card-text">Questions</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card text-center">
                <div className="info-col text-center">
                  <img src={clockIcon} alt="Remained time" />
                </div>
                <div className="card-body">
                  <h6 className="card-title count">
                    <span className="hour">{formatNumber(timer.hour)}</span>:
                    <span className="minute">{formatNumber(timer.minute)}</span>
                    :
                    <span className="second">{formatNumber(timer.second)}</span>
                  </h6>
                  <p className="card-text">Remained time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="alert alert-primary d-flex align-items-center"
          role="alert"
        >
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="flex-shrink-0 me-2"
            style={{ width: "24px", height: "24px" }}
          />
          <div>
            Please note that you have to complete all the questions and submit
            before remaining time. The form will be submitted automatically if
            remaining time ends.
          </div>
        </div>

        <div className="card mt-3">
          <form ref={formRef} onSubmit={handleSubmit} className="question-form">
            <div className="card-body">
              {quiz.questions.map((question, index) => (
                <div className="question-box mt-4" key={question._id}>
                  <h6>
                    {index + 1}. {question.question}
                  </h6>
                  <div className="row">
                    {question.options.map((answer) => (
                      <div className="col-md-6" key={answer}>
                        <div className="card ans-body m-2">
                          <label
                            htmlFor={`ans-${answer}`}
                            className="box first"
                          >
                            <div className="course">
                              <span className="circle">
                                <input
                                  type="radio"
                                  name={`${question._id}`}
                                  id={`ans-${answer}`}
                                  value={answer}
                                  onChange={handleRadioChange}
                                  checked={formVal.some(
                                    (ans) =>
                                      ans.question === question._id &&
                                      ans.answer === answer
                                  )}
                                />
                              </span>
                              <span className="subject"> {answer}</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-4 text-end">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuizPlayer;
