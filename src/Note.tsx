import { useState, useEffect } from "react";
import type { NoteContent } from "./TNoteContent";
import Modal from "./Modal";

type NoteProps = {
    note: NoteContent,
    onDelete: (id: string) => void;
    onUpdate: (id: string, patch: Partial<Pick<NoteContent, "title" | "body">>) => void;
}

async function copyNote(text: string): Promise<void> {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error: any) {
        console.error(error.message);
    }
}

function Note(props: NoteProps) {

    const [draftTitle, setDraftTitle] = useState(props.note.title);
    const [draftBody, setDraftBody] = useState(props.note.body);

    useEffect(() => {
        setDraftTitle(props.note.title);
        setDraftBody(props.note.body);
    }, [props.note.title, props.note.body]);

    function commitTitle() {
        const next = draftTitle.trimEnd();
        if (next !== props.note.title) props.onUpdate(props.note.id, { title: next });
    }
    function commitBody() {
        const next = draftBody.trimEnd();
        if (next !== props.note.body) props.onUpdate(props.note.id, { body: next });
    }

    return (
        <>
            <div className="note" >
                <div className="note-header">
                    <span
                        contentEditable suppressContentEditableWarning={true}
                        onInput={(e) => setDraftTitle(e.currentTarget.textContent ?? "")}
                        onBlur={commitTitle}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();     // prevent newline in title
                                e.currentTarget.blur(); // commit
                            }
                        }}
                    >
                        {props.note.title ? <h2 className="note-title">{props.note.title}</h2> : <h2 className="text-dim">Untitled note</h2>}
                    </span>

                    <Modal id={props.note.id} onDelete={props.onDelete} />
                </div>

                <hr />

                <span contentEditable
                    suppressContentEditableWarning={true}
                    onInput={(e) => setDraftBody(e.currentTarget.textContent ?? "")}
                    onBlur={commitBody}
                >
                    {props.note.body ? <p className="note-text">{props.note.body}</p> : <p className="text-dim">Click to edit...</p>}
                </span>

                <div className="note-buttons">
                    <button className="copy-btn" onClick={() => void copyNote(props.note.body)}>
                        Copy
                    </button>

                </div>
            </div>
        </>
    )
}

export default Note;