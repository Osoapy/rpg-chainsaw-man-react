import React, { useEffect, useState } from 'react'
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, app } from '../../config/Firebase.jsx'
import './ADM.scss'

function isPrimitive(value) {
  return value === null || ['string', 'number', 'boolean'].includes(typeof value)
}

function parseInput(value) {
  const l = value.trim()
  if (l === '') return ''
  if (l === 'true') return true
  if (l === 'false') return false
  if (l === 'null') return null
  if (!Number.isNaN(Number(l)) && l.match(/^[-+]?[0-9]*\.?[0-9]+$/)) return Number(l)
  return l
}

function ObjectEditor({ data, onChange, path = '' }) {
  if (isPrimitive(data)) {
    return (
      <input
        className="node-input"
        value={data ?? ''}
        onChange={(e) => onChange(path, parseInput(e.target.value))}
      />
    )
  }

  if (typeof data === 'object') {
    return (
      <div className="object-editor">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="object-field">
            <label>{key}</label>
            <ObjectEditor
              data={value}
              onChange={onChange}
              path={path ? `${path}.${key}` : key}
            />
          </div>
        ))}
      </div>
    )
  }

  return <span>Unsupported</span>
}

export default function ADM() {
  const [user, setUser] = useState(null)
  const [data, setData] = useState({})
  const db = getFirestore(app)

  // coleções que tu quer exibir
  const COLLECTIONS = ['Demon']

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [])

  useEffect(() => {
    const fetchAll = async () => {
      const allCollections = {}
      for (const collName of COLLECTIONS) {
        const collSnap = await getDocs(collection(db, collName))
        allCollections[collName] = {}
        collSnap.forEach((docSnap) => {
          allCollections[collName][docSnap.id] = docSnap.data()
        })
      }
      setData(allCollections)
    }

    fetchAll().catch(console.error)
  }, [db])

  const handleLocalChange = (path, value) => {
    const keys = path.split('.')
    setData((prev) => {
      const updated = structuredClone(prev)
      let obj = updated
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {}
        obj = obj[keys[i]]
      }
      obj[keys[keys.length - 1]] = value
      return updated
    })
  }

  const handleSave = async () => {
    for (const [collName, docs] of Object.entries(data)) {
      for (const [docId, docData] of Object.entries(docs)) {
        await setDoc(doc(db, collName, docId), docData)
      }
    }
    alert('Alterações salvas no Firestore!')
  }

  const handleLogout = async () => await signOut(auth)

  if (!user) return <div className="login-warning">Você precisa estar logado como ADM.</div>

  return (
    <div className="adm-page">
      <div className="adm-header">
        <h1>Painel de Administração</h1>
        <button className="logout-btn" onClick={handleLogout}>Sair</button>
      </div>
      <div className="editor-container">
        {Object.entries(data).map(([collectionName, docs]) => (
          <div key={collectionName} className="collection-block">
            <h2>{collectionName}</h2>
            {Object.entries(docs).map(([docId, docData]) => (
              <div key={docId} className="document-block">
                <h3>{docId}</h3>
                <ObjectEditor
                  data={docData}
                  onChange={(path, value) =>
                    handleLocalChange(`${collectionName}.${docId}.${path}`, value)
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="save-btn" onClick={handleSave}>Salvar no Firestore</button>
    </div>
  )
}
