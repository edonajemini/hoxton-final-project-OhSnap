import { SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Blogs, UserPremium } from "../types";

type Props = {
    currentUser: UserPremium;
    signOut: () => void;
    blogs: any;
    setBlogs: React.Dispatch<SetStateAction<Blogs[]>>;
  };

export function PostBlog({ blogs, setBlogs, currentUser, signOut }: Props) {
  useEffect(() => {
    fetch(`http://localhost:4000/blogs`)
      .then((resp) => resp.json())
      .then((blogsFromServer) => setBlogs(blogsFromServer));
  }, []);
  const navigate = useNavigate();
  return (
    <div className="blog-posting">
      <h1 className="post-h1">POST UR BLOG HERE!</h1>
      <form
        className="post-blog"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          let userPremiumId: number;
          const Username = form.userName.value;
          fetch(`http://localhost:4000/userpremium/userpremium/${Username}`)
            .then((resp) => resp.json())
            .then((userPremium) => {
              userPremiumId = Number(userPremium[0].id);
            });

          setTimeout(() => {
            let newBlog = {
              //@ts-ignore
              title: event.target.title.value,
              intro: form.intro.value,
              blog: form.blog.value,
              image: form.image.value,
              video:form.video.value,
              category:form.category.value,
              userPremiumId: userPremiumId,
            };

            fetch("http://localhost:4000/blogs", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newBlog),
            })
            .then(() => {
              fetch("http://localhost:4000/blogs")
                .then((resp) => resp.json())
                .then((blogsFromServer) => setBlogs(blogsFromServer));
                navigate("/homepage");
            })
        }, 500);
        }}
      >
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title?"
          required
        ></input>
        <input
          type="text"
          name="intro"
          id="intro"
          placeholder="What is the Intro?"
          required
        ></input>
        <textarea
          name="blog"
          id="blog"
          placeholder="Write the BLOG here..."
          rows={7}
          required
        ></textarea>
        <span>
          <input
            type="url"
            name="image"
            id="image"
            placeholder="Image URL"
          ></input>
          <input
            type="url"
            name="video"
            id="video"
            placeholder="Video URL"
          ></input>
        </span>
        <input
          type="category"
          name="category"
          id="category"
          placeholder="Category?"
          required
        ></input>
         <input
          type="text"
          name="userName"
          id="userName"
          placeholder="Your name?"
        ></input>
        <button className="review-btn">POST</button>
      </form>
    </div>
  );
}
