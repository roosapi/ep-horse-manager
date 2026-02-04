import { useState,useEffect} from "react";
import {createFileRoute } from "@tanstack/react-router";

import * as Constants from '../../utilities/constants'
import { HorseList } from "./-components/HorseList";
import { HorseFilter } from "./-components/HorseFilters";
import { createHorseTable } from './-utilities/horseTable';


export const Route = createFileRoute("/horses/")({
  component: HorsePage,
})


const HorsePage = () => {
    // Keep track of state for filters and visibility
    const [columnVisibility, setColumnVisibility] = useState({'id':true});
    const [horseData, setHorseData] = useState([]);

    const horseTable = createHorseTable(horseData,columnVisibility,setColumnVisibility);

    useEffect(() => {
        window.databaseAPI.getHorses().then(setHorseData);
    },[]);

    /**
     * Toggle visibility for column group colId
     * @param {string} colId 
     */
    function toggleVisibility (colId) { 
        setColumnVisibility((prev) => {
            let updates = {[colId]:(colId in prev) ? !prev[colId] : false}
            if (Constants.disciplineMap.has(colId)) {
                const subColumns =horseTable.getColumn(colId).getLeafColumns();
                updates = Object.fromEntries(        
                    subColumns.map(col => (col.id in prev) ? [col.id,!prev[col.id]] : [col.id, false])
                );
            }
            return { ...prev, ...updates }
        });
    }
    

    return (
        <>
        <h1>Horses</h1>
        <HorseFilter  colVisibility={columnVisibility} onColumnToggle={toggleVisibility} />
        <HorseList horseTable={horseTable} />
        </>
    )
}