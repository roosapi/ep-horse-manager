import { useState } from "react";

const HorseFilter = ({colVisibility,onColumnToggle}) => {

    return (
        <div>
            <div> 
            {/* 
            This works for other columns, but not for header groups: see TODO in index.js.
            */}
            <button 
                onClick={() => onColumnToggle('dressage')}
                className={
                        colVisibility['dressage']
                            ? "active-button"
                            : ""
                    }
                >
                    Dressage</button>

            </div>
            
        </div>
    )
}

export {HorseFilter}