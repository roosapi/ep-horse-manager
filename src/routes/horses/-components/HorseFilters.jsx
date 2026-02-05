import * as Constants from '../../../utilities/constants'

const ToggleButton = ({buttonID,buttonText, isToggled, onColumnToggle}) => {
    return (     
        <button
        onClick={() => onColumnToggle(buttonID)}
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

const HorseFilter = ({colVisibility,onColumnToggle}) => {
    return (
        <div>
            Show columns:
            <div>
                Basic Info:
                {['Name','Sex','Breed','Type','Height','Born'].map(col => (
                    <ToggleButton 
                        key={col+'_toggle'}
                        buttonID={col.toLocaleLowerCase()}
                        buttonText={col} 
                        isToggled={(col.toLocaleLowerCase() in colVisibility) ? colVisibility[col.toLocaleLowerCase()] : true} 
                        onColumnToggle={onColumnToggle}/>
                ))}
            </div>
            <div>
                Disciplines:
                {Array.from(Constants.disciplineMap.keys()).map(discp => (
                    <ToggleButton 
                        key={discp+'_toggle'}
                        buttonID={discp}
                        buttonText={discp} 
                        isToggled={(discp in colVisibility) ? colVisibility[discp] : true} 
                        onColumnToggle={onColumnToggle}/>
                ))}
            </div>
            <div> 

{/*             <button 
                onClick={() => onColumnToggle('type')}
                className={
                        colVisibility['type']
                            ? "active-button"
                            : ""
                    }
                >
                    Type</button> */}


            </div>
            
        </div>
    )
}

export {HorseFilter}