import './App.scss'
import { useEffect, useState  } from 'react';
import battleMaker from './utils/battle/battleMaker.jsx';
import SiteHeader from './components/header/SiteHeader.jsx';
import ButtonsAndAmount from './components/buttonsAndAmount/ButtonsAndAmount.jsx';
import Button from './components/button/Button.jsx';
import BattleLogCard from './components/card/BattleLogCard.jsx';  
import getDocFromFirestore from './database/Firebase.jsx';

function App() {
  const [battleStats, setBattleStats] = useState({});
  const [demonBattleAttributes, setDemonBattleAttributes] = useState({});
  const [exorcistBattleAttributes, setExorcistBattleAttributes] = useState({});
  const storedExorcistAttributes = ["defense", "attackDice", "damageDice"];
  const levelsOfDemons = ["demon1", "demon2", "demon3", "demon4", "demon5", "demon6"];

  useEffect(() => {
    const fetchDemons = async () => {
      const demonsData = {};
      try {
        for (const level of levelsOfDemons) {
          const data = await getDocFromFirestore("Demon", level);
          console.log(`Fetched ${level}:`, data);
          demonsData[level] = data;
        }

        setDemonBattleAttributes(demonsData);
        console.log("✅ demonBattleAttributes atualizados:", demonsData); // use o objeto local, não o estado

      } catch (error) {
        console.error("Erro ao buscar demons:", error);
      }
    };

    fetchDemons();
  }, []);

  useEffect(() => {
    const fetchAttributes = async () => {
      const attributesData = {};
      try {
        for (const storedAttribute of storedExorcistAttributes) {
          const data = await getDocFromFirestore("Attributes", storedAttribute);
          console.log(`Fetched ${storedAttribute}:`, data);
          attributesData[storedAttribute] = data;
        }

        setExorcistBattleAttributes(attributesData);
        console.log("✅ exorcistBattleAttributes atualizados:", attributesData); // use o objeto local, não o estado

      } catch (error) {
        console.error("Erro ao buscar battleAttributes:", error);
        return null;
      }
    };

    fetchAttributes();
  }, []);

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
          <Button 
            label={"BATALHAR"} 
            functionOnClick={() => {
              if (!demonBattleAttributes || Object.keys(demonBattleAttributes).length === 0) {
                console.warn("⚠️ Demon data ainda não carregado!");
                return;
              }
              if (!exorcistBattleAttributes || Object.keys(exorcistBattleAttributes).length === 0) {
                console.warn("⚠️ Exorcist data ainda não carregado!");
                return;
              }
              battleMaker(setBattleStats, demonBattleAttributes, exorcistBattleAttributes);
            }}
          ></Button>
        </div>
        <BattleLogCard battleStats={battleStats}></BattleLogCard>
      </div>
    </div>
  )
}

export default App
