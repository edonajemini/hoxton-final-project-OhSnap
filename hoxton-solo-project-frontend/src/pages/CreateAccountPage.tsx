import { useNavigate } from "react-router-dom";
import "./CreateAccountPage.css";
import * as API from "../api";

type Props = {
  signIn: (data: { user: any; token: string }) => void;
};

export function CreateAccountPage({ signIn }: Props) {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target;
    const email = localStorage.newUserEmail;
    const name = form.fullName.value;
    const password = form.password.value;

    const newUser ={
      email: email,
      name: name,
      password: password
    }
    if (email && password && name) {
      fetch("http://localhost:4000/signup", {
      method: "post",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)      
    }).then((res)=>res.json())
      .then((data)=>{
        if(data.error){
          alert(data.error)
        }else{
          signIn(data)
        }
      })
    }
    navigate("/homepage");

    localStorage.removeItem("newUserEmail");
    localStorage.removeItem("role");
  }

  return (
    <div className="sign-up-page">
      <div className="sign-up-form-container">
        <h3>Create your account</h3>
        <h4>
          Signing up as <span> {localStorage.newUserEmail} </span>
          <a href="/signin"> (not you?)</a>
        </h4>

        <form
          className="sign-up-form-section"
          onSubmit={(event) => handleSubmit(event)}
        >
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            id="name"
            required
          />
          <label htmlFor="password">
            Password <span>*</span> <br />
            <p>Use at least 8 characters</p>
          </label>

          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            required
          />

          <p>
            By creating an account or logging in, you understand and agree to
            OhSnap's <a href="">Terms</a>. You also acknowledge our{" "}
            <a href="">Cookie</a> and <a href="">Privacy</a> policies.
          </p>

          <button className="sign-up-btn" type="submit">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
