import { MOCK_HORSES } from "../horses/MockHorses";
import HorseList from "./HorseList";
import { AddHorseForm } from "./HorseForms";

export const HorsesPage = () => {
    return (
    <>
    <h1>Horses</h1>
    <HorseList horses={MOCK_HORSES}/>
    
    </>
    )
}


export const AddHorsePage = () => {
    return (
    <>

    <h1>Add Horse</h1>
    <AddHorseForm />s
    </>
    )
}
