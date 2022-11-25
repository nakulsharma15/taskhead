import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

//function to use ModalContext
const useModal = () => useContext(ModalContext);

//function to provide necessary values and return ModalContext.Provider with those values
const ModalProvider = ({ children }) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <ModalContext.Provider value={{ showModal, setShowModal }}>
            {children}
        </ModalContext.Provider>)

}

export { useModal, ModalProvider };