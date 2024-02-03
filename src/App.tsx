import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import JoinPage from './components/JoinPage/JoinPage';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<JoinPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
