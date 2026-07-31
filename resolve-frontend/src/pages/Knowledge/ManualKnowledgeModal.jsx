import { useEffect, useState } from "react";

import {
    getDepartments,
    getCategories
} from "../../services/catalogApi";

import {
    createManualKnowledge
} from "../../services/knowledgeApi";


function ManualKnowledgeModal({ onClose, onSuccess }) {

    const [title, setTitle] = useState("");

    const [problem, setProblem] = useState("");

    const [location, setLocation] = useState("");

    const [solution, setSolution] = useState("");

    const [department, setDepartment] = useState("");

    const [category, setCategory] = useState("");

    const [departments, setDepartments] = useState([]);

    const [categories, setCategories] = useState([]);



    useEffect(()=>{


        async function loadData(){

            try{


                const departmentsData = await getDepartments();

                setDepartments(departmentsData);



                const categoriesData = await getCategories("general");

                setCategories(categoriesData);


            }catch(error){

                console.error(error);

            }

        }


        loadData();


    },[]);



    async function handleSubmit(e){

        e.preventDefault();


        try{


            await createManualKnowledge({

    title,

    problem,

    category_id: category,

    location: department,

    solution

});

alert("Conocimiento creado correctamente");

if (onSuccess) {
    await onSuccess();
}

onClose();


        }catch(error){


            console.error(error);

            alert("Error creando conocimiento");


        }


    }



    return (

        <div className="modal-overlay">


            <div className="modal-box manual-modal">


                <h2>
                    ✏️ Crear conocimiento manual
                </h2>



                <form onSubmit={handleSubmit}>


                    <div className="form-group">

    <label>
        Título
    </label>

    <input

        value={title}

        onChange={(e)=>setTitle(e.target.value)}

        required

    />

</div>


                    <div className="form-group">

    <label>
        Problema
    </label>

    <textarea

        value={problem}

        onChange={(e)=>setProblem(e.target.value)}

        required

    />

</div>




                    <div className="form-group">

    <label>
        Departamento
    </label>

    <select
        value={department}
        onChange={(e)=>setDepartment(e.target.value)}
        required
    >

        <option value="">
            Seleccionar
        </option>

        {
            departments.map((item)=>(

                <option
                    key={item.id}
                    value={item.name}
                >
                    {item.name}
                </option>

            ))
        }

    </select>

</div>


                    <div className="form-group">

    <label>
        Categoría
    </label>

    <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        required
    >

        <option value="">
            Seleccionar
        </option>

        {
            categories.map((item)=>(

                <option
                    key={item.id}
                    value={item.id}
                >
                    {item.name}
                </option>

            ))
        }

    </select>

</div>




                    <div className="form-group">

    <label>
        Solución
    </label>


    <textarea

        value={solution}

        onChange={(e)=>setSolution(e.target.value)}

        required

    />

</div>




                    <div className="modal-actions">

    <button type="submit">
        Guardar
    </button>


    <button
        type="button"
        onClick={onClose}
    >
        Cancelar
    </button>

</div>


                </form>


            </div>


        </div>

    );

}


export default ManualKnowledgeModal;