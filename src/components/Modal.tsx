type ModalProps = {
    onDelete: () => void;
    onCancel: () => void;
};

function Modal(props: ModalProps) {
    return (
        <div className="modal">
            <h2 className="modal__heading">Delete comment</h2>
            <p className="modal__text">
                Are you sure you want to delete this comment? This will remove
                the comment and can't be undone.
            </p>
            <div className="modal__buttons">
                <button
                    className="cancel-button"
                    type="button"
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.cursor = "pointer")
                    }
                    onClick={props.onCancel}
                >
                    NO, CANCEL
                </button>
                <button
                    className="delete-button"
                    type="button"
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.cursor = "pointer")
                    }
                    onClick={props.onDelete}
                >
                    YES, DELETE
                </button>
            </div>
        </div>
    );
}

export default Modal;
