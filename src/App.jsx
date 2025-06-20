import './App.css'
import createExorcist from './utils/exorcist/baseExorcist.jsx';
import createDemon from './utils/demons/baseDemon.jsx';
import ValueChanger from './components/ValueChanger/ValueChanger.jsx';

function App() {
  createExorcist("executive");
  createDemon();

  return (
    <div className="App">
      <h1>RPG Chainsaw Man React</h1>
      <ValueChanger value="10"/>
    </div>
  )
}

export default App
