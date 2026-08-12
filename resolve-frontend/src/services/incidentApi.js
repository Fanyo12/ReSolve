import api from "./api";

export async function getIncidents() {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/tickets",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.data;

}

export async function createIncident(data) {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/tickets",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.data;

}

export const updateIncident = async (id, data) => {

    const token = localStorage.getItem("token");

    const response = await api.put(

        `/tickets/${id}`,

        data,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

};

export const closeIncident = async (id, solution) => {

    const token = localStorage.getItem("token");

    const response = await api.put(

        `/tickets/close/${id}`,

        {
            solution: solution
        },

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

};

export const deleteIncident = async (id) => {

    const token = localStorage.getItem("token");

    const response = await api.delete(

        `/tickets/${id}`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

};