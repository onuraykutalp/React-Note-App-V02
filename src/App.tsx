import { useEffect, useState } from 'react'
import './App.css'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import SearchedNotes from './components/SearchedNotes'

interface Note {
  id: number,
  text: string,
  createdAt: string,
}


function App() {

  const [noteText, setNoteText] = useState("")
  const [notes, setNotes] = useState<Note[]>([])
  const [charLength, setCharLength] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteText(e.target.value);
  }

  

  const addNote = () => {
    if (noteText.trim() === "") return
    const newNote = {
      id: Date.now(),
      text: noteText,
      createdAt: new Date().toLocaleDateString()
    }
    setNotes([...notes, newNote]);
    setNoteText("");
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    setCharLength(noteText.length);
  }, [charLength])

   const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  
    const editNote = (id: number) => {
      setEditingNoteId(id);
    }
  
    const updateNote = (id: number, newText: string) => {
      setNotes(prev => prev.map(note => note.id === id ? {...note, text: newText}: note))
      setEditingNoteId(null);
    }

  return (
    <div className="bg-blue-900 h-screen">
      <header className="container mx-auto px-4 py-10 text-white rounded">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="font-bold text-3xl">Note App</h1>
          <p className="font-semibold text-lg">Take your notes</p>
        </div>
      </header>
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 justify-between">
        <section className="container mx-auto px-4 py-10">
          <h2 className="text-semibold text-white text-xl">Add Your Note</h2>
          <div className="items-center gap-3 mt-8">
            <NoteForm noteText={noteText} onChange={handleChange} onAdd={addNote} />
          </div>
        </section>

        <SearchedNotes notes={notes} onDelete={deleteNote} onUpdate={editNote}/>

      </div>
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-semibold text-white text-xl">All Your Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 mt-4">
          <NoteList notes={notes} onDelete={deleteNote} onUpdate={updateNote}/>
        </div>
      </section>
    </div>
  )
}

export default App
