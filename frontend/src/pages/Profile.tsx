import React, { SetStateAction } from "react";
import {  UserPremium } from "../types";

import { Blogs } from "../types";
type Props ={
  currentUser: any;
  signOut: () => void;
}

export function Profile({currentUser, signOut}:Props){
    const [user, setUser] = React.useState<UserPremium[]>([]);
    const [isEditingName, setIsEditingName] = React.useState(false);



    function handleUpdateNameSubmit(event) {
        event.preventDefault();
        fetch(`http://localhost:4000/change-profile-name/${currentUser.id}`, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: event.target.name.value,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            setUser(response);
            setIsEditingName(false);
          });
      }
    function updateNameForm() {
        return (
          <form onSubmit={handleUpdateNameSubmit}>
            <input name="name" required defaultValue={currentUser.name} />
    
            <input type="submit" value="Update" />
          </form>
        );
      }

    return(
        <div className="profile">
            <div className="profile-header">
            <img src="https://static.vecteezy.com/system/resources/previews/005/129/844/original/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" width="200px"/>
            <div className="email">
        <div id="description-overview">
                {isEditingName ? updateNameForm() : <h1>{currentUser.name}</h1>}
                <button
                  className="edit-name-btn"
                  onClick={() => setIsEditingName(true)}
                >
                  Change name
                </button>
              </div>
        <p>{currentUser.email}</p>
       
        <button className="signout-btn"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </button>
        </div>
        </div>
        </div>
    )
}