import React from "react";
import Avatar from '@material-ui/core/Avatar';

function Header({ handleLogout, username, userPhoto }) {
  return (
    <nav>
      <div className="nav__container flex v-center">
        <div className="logo">
          <h1>Farewell Diary</h1>
        </div>
        <div className="nav__avatar flex v-center center">
        <Avatar alt={username} src={userPhoto} className="user__icon "/>
        
  <p>{username}</p>
          <button className="logout__btn" onClick={handleLogout} title="logout">
            logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
