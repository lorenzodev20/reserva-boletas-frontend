import reservationsApi from "@/api/reservationsApi";


export const fetchCustomers = async ({ commit }, page = 1) => {
    try {
        const url = `/api/v1/customers?page=${page}`;
        const response = await reservationsApi.get(url);
        const { data, meta } = response.data

        if (!data) {
            commit('setReservations', [])
            return
        }

        const customers = []

        for (let id of Object.keys(data)) {

            let value = {
                "id": data[id].id,
                "identification": data[id].identification,
                "first_name": data[id].first_name,
                "last_name": data[id].last_name,
                "phone_number": data[id].phone_number
            }
            customers.push(value)

        }

        // Actualiza el estado de los clientes y la paginación utilizando mutaciones
        commit('setCustomers', customers)
        commit('setPagination', meta);
    }catch (error) {
        console.error('Error al cargar la información por favor revisar logs')
        console.log(error)
        return null
    }
}