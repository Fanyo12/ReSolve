import axios from "axios";


const API_URL = "http://localhost:3000/api/knowledge";


// Obtener conocimientos
export async function getKnowledge(){

    const token = localStorage.getItem("token");


    const response = await axios.get(

        API_URL,

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );


    return response.data;

}



// Crear conocimiento manual
export async function createManualKnowledge(data){

    const token = localStorage.getItem("token");


    const response = await axios.post(

        `${API_URL}/manual`,

        data,

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );


    return response.data;

}
// Obtener tickets disponibles (cerrados/resueltos)
export async function getAvailableTickets(){

    const token = localStorage.getItem("token");

    const response = await axios.get(

        `${API_URL}/available-tickets`,

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );

    return response.data;

}



// Crear conocimiento desde ticket
export async function createTicketKnowledge(ticketId){

    const token = localStorage.getItem("token");

    const response = await axios.post(

        `${API_URL}/ticket`,

        {
            ticket_id: ticketId
        },

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );

    return response.data;

}