import './ButtonsAndAmount.scss';
import MultipleButtons from '../radioButtons/multipleButtons/MultipleButtons.jsx';
import TextInput from '../inputs/textInput/TextInput.jsx';

const ButtonsAndAmount = ({ multipleButtonsField, multipleButtonsType, multipleButtonsNames, textInputLabel, textInputPlaceholder, textInputGlobalVariable, textInputIsNumber }) => {
    return (
        <div className="buttonsAndAmount">
            <MultipleButtons field={multipleButtonsField} type={multipleButtonsType} names={multipleButtonsNames}></MultipleButtons>
            <TextInput placeholder={textInputPlaceholder} label={textInputLabel} globalVariable={textInputGlobalVariable} isNumber={textInputIsNumber}></TextInput>
        </div>
    );
}

export default ButtonsAndAmount;