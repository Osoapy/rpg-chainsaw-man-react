import { useState } from 'react';

const ValueChanger = ({ value }) => {
    const [currentValue, setCurrentValue] = useState(value);

    return (
        <div className='valueChanger'>
            <input
                className="valueEditable"
                type="text"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
            />
        </div>
    );
};

export default ValueChanger;
