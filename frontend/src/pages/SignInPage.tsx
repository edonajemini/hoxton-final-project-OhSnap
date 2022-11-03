import { json, Navigate, useNavigate } from "react-router-dom";
import * as API from "../api";
import "./SignInPage.css";

type Props = {
  signIn: (data: { user: any; token: string }) => void;
  currentUser: any;
};

export function SignInPage({ signIn , currentUser}: Props) {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    if (email && password) {
      API.login({ email, password }).then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          //sign them in
          signIn(data);
        }
      });
      if (currentUser.role.toLowerCase() === "admin") {
        navigate("/profile");
      } else {
        navigate("/logedin");
      }
    }
  }

  return (
    <div className="sign-in-page">
      <div className="form-container">
        <h4>Create an account or sign in.</h4>
        <p>
          By creating an account or logging in, you understand and agree to
          OhSnap's <a href="">Terms</a>. You also acknowledge our{" "}
          <a href="">Cookies</a> and <a href="">Privacy</a> policies.
        </p>
        <form
          className="form-section"
          onSubmit={(event) => handleSubmit(event)}
        >
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button className="sign-in-btn" type="submit">
            Sign In
          </button>
        </form>

        <div className="or-div">
          <hr />
          OR
          <hr />
        </div>
        <div>
          <form
            className="create-account-section"
            onSubmit={(event) => {
              event.preventDefault();
              localStorage.newUserEmail = event.currentTarget.email.value;
              navigate("/sign-up");
            }}
          >
            <label htmlFor="email">
              Email address <span>*</span>
            </label>
            <input id="email" type="email" name="email" required />
            <button className="signup-btn" type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
