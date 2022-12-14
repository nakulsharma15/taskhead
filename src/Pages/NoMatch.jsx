import React from "react";
import "./Styles/NoMatch.css";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

//function for 404 page
export default function NoMatch() {
    return (
        <div>
            <Header />

            <div className="page-content">

                <div className="no-match-content">

                    <h1>404</h1>
                    <p>The page you&apos;re looking for does not exist</p>
                    <Link to="/">Go to Home</Link>

                </div>

            </div>

        </div>
    )
}
