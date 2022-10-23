import { useReducer } from "react";
import {  UserPremium } from "../types";

type Props = {
    currentUser: UserPremium;
  };
export function Profile({currentUser}:Props){

    return(
        <div className="profile">
            <div className="profile-header">
            <img src="https://static.vecteezy.com/system/resources/previews/005/129/844/original/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" width="200px"/>
            <div className="email">
        <h1>{currentUser.name}</h1>
        <p>{currentUser.email}</p>
        </div>
        </div>
        </div>
    )
}