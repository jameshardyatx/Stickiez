import { useState, useEffect } from "react";
import type { NoteContent } from "./TNoteContent";
import Modal from "./Modal";

type NoteProps = {
    note: NoteContent,
    onDelete: (id: string) => void;
    onUpdate: (id: string, patch: Partial<Pick<NoteContent, "title" | "body" | "color">>) => void;
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
    const [currentColor, setCurrentColor] = useState(props.note.color);

    useEffect(() => {
        setDraftTitle(props.note.title);
        setDraftBody(props.note.body);
        setCurrentColor(props.note.color);
    }, [props.note.title, props.note.body, props.note.color]);

    function commitTitle() {
        const next = draftTitle.trimEnd();
        if (next !== props.note.title) props.onUpdate(props.note.id, { title: next });
    }

    function commitBody() {
        const next = draftBody.trimEnd();
        if (next !== props.note.body) props.onUpdate(props.note.id, { body: next });
    }

    // function toggleEditable(event: React.MouseEvent<HTMLElement>) {
    //     const el = event.target as HTMLElement;
    //     el.contentEditable = el.contentEditable === "true" ? "false" : "true";
    //     // if(el.contentEditable !== "true") {
    //     //     el.contentEditable = "true";
    //     // }
    // }

    return (
        <>
            <div className="note" data-color={props.note.color ? props.note.color : "white"}>
                <div className="note-header">
                    <span
                        className="editable"
                        contentEditable
                        suppressContentEditableWarning={true}
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

                    <Modal 
                        id={props.note.id} 
                        onDelete={props.onDelete}
                        onUpdate={props.onUpdate}
                    />
                </div>

                <hr />

                <span
                    className="editable" 
                    contentEditable
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