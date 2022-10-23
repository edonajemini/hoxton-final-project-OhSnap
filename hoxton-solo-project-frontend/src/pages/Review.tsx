import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Blogs } from "../types";



type Reviews = {
  id: number;
  companyId: number;
  userId: number;
  rating: number;
  content: string;
};

type Props = {
  currentUser: any;
  signOut: () => void;
};

export function Review({ currentUser, signOut }: Props) {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  useEffect(() => {
    fetch(`http://localhost:4000/blogs`)
      .then((resp) => resp.json())
      .then((blogsFromServer) => setBlogs(blogsFromServer));
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} signOut={signOut} />
      <h1 className="review-h1">Write a review.</h1>
      <form
        className="post-review"
        onSubmit={(event) => {
          event.preventDefault();
          let newReview = {
            content: event.target.content.value,
            blogId: Number(localStorage.companyId),
            userPremiumId: currentUser.id,
          };

          fetch("http://localhost:4000/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
          });
          navigate(`/homepage/${localStorage.blogId}`);
          localStorage.removeItem("blogId");
        }}
      >
        <div className="review-btn ">
        <textarea
          name="content"
          id="text"
          rows={5}
          placeholder="Your Review?"
          required
        ></textarea>
        <button className="save-btn">POST</button>
        </div>
      </form>
    </>
  );
}
