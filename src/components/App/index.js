import React, { Fragment, useEffect } from 'react';
import './App.css';
import Sidebar from '../Sidebar';
import Chat from '../Chat';
import Login from '../Login';
import { login, logout, selectUser } from '../../features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../Firebase';

function App() {
   const user = useSelector(selectUser);
   const dispatch = useDispatch();

   useEffect(() => {
      auth.onAuthStateChanged(authUser => {
         if(authUser){
            // User logged in
            dispatch(login({
               uid: authUser.uid,
               photo: authUser.photoURL,
               email: authUser.email,
               displayName: authUser.displayName
            }));
         } else {
            // User logged out
             dispatch(logout());
         }
      });
   }, [dispatch]);

   return (
      <div className="app">
         {user ? (
            <>
               <Sidebar />
               <Chat />
            </>
         ) : (
            <Login />
         )}
      </div>
   );
}

export default App;
