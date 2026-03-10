import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

type ModalProps = {
    id: string,
    onDelete: (id: string) => void;
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

    const ref = useOnclickOutside(() => {
        setModalIsOpen(false);
    });

    function toggleModal(): void {
        setModalIsOpen(!modalIsOpen);
    }

    return (
        <>
            <div className="modal" ref={ref}>
                <span onClick={toggleModal}>
                    {modalIsOpen ? "X" : "..."}
                </span>

                {modalIsOpen ?
                    <menu className="modal-menu" >
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