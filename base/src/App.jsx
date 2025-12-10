import React from 'react'
import{ useState,useEffect} from 'react'
import Content from './components/Content'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ allPersons, setAllPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  const handleNameChange =(e)=>{
    setNewName(e.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addPerson=(e)=>{
    e.preventDefault()

    const person=allPersons.filter((p)=>p.name===newName)
    const personToAdd=person[0]
    const updatedPerson = {...personToAdd,number:newNumber}
    if(person.length!==0){
      if(window.confirm(`${personToAdd.name} is already added to the phonebook, replace the old number with a new one?`)){
        personService.update(updatedPerson.id,updatedPerson).then(returnedPerson=>{
          console.log(`${returnedPerson.name} successfully updated`)
          setAllPersons(allPersons.map(personItem=>personItem.id!==personToAdd.id?personItem:returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`${updatedPerson.name} was successfully updated`)
          setTimeout(()=>{setMessage('')},5000)
        }).catch((e)=>{
          console.log(e)
          setAllPersons(allPersons.filter(person=>person.id!==updatedPerson.id))
          setNewName('')
          setNewNumber('')
          setMessage(`[ERROR] ${updatedPerson.name} was already deleted from server`)
        })
        setTimeout(()=>{setMessage(null)},5000)
      }
    }else{
      console.log("ADDING PERSON")
      const personToAdd={name:newName,number:newNumber}
      personService.create(personToAdd).then(returnedPerson=>{
        setAllPersons(allPersons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`${returnedPerson.name} was successfully added`)
        console.log(returnedPerson)
        setTimeout(()=>{
          setMessage(null)
        },5000)
      })
      .catch(e=>{
        setMessage(`[ERROR] ${e.response.data.error}`)
        setTimeout(()=>{setMessage(null)},5000)
        console.log(e.response.data)
      })
    }
  }

  const handleFilterChange=(e)=>{
    setNewFilter(e.target.value)
    const regex = new RegExp(newFilter,'i')
    const filteredPersons =()=>allPersons.filter(person=>person.name.match(regex))
    console.log(regex)
    setPersons(filteredPersons)
  }

  const handleDelete=(id)=>{
    const filteredPersons = allPersons.filter(person=>person.id===id)
    const personName = filteredPersons[0].name
    const personId = filteredPersons[0].id
    if(window.confirm(`Delete ${personName} ?`)){
      personService.remove(personId)
      console.log(`${personName} successfully deleted`)
      setMessage(`${personName} was successfully deleted`)
      setAllPersons(allPersons.filter(person=>person.id!=personId))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Notification message={message}/>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Content persons={persons} allPersons={allPersons} deletePerson={handleDelete}/>
    </div>
  )
}

export default App