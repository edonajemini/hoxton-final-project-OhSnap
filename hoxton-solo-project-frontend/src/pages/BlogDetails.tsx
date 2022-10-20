import { SetStateAction, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Blogs, User } from "../types";
type Props = {
    blogs: any;
    setBlogs: React.Dispatch<SetStateAction<Blogs[]>>;
    currentUser: User;
    signOut: () => void;
  };
 
export function BlogDetails({blogs, setBlogs, currentUser, signOut}:Props){
  const [blog, setBlog] = useState<Blogs | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("http://localhost:4000/users")
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
          {users.filter(user => user.id === blog.userId).map(users => (
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
                <button className="save-btn">Save</button>
                <button className="like-btn">Like</button>
                </div>
            </div>
            </div>
          </div>
            </div>
    )
}