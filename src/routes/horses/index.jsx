import { useState,useEffect} from "react";
import {createFileRoute } from "@tanstack/react-router";

import * as Constants from '../../utilities/constants'
import { HorseList } from "./-components/HorseList";
import { HorseFilter } from "./-components/HorseFilters";
import { createHorseTable } from './-utilities/horseTable';


export const Route = createFileRoute("/horses/")({
  component: HorsePage,
});


const HorsePage = () => {

    // Sets discipline groups to hidden based on Constants.defaultHideColumns.
    // TODO at some point: proper config?
    const getDefaultColVisibility = () => {
            let visibility = {};
            Constants.disciplineMap.forEach((abbr,discip) => {
                if (Constants.defaultHideColumns.has(discip)) {
                    visibility = {...visibility,...getSubColVisibility({},discip),...{[discip]:false}}
                }
            });
            return visibility;
    };

    // React-table doesn't allow hiding columns based on header groups, so generate column names
    // manually for a discipline.
    const getSubColVisibility = (previousVisibility,discpGroupId) => {
        const abbrv = Constants.disciplineMap.get(discpGroupId);
        const subColumns =[1,2,3,4,5].map((idx) => (abbrv+`_skill${idx}`)).concat([abbrv+`_sum`]);
        return Object.fromEntries(        
            subColumns.map(col => (col in previousVisibility) ? [col,!previousVisibility[col]] : [col, false])
        );
    };

    /**
     * Toggle visibility for column group colId
     * @param {string} colId 
     */
    const toggleVisibility = (colId) => { 
        setColumnVisibility((prev) => {
            let updates = {[colId]:(colId in prev) ? !prev[colId] : false};
            // For discipline columns, we want to hide all the columns associated with the discipline
            if (Constants.disciplineMap.has(colId)) {
                updates = {...getSubColVisibility(prev,colId),...updates};
            }
            return { ...prev, ...updates };
        });
    }

    /**
     * Set filter value for colId. Use value=null to remove filter.
     * @param {string} colId 
     * @param {any} value - new value for filter 
     */
    const setFilter = (colId,value) => { 
        setColumnFilters((prev) => {
            const prevNoNew = prev.filter(fCol => fCol.id !== colId);
            if (value===null) {
                return prevNoNew;
            }
            return [...prevNoNew,{id:colId,value}];
        });
    }

    // Keep track of state for filters and visibility
    const [columnVisibility, setColumnVisibility] = useState(getDefaultColVisibility());
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [horseData, setHorseData] = useState([]);
    const horseTable = createHorseTable(horseData,columnVisibility,setColumnVisibility,sorting,setSorting,columnFilters,setColumnFilters);

    useEffect(() => {
        window.databaseAPI.getHorses().then(setHorseData);
    },[]);
    

    return (
        <>
        <h1>Horses</h1>
        <HorseFilter 
            colVisibility={columnVisibility} 
            onColumnToggle={toggleVisibility} 
            colFilters={columnFilters}
            onSetColumnFilter={setFilter}
            />
        <HorseList horseTable={horseTable} />
        </>
    )
}