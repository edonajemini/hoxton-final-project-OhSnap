import { SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import homepagequote from "../assets/homepagequote.png";
import { Navbar } from "../components/Navbar";
import { Post } from "../components/Post";
import { SearchBar } from "../components/SearchBar";
import { Blogs } from "../types";
import "./HomePage.css";
type Props = {
  currentUser: any;
  signOut: () => void;
  blogs: any;
  setBlogs: React.Dispatch<SetStateAction<Blogs[]>>;
};
export function HomePage({ blogs, setBlogs, currentUser, signOut }: Props) {
  return (
    <div className="HomePage">
        <Navbar currentUser={currentUser}
              signOut={signOut}/>
      <ul className="categories">
        <li>Choose your favorite categories</li>
        <ul className="categories-items">
          <Link to={"/general"}>General</Link>
          <Link to={"/politics"}>Politics</Link>
          <Link to={"/movies"}>Movies</Link>
          <Link to={"/books"}>Books</Link>
          <Link to={"/socialmedia"}>Social Media</Link>
          <Link to={"/celebrity"}>Celebrity</Link>
        </ul>
      </ul>
      <SearchBar setBlogs={setBlogs}/>
      <Post blogs={blogs} setBlogs={setBlogs} currentUser={currentUser} signOut={signOut } />
    </div>
  );
}
