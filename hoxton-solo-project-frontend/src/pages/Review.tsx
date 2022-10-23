import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar"; 
import { Blogs, UserPremium } from "../types";

type Reviews = {
  id: number;
  companyId: number;
  userId: number;
  rating: number;
  content: string;
};

type Props ={
  currentUser: UserPremium;
  signOut: () => void;
  blogs: any,
  setBlogs: React.Dispatch<SetStateAction<Blogs[]>>
}

export function Review({ currentUser, signOut, blogs, setBlogs}: Props) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserPremium|null>(null);
  useEffect(() => {
    fetch(`http://localhost:4000/blogs`)
      .then((resp) => resp.json())
      .then((blogsFromServer) => setUser(blogsFromServer));
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
            blogId: Number(localStorage.blogId),
            userPremiumId: currentUser.id,
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
          navigate(`/homepage`);
        }}
      >
        <div className="review-btn">
        <textarea
          name="content"
          id="text"
          placeholder="Your Review?"
          rows={5}
          required
        ></textarea>
        <button type="submit" className="save-btn">POST</button>
        </div>
      </form>
    </>
   
  );
}
