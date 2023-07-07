import reservations from '@/store/reservations'
import customers from '@/store/customers'
import tickets from '@/store/tickets'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    modules:{
        reservations,
        customers,
        tickets
    }
})

export default store