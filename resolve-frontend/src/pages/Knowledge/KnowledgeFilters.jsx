function KnowledgeFilters({

    typeFilter,

    setTypeFilter,

    departmentFilter,

    setDepartmentFilter,

    departments

})
{


    return(

        <div className="knowledge-filters">


            <button

                className={
                    typeFilter === "all"
                    ? "active"
                    : ""
                }

                onClick={()=>setTypeFilter("all")}

            >
                📚 Todos
            </button>



            <button

                className={
                    typeFilter === "ticket"
                    ? "active"
                    : ""
                }

                onClick={()=>setTypeFilter("ticket")}

            >
                📋 Tickets
            </button>



            <button

                className={
                    typeFilter === "manual"
                    ? "active"
                    : ""
                }

                onClick={()=>setTypeFilter("manual")}

            >
                ✏️ Manuales
            </button>



            <div className="department-filter">

                <label>
                    📍 Departamento:
                </label>


                <select

                    value={departmentFilter}

                    onChange={(e)=>
                        setDepartmentFilter(e.target.value)
                    }

                >

                    <option value="all">
                        Todos
                    </option>


                    {
                        departments.map((dep)=>(

                            <option

                                key={dep}

                                value={dep}

                            >

                                {dep}

                            </option>

                        ))
                    }


                </select>

            </div>


        </div>

    );

}


export default KnowledgeFilters;