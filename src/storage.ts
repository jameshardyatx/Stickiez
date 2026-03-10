import type { NoteContent } from "./TNoteContent";

const STORAGE_KEY = "notes";

const introNote: NoteContent = {
    id: "introNote",
    title: "Hello!",
    body: "Welcome to StickiEZ! This is a sticky notes app designed with security, usability, and speed in mind. Click on the title or body of a note to modify it. Feel free to delete this note by clicking the ... menu, and create a new note with the add button in the bottom right."
}

export function loadNotesFromStorage(): NoteContent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // if (!raw) return []; // nothing stored yet

    if (!raw) {
      const introArray = [];
      introArray.push(introNote);
      return introArray;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Minimal runtime validation + normalization:
    return parsed
      .filter((n): n is Record<string, unknown> => typeof n === "object" && n !== null)
      .map((n) => ({
        id: typeof n.id === "string" ? n.id : crypto.randomUUID(),
        title: typeof n.title === "string" ? n.title : "",
        body: typeof n.body === "string" ? n.body : "",
      }));
  } catch {
    return [];
  }
}

export function saveNotesToStorage(notes: NoteContent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}