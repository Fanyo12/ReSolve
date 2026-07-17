import Sidebar from "../../components/Sidebar";
import "../../styles/Dashboard.css";

function Knowledge(){

    return(

        <div className="dashboard">

            <Sidebar/>

            <main className="dashboard-content">

                <h1>📚 Base de conocimiento</h1>

                <p>

                    Aquí estarán los manuales y soluciones.

                </p>

            </main>

        </div>

    );

}

export default Knowledge;