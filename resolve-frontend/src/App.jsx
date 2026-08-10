import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

import Knowledge from "./pages/Knowledge/Knowledge";
import Users from "./pages/Users/Users";
import Settings from "./pages/Settings/Settings";
import Incidents from "./pages/Incidents/Incidents";

import ProtectedRoute from "./components/ProtectedRoute";
import Tasks from "./pages/Tasks/Tasks";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login/>}/>


                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                />


                <Route 
                    path="/incidencias" 
                    element={
                        <ProtectedRoute>
                            <Incidents/>
                        </ProtectedRoute>
                    }
                />


                <Route 
                    path="/conocimiento" 
                    element={
                        <ProtectedRoute>
                            <Knowledge/>
                        </ProtectedRoute>
                    }
                />


                <Route 
                    path="/usuarios" 
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <Users/>
                        </ProtectedRoute>
                    }
                />


                <Route 
                    path="/configuracion" 
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <Settings/>
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/pendientes"
                    element={
                        <ProtectedRoute>
                            <Tasks/>
                        </ProtectedRoute>
                    }
                />


            </Routes>

        </BrowserRouter>

    );

}

export default App;