import NavBar from '../NavBar/NavBar';
import { WebSocketService } from '../../services/WebSocketService';
import './Dashboard.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Dashboard = () => {
  const webSocketService: WebSocketService = new WebSocketService();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({
    fullName: '',
  });
  const [showContent1, setShowContent1] = useState(true);
  const [roomId, setRoomId] = useState('');
  const [asUser, setAsUser] = useState(true);

  useEffect(() => {
    const stringifiedUser = localStorage.getItem('user');
    const currentUser = stringifiedUser ? JSON.parse(stringifiedUser) : '';
    setCurrentUser(currentUser);
  }, []);

  const createRoom = () => {
    if (roomId.length) {
      webSocketService.createRoom(roomId);
      webSocketService.addQuiz(roomId);
    }
    console.log(location.pathname);
    navigate('/dashboard/' + roomId);
  };

  const joinRoom = () => {
    if (roomId.length) {
      webSocketService.joinRoom(roomId);
    }
    navigate('/user-quiz/' + roomId);
  };

  const shiftContent = () => {
    setShowContent1(!showContent1);
  };

  return (
    <div className='dashboard-container position-relative overflow-hidden'>
      <NavBar />
      <div
        className='dashboard-content-1 position-absolute w-100 row m-0 flex-column justify-content-center'
        style={{
          zIndex: 100,
          transform: showContent1 ? 'translateX(0%)' : 'translateX(-100%)',
        }}
      >
        <div className='col-9'>
          <div className='dashboard-description-top'>
            <h1 className='dashboard-description-title text-start text-white'>
              Hi, {currentUser.fullName}
            </h1>
          </div>
          <div className='dashboard-description-bottom p-0 row m-0'>
            <div className='col-6 p-0'>
              <p className='text-start text-white p-0 text-uppercase py-auto my-auto'>
                Challenge your knowledge and have fun with Quiz Master, the
                ultimate destination for team quizzes!
              </p>
            </div>
            <button
              className='dashboard-buttons col-2'
              onClick={() => {
                shiftContent();
                setAsUser(true);
              }}
            >
              JOIN ROOM
            </button>
            <button
              className='dashboard-buttons col-2'
              onClick={() => {
                shiftContent();
                setAsUser(false);
              }}
            >
              CREATE ROOM
            </button>
          </div>
        </div>
      </div>
      <div
        className='dashboard-content-2 position-absolute w-100 row m-0 flex-column justify-content-center'
        style={{
          transform: showContent1 ? 'translateX(100%)' : 'translateX(0%)',
        }}
      >
        <div className='col-9'>
          <div className='dashboard-description-top flex-column row align-items-start border-0'>
            <p
              className='w-auto p-0 text-white back-btn'
              onClick={shiftContent}
            >
              <FontAwesomeIcon icon={faArrowLeft} size='xl' />
            </p>
            <div className='p-0'>
              <input
                className='roomid-input-box py-2 px-0 col-4 display-6'
                placeholder='Enter roomId'
                onChange={(e) => setRoomId(e.target.value)}
              />
              <button
                className='dashboard-buttons p-2 px-3 mx-5'
                onClick={() => {
                  asUser ? joinRoom() : createRoom();
                }}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
