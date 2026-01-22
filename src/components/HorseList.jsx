import PropTypes from 'prop-types';
import { Horse } from '../horses/Horse';

const HorseListItem = ({horse}) => {
    return <tr><td>{horse.id}</td><td>{horse.name}</td></tr>
}

const HorseList = ({horses}) => {
    const listRows = horses.map((horse)=> (
        <HorseListItem key={horse.id} horse={horse} />
    ))
    return <table><tbody>{listRows}</tbody></table>;
}

HorseList.PropTypes = {
    horses: PropTypes.arrayOf(PropTypes.instanceOf (Horse)).isRequired
}

export default HorseList;