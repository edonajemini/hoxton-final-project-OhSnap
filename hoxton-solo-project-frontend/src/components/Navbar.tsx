import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
export function Navbar(){
    return(
    <div className="nav-bar">
        <img src={logo} width="250px" alt="indeed-logo" />
        <ul className="navbar-items">
        <li className="find-job-navbar-list-left">
          <NavLink to={"/homepage"}>Home</NavLink>
        </li>
        <li className="find-job-navbar-list-left-two">
          <NavLink to="/categories">Categories</NavLink>
        </li>
        <li className="find-job-navbar-list-left-two">
          <NavLink to="/post">Post</NavLink>
        </li>
        <li className="find-job-navbar-list-left-two">
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li className="find-job-navbar-list-left-two">
          <NavLink to="/saved">Saved</NavLink>
        </li>
        <li className="find-job-navbar-list-left-two">
          <NavLink to="/register">Register</NavLink>
        </li>
        </ul>
    </div>
    )
}