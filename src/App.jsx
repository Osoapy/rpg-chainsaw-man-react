import './App.scss'
import createExorcist from './utils/exorcist/baseExorcist.jsx';
import createDemon from './utils/demons/baseDemon.jsx';
import ValueChanger from './components/ValueChanger/ValueChanger.jsx';
import battleMaker from './utils/battle/battleMaker.jsx';
import SiteHeader from './components/header/SiteHeader.jsx';
import MultipleButtons from './components/radioButtons/multipleButtons/MultipleButtons.jsx';
import TextInput from './components/inputs/textInput/TextInput.jsx';
import ButtonsAndAmount from './components/buttonsAndAmount/ButtonsAndAmount.jsx';

function App() {
  let myExorcist = createExorcist("executive");
  let myExorcistBrudah = createExorcist("executive");
  let myExorcistBrudahsBrudah = createExorcist("executive");
  let myDemon = createDemon(6, 10);

  console.log(myExorcist);
  console.log(myDemon);

  battleMaker([myExorcist, myExorcistBrudah, myExorcistBrudahsBrudah], [myDemon]);

  return (
    <div className="App">
      <SiteHeader></SiteHeader>
      <div className='pageBody'>
        <h1>EXORCISTAS</h1>
        <ButtonsAndAmount 
          multipleButtonsField={"exorcistType"} 
          multipleButtonsType={"exorcist"} 
          multipleButtonsNames={["Operador", "Encarregado", "Supervisor", "Chefia", "Adjunto", "Executivo"]} 
          textInputLabel={"QUANTIDADE"} textInputPlaceholder={"NÚMERO DE EXORCISTAS"}>
        </ButtonsAndAmount>
        <h1>DEMÔNIOS</h1>
        <ButtonsAndAmount 
          multipleButtonsField={"demonType"}
          multipleButtonsType={"demon"}
          multipleButtonsNames={["Demônio lvl 1", "Demônio lvl 2", "Demônio lvl 3", "Demônio lvl 4", "Demônio lvl 5", "Demônio Especial"]}
          textInputLabel={"QUANTIDADE"} textInputPlaceholder={"NÚMERO DE DEMÔNIOS"}>
        </ButtonsAndAmount>
      </div>
    </div>
  )
}

export default App
