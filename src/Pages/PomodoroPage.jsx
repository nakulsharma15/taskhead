import React from "react";
import "./Styles/PomodoroPage.css";
import Header from "../Components/Header";
import PomodoroTimer from "../Components/PomodoroTimer";
import { useTask } from "../Contexts/TaskContext";

export default function PomodoroPage() {

    const { selectedTask } = useTask();

    return (
        <div>
            <Header />
            <PomodoroTimer focusDuration={selectedTask.focusDuration} breakDuration={selectedTask.breakDuration}/>

            <div className="task-display-div">


                {(selectedTask.title !== "") &&<div className="task-item-display-div">
                    <h2 className="task-item-header-div">
                        Task:
                    </h2>
                    <h3>{selectedTask.title}</h3>
                </div>}

                {(selectedTask.description !== "") && <div className="task-item-display-div">

                    <h2 className="task-item-header-div">
                        Description:
                    </h2>

                    <p>{selectedTask.description}</p>
                </div>}

                {(selectedTask.subTasks.length !== 0) && <div className="task-item-display-div">

                    <h2 className="task-item-header-div">
                        Sub-tasks:
                    </h2>

                    <ul>
                        {selectedTask.subTasks.map((subTask) => {
                            return <li key={subTask.id}>{subTask.content}</li>
                        })}
                    </ul>

                </div>}

            </div>
        </div>
    )
}
