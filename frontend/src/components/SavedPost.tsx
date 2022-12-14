import { SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";
import { Blogs, UserPremium } from "../types";
import { timeElapsed } from "../api";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
type Props ={
  currentUser: UserPremium;
  blog: Blogs,
  setBlogs: React.Dispatch<SetStateAction<Blogs[]>>
}
export function SavedPost({blog, setBlogs, currentUser, }:Props){
   
    return(
    <>
    <div className="blogs-feed">
              <>
              <Link to={`/blog-detail/${blog.id}`}>
              <div className="blogs">
                <h2>{blog.category}</h2>
                <h3><u>{blog.title}</u></h3>
                <img src={blog.image} width="200px" />
                <p>{blog.intro}</p>
                <p className="date-time">{timeElapsed(blog.createdAt)}</p>
                </div>
                </Link>
                <div className="blog-btns">
                <button onClick={() => {
              return fetch(`http://localhost:4000/blogs/${blog.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  saved: !blog.saved,
                }),
              }).then(() => {
                return fetch(`http://localhost:4000/blogs`)
                  .then((resp) => resp.json())
                  .then((blogsFromServer) => setBlogs(blogsFromServer));
              });
            }} className="save-btn">{blog.saved ? <BsSuitHeartFill/>:<BsSuitHeart/>}</button>
                 <button className="like-btn" onClick={() => {
              return fetch(`http://localhost:4000/blogs/liked/${blog.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  liked: !blog.liked,
                }),
              }).then(() => {
                return fetch(`http://localhost:4000/blogs`)
                  .then((resp) => resp.json())
                  .then((blogsFromServer) => setBlogs(blogsFromServer));
              });
            }}>
                {blog.liked ? "LIKED":"Like"}</button>
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
            </div>
    </>
    )
}