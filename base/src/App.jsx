import React from 'react'
import{ useState,useEffect} from 'react'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ allPersons, setAllPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange =(e)=>{
    setNewName(e.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addPerson=(e)=>{
    e.preventDefault()
    console.log("ADDING PERSON")
    const personToAdd={name:newName,number:newNumber}
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App