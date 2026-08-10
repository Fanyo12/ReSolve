import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import "../../styles/Dashboard.css";

import { getKnowledge } from "../../services/knowledgeApi";

import KnowledgeCard from "./KnowledgeCard";

import AddKnowledgeModal from "./AddKnowledgeModal";

import TicketKnowledgeModal from "./TicketKnowledgeModal";

import ManualKnowledgeModal from "./ManualKnowledgeModal";

import KnowledgeDetailsModal from "./KnowledgeDetailsModal";

import KnowledgeFilters from "./KnowledgeFilters";

import { getDepartments } from "../../services/catalogApi";

function Knowledge(){

    const [knowledge, setKnowledge] = useState([]);

    const [loading, setLoading] = useState(true);
    
    const [showAddModal, setShowAddModal] = useState(false);

    const [showTicketModal, setShowTicketModal] = useState(false);

const [showManualModal, setShowManualModal] = useState(false);

const [selectedKnowledge, setSelectedKnowledge] = useState(null);

const [search, setSearch] = useState("");

const [typeFilter, setTypeFilter] = useState("all");

const [departmentFilter, setDepartmentFilter] = useState("all");

const [departments, setDepartments] = useState([]);

const user = JSON.parse(
    localStorage.getItem("user")
);

const role = user?.role;


   useEffect(()=>{

    loadKnowledge();

    loadDepartments();

},[]);



    async function loadKnowledge(){

        try{

            const response = await getKnowledge();

            console.log("Knowledge:", response);

            setKnowledge(response.data);


        }catch(error){

            console.error(
                "Error cargando conocimientos:",
                error
            );

        }finally{

            setLoading(false);

        }

    }
    async function loadDepartments(){

    try{

        const data = await getDepartments();

        setDepartments(

            data.map(dep=>dep.name)

        );


    }catch(error){

        console.error(
            "Error cargando departamentos:",
            error
        );

    }

}


const filteredKnowledge = knowledge.filter((item)=>{


    const matchesSearch = (

        item.title +
        " " +
        item.problem +
        " " +
        item.location +
        " " +
        item.category

    )
    .toLowerCase()
    .includes(

        search.toLowerCase()

    );



    const matchesType =

        typeFilter === "all"

        ||

        item.type === typeFilter;



      const matchesDepartment =

    departmentFilter === "all"

    ||

    item.location === departmentFilter;

return (

    matchesSearch &&

    matchesType &&

    matchesDepartment

);


});



    return(

        <div className="dashboard">


            <Sidebar/>


            <main className="dashboard-content">


                <h1>
                    📚 Base de conocimiento
                </h1>


                <p>
                    Manuales y soluciones registradas.
                </p>

<input

    type="text"

    placeholder="🔎 Buscar conocimiento..."

    value={search}

    onChange={(e)=>setSearch(e.target.value)}

    className="knowledge-search"

/>

<KnowledgeFilters

    typeFilter={typeFilter}

    setTypeFilter={setTypeFilter}

    departmentFilter={departmentFilter}

    setDepartmentFilter={setDepartmentFilter}

    departments={departments}

/>



            {
    (role === "admin" || role === "tecnico") && (

        <button

            className="add-knowledge-btn"

            onClick={()=>setShowAddModal(true)}

        >
            ➕ Añadir conocimiento
        </button>

    )
}


                {
                    loading ? (

                        <p>
                            Cargando conocimientos...
                        </p>


                    ) : (


                       
<div className="knowledge-list">

{
    filteredKnowledge.map((item)=>(

        <KnowledgeCard

            key={item.id}

            item={item}

            onClick={()=>{

                setSelectedKnowledge(item);

            }}

        />

    ))
}

</div>


                    )
                }


            {
    showAddModal && 
    (role === "admin" || role === "tecnico") && (

        <AddKnowledgeModal

    onClose={()=>setShowAddModal(false)}

    onTicket={()=>{

        setShowAddModal(false);

        setShowTicketModal(true);

    }}


    onManual={()=>{

        setShowAddModal(false);

        setShowManualModal(true);

    }}

/>


    )
}
{
    showTicketModal && (

        <TicketKnowledgeModal

    onClose={()=>setShowTicketModal(false)}

    onSuccess={loadKnowledge}

/>


    )
}


{
    showManualModal && (

        <ManualKnowledgeModal

            onClose={()=>setShowManualModal(false)}

            onSuccess={loadKnowledge}

        />

    )
}


{
    selectedKnowledge && (

        <KnowledgeDetailsModal

            knowledge={selectedKnowledge}

            onClose={() => setSelectedKnowledge(null)}

        />

    )
}

            </main>


        </div>

    );

}


export default Knowledge;