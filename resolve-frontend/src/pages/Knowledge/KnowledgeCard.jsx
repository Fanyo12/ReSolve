function KnowledgeCard({ item, onClick }) {

    return (

        <div
            className="knowledge-card"
            onClick={() => onClick(item)}
        >

            <h3>
                {item.title}
            </h3>


            <p>

                <strong>
                    Problema:
                </strong>

                {" "}

                {item.problem}

            </p>


            <small>

                Tipo:

                {" "}

                {
                    item.type === "ticket"
                    ? "📋 Ticket"
                    : "✏️ Manual"
                }

            </small>


            <br />


            <small>

                Categoría:

                {" "}

                {item.category || "Sin categoría"}

            </small>


        </div>

    );

}


export default KnowledgeCard;