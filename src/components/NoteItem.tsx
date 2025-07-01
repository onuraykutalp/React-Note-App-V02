
import { useState } from 'react'
import type { Note } from '../types/Note'

interface NoteItemProps {
  note: Note,
  onDelete: (id: number) => void,
  onUpdate: (id: number, newText: string) => void,
}


export default function NoteItem({ note, onDelete, onUpdate }: NoteItemProps) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);

  const handleSave = () => {
    if (editedText.trim() === "") return
    onUpdate(note.id, editedText);
    setIsEditing(false);
  }
    const handleCancel = () => {
    setEditedText(note.text);
    setIsEditing(false);
  };

  return (
    <div>
      <div key={note.id} className="bg-white mt-6 px-5 rounded-sm py-4 pb-16 h-fit relative">
        <div>
          {isEditing ? (
            <input
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              maxLength={200}
              type="text"
              placeholder="Add note..."
              className="p-3 border-gray-500 w-full border rounded placeholder-black"
            />
          ) :
            <p className="p-x text-sm sm:text-lg">{note.text}</p>
          }
         <p className="text-black text-xs sm:text-lg absolute bottom-3 sm:bottom-5 left-4 sm:left-5">{note.createdAt}</p>
        </div>
        <div className="flex md:flex-row">
         
          {
            isEditing ? (
              <>
                <button onClick={handleSave} className="absolute bottom-2 right-24 sm:right-32 bg-blue-700 px-4 sm:px-5 py-1.5 rounded text-white text-xs sm:text-lg">Save</button>
                <button onClick={handleCancel} className="absolute bottom-2 right-5 bg-red-700 px-4 py-1.5 sm:px-5 text-xs sm:text-lg rounded text-white">Cancel</button>
              </>
            ) :
              (
                <div>
                  <button onClick={() => { setEditedText(note.text); setIsEditing(true); }} 
                  className="absolute bottom-2 right-24 sm:right-32 bg-blue-700 px-4 sm:px-5 py-1.5 rounded text-white text-xs sm:text-lg">Edit</button>
                  <button onClick={() => onDelete(note.id)} className="absolute bottom-2 right-5 bg-red-700 px-4 py-1.5 sm:px-5 text-xs sm:text-lg rounded text-white">Delete</button>
                </div>
              )
          }


        </div>
      </div>
    </div>
  )
}