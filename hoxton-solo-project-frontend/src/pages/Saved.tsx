import { SetStateAction } from "react";
import { Post } from "../components/Post";
import { Blogs } from "../types";

type Props = {
    currentUser: any;
    signOut: () => void;
    blogs: any;
    setBlogs: React.Dispatch<SetStateAction<Blogs[]>>;
  };

export default function Saved( { blogs, setBlogs, currentUser, signOut }: Props) {
    return (
      <main className='main'>
          <div className='my-blogs'>
              <h1 className='my-blog-h1'>My Posts</h1>
              {/* {posts.reverse().filter(post => post.userId === currentUser.id).map((post) => (
                <ItemRow currentUser={currentUser} post={post} setPosts={setPosts}/>
            ))} */}
            {/* {blogs.filter(blog => blog.userId === currentUser.id).map((blog)=>(
                <Post currentUser={currentUser} blogs={blogs} setBlogs={setBlogs} signOut={signOut}/>
            
            ))} */}
          </div>
      </main>
    )
  }