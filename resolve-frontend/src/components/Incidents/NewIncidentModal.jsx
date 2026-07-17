import { useEffect, useState } from "react";

import {
    getDepartments,
    getCategories
} from "../../services/catalogApi";

import { createIncident } from "../../services/incidentApi";

import "../../styles/NewIncidentModal.css";

function NewIncidentModal({ onClose, addIncident }) {
const [title, setTitle] = useState("");
const [area, setArea] = useState("Recepción");
const [priority, setPriority] = useState("Media");
const [description, setDescription] = useState("");
const [roomNumber, setRoomNumber] = useState("");
const [departments, setDepartments] = useState([]);
const [type, setType] = useState("general");

const [categories, setCategories] = useState([]);

const [category, setCategory] = useState("");

useEffect(() => {

    async function loadData() {

        try {

            const departmentsData = await getDepartments();

            setDepartments(departmentsData);

            const categoriesData = await getCategories("general");

            setCategories(categoriesData);

        } catch (error) {

            console.error(error);

        }

    }

    loadData();

}, []);
const handleTypeChange = async (newType) => {

    setType(newType);

    const data = await getCategories(newType);

    setCategories(data);

    setCategory("");

};
const handleSave = async () => {

    if (title.trim() === "") {

        alert("Escribe un título.");

        return;

    }

    if (category === "") {

        alert("Selecciona una categoría.");

        return;

    }
    if (type === "room" && roomNumber.trim() === "") {

    alert("Escribe el número de habitación.");

    return;

}

    try {

    const newIncident = await createIncident({

        type,

        department_id: departments.find(
            d => d.name === area
        )?.id,

        room_number:
            type === "room"
                ? roomNumber
                : null,

        category_id: Number(category),

        reported_by: "Fany",

        title,

        description,

        priority: priority.toLowerCase(),

        observations: "",

        external_provider: false,

        provider_name: "",

        due_date: null,

        assigned_to: null

    });


    console.log("NUEVA INCIDENCIA:", newIncident);


    addIncident(newIncident);


    alert("Incidencia creada correctamente.");


    onClose();


    setRoomNumber("");


} catch (error) {

    console.error(error);

    console.log(error.response?.data);

    alert(error.response?.data?.message || "Error");

}
};
    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Nueva incidencia</h2>

                <div className="form-group">

                    <label>Título</label>

                    <input
    type="text"
    placeholder="Ej. Outlook no abre"
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
/>

                </div>
                <div className="form-group">

    <label>Tipo</label>

    <select

        value={type}

        onChange={(e) => handleTypeChange(e.target.value)}

    >

        <option value="general">

            General

        </option>

        <option value="room">

            Habitación

        </option>

    </select>

</div>

            {type === "general" ? (

<div className="form-group">

    <label>Departamento</label>

    <select
        value={area}
        onChange={(e)=>setArea(e.target.value)}
    >

        {departments.map((department)=>(

            <option
                key={department.id}
                value={department.name}
            >
                {department.name}
            </option>

        ))}

    </select>

</div>

) : (

<div className="form-group">

    <label>Número de habitación</label>

    <input
        type="text"
        placeholder="Ej. 230"
        value={roomNumber}
        onChange={(e)=>setRoomNumber(e.target.value)}
    />

</div>

)}

<div className="form-group">

    <label>Categoría</label>

    <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
    >

        <option value="">
            Selecciona una categoría
        </option>

        {categories.map((cat) => (

            <option
                key={cat.id}
                value={cat.id}
            >
                {cat.name}
            </option>

        ))}

    </select>

</div>    

                <div className="form-group">

                    <label>Prioridad</label>

                    <select
    value={priority}
    onChange={(e)=>setPriority(e.target.value)}
>

    <option>Alta</option>
    <option>Media</option>
    <option>Baja</option>

</select>

                </div>

                <div className="form-group">

                    <label>Descripción</label>

                    <textarea
    rows="5"
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
/>

                </div>

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
    className="save-btn"
    onClick={handleSave}
>

    Guardar incidencia

</button>

                </div>

            </div>

        </div>

    );

}

export default NewIncidentModal;