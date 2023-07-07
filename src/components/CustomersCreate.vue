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
          <div v-show="showErrors">
            <div class="form-text text-danger">
              <p>No se ha logrado guardar el registro</p>
              <ul>
                <li v-for="(item, index) in errors" :key="index"> {{item}} </li>
              </ul>
            </div>
            <hr>
          </div>
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
              ref="boton-close"
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
import {mapMutations, mapState} from "vuex";

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
  computed:{
    ...mapState('customers',['showErrors','errors']),
    ...mapMutations('customers',['changeShowErrorValue','cleanErrors'])
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
      this.changeShowErrorValue
      this.cleanErrors
    },
    closeButton(){
      this.cleanInput()
      this.$refs["boton-close"].click()
    }
  }
}
</script>

<style scoped>
.text-danger{
  color: darkred;
}
</style>