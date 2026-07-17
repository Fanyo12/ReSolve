import "../../styles/IncidentTable.css";
import IncidentRow from "./IncidentRow";


function IncidentTable({
    incidents,
    onView,
    onEdit,
    onDelete
}) {
    return(

        <div className="incident-table">

            <table>

                <thead>

                    <tr>

                        <th>Ticket</th>

                        <th>Título</th>

                        <th>Área</th>

                        <th>Estado</th>

                        <th>Prioridad</th>

                        <th>Fecha</th>

                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {incidents.map((incident)=>(

                       <IncidentRow
    key={incident.id}
    incident={incident}
    onView={onView}
    onEdit={onEdit}
    onDelete={onDelete}
/>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default IncidentTable;