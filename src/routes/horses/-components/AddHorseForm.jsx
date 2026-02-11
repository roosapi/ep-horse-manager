import { useState } from "react";

const ErrorContainer = ({errorText}) => {
    return (
        <div>
            {errorText}
        </div>
    );

};

// TODO basic valudation (don't submit if empty)
export const AddHorseForm = () => {
    const [activeError,setActiveError] = useState({
        isError:false,
        errorMessage:''
    });

    const handleInsertResult = (result) => {
        const { isHorseInserted, isSkillsInserted, isStatsInserted, errors = [] } = result;

        if (isHorseInserted && isSkillsInserted && isStatsInserted) {
            return setActiveError({isError:false,errorMessage:''});
        }

        let errorMessage = '';
        if (!isHorseInserted) {
            const errCode = errors[0].code;
            switch (errCode) {
                case 'SQLITE_CONSTRAINT_PRIMARYKEY':
                    errorMessage = 'Horse already in the database';
                    break;
                default:
                    errorMessage = 'Horse not added: '+errCode;
            } 
        } else {
            errorMessage = 'Horse inserted. Error insterting stats or skills: ' + errors.map((err)=>err.code).join(', ');
        }
        setActiveError({isError:true,errorMessage});
    }

    const createHorse = async (formData) => {
        const data = Object.fromEntries(formData);
        await window.databaseAPI.addHorse(data).then(handleInsertResult);
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
            {activeError.isError && <ErrorContainer errorText={activeError.errorMessage}/> }
        </form>       
    )
}