import './TextInput.scss';

const TextInput = ({ placeholder, label }) => {
    return (
        <div className="brutalist-container">
            <input
                placeholder={placeholder}
                className="brutalist-input smooth-type"
                type="text"
            />
            <label className="brutalist-label">{label}</label>
        </div>
    );
}

export default TextInput