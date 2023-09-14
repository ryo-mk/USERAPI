import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';
import "./Sidebar.css";
import { Users } from "../../dummyData";
import CloseFriend from '../closeFriend/CloseFriend';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <HomeIcon className="sidebarIcon" />
            <span className='sidebarListItemText'>ホーム</span>
          </li>
          <li className='sidebarListItem'>
            <SearchIcon className="sidebarIcon" />
            <span className='sidebarListItemText'>検索</span>
          </li>
          <li className='sidebarListItem'>
            <NotificationsIcon className="sidebarIcon" />
            <span className='sidebarListItemText'>通知</span>
          </li>
          <li className='sidebarListItem'>
            <MessageIcon className="sidebarIcon" />
            <span className='sidebarListItemText'>メッセージ</span>
          </li>
          <li className='sidebarListItem'>
            <BookmarkIcon className="sidebarIcon" />
            <span className='sidebarListItemText'>ブックマーク</span>
          </li>
          <li className='sidebarListItem'>
            <PersonIcon className="sidebarIcon" />
            <span className='sidebarListItemText'>プロフィール</span>
          </li>
          <li className='sidebarListItem'>
            <SettingsIcon className="sidebarIcon" />
            <span className='sidebarListItemText'>設定</span>
          </li>
        </ul>
        <hr className='sidebarHr' />
        <ul className='sidebarFriendList'>
          {Users.map((user) => (
            <CloseFriend user={user} key={user.id} />
          ))}
        </ul>
      </div>
    </div>
  )
}
