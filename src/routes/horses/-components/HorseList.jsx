import { useEffect, useState } from 'react';

import * as Constants from '../../../utilities/constants'

const SkillListItem = ({skillsArray}) => {
    const skillSum = skillsArray.reduce((acc,current) => acc + current);
    return (
        <>
        <td>{skillsArray[0]}</td>
        <td>{skillsArray[1]}</td>
        <td>{skillsArray[2]}</td>
        <td>{skillsArray[3]}</td>
        <td>{skillsArray[4]}</td>
        <td>{skillSum}</td>
        </>
    )

}

const HorseListItem = ({horse}) => {
    const skills = new Map([...Constants.disciplineMap.values()].map(discp => {
        return [discp,[]]
    }));

    // Extract and group all skills for each discipline
    // NOTE! This assumes in horse keys the skills are always ordered skill1-skill5,
    // which should be the case but might not?
    Object.keys(horse).forEach((key) => {
        if (key.includes('_skill')) {
            let discp = key.slice(0,2);
            skills.set(discp,skills.get(discp).concat([horse[key]]))
        }
    }); 
    const horseSkillsItems = [...skills.keys()].map((skill_key)=> (
        <SkillListItem key={skill_key} skillsArray={skills.get(skill_key)} />
    ));

    return (
    <tr>
        <td>{horse.id}</td>
        <td>{horse.name}</td>
        <td>{horse.sex}</td>
        <td>{horse.breed}</td>
        <td>{horse.type}</td>
        <td>{horse.height}</td>
        <td>{horse.born}</td>
        {horseSkillsItems}
    </tr>
    );
}

const HorseList = () => {
    const [horseData, setHorseData] = useState([]);

    useEffect(() => {
        window.databaseAPI.getHorses().then(setHorseData);
    },[]);
    
    const horseListItems = horseData.map((horse)=> (
        <HorseListItem key={horse.id} horse={horse} />
    ));

    return ( 
    <table className="horse-table">
        <tbody>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Sex</th>
                <th>Breed</th>
                <th>Type</th>
                <th>H (cm)</th>
                <th>Born</th>
                {[...Constants.disciplineMap.keys()].map((discp) => (
                    <th colSpan="6">{discp}</th>
                ))}
                </tr>
            {horseListItems}
        </tbody>
    </table>
    );
}


export default HorseList;