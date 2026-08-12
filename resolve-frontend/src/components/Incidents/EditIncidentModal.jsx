import { useState } from "react";
import "../../styles/NewIncidentModal.css";
import { updateIncident as updateIncidentApi } from "../../services/incidentApi";

function EditIncidentModal({ incident, onClose, updateIncident }) {

    const [title, setTitle] = useState(incident.title || "");
    const [area, setArea] = useState(incident.area || "");
    const [priority, setPriority] = useState(incident.priority || "");
    const [status, setStatus] = useState(incident.status || "");
    const [description, setDescription] = useState(
        incident.description || ""
    );

    const [solution, setSolution] = useState(
        incident.solution || ""
    );

    const handleSave = async () => {

        try {

            const data = {

                title,
                description,
                priority,
                status,

                department_id: incident.department_id,
                category_id: incident.category_id,
                reported_by: incident.reported_by,
                room_number: incident.room_number,

                solution: status === "cerrado"
                    ? solution
                    : incident.solution,

                observations: incident.observations,
                external_provider: incident.external_provider,
                provider_name: incident.provider_name,
                due_date: incident.due_date,
                assigned_to: incident.assigned_to,
                publish_library: incident.publish_library

            };

            const updated = await updateIncidentApi(
                incident.id,
                data
            );

            console.log("RESPUESTA UPDATE:", updated);

            updateIncident(updated.data);

            onClose();

        } catch (error) {

            console.log(
                "ERROR UPDATE:",
                error.response?.data || error
            );

            alert("No se pudo actualizar la incidencia.");

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Editar incidencia</h2>

                <div className="form-group">

                    <label>Título</label>

                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                </div>

                <div className="form-group">

                    <label>Área</label>

                    <select
                        value={area}
                        onChange={(e) =>
                            setArea(e.target.value)
                        }
                    >

                        <option>Recepción</option>
                        <option>Sistemas</option>
                        <option>RH</option>
                        <option>Cocina</option>
                        <option>Ventas</option>

                    </select>

                </div>

                <div className="form-group">

                    <label>Estado</label>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >

                        <option value="pendiente">
                            Pendiente
                        </option>

                        <option value="en_proceso">
                            En proceso
                        </option>

                        <option value="resuelto">
                            Resuelto
                        </option>

                        <option value="cerrado">
                            Cerrado
                        </option>

                    </select>

                </div>

                {status === "cerrado" && (

                    <div className="form-group">

                        <label>Solución de la incidencia</label>

                        <textarea
                            rows="5"
                            value={solution}
                            onChange={(e) =>
                                setSolution(e.target.value)
                            }
                            placeholder="Describe la solución aplicada a la incidencia..."
                        />

                    </div>

                )}

                <div className="form-group">

                    <label>Prioridad</label>

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                    >

                        <option>Alta</option>
                        <option>Media</option>
                        <option>Baja</option>

                    </select>

                </div>

                <div className="form-group">

                    <label>Descripción</label>

                    <textarea
                        rows="5"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                </div>

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        className="save-btn"
                        onClick={handleSave}
                    >
                        Guardar cambios
                    </button>

                </div>

            </div>

        </div>

    );

}

export default EditIncidentModal;