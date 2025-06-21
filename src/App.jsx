import './App.css'
import createExorcist from './utils/exorcist/baseExorcist.jsx';
import createDemon from './utils/demons/baseDemon.jsx';
import ValueChanger from './components/ValueChanger/ValueChanger.jsx';
import battleMaker from './utils/battle/battleMaker.jsx';

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
      <h1>RPG Chainsaw Man React</h1>
      <ValueChanger value="10"/>
    </div>
  )
}

export default App
