import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getIncidents } from "../../services/incidentApi";
import Layout from "../../components/Layout";
import "../../styles/Dashboard.css";
import StatCard from "../../components/StatCard";

import {
    Ticket,
    Clock3,
    CheckCircle2,
    Users
} from "lucide-react";
import RecentIncidents from "../../components/RecentIncidents";
function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(
    localStorage.getItem("user")
);

  const [stats, setStats] = useState({
    total: 0,
    pendientes: 0,
    resueltas: 0,
});
const [recentIncidents, setRecentIncidents] = useState([]);

const fechaActual = useMemo(() => {
    return new Date().toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}, []);
const saludo = useMemo(() => {

    const hora = new Date().getHours();

    if (hora < 12)
        return "🌅 Buenos días";

    if (hora < 19)
        return "☀️ Buenas tardes";

    return "🌙 Buenas noches";

}, []);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/");
        return;
    }

    const loadDashboard = async () => {

        try {

            const incidents = await getIncidents();

            setRecentIncidents(
    incidents.slice(0,5)
);

            setStats({

                total: incidents.length,

                pendientes: incidents.filter(
                    i => i.status === "pendiente"
                ).length,

                cerradas: incidents.filter(
    i => i.status === "cerrado"
).length,

            });

        } catch (error) {

            console.error(error);

        }

    };

    loadDashboard();

}, [navigate]);
return (
<Layout>

        <header className="dashboard-header">

            <div className="header-text">

    <h1>Dashboard</h1>

    <span className="dashboard-date">
    {fechaActual}
    
</span>


</div>
            <div className="header-actions">

    <div className="user-info">

        <div className="user-avatar">
    {user?.name?.charAt(0).toUpperCase()}
</div>

        <div>

            <strong>
    {user?.name}
</strong>

<p>
    {user?.role}
</p>

        </div>

    </div>

    <button
        className="logout-button"
        onClick={()=>{
            localStorage.clear();
            navigate("/");
        }}
    >
        Salir
    </button>

</div>
        </header>

        <section className="welcome-card">

    <h2>
    {saludo}, {user?.name} 💙
</h2>

    <p>
        El sistema está listo para gestionar incidencias,
        consultar la base de conocimiento y administrar usuarios.
    </p>

</section>

<section className="stats-grid">

    <div
    onClick={() => navigate("/incidencias")}
    style={{ cursor: "pointer" }}
>

    <StatCard
        title="Incidencias"
        value={stats.total}
        color="#3B82F6"
        icon={<Ticket size={26}/>}
    />

</div>

    <StatCard
        title="Pendientes"
        value={stats.pendientes}
        color="#F59E0B"
        icon={<Clock3 size={26}/>}
    />

    <StatCard
    title="Cerradas"
    value={stats.cerradas}
    color="#10B981"
    icon={<CheckCircle2 size={26}/>}
 />

</section>

<RecentIncidents
    incidents={recentIncidents}
/>


</Layout>

);
}

export default Dashboard;

