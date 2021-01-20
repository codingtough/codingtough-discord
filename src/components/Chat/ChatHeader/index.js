import React from 'react';
import './ChatHeader.css';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationRoundedIcon from '@material-ui/icons/EditLocationRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';

function ChatHeader({channelName}) {
   return (
      <div className="chatHeader">
         <div className="chatHeader__left">
            <h3>
               <span className="chatHeader__hash">#</span>
               {channelName}
            </h3>
         </div>
         <div className="chatHeader__right">
            <NotificationsIcon fontSize="large" />
            <EditLocationRoundedIcon fontSize="large" />
            <PeopleAltRoundedIcon fontSize="large" />
            <div className="chatHeader__search">
               <input placeholder="Search" />
               <SearchRoundedIcon fontSize="large" />
            </div>
            <SendRoundedIcon fontSize="large" />
            <HelpRoundedIcon fontSize="large" />
         </div>
      </div>
   )
}

export default ChatHeader;
