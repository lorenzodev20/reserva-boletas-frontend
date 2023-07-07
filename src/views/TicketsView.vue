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
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  computed:{
    ...mapState('tickets',['tickets','showErrors','errors']),
    ...mapGetters('tickets',['getTickets']),
    ...mapMutations('tickets',['setTickets','setPagination','changeShowErrorValue','cleanErrors']),
    myTickets(){
      return this.getTickets
    }
  },
  methods:{
    ...mapActions('tickets',['fetchTickets'])
  },
  created() {
    this.fetchTickets(1)
  }
}
</script>

<style>

</style>