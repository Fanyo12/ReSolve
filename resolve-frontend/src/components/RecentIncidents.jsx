import "../styles/RecentIncidents.css";

function RecentIncidents() {

    const incidents = [

        {
            id:"INC-001",
            area:"Recepción",
            status:"Pendiente",
            priority:"Alta"
        },

        {
            id:"INC-002",
            area:"Recursos Humanos",
            status:"Resuelta",
            priority:"Baja"
        },

        {
            id:"INC-003",
            area:"Sistemas",
            status:"En proceso",
            priority:"Media"
        },

        {
            id:"INC-004",
            area:"Cocina",
            status:"Pendiente",
            priority:"Alta"
        }

    ];

    return(

        <div className="recent-card">

            <h2>📋 Incidencias recientes</h2>

            <table>

                <thead>

                    <tr>

                        <th>Ticket</th>

                        <th>Área</th>

                        <th>Estado</th>

                        <th>Prioridad</th>

                    </tr>

                </thead>

                <tbody>

                    {incidents.map((incident)=>(

                        <tr key={incident.id}>

                            <td>{incident.id}</td>

                            <td>{incident.area}</td>

                            <td>

                                <span className={`status ${incident.status.replace(" ","-")}`}>

                                    {incident.status}

                                </span>

                            </td>

                            <td>

                                <span className={`priority ${incident.priority}`}>

                                    {incident.priority}

                                </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default RecentIncidents;