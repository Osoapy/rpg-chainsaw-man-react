import './Button.scss';

const Button = ({ label, functionOnClick }) => {
    return (
        <button onClick={() => {console.log("button clicked"); functionOnClick()}}>{label}
            <span></span>
        </button>
    );
}

export default Button;