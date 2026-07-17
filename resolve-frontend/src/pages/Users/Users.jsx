import Sidebar from "../../components/Sidebar";
import "../../styles/Dashboard.css";

function Users(){

    return(

        <div className="dashboard">

            <Sidebar/>

            <main className="dashboard-content">

                <h1>👥 Usuarios</h1>

                <p>

                    Administración de usuarios del sistema.

                </p>

            </main>

        </div>

    );

}

export default Users;