import { Link } from "react-router-dom";
import "./SelectRolePage.css";
import welcome from "../assets/welcome.png";
import logo from "../assets/logo.png";

export function SelectRolePage() {
  return (
    <div className="role-page">
      <img src={logo} width="250px" alt="logo" />
      <div className="role-form-container">
        <div className="welcome-image">
          <img src={welcome} width="200px" alt="welcome-logo" />
        </div>
        <div className="roles-section">
          <h4>Ready for the next step?</h4>
          <h5>Create an account for tools to help you</h5>

          <Link to={"/sign-up"}>
            <button
              onClick={() => {
                localStorage.role = "USER";
              }}
            >
              Job Seeker
            </button>
          </Link>
          <Link to={"/sign-up"}>
            <button
              onClick={() => {
                localStorage.role = "EMPLOYER";
              }}
            >
              Employer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
