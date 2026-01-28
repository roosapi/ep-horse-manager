const insertHorse = (data) => {

}

export const AddHorseForm = () => {
    const createHorse = async (formData) => {
        const data = Object.fromEntries(formData);
        console.log(data)
        insertHorse(data)

        const db_success = await window.databaseAPI.addHorse(data);
    }
// id,name,sex,breed,type,height,birthyear,sire_id,dam_id

/*           <label htmlFor="id">Horse ID</label>
            <input type="number" name="id" />
            <label htmlFor="name">Name</label>
            <input type="string" name="name" />            
            <label htmlFor="sex">Sex</label>
            <input type="string" name="sex" />
            <label htmlFor="breed">Breed</label>
            <input type="string" name="breed" />            
            <label htmlFor="type">Type</label>
            <input type="string" name="type" />
            <label htmlFor="height">Height</label>
            <input type="number" name="height" /> */
    return (
         <form className="input-form" action={createHorse}>
            <label htmlFor="basic">Basic Information</label>
            <textarea name="basic" />
            <div>
                <button type="submit" className="confirm-button">Add Horse</button>
                <span />
                <button type="reset" className="cancel-button">Cancel</button>
            </div>
        </form>       
    )
}