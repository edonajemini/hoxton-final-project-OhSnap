import { useReducer } from "react";
import {  UserPremium } from "../types";

type Props = {
    currentUser: UserPremium;
  };
export function Profile({currentUser}:Props){

    return(
        <>
        <h1>{currentUser.name}</h1>
        </>
    )
}