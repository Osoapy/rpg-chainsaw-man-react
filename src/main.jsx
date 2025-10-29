import { createRoot } from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Login from '../database_edit/pages/login/Login.jsx'
import ADM from '../database_edit/pages/adm/ADM.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/database" element={<Login />} />
      <Route path="/" element={<App />} />
      <Route path="/adm" element={<ADM />} />
    </Routes>
  </Router>
)
