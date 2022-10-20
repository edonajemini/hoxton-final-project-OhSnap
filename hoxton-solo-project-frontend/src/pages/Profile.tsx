import { useReducer } from "react";
import { User } from "../types";

type Props = {
    currentUser: User;
  };
export function Profile({currentUser}:Props){

    return(
        <>
        <h1>{currentUser.name}</h1>
        </>
    )
}