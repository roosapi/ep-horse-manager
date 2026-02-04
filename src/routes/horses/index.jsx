import HorseList from "./-components/HorseList";
import { HorseFilter } from "./-components/HorseFilters";

import { useState,useEffect } from "react";
import {createFileRoute } from "@tanstack/react-router";
import { HorseTable } from './-utilities/horseTable';


export const Route = createFileRoute("/horses/")({
  component: HorsePage,
})


const HorsePage = () => {
    // Keep track of state for filters and visibility
    const [columnVisibility, setColumnVisibility] = useState({'id':true});
    const [horseData, setHorseData] = useState([]);
    const horseTable = new HorseTable(horseData,columnVisibility);

    useEffect(() => {
        window.databaseAPI.getHorses().then(setHorseData);
    },[]);

    function toggleVisibility (colId) { 
        // TODO need to update all the cols under the discipline grouping
        // individually  something like:
/*          const group = table.getColumn(groupId);
            const updates = Object.fromEntries(
                group.getLeafColumns().map(col => [col.id, false])
            );
            setColumnVisibility(prev => ({ ...prev, ...updates })); */

        setColumnVisibility(() => {
                        const newVis =  {...columnVisibility}
                        newVis[colId] = (colId in columnVisibility) ? !columnVisibility[colId] : false
                        return newVis
                    })
        }
    

    return (
        <>
        <h1>Horses</h1>
        <HorseFilter  colVisibility={columnVisibility} onColumnToggle={toggleVisibility} />
        <HorseList horseTable={horseTable} />
        </>
    )
}