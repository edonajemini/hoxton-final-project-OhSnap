import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Blogs, UserPremium } from "../types";

type Props = {
  currentUser: UserPremium;
  signOut: () => void;
  blogs: any;
  setBlogs: React.Dispatch<SetStateAction<Blogs[]>>;
};

export function Review({ currentUser, signOut, blogs, setBlogs }: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:4000/blogs`)
      .then((resp) => resp.json())
      .then((blogsFromServer) => setBlogs(blogsFromServer));
  }, []);

  return (
      <div className="review-content">
      <h1>Write a review!</h1>
      <form
        className="post-review"
        onSubmit={(event) => {
          event.preventDefault();
          let newReview = {
            content: event.target.content.value,
            blogId: Number(localStorage.blogId),
            userPremiumId: currentUser.id,
          };

          fetch("http://localhost:4000/review", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
          });
          navigate(`/homepage`);
          localStorage.removeItem("blogId");
        }}
      >
        <div className="review">
        <textarea
          name="content"
          id="text"
          placeholder="Your Review?"
          required
          rows={5}
        ></textarea>
        <button className="save-btn">POST</button>
        </div>
      </form>
      
      </div>
    
  );
}
