import { useState } from "react";

const HorseFilter = ({colVisibility,onColumnToggle}) => {

    return (
        <div>
            <div> 
            {/* 
            Test buttons
            */}
            <button 
                onClick={() => onColumnToggle('type')}
                className={
                        colVisibility['type']
                            ? "active-button"
                            : ""
                    }
                >
                    Type</button>
            <button 
                onClick={() => onColumnToggle('Dressage')}
                className={
                        colVisibility['Dressage']
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