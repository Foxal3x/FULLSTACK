import Note from './components/Note'
import { useState } from 'react'

const App = (props) => {
  const [newNote,setNewNote] = useState('A New Note ...')
  const [notes,setNotes] =useState(props.notes)
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll?notes:notes.filter((note)=>note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event)=>{
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}></input>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App