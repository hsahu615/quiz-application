import React, { useEffect, useState } from 'react';
import './AdminQuizPage.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { WebSocketService, socket } from '../../services/WebSocketService';
import BarChart from '../BarChart/BarChart';
import NavBar from '../NavBar/NavBar';

const AdminQuizPage = () => {
  const webSocketService = new WebSocketService();
  const { roomid } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { problems } = state;
  const [currentProblem, setCurrentProblem] = useState(0);
  const [submissions, setSubmissions] = useState([0, 0, 0, 0]);

  useEffect(() => {
    socket.on('total_submissions', (data: any) => {
      const total = [data.option1, data.option2, data.option3, data.option4];
      setSubmissions([...total]);
      console.log(submissions);
    });
  }, []);

  const nextQuestion = () => {
    webSocketService.nextQuestion(roomid);
    setCurrentProblem(
      currentProblem < problems.length - 1 ? currentProblem + 1 : currentProblem
    );
    setSubmissions([0, 0, 0, 0]);
  };

  const finishTest = () => {
    webSocketService.finishTest(roomid);
    navigate('/final-leaderboard');
  };

  return (
    <div className='admin-quiz-container'>
      <NavBar />
      <div className='d-flex flex-column h-100 align-items-center'>
        <div className='col-8'>
          <h1 className='text-center my-4 text-white'>
            {problems[currentProblem].question}
          </h1>
        </div>
        <div className='row m-0 w-100 flex-column align-items-center'>
          <div className='col-8'>
            <BarChart data={submissions} />
          </div>
          {currentProblem == problems.length - 1 ? (
            <button
              onClick={() => finishTest()}
              className='next-btn btn btn-primary my-4 col-1 rounded py-2'
            >
              Finish Test
            </button>
          ) : (
            <button
              onClick={() => nextQuestion()}
              disabled={currentProblem == problems.length - 1}
              className='next-btn btn btn-primary my-4 col-1 rounded py-2'
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQuizPage;
