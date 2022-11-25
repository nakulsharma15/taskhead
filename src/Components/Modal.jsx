import React from "react";
import "./Styles/Modal.css";
import { useState } from "react";
import { useModal } from "../Contexts/ModalContext";
import { useTask } from "../Contexts/TaskContext";
import { v4 as uuidv4 } from "uuid";

//function to display modal
export default function Modal() {

    const { setShowModal } = useModal();

    const sample = {
        id: uuidv4(),
        title: "",
        priority: "Low",
        description: "",
        focusDuration: "10",
        breakDuration: "5",
        subTasks: []
    }

    const subTaskSample = {
        id: uuidv4(),
        content: ""
    }

    const [subTask, setSubTask] = useState(subTaskSample);

    const { task, setTask, taskList, setTaskList } = useTask();

    const isTaskEdited = taskList.find((taskInList) => taskInList.id === task.id);

    // function to add a task
    const addTask = () => {

        if (task.title.length === 0 || task.description.length === 0) {
            return;
        }

        else {


            if (isTaskEdited) {

                let updatedTaskList = taskList.map((taskInList) => {
                    if (taskInList.id === isTaskEdited.id) {
                        return task;
                    }
                    else {
                        return taskInList;
                    }
                });
                setTaskList(updatedTaskList);
            }

            else {
                setTaskList([...taskList, { ...task, id: uuidv4() }])
            }

            setTask(sample);
            setShowModal(false);

        }
    }

    // function to add subtask
    const addSubTask = () => {

        if (subTask.content.length > 100) {
            return;
        }
        else {

            let updatedSubTasksList = [...task.subTasks, { ...subTask, id: uuidv4() }]
            setTask({ ...task, subTasks: updatedSubTasksList });
            setSubTask(subTaskSample);
        }
    }

    // function to delete subtask
    const deleteSubTask = (subTaskId) => {

        let updatedSubTasksList = task.subTasks.filter((sub) => sub.id !== subTaskId);
        setTask({ ...task, subTasks: updatedSubTasksList });
    }

    return (
        <div className="modal-bg">

            <div className="modal-centered">

                <div className="modal">

                    <div className="modal-header">
                        {isTaskEdited ? <p>Edit this task</p> : <p>Add a Task</p>}
                    </div>

                    <div className="task-input-container">

                        <p className="task-input-title">Title:</p>

                        <input type="text" placeholder="Enter title" value={task.title} onChange={(e) => setTask((task) => ({ ...task, title: e.target.value }))} />

                        {task.title.length === 0 ? <p className="subtask-length-overflow">* Title should not be empty</p> : null}

                    </div>

                    <div className="priority-input-container">

                        <p className="task-input-title">Priority:</p>

                        <select value={task.priority} onChange={(e) => setTask((task) => ({ ...task, priority: e.target.value }))} >
                            <option value="Low"> Low
                            </option>
                            <option value="Medium"> Medium
                            </option>
                            <option value="High"> High
                            </option>
                        </select>

                    </div>

                    <div className="task-input-container">

                        <p className="task-input-title">Description:</p>

                        <textarea className="task-desc" name="task-description" id="" cols="5" rows="3" placeholder="Enter Description" value={task.description} onChange={(e) => setTask((task) => ({ ...task, description: e.target.value }))} />

                        {task.description.length === 0 ? <p className="subtask-length-overflow">* Description should not be empty</p> : null}

                    </div>

                    <div className="task-input-container">

                        <p className="task-input-title">Focus Duration:</p>

                        <input
                            type="range"
                            min="10"
                            max="30"
                            step="5"
                            name="focusDuration"
                            id="focusDuration"
                            value={task.focusDuration}
                            list="tickmarks"
                            className="slider"
                            onChange={(e) => setTask((task) => ({ ...task, focusDuration: e.target.value }))}
                        />
                        <datalist id="tickmarks">
                            <option value="10" label="10m" />
                            <option value="15" label="15m" />
                            <option value="20" label="20m" />
                            <option value="25" label="25m" />
                            <option value="30" label="30m" />
                        </datalist>

                        <div>
                            <h4 className="duration-input-text" >Duration: <span className="duration-input-sub-text">{task.focusDuration} minutes</span></h4>
                        </div>

                    </div>


                    <div className="task-input-container">

                        <p className="task-input-title">Break Duration:</p>

                        <input
                            type="range"
                            min="5"
                            max="20"
                            step="5"
                            name="breakDuration"
                            id="breakDuration"
                            value={task.breakDuration}
                            list="tickmarks"
                            className="slider"
                            onChange={(e) => setTask((task) => ({ ...task, breakDuration: e.target.value }))}
                        />
                        <datalist id="tickmarks">
                            <option value="5" label="10m" />
                            <option value="10" label="15m" />
                            <option value="15" label="20m" />
                            <option value="20" label="25m" />
                        </datalist>

                        <div>
                            <h4 className="duration-input-text" >Duration: <span className="duration-input-sub-text">{task.breakDuration} minutes</span></h4>
                        </div>

                    </div>


                    <div className="task-input-container">

                        <p className="task-input-title">Sub-tasks:</p>

                        <div className="subtask-input">
                            <input type="text" placeholder="Enter title" value={subTask.content} onChange={(e) => setSubTask((subTask) => ({ ...subTask, content: e.target.value }))} />

                            <button className="subtask-button" onClick={addSubTask}>
                                <span className="material-icons-outlined">
                                    add
                                </span>
                            </button>

                        </div>

                        <p className={`${subTask.content.length > 100 ? 'subtask-length-overflow' : null}`}>(<span>{subTask.content.length}</span>/100)</p>

                        <div className="subtask-list-div">

                            {task.subTasks.map((subTaskInList) => <div className="subtask-item-div" key={subTaskInList.id}>

                                <div className="subtask-content-div">
                                    <span className="material-icons">
                                        circle
                                    </span>
                                    <p> {subTaskInList.content} </p>
                                </div>

                                <span className="material-icons-outlined" onClick={() => deleteSubTask(subTaskInList.id)}>
                                    remove_circle_outline
                                </span>

                            </div>)}

                        </div>

                    </div>

                    <div className="modal-actions">

                        {isTaskEdited ? <button className="add-button" onClick={() => addTask()}>Update Task</button> : <button className="add-button" onClick={() => addTask()}>Add Task</button>}

                        <button className="cancel-button" onClick={() => {setShowModal(false); setTask(sample)}}>Cancel</button>

                    </div>

                </div>

            </div>

        </div>
    );
};
