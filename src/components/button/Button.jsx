import './Button.scss';

const Button = ({ label, functionOnClick, functionOnClickParam }) => {
    return (
        <button onClick={() => {console.log("button clicked"); functionOnClick(functionOnClickParam)}}>{label}
            <span></span>
        </button>
    );
}

export default Button;