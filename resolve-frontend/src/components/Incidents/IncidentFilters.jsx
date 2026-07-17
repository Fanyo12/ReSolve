import "./../../styles/IncidentFilters.css";

function IncidentFilters({
    search,
    setSearch,
    areaFilter,
    setAreaFilter,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    areas,
    statuses,
    priorities
}) {

    return (

        <div className="incident-filters">

            <input
                type="text"
                placeholder="🔍 Buscar incidencia..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
            >
                <option value="">Todas las áreas</option>

                {areas.map((area) => (
                    <option
                        key={`area-${area}`}
                        value={area}
                    >
                        {area}
                    </option>
                ))}
            </select>

            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="">Todos los estados</option>

                {statuses.map((status) => (
                    <option
                        key={`status-${status}`}
                        value={status}
                    >
                        {status}
                    </option>
                ))}
            </select>

            <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
            >
                <option value="">Todas las prioridades</option>

                {priorities.map((priority) => (
                    <option
                        key={`priority-${priority}`}
                        value={priority}
                    >
                        {priority}
                    </option>
                ))}
            </select>

        </div>

    );

}

export default IncidentFilters;