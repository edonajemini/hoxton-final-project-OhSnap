import { SetStateAction, useEffect, useState } from "react";
import { Blogs } from "../types";
type Props = {
  setBlogs: React.Dispatch<SetStateAction<Blogs[]>>;
};
export function SearchBar({setBlogs}:Props) {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      const form = event.currentTarget;
      const blogTitle = form.search.value;
  
      if (blogTitle) {
        fetch(`http://localhost:4000/blogs/blog/${blogTitle}`)
          .then((resp) => resp.json())
          .then((blogsFromServer) => setBlogs(blogsFromServer));
      } else {
        fetch("http://localhost:4000/blogs")
          .then((resp) => resp.json())
          .then((blogsFromServer) => setBlogs(blogsFromServer));
      }
    }
    
  return (
    <div className="blog-search">
      <form
        className="blog-search-form"
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          className="blog-search-input"
          name="search"
          type="text"
          placeholder="What?"
        ></input>
        <button className="blog-search-btn">Search</button>
      </form>
    </div>
  );
}
  