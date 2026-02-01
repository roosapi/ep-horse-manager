const insertHorse = (data) => {

}

// TODO basic valudation (don't submit if empty)
export const AddHorseForm = () => {
    const createHorse = async (formData) => {
        const data = Object.fromEntries(formData);
        insertHorse(data)

        const db_success = await window.databaseAPI.addHorse(data);
    }

    return (
         <form className="input-form" action={createHorse}>
            <label htmlFor="basic">Basic Information</label>
            <textarea name="basic" />
            <label htmlFor="skills">Training Page</label>
            <textarea name="skills" />
            <div>
                <button type="submit" className="confirm-button">Add Horse</button>
                <span />
                <button type="reset" className="cancel-button">Cancel</button>
            </div>
        </form>       
    )
}