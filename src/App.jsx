import { useEffect } from "react";
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import SignUp from './components/signup/SignUp';
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  const { chatId } = useChatStore();
  const user = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      // console.log(user); prints our user info fetched from firebase
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container"> {/*if it is not login page, use container class */}
      {
        currentUser ? (
        <Router>
          <Routes>
            <Route path="/" element={<> 
              <List/>
              {chatId && <Chat />} {/*If no chat id is pressed, don't show list and detail page */}
              {chatId && <Detail />}
            </>} /> {/*the list, chat and detail page is the home page */}
            <Route path="/signup" element={<SignUp />} /> {/*from the chat page, you can navigate to signup page */}
            <Route path="*" element={<Navigate to="/" />} /> {/*from the chat page, you navigate back to signup which serves as home */}
          </Routes>
        </Router>
        ) : (
          <Router>
      <Routes>
        <Route path="/" element={<SignUp/>} /> {/*the login or rather sign up page is the home page */}
        <Route path="/login" element={<Login />} /> {/*from the welcome page, you can navigate to login page */}
        <Route path="/list" element={<> 
          <List/>
          <Chat/>
          <Detail/>
        </>} /> {/*from the login page, you can navigate to chat and list and detail page */}
        <Route path="*" element={<Navigate to="/" />} /> {/*from the chat page, you navigate back to signup which serves as home */}
      </Routes>
    </Router>
        )
      }
      <Notification />
    </div>
  )
}

export default App