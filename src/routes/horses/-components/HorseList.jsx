import PropTypes from 'prop-types';
import { Horse } from '../-resources/Horse';
import { useEffect, useState } from 'react';

const HorseListItem = ({horse}) => {
    return (
    <tr>
        <td>{horse.id}</td>
        <td>{horse.name}</td>
        <td>{horse.gender}</td>
        <td>{horse.breed}</td>
    </tr>
    );
}

const HorseList = () => {
    const [horseData, setHorseData] = useState([]);

    useEffect(() => {
        window.databaseAPI.getHorses().then(setHorseData);
    });
    
    const horseListItems = horseData.map((horse)=> (
        <HorseListItem key={horse.id} horse={horse} />
    ));

    return ( 
    <table className="horse-table">
        <tbody>
            <tr><th>ID</th><th>Name</th><th>Sex</th><th>Breed</th></tr>
            {horseListItems}
        </tbody>
    </table>
    );
}

HorseList.PropTypes = {
    horses: PropTypes.arrayOf(PropTypes.instanceOf (Horse)).isRequired
}

export default HorseList;