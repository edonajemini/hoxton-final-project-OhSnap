import { SetStateAction, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Blogs, User } from "../types";
type Props = {
    blogs: any;
    setBlogs: React.Dispatch<SetStateAction<Blogs[]>>;
  };
 
export function BlogDetails({blogs, setBlogs}:Props){
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
              <h3 className="username">{users.role}</h3>
              </div>
              </>
            ))}
            <div className="blogs-detail">
            <h3><u>{blog.title}</u></h3>
            <p>{blog.blog}</p>
            </div>
            </div>
          </div>
            </div>
    )
}