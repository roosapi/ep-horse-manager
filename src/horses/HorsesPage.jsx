import { MOCK_HORSES } from "./MockHorses";

function HorsesPage() {
    return (
    <>
    <h1>Horses</h1>
    <pre>some text</pre>
    <pre>{JSON.stringify(MOCK_HORSES, null, ' ')}</pre>
    
    </>
    )
}

export default HorsesPage;