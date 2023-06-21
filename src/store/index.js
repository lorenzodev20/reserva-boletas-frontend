import reservations from '@/store/reservations'
import { createStore } from 'vuex'


// Create a new store instance.
const store = createStore({
    modules:{
        reservations
    }
})

export default store