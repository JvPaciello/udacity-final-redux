import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import './NavBar.css';

function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [startX, setStartX] = useState(null);
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAuthedUser(null));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Detect click outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest('.sidebar') &&
        !event.target.closest('.navbar-toggler')
      ) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Detect swipe to close sidebar
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX && e.touches[0].clientX < startX - 50) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Top bar for desktop */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-none d-lg-flex">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">Create answer</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            </li>
          </ul>
          <div className="navbar-user">
            {authedUser ? (
              <>
                <span className="me-3">Welcome {users[authedUser]?.name}!</span>
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <span>Please login</span>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar for mobile */}
      <nav className="navbar navbar-dark bg-dark d-lg-none">
        <button
          className="btn btn-dark navbar-toggler"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </nav>

      <div
        className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <ul>
          <li>
            <Link to="/dashboard" onClick={closeSidebar}>Dashboard</Link>
          </li>
          <li>
            <Link to="/add" onClick={closeSidebar}>Create answer</Link>
          </li>
          <li>
            <Link to="/leaderboard" onClick={closeSidebar}>Leaderboard</Link>
          </li>
        </ul>
        <div className="navbar-user">
          {authedUser ? (
            <>
              <span>Welcome {users[authedUser]?.name}!</span>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <span>Please login</span>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;