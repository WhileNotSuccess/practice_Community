import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import FindPassword from "./pages/FindPassword";
import ListIn from "./pages/ListIn";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Post from "./pages/Post";
import SignIn from "./pages/SignIn";
import Nav from "./components/Nav";
import SearchResult from "./pages/SearchResult";
import UserTest from "./pages/UserTest";
import ImageTest from "./pages/ImageTest";
import ParserTest from "./pages/ParserTest";
import PostUpdate from "./pages/PostUpdate";
import EmailVerify from "./pages/EmailVerify";
import PasswordReset from "./pages/PasswordReset";
import ForgotPassword from "./pages/ForgotPassword";
import UserPage from "./pages/UserPage";
const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/find-password" Component={FindPassword} />
        <Route path="/list-in/:id" Component={ListIn} />
        <Route path="/login" Component={Login} />
        <Route path="/post" Component={Post} />
        <Route path="/sign-in" Component={SignIn} />
        <Route path="/search-result" Component={SearchResult} />
        <Route path="/user-test" Component={UserTest} />
        <Route path="/image-test" Component={ImageTest} />
        <Route path="/parser-test" Component={ParserTest} />
        <Route path="/post-update/:id" Component={PostUpdate} />
        <Route path="/verify-email" Component={EmailVerify} />
        <Route path="/password-reset/:token" Component={PasswordReset} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="/user-page" Component={UserPage} />
      </Routes>
    </>
  );
};

export default App;
