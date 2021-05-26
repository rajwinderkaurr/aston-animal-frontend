// import React, { createContext } from 'react'
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import "./header.css";
import axios from "../../axios";
import { GlobalState } from "../../GlobalState";

export default function Header() {
  const state = useContext(GlobalState);
  const [isLoggedIn] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [userDetails] = state.userAPI.userDetails;
  const adminRouter = () => {
    return (
      <>
        <Link to="/add_animal">Add Animal</Link>
      </>
    );
  };

  const logoutUser = async () => {
    await axios.get("/users/logout");

    localStorage.removeItem("previousLogin");

    window.location.href = "/";
  };

  const loggedInRouter = () => {
    return (
      <>
        <Link to="/user">
          {userDetails.name ? userDetails.name.split(" ")[0] : ""}
        </Link>
        <Link to="/" onClick={logoutUser}>
          Log Out
        </Link>
      </>
    );
  };

  const commonRouter = () => {
    return (
      <>
        <Link to="/">Explore</Link>
        <Link to="/adoptions">Adoptions</Link>
      </>
    );
  };

  return (
    <header>
      <Link to="/" className="logo-wrapper">
        <Logo style={{ marginTop: "-1ow 0px" }} />
        {isAdmin && <span className="subtext">Admin</span>}
      </Link>
      <nav className="right">
        {isAdmin && adminRouter()}
        {commonRouter()}
        {isLoggedIn ? (
          loggedInRouter()
        ) : (
          <Link to="/login">Login | Register</Link>
        )}
      </nav>
    </header>
  );
}
