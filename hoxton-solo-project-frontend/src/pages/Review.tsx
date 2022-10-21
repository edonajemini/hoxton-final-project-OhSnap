import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar"; 
import { User } from "../types";



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

export function Reviews({ currentUser, signOut }: Props) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User|null>(null);
  useEffect(() => {
    fetch(`http://localhost:4000/blogs`)
      .then((resp) => resp.json())
      .then((blogsFromServer) => setUser(blogsFromServer));
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} signOut={signOut} />
      <h1 className="review-h1">Share your experience, write a review.</h1>
      <form
        className="post-review"
        onSubmit={(event) => {
          event.preventDefault();
          let newReview = {
            content: event.target.content.value,
            rating: Number(event.target.rating.value),
            blogId: Number(localStorage.blogId),
            userId: currentUser.id,
          };

          fetch("http://localhost:3005/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
          });
          navigate(`/company/${localStorage.companyId}`);
          localStorage.removeItem("companyId");
        }}
      >
        <input
          type="textArea"
          name="content"
          id="text"
          placeholder="Your Review?"
          required
        ></input>

        <input
          type="number"
          name="rating"
          id="rating"
          placeholder="Rating?"
        ></input>
        <button className="review-btn">POST</button>
      </form>
    </>
  );
}
