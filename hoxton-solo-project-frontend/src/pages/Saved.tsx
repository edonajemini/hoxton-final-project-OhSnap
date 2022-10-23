import React, { SetStateAction, useEffect, useState } from 'react'
import { signup } from '../api'
import { Navbar } from '../components/Navbar'
import { Post } from '../components/Post'
import { SavedPost } from '../components/SavedPost'
import { Blogs, UserPremium } from '../types'

type Props = {
  currentUser: UserPremium;
  signOut: () => void;
  blogs: any;
  setBlogs: React.Dispatch<SetStateAction<Blogs[]>>;
};

export default function Saved( { blogs, setBlogs, currentUser,signOut }: Props) {
  const [savedBlogs, setsavedBlogs] = useState<Blogs[]>([]);

    useEffect(() => {
        fetch(`http://localhost:4000/savedBlogs`)
        .then(r => r.json())
        .then(savedBlogsFromServer => setsavedBlogs(savedBlogsFromServer) )
    }, [])


  return (
    <main className='main'>
        <div className='saved-posts'>
            <h1 className='saved-posts-h1'>Saved Posts</h1>
            {savedBlogs.reverse().filter(blog => blog.saved === true).map((blog) => (
                <SavedPost currentUser={currentUser} blog={blog} setBlogs={setBlogs}/>
            ))}
        </div>
    </main>
  )
}