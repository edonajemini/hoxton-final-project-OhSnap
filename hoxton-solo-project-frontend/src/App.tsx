import { SetStateAction, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import { SignInPage } from "./pages/SignInPage";
import { SelectRolePage } from "./pages/SelectRolePage";
import { Blogs } from "./types";
import * as API from "./api";
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

function App() {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [currentUser, setCurrentUser] = useState(null);

  function signIn(data: { user: any; token: string }) {
    setCurrentUser(data.user);
    localStorage.token = data.token;
  }

  function signOut() {
    setCurrentUser(null);
    localStorage.removeItem("token");
  }

  useEffect(() => {
    if (localStorage.token) {
      API.validate().then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          signIn(data);
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <Navbar currentUser={currentUser}
              signOut={signOut}
              blogs={blogs}
              setBlogs={setBlogs}/>
      <Routes>
        <Route index element={<Navigate to="/homepage" />} />
        <Route path="/homepage" element={<HomePage currentUser={currentUser}
              signOut={signOut}
              blogs={blogs}
              setBlogs={setBlogs}/>} />
        <Route path="/signin" element={<SignInPage signIn={signIn} />} />
        <Route path="/select-role" element={<SelectRolePage />} />
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
        <Route path="/post" element={<PostBlog blogs={blogs}
        setBlogs={setBlogs} signOut={signOut} currentUser={currentUser}   />} />
        <Route
          path="/sign-up"
          element={<CreateAccountPage signIn={signIn} />}
        />
        <Route
          path="/blog-detail/:id"
          element={
            <BlogDetails
              blogs={blogs}
              setBlogs={setBlogs}
            />
          }
        />

      </Routes>
    </div>
  );
}

export default App;
