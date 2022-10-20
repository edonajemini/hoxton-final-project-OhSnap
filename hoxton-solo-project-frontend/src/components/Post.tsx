import { SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";
import { timeElapsed } from "../api";
import { Blogs } from "../types";
type Props ={
  currentUser: any;
  signOut: () => void;
  blogs: any,
  setBlogs: React.Dispatch<SetStateAction<Blogs[]>>
}
export function Post({blogs, setBlogs, currentUser, }:Props){
    useEffect(() => {
        fetch("http://localhost:4000/blogs")
          .then((resp) => resp.json())
          .then((blogsFromServer) => setBlogs(blogsFromServer));
      }, []);
    return(
    <>
    <div className="blogs-feed">
      
          {blogs.reverse().map((blog:any) => (
              <>
              <Link to={`/blog-detail/${blog.id}`}>
              <div className="blogs">
                <h2>{blog.categories}</h2>
                <h3><u>{blog.title}</u></h3>
                <img src={blog.image} width="200px" />
                <p>{blog.intro}</p>
                <p className="date-time">{timeElapsed(blog.createdAt)}</p>
                </div>
                </Link>
                <div className="blog-btns">
                <button className="save-btn">Save</button>
                <button className="like-btn">Like</button>
                <button className="save-btn"
                onClick={() => {
                  fetch(`http://localhost:4000/blogs/${blog.id}`, {
                    method: "DELETE",
                  })
                    .then((resp) => resp.json())
                    .then(() => location.reload());
                }}
              >
                {" "}
                DELETE{" "}
              </button>
                </div>
              </>
            ))}
            </div>
    </>
    )
}