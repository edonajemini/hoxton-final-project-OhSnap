import { SetStateAction, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import * as API from "./api";

import "./App.css";
import { SignInPage } from "./pages/SignInPage";
import { Blogs, UserPremium } from "./types";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./components/Navbar";
import { BlogDetails } from "./pages/BlogDetails";
import { General } from "./pages/General";
import { Politics } from "./pages/Politics";
import { Socialmedia } from "./pages/Socialmedia";
import { Books } from "./pages/Books";
import { Movies } from "./pages/Movies";
import { Celebrity } from "./pages/Celebrity";
import { PostBlog } from "./pages/PostBlog";
import Saved from "./pages/Saved";
import { Profile } from "./pages/Profile";
import { Review} from "./pages/Review";
import { Footer } from "./components/Footer";

function App() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [currentUser, setCurrentUser] = useState<UserPremium|null>(null);

  function signIn(data: { userPremium: any; token: string }) {
    setCurrentUser(data.userPremium);
    localStorage.token = data.token;
    navigate("/homepage")
  }

  function signOut() {
    setCurrentUser(null);
    localStorage.removeItem("token");
    navigate("/homepage")
  }
  useEffect(() => {
    if (localStorage.token) {
      API.validate().then((data) => {
        if (data.error) {
          alert(data.error);
          localStorage.removeItem("token");
        } else {
          signIn(data);
        }
      });
    }
  }, []);


  return (
    <div className="App">
      <Navbar currentUser={currentUser} signOut={signOut } />
      <Routes>
        <Route index element={<Navigate to="/homepage" />} />
        <Route path="/homepage" element={<HomePage currentUser={currentUser}
              signOut={signOut}
              blogs={blogs}
              setBlogs={setBlogs}/>} />
        <Route path="/signin" element={<SignInPage signIn={signIn} currentUser={currentUser} />} />
        <Route path="/general" element={<General blogs={blogs}
              setBlogs={setBlogs}/>} />
        <Route path="/politics" element={<Politics blogs={blogs}
              setBlogs={setBlogs} />} />
        <Route path="/socialmedia" element={<Socialmedia blogs={blogs}
              setBlogs={setBlogs} />} />
        <Route path="/books" element={<Books blogs={blogs}
              setBlogs={setBlogs} />} />
        <Route path="/movies" element={<Movies blogs={blogs}
              setBlogs={setBlogs} />} />
        <Route path="/celebrity" element={<Celebrity blogs={blogs}
              setBlogs={setBlogs} />} />
        <Route path="/saved" element={<Saved blogs={blogs}
        setBlogs={setBlogs} currentUser={currentUser} signOut={signOut} />} />
        <Route path="/post" element={<PostBlog blogs={blogs}
        setBlogs={setBlogs} signOut={signOut} currentUser={currentUser}   />} />
         <Route path="/profile" element={<Profile currentUser={currentUser} signOut={signOut} />} />
        <Route
          path="/sign-up"
          element={<CreateAccountPage signIn={signIn} />}
        />
       <Route path="/review" element={<Review currentUser={currentUser} signOut={signOut} blogs={blogs} setBlogs={setBlogs}/>} />
        <Route
          path="/blog-detail/:id"
          element={
            <BlogDetails currentUser={currentUser} blogs={blogs} setBlogs={setBlogs } signOut={signOut} />}/>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
