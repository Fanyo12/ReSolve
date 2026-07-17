import "../../styles/IncidentDetailsModal.css";

function IncidentDetailsModal({ incident, onClose }) {

    if (!incident) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Detalle de incidencia</h2>

                <div className="detail-item">
                    <strong>Ticket:</strong>
                    <span>IN-{String(incident.id).padStart(3, "0")}</span>
                </div>

                <div className="detail-item">
                    <strong>Título:</strong>
                    <span>{incident.description}</span>
                </div>

                <div className="detail-item">
                    <strong>Área:</strong>
                    <span>{incident.department}</span>
                </div>

                <div className="detail-item">
                    <strong>Estado:</strong>
                    <span>{incident.status}</span>
                </div>

                <div className="detail-item">
                    <strong>Prioridad:</strong>
                    <span>{incident.priority}</span>
                </div>

                <div className="detail-item">
                    <strong>Fecha:</strong>
                    <span>
                        {new Date(incident.report_date).toLocaleDateString("es-MX")}
                    </span>
                </div>

                <div className="detail-description">

                    <strong>Descripción</strong>

                    <p>{incident.description}</p>

                </div>

                <div className="modal-buttons">

                    <button
                        className="save-btn"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>

                </div>

            </div>

        </div>

    );

}

export default IncidentDetailsModal;