import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Header.css";


//function to provide header
export default function Header() {

    const navigate = useNavigate();

    //function that redirects to homepage
    const redirectToHome = () => {
        navigate("/")
    }

    return <div className="header flex-space-between">

        <div className="header-logo flex-align-center" onClick={redirectToHome} role="button">

            <div className="header-logo-img">
                <img src="https://res.cloudinary.com/nakulsharma15/image/upload/v1667582669/Assets/Screenshot__350_-removebg-preview-removebg-preview_1_1_dxnrge.png" alt="th-logo" />
            </div>

            <h1>TaskHead</h1>
        </div>

        <a href="https://github.com/nakulsharma15/taskhead" className="header-link">GitHub</a>

    </div>

}