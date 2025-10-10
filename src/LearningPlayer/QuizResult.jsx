import React from 'react';
import { Link } from 'react-router-dom';
import grdeIcon from "../assets/images/student-grades.png"
import testIcon from "../assets/images/test.png"
import trophyIcon from "../assets/images/trophy.png"
import markIcon from "../assets/images/mark.png"
import goodScore from "../assets/images/good-score.png"
import badScore from "../assets/images/bad-score.png"
const QuizResultPage = () => {
  
  const quizResult = {
    status: 'pass', 
    user_grade: 85,
    result: {
      "1": { answer: 2 },
      "2": { answer: 5 },
      "3": { answer: 9 }
    }
  };
  
  const quiz = {
    pass_mark: 70,
    total_mark: 100,
    attempt: 3,
    questions: [
      {
        id: 1,
        title: "What is React?",
        answers: [
          { id: 1, title: "A programming language", correct: 0 },
          { id: 2, title: "A JavaScript library for building user interfaces", correct: 1 },
          { id: 3, title: "A database management system", correct: 0 },
          { id: 4, title: "An operating system", correct: 0 }
        ]
      },
      {
        id: 2,
        title: "What is JSX?",
        answers: [
          { id: 5, title: "A syntax extension for JavaScript", correct: 1 },
          { id: 6, title: "A new programming language", correct: 0 },
          { id: 7, title: "A database query language", correct: 0 },
          { id: 8, title: "A styling framework", correct: 0 }
        ]
      },
      {
        id: 3,
        title: "What is a component in React?",
        answers: [
          { id: 9, title: "A reusable piece of UI", correct: 1 },
          { id: 10, title: "A database table", correct: 0 },
          { id: 11, title: "A styling rule", correct: 0 },
          { id: 12, title: "A server configuration", correct: 0 }
        ]
      }
    ]
  };
  
  const attempt = 2;
  const courseSlug = "react-fundamentals";
  const courseTitle = "React Fundamentals";
  
  
  const truncate = (text, length = 30) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <section className="wsus__course_video">
      <div className="col-12">
        <div className="wsus__course_header">
          {courseSlug && (
            <Link to={`/student/learning/${courseSlug}`}>
              <i className="fas fa-angle-left"></i>{truncate(courseTitle)}
            </Link>
          )}
        </div>
      </div>

      <div className="container">
        <div className="question-container">
          <div className="row">
            <div className="col-12 mb-5">
              <div className="card">
                <div className="card-body text-center">
                  {quizResult.status === 'pass' ? (
                    <>
                      <div className="info-col text-center">
                        <img src= {goodScore} alt="Good Score" />
                      </div>
                      <h5 className="card-title count">You have passed the quiz!</h5>
                    </>
                  ) : (
                    <>
                      <div className="info-col text-center">
                        <img src= {badScore} alt="Bad Score" />
                      </div>
                      <h5 className="card-title count">You have failed the quiz!</h5>
                      <span>Sorry you have failed the quiz better luck next time.</span>
                    </>
                  )}

                  <div className="mt-3 mb-3">
                    {courseSlug ? (
                      <Link to={`/student/learning/${courseSlug}`} className="btn">
                        Go back to course page
                      </Link>
                    ) : (
                      <Link to="/student/enrolled-courses" className="btn">
                        Go back to Dashboard
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="card text-center">
                <div className="info-col text-center">
                  <img src={grdeIcon} alt="Minimum Marks" />
                </div>
                <div className="card-body">
                  <h6 className="card-title count">{quiz.pass_mark}/{quiz.total_mark}</h6>
                  <p className="card-text">Minimum Marks</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3 mb-3">
              <div className="card text-center">
                <div className="info-col text-center">
                  <img src={testIcon}
                   alt="Attempts" />
                </div>
                <div className="card-body">
                  <h6 className="card-title count">{attempt}/{quiz.attempt}</h6>
                  <p className="card-text">Attempts</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3 mb-3">
              <div className="card text-center">
                <div className="info-col text-center">
                  <img src={markIcon} alt="Your Marks" />
                </div>
                <div className="card-body">
                  <h6 className="card-title count">{quizResult.user_grade}</h6>
                  <p className="card-text">Your Marks</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3 mb-3">
              <div className="card text-center">
                <div className="info-col text-center">
                  <img src={trophyIcon} alt="Result" />
                </div>
                <div className="card-body">
                  <h6 
                    className={`card-title count text-capitalize ${quizResult.status === 'pass' ? 'text-success' : 'text-danger'}`}
                  >
                    {quizResult.status === 'pass' ? 'Passed' : 'Failed'}
                  </h6>
                  <p className="card-text">Result</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">
            {quiz.questions.map((question, index) => (
              <div className="question-box mt-4" key={question.id}>
                <h6>{index + 1}. {question.title}</h6>
                <div className="row">
                  {question.answers.map((answer) => (
                    <div className="col-md-6" key={answer.id}>
                      <div 
                        className={`card ans-body m-2 ${answer.correct === 1 ? 'correct-ans' : 'wrong-ans'}`}
                      >
                        <label htmlFor={`ans-${answer.id}`} className="box first">
                          <div className="course">
                            <span className="circle">
                              <input 
                                type="radio" 
                                disabled 
                                checked={quizResult.result[question.id]?.answer === answer.id}
                                name={`question[${question.id}]`}
                                id={`ans-${answer.id}`} 
                                value={answer.id} 
                              />
                            </span>
                            <span className="subject">{answer.title}</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizResultPage;