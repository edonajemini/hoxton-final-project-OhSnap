import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { SetStateAction } from "react";
import { Blogs, User } from "../types";
import { BsBellFill, BsPersonFill } from "react-icons/bs";
import { BlogDetails } from "../pages/BlogDetails";
type Props = {
  currentUser: User;
  signOut: () => void;
};
export function Navbar({ currentUser, signOut }: Props) {
  return (
    <div className="nav-bar">
      <img src={logo} width="250px" alt="indeed-logo" />
      <ul className="navbar-items">
        <li className="find-job-navbar-list-left">
          <NavLink to={"/homepage"}>Home</NavLink>
        </li>
        {currentUser === null?(
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

            <li className="find-job-navbar-signedin-three">
            </li>
            <button className="signout-btn"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </button>
          </div>
        )}
      </ul>
    </div>
  );
}
