import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import homepagequote from "../assets/homepagequote.png";
import "./HomePage.css";
export function HomePage(){
    return(
        <div className="HomePage">
        <img className="homepagequote" src={homepagequote} width="800px" alt="indeed-logo" />
        </div>
    )
}