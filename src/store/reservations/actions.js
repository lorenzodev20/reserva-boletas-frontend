import reservationsApi from "@/api/reservationsApi"

export const fetchReservations = async ({ commit }, page = 1) => {
    try {
        const url = `/api/v1/reservations?page=${page}`;
        const response = await reservationsApi.get(url);
        const { data, meta } = response.data

        if (!data) {
            commit('setReservations', [])
            return
        }

        const reservations = []

        for (let id of Object.keys(data)) {

            let value = {
                "id": data[id].id,
                "quantity": data[id].quantity,
                "title": data[id].ticket.title,
                "customer": data[id].customer.first_name + ' ' + data[id].customer.last_name,
                "created": data[id].created
            }
            reservations.push(value)

        }

        // Actualiza el estado de las reservas y la paginación utilizando mutaciones
        commit('setReservations', reservations)
        commit('setPagination', meta);

    } catch (error) {
        console.error('Error al cargar la informacion por favor revisar logs')
        console.log(error)
        return null
    }
}
