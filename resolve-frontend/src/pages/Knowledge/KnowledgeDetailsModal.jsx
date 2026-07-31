import "./Knowledge.css";


function KnowledgeDetailsModal({

    knowledge,

    onClose

}){


    return(

        <div className="modal-overlay">


            <div className="modal">


                <h2>

                    {
                        knowledge.type === "ticket"

                        ? "📋 Solución de incidencia"

                        : "📚 Detalle del conocimiento"

                    }

                </h2>


                <hr/>


                <h3>

                    {knowledge.title}

                </h3>



                <p>

                    <strong>
                        📍 Departamento:
                    </strong>

                    {" "}

                    {knowledge.location}

                </p>



                <p>

                    <strong>
                        📂 Categoría:
                    </strong>

                    {" "}

                    {knowledge.category}

                </p>



                <p>

                    <strong>
                        ❌ Problema:
                    </strong>

                </p>


                <p>

                    {knowledge.problem}

                </p>



                <p>

                    <strong>
                        ✅ Solución:
                    </strong>

                </p>


                <p>

                    {
                        knowledge.solution
                        ?
                        knowledge.solution
                        :
                        "Sin solución registrada"
                    }

                </p>



                {

                    knowledge.type === "ticket" &&

                    <p>

                        <strong>
                            🔗 Ticket relacionado:
                        </strong>

                        {" "}

                        #{knowledge.ticket_id}

                    </p>

                }



                <button

                    onClick={onClose}

                >

                    Cerrar

                </button>


            </div>


        </div>

    );

}


export default KnowledgeDetailsModal;