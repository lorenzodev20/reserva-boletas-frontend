<template>
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
</template>
<script>
export default{
    props:{
        totalPageCount: null,  
    }
}
</script>

