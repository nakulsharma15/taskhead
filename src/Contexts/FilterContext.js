import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

//function to use FilterContext
const useFilter = () => useContext(FilterContext);

//function to provide required values and return FilterContext.Provider with those values
const FilterProvider = ({children}) => {

    const [filter, setFilter] = useState("All");

    return <FilterContext.Provider value={{filter, setFilter}}>
        {children}
    </FilterContext.Provider>
}

export {FilterProvider, useFilter};