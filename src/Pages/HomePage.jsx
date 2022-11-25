import React from "react";
import "./Styles/HomePage.css";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import TaskItem from "../Components/TaskItem";
import Filters from "../Components/Filters";
import { useModal } from "../Contexts/ModalContext";
import { useTask } from "../Contexts/TaskContext";
import { useFilter } from "../Contexts/FilterContext";

//function to show homepage
export default function HomePage() {

  const { showModal, setShowModal } = useModal();

  const { taskList } = useTask();

  const { filter } = useFilter();

  let filteredTaskList = taskList;

  if (filter !== "All") {
    filteredTaskList = taskList.filter((task) => task.priority === filter);
  }

  return (
    <div>
      {showModal && <Modal />}

      <Header />

      <div className="homepage-div">

        <div className="homepage-sub-div">

          <Filters />

          <button type="button" onClick={() => setShowModal(true)} className="add-task-button">
            <p>Add a new task</p>
            <span className="material-icons-outlined">
              add
            </span></button>
        </div>


      </div>

      <p className="message-text">*Click on the task&apos;s title to start working on it.</p>

      {filteredTaskList.length !== 0 ? filteredTaskList?.map((task) => <TaskItem task={task} key={task.id} />) : <div className="flex-column-center empty-tasklist-message-div">
        <h1>No tasks yet</h1>
        <p>Tasks you add will appear here</p>
      </div>}
    </div>
  )
}
