<template>
<nav class="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Reserva de Boletas</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
            <router-link :to="{name:'home'}" class="nav-link">
              Home
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name:'reservations'}" class="nav-link">
              Reservaciones
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name:'customers'}" class="nav-link">
                Clientes
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name:'tickets'}" class="nav-link">
              Tickets
            </router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<router-view/>
</template>

<script>
export default {}
</script>

<style></style>
