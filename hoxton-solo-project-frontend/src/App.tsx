import { SetStateAction, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import { SignInPage } from "./pages/SignInPage";
import { SelectRolePage } from "./pages/SelectRolePage";
import { Jobs } from "./types";
import * as API from "./api";
import { CreateAccountPage } from "./pages/CreateAccountPage";

function App() {
  const [jobs, setJobs] = useState<Jobs[]>([]);
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
      <Routes>
        <Route index element={<Navigate to="/homepage" />} />
        <Route path="/signin" element={<SignInPage signIn={signIn} />} />
        <Route path="/select-role" element={<SelectRolePage />} />
        <Route
          path="/sign-up"
          element={<CreateAccountPage signIn={signIn} />}
        />

      </Routes>
    </div>
  );
}

export default App;
