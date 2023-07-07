import reservationsApi from "@/api/reservationsApi";
import { reportError } from "@/helpers/utils";

export const fetchCustomers = async ({ commit }, page = 1) => {
    try {
        const url = `/api/v1/customers?page=${page}`;
        const response = await reservationsApi.get(url);
        const { data, meta } = response.data

        if (!data) {
            commit('setCustomers', [])
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
        reportError(error)
        return error.response
    }
}

export const savedCustomer = async ({commit}, customer) => {
    try {
        const {identification, first_name, last_name, phone_number} = customer
        const newCustomer= {
            identification,
            first_name,
            last_name,
            phone_number
        }
        const { data } = await reservationsApi.post('/api/v1/customers',newCustomer)
        const dataNew= {
            "id": data.data.id,
            identification,
            first_name,
            last_name,
            phone_number,
        }
        commit('addCustomer',dataNew)
        return data;
    }catch (error){
        reportError(error)
        return error.response
    }
}