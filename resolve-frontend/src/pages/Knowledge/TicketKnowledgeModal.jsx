import { useEffect, useState } from "react";

import {
    getAvailableTickets,
    createTicketKnowledge
} from "../../services/knowledgeApi";

function TicketKnowledgeModal({

    onClose,
    onSuccess

}) {

    const [tickets, setTickets] = useState([]);

    const [selectedTicket, setSelectedTicket] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadTickets();

    }, []);

    async function loadTickets() {

        try {

            const response = await getAvailableTickets();

            setTickets(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function handleSave() {

        if (!selectedTicket) {

            alert("Selecciona un ticket.");

            return;

        }

        try {

            await createTicketKnowledge(selectedTicket);

            alert("Conocimiento agregado correctamente.");

            if (onSuccess) {

                await onSuccess();

            }

            onClose();

        } catch (error) {

    console.error(error);

    alert(

        error.response?.data?.message ||

        "Ocurrió un error."

    );

}

    }

    return (

    <div className="modal-overlay">


        <div className="modal-box ticket-modal">


            <h2>
                📋 Añadir conocimiento desde ticket
            </h2>


            <p>
                Selecciona una incidencia resuelta para agregarla a la base de conocimiento.
            </p>



            {
                loading ? (

                    <p>
                        Cargando tickets...
                    </p>


                ) : (


                    <div className="ticket-list">


                        {
                            tickets.length === 0 ? (

                                <p>
                                    No hay tickets disponibles.
                                </p>


                            ) : (


                                tickets.map((ticket)=>(


                                    <div

                                        key={ticket.id}

                                        className={
                                            selectedTicket == ticket.id
                                            ? "ticket-item selected"
                                            : "ticket-item"
                                        }


                                        onClick={()=>
                                            setSelectedTicket(ticket.id)
                                        }

                                    >


                                        <h4>
                                            {ticket.folio}
                                        </h4>


                                        <p>
                                            <strong>
                                                Problema:
                                            </strong>

                                            {" "}

                                            {ticket.description}
                                        </p>


                                        <p>
                                            <strong>
                                                Departamento:
                                            </strong>

                                            {" "}

                                            {ticket.department}
                                        </p>


                                        <p>
                                            <strong>
                                                Categoría:
                                            </strong>

                                            {" "}

                                            {ticket.category}
                                        </p>


                                    </div>


                                ))

                            )


                        }


                    </div>


                )
            }



            <div className="ticket-actions">


                <button

                    onClick={handleSave}

                >
                    Guardar
                </button>



                <button

                    onClick={onClose}

                >
                    Cancelar
                </button>


            </div>



        </div>


    </div>
    );

}

export default TicketKnowledgeModal;