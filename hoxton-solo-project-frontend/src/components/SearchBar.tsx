import { useEffect } from "react";

export function SearchBar(){
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const blogTitle = form.blogtitle.value;
        if(blogTitle){
          fetch(`http://localhost:4000/blogs/${blogTitle}`)
          .then((resp) => resp.json())
          .then((blogsFromServer) => setBlogs(blogsFromServer));
        } else {
          //fetch all jobs
          useEffect(() => {
            fetch("http://localhost:4000/blogs")
              .then((resp) => resp.json())
              .then((blogsFromServer) => setBlogs(blogsFromServer));
          }, []);
        }
      }
    <>

    </>
}