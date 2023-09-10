<template>
  <div class="container">
    <h1 class="text-center">Listado de reservaciones</h1>
    <button
      type="button"
      class="btn btn-secondary"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      Nuevo
    </button>
    <ModalNewReservation ref="close-button" @saved-reservation="saveReservation" />
    <div v-show="showReservations">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Ticket</th>
              <th scope="col">Cliente</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" v-show="showReservations">
            <tr v-for="reservation in myReservations" :key="reservation.id">
              <th scope="row">{{ reservation.id }}</th>
              <td class="text-center">{{ reservation.quantity }}</td>
              <td>{{ reservation.title }}</td>
              <td>{{ reservation.customer }}</td>
              <td>{{ reservation.created }}</td>
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
    <h4 v-show="!showReservations"> No existen reservaciones ...</h4>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  components: {
    ModalNewReservation: defineAsyncComponent(() =>
      import('../components/ReservationsCreate.vue')
    )
  },
  computed: {
    ...mapState('reservations', ['reservations']),
    ...mapState('tickets', ['tickets', 'ticketsList']),
    ...mapState('customers', ['customers', 'customersList']),
    ...mapGetters('reservations', ['getReservations', 'getPagination']),
    myReservations () {
      return this.getReservations
    },
    pagination () {
      return this.getPagination
    },
    totalPageCount () {
      return this.pagination.last_page || 1
    },
    showReservations () {
      return this.getReservations.length === 0 ? false : true
    }
  },
  methods: {
    ...mapActions('reservations', ['fetchReservations','storeReservation']),
    ...mapActions('tickets', ['getTicketsList']),
    ...mapActions('customers', ['fetchCustomersList']),
    fetchPage (page) {
      this.fetchReservations(page)
    },
    fetchPreviousPage () {
      const prevPage = this.pagination.current_page - 1
      this.fetchReservations(prevPage)
    },
    fetchNextPage () {
      const nextPage = this.pagination.current_page + 1
      this.fetchReservations(nextPage)
    },
    async saveReservation(reservation){
      const response = await this.storeReservation(reservation);
      if (response.result) {
        alert('Reservación creada!')
        this.$refs['close-button'].closeButton()
      }
    }
  },
  created () {
    this.fetchReservations()
    this.getTicketsList()
    this.fetchCustomersList()
  }
}
</script>
