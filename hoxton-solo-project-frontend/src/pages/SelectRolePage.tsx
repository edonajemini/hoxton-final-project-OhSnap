import { Link } from "react-router-dom";
import "./SelectRolePage.css";
;

export function SelectRolePage() {
  return (
    <div className="role-page">
      {/* <img src={logo} width="250px" alt="logo" /> */}
      <div className="role-form-container">
        <div className="welcome-image">
          {/* <img src={welcome} width="200px" alt="welcome-logo" /> */}
        </div>
        <div className="roles-section">
          <h5>Create an account for tools to help you</h5>

          <Link to={"/sign-up"}>
            <button
              onClick={() => {
                localStorage.role = "USER";
              }}
            >
              User
            </button>
          </Link>
          <Link to={"/sign-up"}>
            <button
              onClick={() => {
                localStorage.role = "USERPREMIUM";
              }}
            >
              USER PREMIUM
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
