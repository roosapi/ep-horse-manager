import HorseList from "./-components/HorseList";
import { HorseFilter } from "./-components/HorseFilters";

import { useState } from "react";
import {createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/horses/")({
  component: HorsePage,
})


const HorsePage = () => {
    // Keep track of state for filters and visibility
    const [columnVisibility, setColumnVisibility] = useState({'id':true});

    // TODO pull the table out of Horselist and pass it as a parameter
    // Also while doing that reactor to a custom table interface

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
        <HorseList columnVisibility={columnVisibility} setColumnVisibility={setColumnVisibility}/>
        </>
    )
}