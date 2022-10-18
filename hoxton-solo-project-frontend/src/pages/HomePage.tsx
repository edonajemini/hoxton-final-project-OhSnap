import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import homepagequote from "../assets/homepagequote.png";
import { Post } from "../components/Post";
import { Blogs } from "../types";
import "./HomePage.css";
type Props = {
    currentUser: any;
    signOut: () => void;
    blogs: any;
    setBlogs: React.Dispatch<SetStateAction<Blogs[]>>;
  };
export function HomePage({ blogs, setBlogs, currentUser, signOut }: Props){
    return(
        <div className="HomePage">
        <img className="homepagequote" src={homepagequote} width="800px" alt="indeed-logo" />
        <Post blogs={blogs} setBlogs={setBlogs}/>
        </div>
    )
}