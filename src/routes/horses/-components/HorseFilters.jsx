import { useMemo } from 'react';
import * as Constants from '../../../utilities/constants'

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


const HorseFilter = ({colVisibility,onColumnToggle,colFilters,onSetColumnFilter}) => {

    const activeFilters = useMemo(() => {
            const active = new Set([]);
            colFilters.forEach(filter => active.add(filter.value));
            return active;          
        },[colFilters])

    return (
        <div>
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

            </div>
            
        </div>
    )
}

export {HorseFilter}