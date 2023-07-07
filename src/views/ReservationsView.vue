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
    <ModalNewReservation/>
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
        <tbody class="table-group-divider">
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
          <a
            class="page-link"
            aria-label="Next"
            @click="fetchNextPage"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  components: {
    ModalNewReservation: defineAsyncComponent(() => import('../components/ReservationsCreate.vue'))
  },
  computed: {
    ...mapState('reservations', ['reservations']),
    ...mapGetters('reservations', ['getReservations', 'getPagination']),
    myReservations () {
      return this.getReservations
    },
    pagination () {
      return this.getPagination
    },
    totalPageCount () {
      return this.pagination.last_page || 1
    }
  },
  methods: {
    ...mapActions('reservations', ['fetchReservations']),
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
    }
  },
  created () {
    this.fetchReservations()
  }
}
</script>
