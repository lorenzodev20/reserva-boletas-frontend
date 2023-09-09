<template>
  <div class="container">
    <h1 class="text-center">Listado de Boletas</h1>
    <button
      type="button"
      class="btn btn-secondary"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      Nuevo
    </button>
    <TicketCreate ref="close-button" @saved-ticket="savedTicket" />
    <SpinnerLoading v-if="isLoading"/>
    <div v-else>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre del Ticket</th>
              <th scope="col">Cantidad Disponible</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="ticket in myTickets" :key="ticket.id">
              <th scope="row">{{ ticket.id }}</th>
              <td class="text-center">{{ ticket.title }}</td>
              <td>{{ ticket.stock }}</td>
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
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: {
    TicketCreate: defineAsyncComponent(() =>
      import('../components/TicketCreate.vue')
    ),
    SpinnerLoading: defineAsyncComponent(()=>import('../components/SpinnerLoading.vue'))
  },
  computed: {
    ...mapState('tickets', ['tickets', 'showErrors', 'errors','isLoading']),
    ...mapGetters('tickets', ['getTickets', 'getPagination']),
    ...mapMutations('tickets', [
      'setTickets',
      'setPagination',
      'changeShowErrorValue',
      'cleanErrors'
    ]),
    myTickets () {
      return this.getTickets
    },
    pagination () {
      return this.getPagination
    },
    totalPageCount () {
      return this.pagination.last_page || 1
    }
  },
  methods: {
    ...mapActions('tickets', ['fetchTickets', 'saveTicket']),
    fetchPage (page) {
      this.fetchTickets(page)
    },
    fetchPreviousPage () {
      const prevPage = this.pagination.current_page
        ? this.pagination.current_page - 1
        : 1
      this.fetchTickets(prevPage)
    },
    fetchNextPage () {
      const nextPage = this.pagination.current_page
        ? this.pagination.current_page + 1
        : 1
      this.fetchTickets(nextPage)
    },
    async savedTicket (ticket) {
      const { title, description, stock } = ticket
      const response = await this.saveTicket({ title, description, stock })
      if (response.result) {
        alert('Registro guardado correctamente!')
        this.fetchTickets(1)
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
    this.fetchTickets(1)
  }
}
</script>
