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
        <h1>EXORCISTAS</h1>
        <ButtonsAndAmount 
          multipleButtonsField={"exorcistType"} 
          multipleButtonsType={"exorcist"} 
          multipleButtonsNames={["Operador", "Encarregado", "Supervisor", "Chefia", "Adjunto", "Executivo"]} 
          textInputLabel={"QUANTIDADE"} textInputPlaceholder={"NÚMERO DE EXORCISTAS"} textInputGlobalVariable={"exorcistAmount"} textInputIsNumber={true}>
        </ButtonsAndAmount>
        <h1>DEMÔNIOS</h1>
        <ButtonsAndAmount 
          multipleButtonsField={"demonType"}
          multipleButtonsType={"demon"}
          multipleButtonsNames={["Demônio lvl 1", "Demônio lvl 2", "Demônio lvl 3", "Demônio lvl 4", "Demônio lvl 5", "Demônio Especial"]}
          textInputLabel={"QUANTIDADE"} textInputPlaceholder={"NÚMERO DE DEMÔNIOS"} textInputGlobalVariable={"demonAmount"} textInputIsNumber={true}>
        </ButtonsAndAmount>
        <h1>PORCENTAGEM DE MEDO</h1>
        <div style={{display: 'flex', height: '7.5vh', gap: '1%', justifyContent: 'center', alignItems: 'center'}}>
          <MultipleButtons field={"demonFearPercentage"} type={"fearPercent"} names={["0% de MEDO", "50% de MEDO", "100% de MEDO"]}></MultipleButtons>
        </div>
        <div className='space'></div>
        <Button label={"BATALHAR"} functionOnClick={battleMaker} functionOnClickParam={setBattleStats}></Button>
        <div className='space'></div>
        <BattleLogCard battleStats={battleStats}></BattleLogCard>
      </div>
    </div>
  )
}

export default App
