import './App.css'
import createExorcist from '../components/exorcist/baseExorcist.jsx';
import createDemon from '../components/demons/baseDemon.jsx';

function App() {
  createExorcist();
  createDemon();

  return (
    <div className="App">
      <h1>RPG Chainsaw Man React</h1>
    </div>
  )
}

export default App
