import React from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../Contexts/ModalContext";
import { useTask } from "../Contexts/TaskContext";
import "./Styles/TaskItem.css";

export default function TaskItem({ task }) {

    const { taskList, setTaskList, setTask, setSelectedTask } = useTask();

    const { setShowModal } = useModal();

    const navigate = useNavigate();

    const deleteTaskHandler = (taskId) => {

        const updatedTaskList = taskList.filter((task) => task.id !== taskId);
        setTaskList(updatedTaskList);
    }

    const editTaskHandler = (taskId) => {
        const taskToBeEdited = taskList.find((task) => task.id === taskId);
        setTask(taskToBeEdited);
        setShowModal(true);

    }

    const startTaskHandler = () => {
        setSelectedTask(task)
        navigate("/pomodoro");
    }

    return (
        <div className="task-item-div">

            <div className="task-item-main-info">

                <h2 className="task-item-name" onClick={startTaskHandler}>{task.title}</h2>
                <p className="task-item-description">{task.description}</p>

                <div className="task-item-footer">


                    <div className="task-item-sub-info">

                        <div className="task-item-float-div">
                            <p>Priority: {task.priority}</p>
                        </div>

                        <div className="task-item-float-div">
                            <p>Sub-tasks: {task.subTasks.length}</p>
                        </div>

                        <div className="task-item-float-div">
                            <p>Focus Duration: {task.focusDuration} min</p>
                        </div>

                        <div className="task-item-float-div">
                            <p>Break Duration: {task.breakDuration} min</p>
                        </div>

                    </div>

                    <div className="task-item-action-div">

                        <div className="task-item-action delete-action" onClick={() => deleteTaskHandler(task.id)}>
                            <span className="material-icons">
                                delete
                            </span>
                            <p>Delete</p>
                        </div>

                        <div className="task-item-action edit-action" onClick={() => editTaskHandler(task.id)}>
                            <span className="material-icons">
                                edit
                            </span>
                            <p>Edit</p>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}
