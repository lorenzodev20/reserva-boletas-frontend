import reservationsApi from "@/api/reservationsApi";
import { reportError } from "@/helpers/utils";

export const fetchTickets = async ({ commit }, page = 1) => {
    try {
        const url = `/api/v1/tickets?page=${page}`;
        const response = await reservationsApi.get(url);
        const { data, meta } = response.data

        if (!data) {
            commit('setTickets', [])
            return
        }

        const tickets = []

        for (let id of Object.keys(data)) {

            let value = {
                "id": data[id].id,
                "title": data[id].title,
                "description": data[id].description,
                "stock": data[id].stock
            }
            tickets.push(value)

        }

        // Actualiza el estado de los tickets y la paginación utilizando mutaciones
        commit('setTickets', tickets)
        commit('setPagination', meta);
    } catch (error) {
        reportError(error)
        return error.response
    }
}

export const saveTicket = async ({ commit }, ticket) => {
    try {
        const { title, description, stock } = ticket
        const { data } = await reservationsApi.post('/api/v1/tickets', { title, description, stock })
        const dataNew = {
            "id": data.data.id,
            title,
            description,
            stock
        }
        commit('addTicket', dataNew)
        return data;
    } catch (error) {
        reportError(error)
        return error.response
    }
}