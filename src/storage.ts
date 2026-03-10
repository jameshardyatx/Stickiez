import type { NoteContent } from "./TNoteContent";

const STORAGE_KEY = "notes";

const introNote = {
    id: "introNote",
    title: "Hello!",
    body: "Welcome to StickiEZ. This is a sticky notes app designed with security, usability, and speed in mind."
}

export function loadNotesFromStorage(): NoteContent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return []; // nothing stored yet

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