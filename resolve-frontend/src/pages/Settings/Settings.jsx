import Sidebar from "../../components/Sidebar";
import "../../styles/Dashboard.css";

function Settings(){

    return(

        <div className="dashboard">

            <Sidebar/>

            <main className="dashboard-content">

                <h1>⚙️ Configuración</h1>

                <p>

                    Configuración general del sistema.

                </p>

            </main>

        </div>

    );

}

export default Settings;