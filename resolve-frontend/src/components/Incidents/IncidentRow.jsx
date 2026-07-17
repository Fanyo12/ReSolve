import { Eye, Pencil, Trash2 } from "lucide-react";

function IncidentRow({
    incident,
    onView,
    onEdit,
    onDelete
}) {

    return (

        <tr>

            <td>
    INC-{String(incident.id).padStart(3, "0")}
</td>
<td>{incident.title}</td>

<td>{incident.department}</td>

            <td>

                <span className={`status ${incident.status.toLowerCase().replace(" ", "-")}`}>

                    {incident.status}

                </span>

            </td>

            <td>

                <span className={`priority ${incident.priority.toLowerCase()}`}>

                    {incident.priority}

                </span>

            </td>

            <td>
    {new Date(incident.report_date).toLocaleDateString("es-MX")}
</td>
            <td className="actions">

                <Eye
                    size={18}
                    onClick={() => onView(incident)}
                />

                <Pencil
                    size={18}
                    onClick={() => onEdit(incident)}
                />

                <Trash2
                    size={18}
                    onClick={() => {

                        const confirmDelete = window.confirm(
                            `¿Deseas eliminar la incidencia "${incident.title}"?`
                        );

                        if (confirmDelete) {

                            onDelete(incident.id);

                        }

                    }}
                />

            </td>

        </tr>

    );

}

export default IncidentRow;