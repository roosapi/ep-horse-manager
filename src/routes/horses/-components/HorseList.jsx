import { useEffect, useState } from 'react';


// TODO display discipline information correctly
const HorseListItem = ({horse}) => {
    return (
    <tr>
        <td>{horse.id}</td>
        <td>{horse.name}</td>
        <td>{horse.sex}</td>
        <td>{horse.breed}</td>
        <td>{horse.type}</td>
        <td>{horse.height}</td>
        <td>{horse.born}</td>
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
            <tr><th>ID</th><th>Name</th><th>Sex</th><th>Breed</th><th>Type</th><th>H (cm)</th><th>Born</th></tr>
            {horseListItems}
        </tbody>
    </table>
    );
}


export default HorseList;