import { SetStateAction, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Blogs, Reviews, UserPremium } from "../types";
type Props = {
    blogs: any;
    setBlogs: React.Dispatch<SetStateAction<Blogs[]>>;
    currentUser: UserPremium;
    signOut: () => void;
  };
 
export function BlogDetails({blogs, setBlogs, currentUser, signOut}:Props){
  const [blog, setBlog] = useState<Blogs | null>(null);
  const [users, setUsers] = useState<UserPremium[]>([]);
  const [reviews, setReviews] = useState<Reviews[]>([])
  useEffect(() => {
    fetch("http://localhost:4000/premiumusers")
      .then((resp) => resp.json())
      .then((usersFromServer) => setUsers(usersFromServer));
  }, []);
  const params = useParams();

 useEffect(() => {
  fetch(`http://localhost:4000/blog-detail/${params.id}`)
    .then((resp) => resp.json())
    .then((blogFromServer) => setBlog(blogFromServer));
}, [blog]);

if (blog === null) return <h2>Loading... </h2>;
    return(
        <div className="blog-feed">
          <Navbar currentUser={currentUser}
              signOut={signOut}/>
          <ul>
          <Link className="jobfeed-btn" to={"/homepage"}><button>Job feed</button> </Link>
            <Link className="jobfeed-btn" to={"/recentsearchpage"}><button>Recent searches</button></Link>
          </ul>
          <div className="all-jobs">
          <div className="job-detail">
          {users.filter(userPremium => userPremium.id === blog.userPremiumId).map(users => (
              <>
              <div className="user-name">
              <h2>{users.name} </h2>
              <p>{users.email}</p>
              </div>
              </>
            ))}
            <div className="blogs-detail">
            <img src={blog.image} width="400px" />
            <h3><u>{blog.title}</u></h3>
            <p>{blog.blog}</p>
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
            }} className="save-btn">{blog.saved ? "SAVED":"Save"}</button>
                <button className="like-btn">Like</button>
                <Link to={"/review/"}>
                  <button
                    onClick={() => {
                      localStorage.blogId = blog.id;
                    }}
                    className="save-btn"
                  >
                    Write a review
                  </button>
                </Link>
                <h2>Reviews:</h2>
                <p>
              {blog.reviews.map((review: any) => (
                <div className="review-user">
                   {users.filter(userPremium => userPremium.id === review.userPremiumId).map(users => (
              <>
              <div className="user-name">
              <p>{users.name} </p>
              </div>
              </>
            ))}
                  <div className="reviews">
                    <h5>{review.content}</h5>
                    <button className="DELETE-btn"
                onClick={() => {
                  fetch(`http://localhost:4000/reviews/${review.id}`, {
                    method: "DELETE",
                  })
                    .then((resp) => resp.json())
                    .then(() => location.reload());
                }}
              >
                {" "}
                X{" "}
              </button>
                  </div>
                </div>
              ))}
            </p>
                </div>
            </div>
            </div>
          </div>
            </div>
    )
}