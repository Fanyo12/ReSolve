import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "../../styles/Dashboard.css";
import api from "../../services/api";

function Users() {

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "tecnico"
    });

    const loadUsers = async () => {

        try {

            const response = await api.get("/users");

            if (response.data.success) {
                setUsers(response.data.data);
            }

        } catch (error) {

            console.error("Error al cargar usuarios:", error);

        }

    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/users", form);

            if (response.data.success) {

                alert("Usuario creado correctamente.");

                setForm({
                    name: "",
                    email: "",
                    password: "",
                    role: "tecnico"
                });

                setShowModal(false);

                loadUsers();
            }

        } catch (error) {

            console.error("Error:", error);

            alert(
                error.response?.data?.message ||
                "Error al crear usuario."
            );

        }

    };

    return (

        <div className="dashboard">

            <Sidebar />

            <main className="dashboard-content">

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px"
                }}>

                    <div>
                        <h1>👥 Usuarios</h1>

                        <p>
                            Administración de usuarios del sistema.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            padding: "12px 20px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        + Nuevo usuario
                    </button>

                </div>


                <div style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    overflowX: "auto"
                }}>

                    <table style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}>

                        <thead>

                            <tr>
                                <th style={thStyle}>Nombre</th>
                                <th style={thStyle}>Correo</th>
                                <th style={thStyle}>Rol</th>
                                <th style={thStyle}>Estado</th>
                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr key={user.id}>

                                    <td style={tdStyle}>
                                        {user.name}
                                    </td>

                                    <td style={tdStyle}>
                                        {user.email}
                                    </td>

                                    <td style={tdStyle}>
    {user.role === "admin"
        ? "Administrador"
        : user.role === "tecnico"
            ? "Técnico"
            : "Consulta"
    }
</td>

                                    <td style={tdStyle}>
                                        {user.active ? "Activo" : "Inactivo"}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {users.length === 0 && (
                        <p>No hay usuarios registrados.</p>
                    )}

                </div>


                {showModal && (

                    <div style={overlayStyle}>

                        <div style={modalStyle}>

                            <h2>Nuevo usuario</h2>

                            <form onSubmit={handleSubmit}>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />

                                <select
    name="role"
    value={form.role}
    onChange={handleChange}
>
    <option value="admin">
        Administrador
    </option>

    <option value="tecnico">
        Técnico
    </option>

    <option value="consulta">
        Consulta
    </option>
</select>

                                <div style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "15px"
                                }}>

                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancelar
                                    </button>

                                    <button type="submit">
                                        Crear usuario
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

            </main>

        </div>

    );
}


const thStyle = {
    textAlign: "left",
    padding: "12px",
    borderBottom: "1px solid #ddd"
};

const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #eee"
};

const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
};

const modalStyle = {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    maxWidth: "90%"
};

export default Users;