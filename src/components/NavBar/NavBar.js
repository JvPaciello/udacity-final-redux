import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import './NavBar.css';

function NavBar() {
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setAuthedUser(null)); 
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/add">Create answer</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
      </ul>
      <div className="navbar-user">
        {authedUser ? (
          <>
            <span>Welcome {users[authedUser]?.name}!</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <span>Please login</span>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
