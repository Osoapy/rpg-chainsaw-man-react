import { useState } from 'react';
import globalValues from '../../config/values.jsx';

const ValueChanger = ({ field }) => {
    const originalType = typeof globalValues[field];
    const [currentValue, setCurrentValue] = useState(globalValues[field]);

    const handleChange = (e) => {
        const raw = e.target.value;
        const newValue = originalType === 'number' ? parseInt(raw, 10) || 0 : raw;

        setCurrentValue(newValue);
        globalValues[field] = newValue;
    };

    return (
        <div className='valueChanger'>
            <label>{field}</label>
            <input
                className="valueEditable"
                type={originalType === "number" ? "number" : "text"}
                value={currentValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default ValueChanger;
