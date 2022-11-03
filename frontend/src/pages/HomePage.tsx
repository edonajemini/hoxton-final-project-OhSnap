import { SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import homepagequote from "../assets/homepagequote.png";
import { Navbar } from "../components/Navbar";
import { Post } from "../components/Post";
import { SearchBar } from "../components/SearchBar";
import { SecondNavbar } from "../components/SecondNavbar";
import { Blogs, UserPremium } from "../types";
import "./HomePage.css";
type Props = {
  currentUser: UserPremium;
  signOut: () => void;
  blogs: any;
  setBlogs: React.Dispatch<SetStateAction<Blogs[]>>;
};
export function HomePage({ blogs, setBlogs, currentUser, signOut }: Props) {
  return (
    <div className="HomePage">
        <Navbar currentUser={currentUser}
              signOut={signOut}/>
      <SecondNavbar/>
      <SearchBar setBlogs={setBlogs}/>
      <Post blogs={blogs} setBlogs={setBlogs} currentUser={currentUser} signOut={signOut } />
    </div>
  );
}
