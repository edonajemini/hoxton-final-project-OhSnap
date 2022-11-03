import { SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";
import { timeElapsed } from "../api";
import { SecondNavbar } from "../components/SecondNavbar";
import { Blogs } from "../types";

type Props = {
    blogs: any;
    setBlogs: React.Dispatch<SetStateAction<Blogs[]>>;
  };
 
export function Socialmedia({blogs, setBlogs}:Props){
    useEffect(() => {
        fetch("http://localhost:4000/blogs/Socialmedia")
          .then((resp) => resp.json())
          .then((blogsFromServer) => setBlogs(blogsFromServer));
      }, []);
    return(
        <>
        <SecondNavbar/>
         <div className="blogs-feed">
          {blogs.map((blog:any) => (
              <>
              <Link to={`/blog-detail/${blog.id}`}>
              <div className="blogs">
                <h3><u>{blog.title}</u></h3>
                <img src={blog.image} width="200px" />
                <p>{blog.intro}</p>
                <p className="date-time">{timeElapsed(blog.createdAt)}</p>
                
                </div>
                </Link>
                <div className="blog-btns">
                <button className="save-btn">Save</button>
                <button className="like-btn">Like</button>
                </div>
              </>
            ))}
            </div>
        </>
    )
}