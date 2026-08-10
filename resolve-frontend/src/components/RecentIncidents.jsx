import "../styles/RecentIncidents.css";

function RecentIncidents({ incidents }) {


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

                {
                    incidents.map((incident)=>(

                        <tr key={incident.id}>


                            <td>
                                INC-{String(incident.id).padStart(3,"0")}
                            </td>


                            <td>
                                {incident.department}
                            </td>


                            <td>

                                <span 
                                className={`status ${incident.status.replace(" ","-")}`}
                                >

                                    {incident.status}

                                </span>

                            </td>


                            <td>

                                <span 
                                className={`priority ${incident.priority.toLowerCase()}`}
                                >

                                    {incident.priority}

                                </span>

                            </td>


                        </tr>

                    ))
                }


            </tbody>


        </table>


    </div>

);


}

export default RecentIncidents;