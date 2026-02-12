import { useState } from "react";

const ErrorContainer = ({errorText}) => {
    return (
        <div>
            {errorText}
        </div>
    );

};

export const AddHorseForm = () => {
    const [activeError,setActiveError] = useState({
        isError:false,
        errorMessage:''
    });

    const [formState,setFormState] = useState({
        values: {
            basic:'',
            skills:'',
        },
        errors: {}
    });

    const onFieldEdited = (elem) => {
        setFormState((prev) => ({
            ...prev,
            values:{ ...prev.values, [elem.name]: elem.value }
        }))
    }

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
    };

    const validateForm = () => {
        const rules = {
            basic: [
                ['General data','Conformation','Personality'],
                "The passport page should include sections: General data, Conformation, and Personality"
            ],
            skills: [
                ['Stamina','Ground manners'],
                "The training page should include sections: Stamina, Ground manners, and desired disciplines."
                
            ]
        };
        let isValid = true;

        for (const key in formState.values) {
            const input = formState.values[key];
            const fitsRules = rules[key][0]
                .map((word)=>input.includes(word))
                .reduce((acc,current) => acc && current, true);

            if (!fitsRules) {
                isValid = false;
                setFormState((prev) => ({
                    ...prev,
                    errors:{ ...prev.errors, [key]: rules[key][1]}
                }));
            } else {
                setFormState((prev) => ({
                ...prev,
                errors:{ ...prev.errors, [key]: ''}
                }));
            }
        }
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        // validate
        const isValid = validateForm();
        if (!isValid) return;

        createHorse(formState.values);
        setFormState({
            values: {
                basic:'',
                skills:'',
            },
            errors: {}
        });
    };

    const createHorse = async (data) => {
        await window.databaseAPI.addHorse(data).then(handleInsertResult);
    };

    return (
         <form className="input-form" onSubmit={handleSubmit}>
            <label htmlFor="basic">Basic Information</label>
            {formState.errors.basic ?? formState.errors.basic}
            <textarea name="basic" onChange={(e)=>onFieldEdited(e.target)} value={formState.values.basic}/>
            <label htmlFor="skills">Training Page</label>
            {formState.errors.skills ?? formState.errors.skills}

            <textarea name="skills" onChange={(e)=>onFieldEdited(e.target)} value={formState.values.skills}/>
            <div>
                <button type="submit" className="confirm-button">Add Horse</button>
                <span />
                <button type="reset" className="cancel-button">Cancel</button>
            </div>
            {activeError.isError && <ErrorContainer errorText={activeError.errorMessage}/> }
        </form>       
    )
}