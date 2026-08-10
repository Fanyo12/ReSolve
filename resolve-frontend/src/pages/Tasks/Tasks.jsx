import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import "../../styles/Tasks.css";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../../services/taskApi";


function Tasks(){

    const [tasks,setTasks] = useState([]);

    const [title,setTitle] = useState("");

    const [description,setDescription] = useState("");


    useEffect(()=>{

        loadTasks();

    },[]);



    async function loadTasks(){

        try{

            const response = await getTasks();

            setTasks(response.data);

        }catch(error){

            console.error(error);

        }

    }



    async function handleCreate(){

        if(!title){

            alert("Escribe un pendiente");

            return;

        }


        await createTask({

            title,

            description

        });


        setTitle("");

        setDescription("");

        loadTasks();

    }



    async function handleComplete(id){

        await updateTask(id);

        loadTasks();

    }



    async function handleDelete(id){

        await deleteTask(id);

        loadTasks();

    }



    return (

<Layout>

<div className="tasks-container">


    <div className="tasks-header">

        <div>
            <h1>
                📋 Pendientes del día
            </h1>

            <p>
                Organiza las actividades pendientes y marca las completadas.
            </p>
        </div>


    </div>



    <div className="task-create">


        <input

            placeholder="Nuevo pendiente"

            value={title}

            onChange={(e)=>setTitle(e.target.value)}

        />


        <input

            placeholder="Descripción (opcional)"

            value={description}

            onChange={(e)=>setDescription(e.target.value)}

        />


        <button
            onClick={handleCreate}
        >

            ➕ Agregar

        </button>


    </div>




    <div className="task-list">


    {
        tasks.map(task=>(


            <div 
            key={task.id}
            className={
                task.status === "completado"
                ? "task-card completed"
                : "task-card"
            }
            >


                <div className="task-check">


                    <input

                    type="checkbox"

                    checked={
                        task.status === "completado"
                    }

                    onChange={()=>
                        handleComplete(task.id)
                    }

                    />


                </div>



                <div className="task-info">


                    <h3>
                        {task.title}
                    </h3>


                    <p>
                        {task.description}
                    </p>


                    <small>

                        Creado por:
                        {" "}
                        {task.created_by_name || "Usuario"}

                    </small>


                </div>



                <button

                className="delete-task"

                onClick={()=>
                    handleDelete(task.id)
                }

                >

                    🗑️

                </button>



            </div>


        ))
    }


    </div>



</div>


</Layout>

);

}


export default Tasks;