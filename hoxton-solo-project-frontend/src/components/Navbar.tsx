import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { SetStateAction } from "react";
import { Blogs } from "../types";
import { BsBellFill, BsPersonFill } from "react-icons/bs";
type Props = {
  currentUser: any;
  signOut: () => void;
};
export function Navbar({ currentUser, signOut }: Props){
    return(
    <div className="nav-bar">
        <img src={logo} width="250px" alt="indeed-logo" />
        <ul className="navbar-items">
        <li className="find-job-navbar-list-left">
          <NavLink to={"/homepage"}>Home</NavLink>
        </li>
        {currentUser === null ? (
          <>
            <li className="find-job-navbar-list-right">
              <NavLink to="/signin">Sign In</NavLink>
            </li>
          </>
        ) : (
          <div className="signed-in">
             <li className="find-job-navbar-list-left-two">
          <NavLink to="/post">Post</NavLink>
        </li>
        <li className="find-job-navbar-list-left-two">
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li className="find-job-navbar-list-left-two">
          <NavLink to="/saved">Saved</NavLink>
        </li>
            <li className="find-job-navbar-signedin">
              <BsBellFill />
            </li>
            <li className="find-job-navbar-signedin-two">
              <BsPersonFill />
            </li>
            <li className="find-job-navbar-signedin-three">
              {currentUser.name}
            </li>
            <button
              onClick={() => {
                signOut();
                localStorage.removeItem("token");
              }}
            >
              Sign out
            </button>
          </div>
        )}
        </ul>
    </div>
    )
}