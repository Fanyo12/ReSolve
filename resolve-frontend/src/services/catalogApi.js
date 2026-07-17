import api from "./api";

export async function getDepartments() {

    const token = localStorage.getItem("token");

    const response = await api.get("/departments", {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    return response.data.data;

}

export async function getCategories(type) {

    const token = localStorage.getItem("token");

    const response = await api.get(

        `/categories?type=${type}`,

        {

            headers: {
                Authorization: `Bearer ${token}`
            }

        }

    );

    return response.data.data;

}