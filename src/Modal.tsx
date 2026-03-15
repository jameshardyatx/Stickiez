import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import ColorPicker from "./ColorPicker";
import type { NoteContent } from "./TNoteContent";

type ModalProps = {
    id: string,
    onDelete: (id: string) => void;
    onUpdate: (id: string, patch: Partial<Pick<NoteContent, "title" | "body" | "color">>) => void;
}

function Modal(props: ModalProps) {

    const [deleteStage, setDeleteStage] = useState(0);
    let deleteTimerId: number;

    function safeDelete(): void {
        if (deleteStage === 0) {
            setDeleteStage(1);
            deleteTimerId = setTimeout(() => { setDeleteStage(0) }, 3000);
        }
        else {
            setDeleteStage(0);
            clearTimeout(deleteTimerId);
            props.onDelete(props.id);
        }
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const clickRef = useOnclickOutside(() => {
        setModalIsOpen(false);
    });

    function toggleModal(): void {
        setModalIsOpen(!modalIsOpen);
    }

    return (
        <>
            <div className="modal" ref={clickRef}>
                <span onClick={toggleModal}>
                    {modalIsOpen ? "X" : "..."}
                </span>

                {modalIsOpen ?
                    <menu className="modal-menu animate__animated animate__bounceIn" >
                        <ColorPicker
                            id={props.id}
                            onUpdate={props.onUpdate}
                        />
                        <li><button
                            onClick={safeDelete}
                            className="delete-btn"
                        >
                            {deleteStage === 0 ? "Delete" : "Confirm?"}
                        </button></li>
                    </menu>
                    :
                    null

                }
                
            </div>

        </>
    )
}

export default Modal;