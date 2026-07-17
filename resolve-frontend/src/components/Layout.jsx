import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";

function Layout({ children }) {

    return (

        <div className="dashboard">

            <Sidebar />

            <main className="dashboard-content">

                {children}

            </main>

        </div>

    );

}

export default Layout;