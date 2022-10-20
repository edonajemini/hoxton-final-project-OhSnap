import { Link } from "react-router-dom";
import "./SelectRolePage.css";
;

export function SelectRolePage() {
  return (
    <div className="role-page">
      <div className="role-form-container">
        <div className="welcome-image">
        </div>
        <div className="roles-section">
          <h5>Create an account</h5>

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
