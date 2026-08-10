import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import "../../styles/Incidents.css";

import NewIncidentButton from "../../components/Incidents/NewIncidentButton";
import IncidentFilters from "../../components/Incidents/IncidentFilters";
import IncidentTable from "../../components/Incidents/IncidentTable";
import NewIncidentModal from "../../components/Incidents/NewIncidentModal";
import IncidentDetailsModal from "../../components/Incidents/IncidentDetailsModal";
import EditIncidentModal from "../../components/Incidents/EditIncidentModal";


import { 
    getIncidents,
    deleteIncident as deleteIncidentApi
} from "../../services/incidentApi";

function Incidents() {

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [search, setSearch] = useState("");
    const [areaFilter, setAreaFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [editingIncident, setEditingIncident] = useState(null);

    const user = JSON.parse(
    localStorage.getItem("user")
);

const role = user?.role;

    const [selectedIncident, setSelectedIncident] = useState(null);

     const [incidents, setIncidents] = useState([]);    
    useEffect(() => {

    loadIncidents();

}, []);

const loadIncidents = async () => {

    try {

        const data = await getIncidents();

        console.log("INCIDENCIAS:", data);

        setIncidents(data);

    } catch (error) {

        console.error("Error cargando incidencias:", error);

    }

};

    const addIncident = (incident) => {

    setIncidents(prev => [
        incident,
        ...prev
    ]);

};

    

const deleteIncident = async (id) => {

    try {

        await deleteIncidentApi(id);

        setIncidents(prev =>
            prev.filter(
                incident => incident.id !== id
            )
        );

    } catch (error) {

        console.error("Error eliminando incidencia:", error);

        alert("No se pudo eliminar la incidencia.");

    }

};

const updateIncident = async () => {

    await loadIncidents();

    setShowEditModal(false);

};

const filteredIncidents = incidents.filter((incident) => {

    const text = search.toString().toLowerCase().trim();


    const searchableFields = [

        incident.id,

        String(incident.id).padStart(3, "0"),

        `INC-${String(incident.id).padStart(3, "0")}`,

        incident.folio,

        incident.title,

        incident.description,

        incident.department,

        incident.category,

        incident.status,

        incident.priority,

        incident.reported_by,

        incident.room_number,

        incident.report_date,

        incident.report_time

    ]
    .filter(Boolean)
    .map(value =>
        value.toString().toLowerCase()
    );


    const matchesSearch = searchableFields.some(field =>
        field.includes(text)
    );


    const matchesArea =
        areaFilter === "" ||
        incident.department === areaFilter;


    const matchesStatus =
        statusFilter === "" ||
        incident.status === statusFilter;


    const matchesPriority =
        priorityFilter === "" ||
        incident.priority === priorityFilter;


    return (
        matchesSearch &&
        matchesArea &&
        matchesStatus &&
        matchesPriority
    );

});
const areas = [
    ...new Set(
        incidents.map(
            incident => incident.department
        )
    )
];


const statuses = [
    ...new Set(
        incidents.map(
            incident => incident.status
        )
    )
];


const priorities = [
    ...new Set(
        incidents.map(
            incident => incident.priority
        )
    )
];
    return (

        <Layout>

            <div className="incidents-header">

                <div>

                    <h1>Incidencias</h1>

                    <p>
                        Administra todas las incidencias registradas.
                    </p>

                </div>

                {
    (role === "admin" || role === "tecnico") && (

        <NewIncidentButton
            onClick={() => {

                setEditingIncident(null);

                setShowModal(true);

            }}
        />

    )
}


            </div>

            <IncidentFilters
    search={search}
    setSearch={setSearch}
    areaFilter={areaFilter}
    setAreaFilter={setAreaFilter}
    statusFilter={statusFilter}
    setStatusFilter={setStatusFilter}
    priorityFilter={priorityFilter}
    setPriorityFilter={setPriorityFilter}
    areas={areas}
    statuses={statuses}
    priorities={priorities}
/>

           <IncidentTable

    incidents={filteredIncidents}

    role={role}

    onView={(incident) => {

        setSelectedIncident(incident);

    }}

    onEdit={(incident) => {

        setEditingIncident(incident);

        setShowEditModal(true);

    }}

    onDelete={deleteIncident}

/>

            {showModal && (

                <NewIncidentModal

    onClose={() => setShowModal(false)}

    addIncident={addIncident}

/>

            )}

            {selectedIncident && (

                <IncidentDetailsModal

                    incident={selectedIncident}

                    onClose={() => setSelectedIncident(null)}

                />

            )}

            {showEditModal && (

                <EditIncidentModal

    incident={editingIncident}

    onClose={() => setShowEditModal(false)}

    updateIncident={updateIncident}

/>
            )}

        </Layout>

    );

}

export default Incidents;