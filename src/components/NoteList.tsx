
import NoteItem from './NoteItem'
import type { Note } from '../types/Note'

interface NoteListProps {
    notes: Note[],
    onDelete: (id: number) => void,
    onUpdate: (id: number, newText: string) => void,
}

export default function NoteList({ notes, onDelete, onUpdate}: NoteListProps) {
 
  return (
    <>
      {notes.length > 0 ? (
        notes.map(note => (
          <NoteItem key={note.id} note={note} onDelete={onDelete} onUpdate={onUpdate} />
        ))
      ) : (
        <p className="text-white text-md">No notes available.</p>
      )}
    </>
  )
}