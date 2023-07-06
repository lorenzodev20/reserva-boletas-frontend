import reservations from '@/store/reservations'
import customers from '@/store/customers'
import { createStore } from 'vuex'


// Create a new store instance.
const store = createStore({
    modules:{
        reservations,
        customers
    }
})

export default store