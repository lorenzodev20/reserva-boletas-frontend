<template>
  <div class="container">
    <h1 class="text-center">Listado de Clientes</h1>
    <button
        type="button"
        class="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
    >
      Nuevo
    </button>
    <CustomersCreate @saved-customer="saveCustomer"/>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Identificación</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="customer in myCustomers" :key="customer.id">
            <th scope="row">{{ customer.id }}</th>
            <td class="text-center">{{ customer.identification }}</td>
            <td>{{ customer.first_name }}</td>
            <td>{{ customer.last_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue"
import {mapActions, mapGetters, mapState} from "vuex"

export default {
  components:{
    CustomersCreate: defineAsyncComponent(() => import('../components/CustomersCreate.vue'))
  },
  computed:{
    ...mapState('customers',['customers']),
    ...mapGetters('customers',['getCustomers','getPagination']),
    myCustomers(){
      return this.getCustomers
    },
    pagination(){
      return this.getPagination
    },
    totalPageCount () {
      return this.pagination.last_page || 1
    }
  },
  methods:{
    ...mapActions('customers',['fetchCustomers']),
    fetchPage (page) {
      this.fetchCustomers(page)
    },
    fetchPreviousPage () {
      const prevPage = this.pagination.current_page - 1
      this.fetchCustomers(prevPage)
    },
    fetchNextPage () {
      const nextPage = this.pagination.current_page + 1
      this.fetchCustomers(nextPage)
    },
    saveCustomer(customer){
      const {identification, first_name, last_name, phone_number} = customer
      console.log("Evento hijo hacia el padre", identification, first_name, last_name, phone_number)
    }
  },
  created() {
    this.fetchCustomers()
  }
}
</script>

<style></style>
