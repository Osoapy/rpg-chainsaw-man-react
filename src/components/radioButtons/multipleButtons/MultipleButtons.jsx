import './MultipleButtons.scss';
import globalValues from '../../../config/values';

const MultipleButtons = ({ names, field, type }) => {
  const getButtonText = (num) => {
    return names[num - 1];
  };

  const getGlitchText = (num) => {
    return names[num - 1];
  };

  const changeFieldType = (num) => {
    if (type == "demon") {
        globalValues.demonType = num;
        console.log("demon type: " + globalValues.demonType);
    }
    else if (type == "exorcist") {
        const exorcistRoleList = ["operator", "foreman", "supervisor", "chief", "adjunct", "executive"];
        globalValues.exorcistType = exorcistRoleList[num - 1];
        console.log("exorcist role: " + globalValues.exorcistType);
    }
  };

  return (
    <div className="container">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <div key={num} className="radio-wrapper">
          <input
            type="radio"
            id={`value-${num}-${type}`}           // id único por grupo
            name={`btn-${type}-${field}`} 
            onClick={() => changeFieldType(num)}
            className="input"
            defaultChecked={num === 1}
          />
          <div className="btn">
            <span aria-hidden=""></span>
            {getButtonText(num)}
            <span aria-hidden="" className="btn__glitch">{getGlitchText(num)}</span>
            <label className="number">r{num}</label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultipleButtons;
