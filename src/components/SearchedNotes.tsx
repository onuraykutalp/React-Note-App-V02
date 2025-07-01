import React, { useState } from 'react'
import type { Note } from '../types/Note'
import NoteList from './NoteList'
import { AnimatePresence, motion } from "motion/react"


interface SearchedNotesProps {
    notes: Note[],
    onDelete: (id: number) => void,
    onUpdate: (id: number, newText: string) => void;
}

export default function SearchedNotes({ notes, onDelete, onUpdate }: SearchedNotesProps) {

    const [searchTerm, setSearchTerm] = useState("")
    const [searchQuery, setSearchQuery] = useState("");

    //const searchedNotes = notes.filter((note => note.text.toLowerCase().includes(searchTerm.toLowerCase())))
    
    const handleSearch = () => {
        setSearchQuery(searchTerm.trim());
    }

    let filteredNotes: Note[] = [];

    if(searchQuery !== ""){
        filteredNotes = notes.filter((note => note.text.toLowerCase().includes(searchQuery.toLowerCase())));
    }

    return (
        <>

            <section className="container mx-auto py-10">
                <div className="flex items-center gap-3 justfiy-center">
                    <h2 className="text-semibold text-white text-md sm:text-md">Search Note</h2>
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="py-1.5 px-6 w-[150px] sm:w-auto rounded shadow placeholder-black" type="text" placeholder='Search Notes' />
                    <button onClick={handleSearch} className="py-1.5 px-6 rounded bg-white">Search</button>
                </div>
                <AnimatePresence>
                {
                    searchTerm.trim() !== "" && (
                        <motion.div
                            key={searchQuery}
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1, }}
                            exit={{ opacity: 0, y: 30, scale: 0.96, }}
                        >
                            <NoteList notes={filteredNotes} onDelete={onDelete} onUpdate={onUpdate} />
                        </motion.div>
                    )
                }
                </AnimatePresence>
            </section>
        </>
    )
}