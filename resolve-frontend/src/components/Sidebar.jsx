import { NavLink } from "react-router-dom";
import "./../styles/Sidebar.css";
import {
    House,
    Ticket,
    BookOpen,
    Users,
    Settings,
    CheckSquare
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <h2>ReSolve</h2>
        <p>IT Management</p>
      </div>

      <nav className="sidebar-menu">

    <NavLink to="/dashboard">
        <House size={18}/>
        Inicio
    </NavLink>

    <NavLink to="/incidencias">
        <Ticket size={18}/>
        Incidencias
    </NavLink>

    <NavLink to="/conocimiento">
        <BookOpen size={18}/>
        Conocimiento
    </NavLink>

    <NavLink to="/usuarios">
        <Users size={18}/>
        Usuarios
    </NavLink>
     <NavLink to="/pendientes">

    <CheckSquare size={18}/>

    Pendientes

</NavLink>



</nav>

      <div className="sidebar-footer">
        <p>v1.0</p>
      </div>

    </aside>
  );
}

export default Sidebar;