import { useState } from 'react'
import './App.css'
import Note from './Note';
import AddButton from './AddButton';
import noteExamples from './NoteExamples';
import type {NoteContent} from './TNoteContent';

function App() {

  const [notes, setNotes] = useState(noteExamples);

  function addNote(): void {
    console.log("new note added");
    const newNote = {
      title: "",
      body: "",
      id: `note${notes.length + 1}`
    }

    setNotes([...notes, newNote]);
  }

  function deleteNote(id: string): void {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }

  function updateNote(id: string, patch: Partial<Pick<NoteContent, "title" | "body">>) {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, ...patch } : n))
    );
    console.log(`Updated note: ${id}`)
  }

  return (
    <>
      <h1 className="title">My StickiEZ</h1>

      {notes.map(note => (
        <Note
          key={note.id}
          note={{ title: note.title, body: note.body, id: note.id }}
          onDelete={deleteNote}
          onUpdate={updateNote}
        />
      ))}

      <AddButton onAdd={addNote} />
    </>
  )
}

export default App
