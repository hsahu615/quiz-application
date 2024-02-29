import AuthenticationService from '../../services/AuthenticationService';
import './NavBar.css';

const NavBar = () => {
  const authenticationService = new AuthenticationService();
  return (
    <div className='navbar-container w-100 row m-0 justify-content-between align-items-center px-3'>
      <h6 className='text-start logo-title col-2'>
        <span className='title-light px-2 py-1'>QUIZ</span> MASTER
      </h6>
      <button
        className='btn btn-primary col-1 log-out-btn'
        onClick={authenticationService.logOut}
      >
        Log Out
      </button>
    </div>
  );
};

export default NavBar;
