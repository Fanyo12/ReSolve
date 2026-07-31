function AddKnowledgeModal({
    onClose,
    onTicket,
    onManual
}) {


    return (

        <div className="modal-overlay">


            <div className="modal-box add-knowledge-modal">


                <h2>
                    ➕ Añadir conocimiento
                </h2>


                <p>
                    Selecciona una opción
                </p>



                <div className="add-options">


                    <button
                        className="knowledge-option ticket-option"
                        onClick={onTicket}
                    >

                        📋

                        <span>
                            Usar solución de ticket
                        </span>

                    </button>



                    <button
                        className="knowledge-option manual-option"
                        onClick={onManual}
                    >

                        ✏️

                        <span>
                            Crear conocimiento manual
                        </span>

                    </button>


                </div>



                <button
                    className="close-modal-btn"
                    onClick={onClose}
                >

                    Cancelar

                </button>


            </div>


        </div>

    );

}


export default AddKnowledgeModal;