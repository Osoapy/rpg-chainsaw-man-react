import './App.scss'
import battleMaker from './utils/battle/battleMaker.jsx';
import SiteHeader from './components/header/SiteHeader.jsx';
import ButtonsAndAmount from './components/buttonsAndAmount/ButtonsAndAmount.jsx';
import Button from './components/button/Button.jsx';
import BattleLogCard from './components/card/BattleLogCard.jsx';
import { useState } from 'react';
import MultipleButtons from './components/radioButtons/multipleButtons/MultipleButtons.jsx';

function App() {
  const [battleStats, setBattleStats] = useState({});

  return (
    <div className="App">
      <SiteHeader></SiteHeader>
      <div className='pageBody'>
        <div>
          <h1>EXORCISTAS</h1>
          <ButtonsAndAmount 
            multipleButtonsField={"exorcistType"} 
            multipleButtonsType={"exorcist"} 
            multipleButtonsNames={["Operador", "Encarregado", "Supervisor", "Chefia", "Adjunto", "Executivo"]} 
            textInputLabel={"QUANTIDADE"} textInputPlaceholder={"NÚMERO DE EXORCISTAS"} textInputGlobalVariable={"exorcistAmount"} textInputIsNumber={true}>
          </ButtonsAndAmount>
        </div>
        <div>
          <h1>DEMÔNIOS</h1>
          <ButtonsAndAmount 
            multipleButtonsField={"demonType"}
            multipleButtonsType={"demon"}
            multipleButtonsNames={["Demônio lvl 1", "Demônio lvl 2", "Demônio lvl 3", "Demônio lvl 4", "Demônio lvl 5", "Demônio Especial"]}
            textInputLabel={"QUANTIDADE"} textInputPlaceholder={"NÚMERO DE DEMÔNIOS"} textInputGlobalVariable={"demonAmount"} textInputIsNumber={true}>
          </ButtonsAndAmount>
        </div>
        <div>
          <h1>% DE MEDO</h1>
          <ButtonsAndAmount
            isShortened={true}
            multipleButtonsField={"demonFearPercentage"}
            multipleButtonsType={"fearPercent"}
            multipleButtonsNames={["0% de MEDO", "50% de MEDO", "100% de MEDO"]}
            textInputLabel={"QUANTIDADE"} textInputPlaceholder={"NÚMERO DE BATALHAS"} textInputGlobalVariable={"battleAmount"} textInputIsNumber={true}>
          </ButtonsAndAmount>
        </div>
        <div style={{display: "flex", justifyContent: "center", height: "15vh", alignItems: "center"}}>
          <Button label={"BATALHAR"} functionOnClick={battleMaker} functionOnClickParam={setBattleStats}></Button>
        </div>
        <BattleLogCard battleStats={battleStats}></BattleLogCard>
      </div>
    </div>
  )
}

export default App
