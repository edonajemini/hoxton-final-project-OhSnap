import { Link } from "react-router-dom";

export function SecondNavbar(){
    return(
        <>
        <ul className="categories">
        <li>Choose your favorite categories</li>
        <ul className="categories-items">
          <Link className="second-nav-link" to={"/general"}>General</Link>
          <Link className="second-nav-link" to={"/politics"}>Politics</Link>
          <Link className="second-nav-link" to={"/movies"}>Movies</Link>
          <Link className="second-nav-link" to={"/books"}>Books</Link>
          <Link className="second-nav-link" to={"/socialmedia"}>Social Media</Link>
          <Link className="second-nav-link" to={"/celebrity"}>Celebrity</Link>
        </ul>
      </ul>
        </>
    )
}