<template>
  <div class="container">
    <h1 class="text-center">Listado de reservaciones</h1>
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
          <tr v-for="item in 100" :key="item.id">
            <th scope="row">1</th>
            <td>2</td>
            <td>Concierto</td>
            <td>Juana Ballesta</td>
            <td>2023-06-18</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ReservationsPaginationVue/>
  </div>
</template>

<script>
import ReservationsPaginationVue from '@/components/ReservationsPagination.vue'

export default {
  components:{
    ReservationsPaginationVue
  }
}
</script>

<style></style>
