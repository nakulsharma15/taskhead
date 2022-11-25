import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import PomodoroPage from "../Pages/PomodoroPage";
import NoMatch from "../Pages/NoMatch";

//function that provides routing in the app
export default function RoutePaths () {

    return(
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    )
}