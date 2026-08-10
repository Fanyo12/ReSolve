import api from "./api";


export async function getTasks(){

    const response = await api.get("/tasks");

    return response.data;

}



export async function createTask(data){

    const response = await api.post(
        "/tasks",
        data
    );

    return response.data;

}



export async function updateTask(id){

    const response = await api.put(
        `/tasks/${id}`
    );

    return response.data;

}



export async function deleteTask(id){

    const response = await api.delete(
        `/tasks/${id}`
    );

    return response.data;

}