import './TextInput.scss';
import globalVariables from '../../../config/values.jsx';

const TextInput = ({ placeholder, label, globalVariable, isNumber }) => {
    return (
        <div className="brutalist-container">
            <input
                placeholder={placeholder}
                onChange={(e) => {
                        const value = e.target.value;
                        if (isNumber) {
                            if (!isNaN(value) && value.trim() !== '' && /^[0-9]+$/.test(value)) {
                                globalVariables[globalVariable] = e.target.value;
                                console.log("the variable " + globalVariable + " is now: " + globalVariables[globalVariable]);
                            }
                        }
                        else {
                            globalVariables[globalVariable] = e.target.value;
                            console.log("the variable " + globalVariable + " is now: " + globalVariables[globalVariable]);
                        }
                    }
                    }
                className="brutalist-input smooth-type"
                type="text"
            />
            <label className="brutalist-label">{label}</label>
        </div>
    );
}

export default TextInput