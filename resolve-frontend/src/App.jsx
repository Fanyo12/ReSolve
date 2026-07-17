import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

import Knowledge from "./pages/Knowledge/Knowledge";
import Users from "./pages/Users/Users";
import Settings from "./pages/Settings/Settings";
import Incidents from "./pages/Incidents/Incidents";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login/>}/>

                <Route path="/dashboard" element={<Dashboard/>}/>

                <Route path="/incidencias" element={<Incidents/>}/>

                <Route path="/conocimiento" element={<Knowledge/>}/>

                <Route path="/usuarios" element={<Users/>}/>

                <Route path="/configuracion" element={<Settings/>}/>

            </Routes>

        </BrowserRouter>

    );

}

export default App;