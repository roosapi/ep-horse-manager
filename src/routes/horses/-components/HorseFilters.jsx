import { useEffect, useMemo,useState } from 'react';
import * as Constants from '../../../utilities/constants'

/**
 * 
 * @param {Array} displayValues - an array of potential text values for the button
 * @returns A button that cycles through display text values when clicked
 */
const DisplayToggleButton = ({displayValues, whichValue, onToggleValue}) => {
    const numValues = displayValues.length;
   return (     
        <button
        onClick={() => onToggleValue((oldVal) => (oldVal + 1) % numValues)}
        >
            {displayValues[whichValue]}
        </button>
    );
}

    const NumInputField = ({currentValue,onValueChanged}) => {
        return <input type="number" value={currentValue} onChange={(e) => {
             onValueChanged(e.target.value)
            }}/>
    }

const NumFilterController = ({colId,onFilterChanged}) => {
    const filterOptions = ['>','<','='];
    const [filterType, setFilterType] = useState(0);
    const [filterValue, setFilterValue] = useState(0);

    useEffect(()=>onFilterChanged(colId,filterOptions[filterType],filterValue),[filterType, filterValue]);

    return (
        <>
        <DisplayToggleButton displayValues={filterOptions} whichValue={filterType} onToggleValue={setFilterType}/>
        <NumInputField currentValue={filterValue} onValueChanged={setFilterValue}/>
        </>
    )
}

const ToggleButton = ({toggleType,colID,buttonID,buttonText, isToggled, onButtonToggle}) => {
    return (     
        <button
        onClick={() => {
            switch (toggleType) {
                case 'visibility':
                    onButtonToggle(colID);
                    break;
                case 'filter':
                    isToggled ? onButtonToggle(colID,null) : onButtonToggle(colID,buttonID);
                    break;
            }
           }}
        className={
                isToggled
                    ? "active-button"
                    : ""
                }
        >
            {buttonText}
        </button>
    );
};

// TODO?: use the table object to directly set filters (and visibility)? 
// (e.g. table.getColumn('name')?.setFilterValue('John')) OR table.setColumnFilters(...)
const HorseFilter = ({horseTable,colVisibility,onColumnToggle,colFilters,onSetColumnFilter}) => {
    const [isFiltersVisible,setIsFiltersVisible] = useState(false);

    const activeFilters = useMemo(() => {
            const active = new Set([]);
            colFilters.forEach(filter => active.add(filter.value));
            return active;          
        },[colFilters]);

    const handleNumFilterChange = (colId,filterType,filterValue) => {
        if (filterType === '>') onSetColumnFilter(colId,[filterValue,Number.MAX_SAFE_INTEGER]);
        else if (filterType === '<') onSetColumnFilter(colId, [Number.MIN_SAFE_INTEGER,filterValue]);
        else onSetColumnFilter(colId,[filterValue,filterValue]);
    };

    return (
        <>
        <div>
            <button id onClick={()=>{setIsFiltersVisible((prev)=>!prev)}}>
                {isFiltersVisible ? 'Hide' : 'Show'} filter options</button>
        </div>
        {isFiltersVisible && 
        <div id='filter-options-panel'>
            Show columns:
            <div>
                Basic Info:
                {['Name','Sex','Breed','Type','Height','Born'].map(col => (
                    <ToggleButton 
                        key={col+'_toggle'}
                        toggleType={'visibility'}
                        colID={col.toLocaleLowerCase()}
                        buttonID={col+'_toggle'}
                        buttonText={col} 
                        isToggled={(col.toLocaleLowerCase() in colVisibility) ? colVisibility[col.toLocaleLowerCase()] : true} 
                        onButtonToggle={onColumnToggle}/>
                ))}
            </div>
            <div>
                Disciplines:
                {Array.from(Constants.disciplineMap.keys()).map(discp => (
                    <ToggleButton 
                        key={discp+'_toggle'}
                        toggleType={'visibility'}
                        colID={discp}
                        buttonID={discp+'_toggle'}
                        buttonText={discp} 
                        isToggled={(discp in colVisibility) ? colVisibility[discp] : true} 
                        onButtonToggle={onColumnToggle}/>
                ))}
            </div>
            <div> 
                Filter:
                <div>
                    ID  <NumFilterController colId={'id'} onFilterChanged={handleNumFilterChange}/>
                </div>
                <div>
                    Sex:
                    {['Stallion','Mare'].map(col => (
                        <ToggleButton 
                            key={col+'_toggle'}
                            toggleType={'filter'}
                            colID={'sex'}
                            buttonID={col.toLocaleLowerCase()}
                            buttonText={col} 
                            isToggled={activeFilters.has(col.toLocaleLowerCase())} 
                            onButtonToggle={onSetColumnFilter}/>
                    ))}
                </div>
                <div>
                    {// TODO refactor this to a function; memoise it; 
                    // get breeds/types/etc from horsedata in parent instead of 
                    // the table that is recreated every time something is manioulated
                    }
                    Breed: {Array.from(horseTable.getColumn('breed').getUniqueValues()).map(col => (
                        <ToggleButton 
                            key={col+'_toggle'}
                            toggleType={'filter'}
                            colID={'breed'}
                            buttonID={col.toLocaleLowerCase()}
                            buttonText={col} 
                            isToggled={activeFilters.has(col.toLocaleLowerCase())} 
                            onButtonToggle={onSetColumnFilter}/>
                    ))}
                </div>
                <div>Type: {Array.from(horseTable.getColumn('type').getUniqueValues()).map(col => (
                        <ToggleButton 
                            key={col+'_toggle'}
                            toggleType={'filter'}
                            colID={'type'}
                            buttonID={col.toLocaleLowerCase()}
                            buttonText={col} 
                            isToggled={activeFilters.has(col.toLocaleLowerCase())} 
                            onButtonToggle={onSetColumnFilter}/>
                    ))}
                </div>
                <div>
                    Birth year  <NumFilterController colId={'born'} onFilterChanged={handleNumFilterChange}/>
                </div>
                <div>
                    Height  <NumFilterController colId={'height'} onFilterChanged={handleNumFilterChange}/>
                </div>

            </div>
            
        </div>}
        
        </>
    )
}

export {HorseFilter}