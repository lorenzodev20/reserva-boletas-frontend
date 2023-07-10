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
            Crear una Boleta
          </h1>
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
                <li v-for="(item, index) in errors" :key="index">{{ item }}</li>
              </ul>
            </div>
            <hr />
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Titulo</label>
            <input
              v-model="ticket.title"
              type="text"
              class="form-control"
              id="title"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Descripción</label>
            <input
              v-model="ticket.description"
              type="text"
              class="form-control"
              id="description"
            />
          </div>
          <div class="mb-3">
            <label for="stock" class="form-label">Cantidad Disponible</label>
            <input
              v-model="ticket.stock"
              type="number"
              class="form-control"
              id="stock"
            />
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
          <button @click="saveTicket" type="button" class="btn btn-primary">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      ticket: {
        title: '',
        description: '',
        stock: 0
      }
    }
  },
  computed: {
    ...mapState('tickets', ['showErrors', 'errors']),
    ...mapMutations('tickets', ['changeShowErrorValue', 'cleanErrors'])
  },
  methods: {
    saveTicket () {
      this.$emit('saved-ticket', this.ticket)
    },
    cleanInput () {
      this.ticket.title = ''
      this.ticket.description = ''
      this.ticket.stock = ''
      this.changeShowErrorValue
      this.cleanErrors
    },
    closeButton () {
      this.cleanInput()
      this.$refs['boton-close'].click()
    }
  }
}
</script>
<style scoped>
.text-danger {
  color: darkred;
}
</style>
