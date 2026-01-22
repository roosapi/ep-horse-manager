import { MOCK_HORSES } from "../horses/MockHorses";
import HorseList from "./HorseList";
import { AddHorseForm } from "./HorseForms";

function HorsesPage() {
    return (
    <>
    <h1>Horses</h1>
    <h2>Add Horse</h2>
    <AddHorseForm />
    <h1>All horses</h1>
    <HorseList horses={MOCK_HORSES}/>
    
    </>
    )
}

export default HorsesPage;