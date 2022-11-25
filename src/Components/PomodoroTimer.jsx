import React from "react";
import "./Styles/PomodoroTimer.css";
import { useState, useRef, useEffect } from "react";

export default function PomodoroTimer({ focusDuration, breakDuration }) {

  const focusMinutes = Number(focusDuration);
  const breakMinutes = Number(breakDuration);

  const [seconds, setSeconds] = useState(0);
  const [pomodoroMode, setPomodoroMode] = useState("focus");
  const [timerOn, setTimerOn] = useState(false);
  const secondsRef = useRef(seconds);
  const intervalRef = useRef(null);


  let minutesLeft = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;

  if (minutesLeft < 10) minutesLeft = `0${minutesLeft}`;
  if (secondsLeft < 10) secondsLeft = `0${secondsLeft}`;

  const handleSecondsUpdate = () => {
    secondsRef.current--;
    setSeconds(secondsRef.current);
  };

  const handleStopInterval = () => {
    clearInterval(intervalRef.current);
    setTimerOn(false);
  };

  const handleStartInterval = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (secondsRef.current === 0) return clearInterval(intervalRef.current);
      handleSecondsUpdate();
    }, 1000);
    setTimerOn(true);
  };

  
  const switchPomodoroSession = (sessionName) => {

    setPomodoroMode(sessionName);

    let newTimeInSeconds = sessionName === "focus" ? focusMinutes * 60 : breakMinutes * 60;

    handleStopInterval();
    setTimerOn(false);
    setSeconds(newTimeInSeconds);
    secondsRef.current = newTimeInSeconds;

  }

  useEffect(() => {
    setSeconds(focusDuration * 60);
    secondsRef.current = focusDuration * 60;
  }, []);

  return (
    <div className="pomodoro-timer-div">

      <div className="pomodoro-mode-div">
        <button type="button" className="pomodoro-mode-button focus-mode-button" onClick={() => switchPomodoroSession("focus")}>Focus Mode</button>

        <button type="button" className="pomodoro-mode-button break-mode-button" onClick={() => switchPomodoroSession("break")}>Break Mode</button>
      </div>

      <h1 className={` timer-header ${pomodoroMode === "focus" ? "focus-timer-header" : "break-timer-header"}`}>{minutesLeft} : {secondsLeft}</h1>

      <div className="pomodoro-mode-div">

        {!timerOn && <button type="button" className="pomodoro-mode-button pomodoro-action-button" onClick={handleStartInterval}>Start</button>}

        {timerOn && <button type="button" className="pomodoro-mode-button pomodoro-action-button" onClick={handleStopInterval}>Stop</button>}

        <button type="button" className="pomodoro-mode-button pomodoro-action-button" onClick={() => {
          handleStopInterval();
          secondsRef.current = pomodoroMode === "focus" ? focusMinutes * 60 : breakMinutes * 60;
          setSeconds(secondsRef.current);
        }}>Reset</button>

      </div>

    </div>
  )
}
