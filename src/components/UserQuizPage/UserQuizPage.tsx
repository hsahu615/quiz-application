import { useEffect, useRef, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Spinner from '../Spinner/Spinner';
import './UserQuizPage.css';
import { WebSocketService, socket } from '../../services/WebSocketService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Timer from '../Timer/Timer';

const UserQuizPage = () => {
  const webSocketService: WebSocketService = new WebSocketService();
  const [activeQuestion, setActiveQuestion] = useState<any>({
    question: 'asc',
    options: [
      {
        id: '',
        value: 'df',
      },
      {
        id: '',
        value: '',
      },
      {
        id: '',
        value: '',
      },
      {
        id: '',
        value: '',
      },
    ],
  });
  const [isStarted, setIsStarted] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');
  const submitButton = useRef<any>();
  const location = useLocation();
  const { roomid } = useParams();
  const [currentUser, setCurrentUser] = useState<any>({
    fullName: '',
    userId: '',
  });

  useEffect(() => {
    socket.on('active_problem', (data: any) => {
      setActiveQuestion({ ...data });
      setIsStarted(true);
    });
    const stringifiedUser = localStorage.getItem('user');
    const currentUser = stringifiedUser ? JSON.parse(stringifiedUser) : '';
    setCurrentUser(currentUser);

    return () => {
      socket.off('active_problem');
    };
  }, []);

  const submitAnswer = (e: any) => {
    webSocketService.submitAnswer(
      currentUser.id,
      activeQuestion.id,
      roomid,
      Number.parseInt(selectedValue)
    );
    setIsStarted(false);
    e.target.disabled = true;
  };
  return (
    <div className='user-quiz-container d-flex flex-column'>
      <div style={{ flex: '0 0 auto' }}>
        <NavBar />
      </div>
      <div
        className='user-content row m-0 justify-content-center align-items-center'
        style={{ flex: '1 1 auto' }}
      >
        {isStarted ? (
          <div>
            <Timer timeSeconds={60} />
            <div className='row m-0 justify-content-center'>
              <h1 className='text-center text-white my-5'>
                {activeQuestion.question}
              </h1>
              {activeQuestion.options.map((ele: any, index: any) => (
                <div className='col-6 options-box px-5'>
                  <input
                    type='radio'
                    id={'option' + index}
                    value={ele.index}
                    checked={selectedValue === index}
                    onChange={() => setSelectedValue(index)}
                  />
                  <label className='text-white px-2' htmlFor={'option' + index}>
                    {ele.value}
                  </label>
                </div>
              ))}
              <button
                className='btn btn-primary start-btn col-1 text-center'
                onClick={(e) => submitAnswer(e)}
                ref={submitButton}
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <Spinner loading={!isStarted} />
        )}
      </div>
    </div>
  );
};

export default UserQuizPage;
