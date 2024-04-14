import { useState, useEffect } from 'react'
import './App.css'
import Animal from './components/Animal'

function App() {
  const [animals, setAnimals] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const q = localStorage.getItem('searchAnimal') || ''
    searchAnimals(q)
  }, [])

  const searchAnimals = async (q) => {
    localStorage.setItem('searchAnimal', q)
    const res = await fetch(`http://localhost:8080?` + new URLSearchParams({ q }))
    const data = await res.json()
    setAnimals(data)
    setSearch(q)
  }

  return (
    <>
      <h1>Animal Farm</h1>
      <div>
        <input value={search} onChange={v => searchAnimals(v.target.value)}/>
        <ul>
          {animals.map(animal => <Animal key={animal.id} id={animal.id} name={animal.name} age={animal.age} />)}
          {animals.length === 0 && <p>No animals found</p>}
        </ul>
      </div>
    </>
  )
}

export default App
