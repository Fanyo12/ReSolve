import Sidebar from "../../components/Sidebar";
import "../../styles/Dashboard.css";

function Tickets(){

    return(

        <div className="dashboard">

            <Sidebar/>

            <main className="dashboard-content">

                <h1>🎫 Incidencias</h1>

                <p>

                    Aquí aparecerán todas las incidencias registradas.

                </p>

            </main>

        </div>

    );

}

export default Tickets;