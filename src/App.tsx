import { useEffect, useState } from "react";
import "./App.css";
import Note from "./Note";
import AddButton from "./AddButton";
import type { NoteContent } from "./TNoteContent";
import { loadNotesFromStorage, saveNotesToStorage } from "./storage";

function App() {
  const [notes, setNotes] = useState<NoteContent[]>(() => loadNotesFromStorage());

  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

  function addNote(): void {
    setNotes((prev) => [
      ...prev,
      {
        title: "",
        body: "",
        id: crypto.randomUUID(),
      },
    ]);
  }

  function deleteNote(id: string): void {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  function updateNote(
    id: string,
    patch: Partial<Pick<NoteContent, "title" | "body">>
  ) {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch } : n)));
  }

  return (
    <>
      <h1 className="title">My StickiEZ</h1>

      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDelete={deleteNote}
          onUpdate={updateNote}
        />
      ))}

      <AddButton onAdd={addNote} />
    </>
  );
}

export default App;