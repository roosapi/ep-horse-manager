import { MOCK_HORSES } from "../horses/MockHorses";
import HorseList from "./HorseList";

function HorsesPage() {
    return (
    <>
    <h1>Horses</h1>
    <HorseList horses={MOCK_HORSES}/>
    
    </>
    )
}

export default HorsesPage;