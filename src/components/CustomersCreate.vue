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
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear un cliente</h1>
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="identification" class="form-label">Número de Identificación</label>
            <input  v-model="customer.identification" type="text" class="form-control" id="identification" placeholder="1.123.123.226" >
          </div>
          <div class="mb-3">
            <label for="first_name" class="form-label">Nombres</label>
            <input v-model="customer.first_name" type="text" class="form-control" id="first_name" placeholder="Pepito Antonio" >
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Apellidos</label>
            <input v-model="customer.last_name" type="text" class="form-control" id="last_name" placeholder="Smith" >
          </div>
          <div class="mb-3">
            <label for="phone_number" class="form-label">Número de telefono</label>
            <input v-model="customer.phone_number" type="text" class="form-control" id="phone_number" >
          </div>
        </div>
        <div class="modal-footer">
          <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="cleanInput"
          >
            Cancelar
          </button>
          <button @click="saveCustomer" type="button" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      customer: {
        identification: '',
        first_name:'',
        last_name:'',
        phone_number:''
      }
    }
  },
  methods:{
    saveCustomer(){
      this.$emit('saved-customer',this.customer)
    },
    cleanInput(){
      this.customer.identification = ''
      this.customer.first_name = ''
      this.customer.last_name = ''
      this.customer.phone_number = ''
    }
  }
}
</script>

<style></style>