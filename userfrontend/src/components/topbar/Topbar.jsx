import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./Topbar.css";
import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">USERS</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input type="text" className="searchInput" placeholder="探し物はなんですか？" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIconItems">
          <div className="topbarIconItem">
            <ChatIcon />
            <span className='topbarIconBadge'>1</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className='topbarIconBadge'>2</span>
          </div>
          <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
        </div>
      </div>

    </div>
  )
}
