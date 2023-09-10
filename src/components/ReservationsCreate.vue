<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Crear una reservación
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="ticket_id" class="form-label">Boleta</label>
            <select
              class="form-select"
              aria-label="Customers List"
              id="ticket_id"
              name="ticket_id"
              v-model="reservation.ticket_id"
            >
              <option value="0">Selecione una boleta</option>
              <option
                v-for="ticket in myTickets"
                :key="ticket.id"
                :value="ticket.id"
                v-show="ticket.stock"
              >
                {{ ticket.title }} - Stock: {{ ticket.stock }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="customer_id" class="form-label">Cliente</label>
            <select
              class="form-select"
              aria-label="Customers List"
              id="customer_id"
              name="customer_id"
              v-model="reservation.customer_id"
            >
              <option value="0">Selecione un cliente</option>
              <option
                v-for="customer in myCustomers"
                :key="customer.id"
                :value="customer.id"
              >
                {{ customer.full_name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad Disponible</label>
            <input
              v-model="reservation.quantity"
              type="number"
              class="form-control"
              id="quantity"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            ref="boton-close"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="saveReservation"
          >Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      reservation: {
        quantity: 0,
        customer_id: 0,
        ticket_id: 0
      }
    }
  },
  computed: {
    ...mapGetters('tickets', ['getListTickets']),
    ...mapGetters('customers', ['getCustomerList']),
    myTickets () {
      return this.getListTickets
    },
    myCustomers () {
      return this.getCustomerList
    }
  },
  methods: {
    ...mapActions('tickets', ['getTicketsList']),
    cleanInput () {
      this.reservation.quantity = 0
      this.reservation.customer_id = ''
      this.reservation.ticket_id = ''
    },
    closeButton () {
      this.cleanInput()
      this.$refs['boton-close'].click()
    },
    saveReservation(){
      if (this.reservation.customer_id == 0) {
        alert('Debes seleccionar un cliente')
        return
      }
      if (this.reservation.ticket_id == 0) {
        alert('Debes seleccionar una Boleta')
        return
      }
      if (this.reservation.quantity <= 0) {
        alert('La cantidad debe ser mayo a 0')
        return
      }
      this.$emit('saved-reservation',this.reservation)
    }
  }
}
</script>

<style></style>
