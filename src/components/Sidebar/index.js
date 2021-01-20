import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import SidebarChannel from './SidebarChannel';
import { Avatar } from '@material-ui/core';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import db, { auth } from '../Firebase';

function Sidebar() {
   const user = useSelector(selectUser);
   const [channels, setChannels] = useState([]);

   useEffect(() => {
      db.collection("channels")
         .onSnapshot(snapshot => {
            setChannels(snapshot.docs.map(doc => ({
               id: doc.id,
               channel: doc.data()
            })))
         })
   }, []);

   const handleAddChannel = () => {
      const channelName = prompt("Enter a new channel name");

      if(channelName){
         db.collection("channels")
            .add({
               channelName: channelName
            });
      }
   }

   return (
      <div className="sidebar">
         <div className="sidebar__top">
            <h3>{user.displayName}</h3>
            <ExpandMoreIcon fontSize="large" />
         </div>
         <div className="sidebar__channels">
            <div className="sidebar__channelsHeader">
               <div className="sidebar__header">
                  <ExpandMoreIcon fontSize="inherit" />
                  <h4>Text Channels</h4>
               </div>
               <AddIcon 
                  onClick={handleAddChannel}
                  fontSize="inherit"
                  className="sidebar__addChannel"
               />
            </div>
            <div className="sidebar__headerList">
               {channels.map(({id, channel}) => (
                  <SidebarChannel key={id} id={id} channelName={channel.channelName} />
               ))}
            </div>
         </div>
         <div className="sidebar__voice">
            <SignalCellularAltIcon 
               className="sidebar__voiceIcon"
               fontSize="large"
            />
            <div className="sidebar__voiceInfo">
               <h3>Voice Connected</h3>
               <p>Stream</p>
            </div>
            <div className="sidebar__voiceIcons">
               <InfoOutlinedIcon fontSize="inherit" />
               <CallIcon fontSize="inherit" />
            </div>
         </div>
         <div className="sidebar__profile">
            <div className="tooltip">
               <span className="tooltiptext">Se déconnecter</span>
               <Avatar 
                  onClick={() => auth.signOut()}
                  className="profileAvatar tooltip"
                  src={user.photo}
               />
            </div>
            <div className="sidebar__profileInfo">
               <h3>{user.displayName}</h3>
               <p>#{user.uid.substring(0, 5)}...</p>
            </div>
            <div className="sidebar__profileIcons">
               <MicIcon fontSize="inherit" />
               <HeadsetIcon fontSize="inherit" />
               <SettingsIcon fontSize="inherit" />
            </div>
         </div>
      </div>
   )
}

export default Sidebar
