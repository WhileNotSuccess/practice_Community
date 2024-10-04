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
import SearchResult from "./components/SearchResult";
const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/find-password" Component={FindPassword} />
        <Route path="/list-in" Component={ListIn} />
        <Route path="/login" Component={Login} />
        <Route path="/post" Component={Post} />
        <Route path="/sign-in" Component={SignIn} />
        <Route path="/search-result" Component={SearchResult} />
      </Routes>
    </>
  );
};

export default App;
