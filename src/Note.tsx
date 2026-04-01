import { useState, useEffect } from "react";
import type { NoteContent } from "./TNoteContent";
import Modal from "./Modal";
import 'animate.css';
import PlayAnimation from "./PlayAnimation";

type NoteProps = {
    note: NoteContent,
    renderOrder: number,
    onDelete: (id: string) => void,
    onUpdate: (id: string, patch: Partial<Pick<NoteContent, "title" | "body" | "color">>) => void,
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
    }, [props.note.title, props.note.body, props.note.color]);

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
            <div
                className="note animate__animated animate__fadeIn"
                data-color={props.note.color ? props.note.color : "white"}
                style={{ "--animation-offset": `${props.renderOrder * 100}ms` } as React.CSSProperties}
            >
                <div className="note-header">
                    <span
                        className="editable note-title"
                        contentEditable
                        suppressContentEditableWarning={true}
                        onInput={(e) => setDraftTitle(e.currentTarget.innerText ?? "")}
                        onBlur={commitTitle}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();     // prevent newline in title
                                e.currentTarget.blur(); // commit
                            }
                        }}
                    >
                        {props.note.title}
                    </span>

                    <Modal
                        id={props.note.id}
                        onDelete={props.onDelete}
                        onUpdate={props.onUpdate}
                    />
                </div>

                <hr />

                <span
                    className="editable note-text"
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={(e) => setDraftBody(e.currentTarget.innerText ?? "")}
                    onBlur={commitBody}
                >
                    {props.note.body}
                </span>

                <div className="note-buttons">
                    <button
                        className="copy-btn"
                        onClick={(e) => {
                            copyNote(props.note.body);
                            PlayAnimation(e.currentTarget, "rubberBand");
                        }}>
                        Copy
                    </button>

                </div>
            </div>
        </>
    )
}

export default Note;