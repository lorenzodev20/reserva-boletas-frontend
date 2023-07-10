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
    <CustomersCreate ref="close-button" @saved-customer="saveCustomer" />
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

    <!-- Muestra los enlaces de paginación -->
    <nav aria-label="Navigation for tables">
      <ul class="pagination justify-content-center">
        <!-- Renderiza el enlace de página anterior -->
        <li class="page-item" :class="{ disabled: !pagination.prev }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click="fetchPreviousPage"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <!-- Renderiza los enlaces de páginas -->
        <li
          v-for="page in totalPageCount"
          :key="page"
          class="page-item"
          :class="{ active: page === pagination.current_page }"
        >
          <a class="page-link" @click="fetchPage(page)">{{ page }}</a>
        </li>

        <!-- Renderiza el enlace de página siguiente -->
        <li class="page-item" :class="{ disabled: !pagination.next }">
          <a class="page-link" aria-label="Next" @click="fetchNextPage">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: {
    CustomersCreate: defineAsyncComponent(() =>
      import('../components/CustomersCreate.vue')
    )
  },
  computed: {
    ...mapState('customers', ['customers', 'showErrors', 'errors']),
    ...mapGetters('customers', ['getCustomers', 'getPagination']),
    ...mapMutations('customers', ['changeShowErrorValue', 'cleanErrors']),
    myCustomers () {
      return this.getCustomers
    },
    pagination () {
      return this.getPagination
    },
    totalPageCount () {
      return this.pagination.last_page || 1
    }
  },
  methods: {
    ...mapActions('customers', ['fetchCustomers', 'savedCustomer']),
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
    async saveCustomer (customer) {
      const { identification, first_name, last_name, phone_number } = customer
      const customerData = {
        identification,
        first_name,
        last_name,
        phone_number
      }
      const response = await this.savedCustomer(customerData)

      if (response.result) {
        alert('Registro guardado correctamente!')
        this.fetchCustomers(1)
        this.$refs['close-button'].closeButton()
      } else {
        this.cleanErrors
        const { errors } = response.data
        if (errors) {
          for (let id of Object.keys(errors)) {
            for (const msg of errors[id]) {
              this.errors.push(msg)
            }
          }
          this.changeShowErrorValue
        }
      }
    }
  },
  created () {
    this.fetchCustomers(1)
  }
}
</script>