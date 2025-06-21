import './App.scss'
import createExorcist from './utils/exorcist/baseExorcist.jsx';
import createDemon from './utils/demons/baseDemon.jsx';
import ValueChanger from './components/ValueChanger/ValueChanger.jsx';
import battleMaker from './utils/battle/battleMaker.jsx';
import SiteHeader from './components/header/SiteHeader.jsx';
import MultipleButtons from './components/radioButtons/multipleButtons/MultipleButtons.jsx';

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
        <MultipleButtons field={"exorcistType"} type={"exorcist"} names={["Operador", "Encarregado", "Supervisor", "Chefia", "Adjunto", "Executivo"]}></MultipleButtons>
        <MultipleButtons field={"demonType"} type={"demon"} names={["Demônio lvl 1", "Demônio lvl 2", "Demônio lvl 3", "Demônio lvl 4", "Demônio lvl 5", "Demônio Especial"]}></MultipleButtons>
      </div>
    </div>
  )
}

export default App
