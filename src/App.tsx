import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import JoinPage from './components/JoinPage/JoinPage';
import Dashboard from './components/Dashboard/Dashboard';
import { useEffect } from 'react';
import { WebSocketService } from './services/WebSocketService';
import QuestionPage from './components/QuestionPage/QuestionPage';
import AdminQuizPage from './components/AdminQuizPage/AdminQuizPage';
import UserQuizPage from './components/UserQuizPage/UserQuizPage';
import FinalLeaderboard from './components/FinalLeaderboard/FinalLeaderboard';
import { ProtectedRoute } from './GuardedRoute';

export let socket: any;

function App() {
  let webSocketService = new WebSocketService();
  useEffect(() => {
    webSocketService.connect();
    return () => {
      webSocketService.disconnect();
    };
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<JoinPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard/:roomid' element={<QuestionPage />} />
            <Route path='/admin-quiz/:roomid' element={<AdminQuizPage />} />
            <Route path='/user-quiz/:roomid' element={<UserQuizPage />} />
          </Route>
          <Route path='/final-leaderboard' element={<FinalLeaderboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
