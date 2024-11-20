<template>
  <div id="home">
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-12 text-center">
          <div class="h2">
            Bem-vindo ao Sistema de Gerenciamento de Salas
          </div>
          <p class="lead mt-3">
            Utilize o sistema para acessar as salas da UFSC. <br>
            Faça o login para visualizar as salas que você tem permissão de acessar.
          </p>
          <p class="lead mt-5">
            <strong>Integrantes:</strong> <br>
            <span>Dennis Paz</span> <br>
            <span>Alisson Pereira</span> <br>
          </p>
          <router-link v-if="!isAuthenticated" :to="{ name: 'login' }" class="btn btn-primary btn-lg mt-4">
            Entrar
          </router-link>
          <router-link v-if="isAuthenticated" :to="{ name: 'salas' }" class="btn btn-success btn-lg mt-5">
            Acessar Minhas Salas
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
    };
  },
  created() {
    window.addEventListener('login', this.handleLogin);
    window.addEventListener('logout', this.handleLogout);
  },
  beforeUnmount() {
    window.removeEventListener('login', this.handleLogin);
    window.removeEventListener('logout', this.handleLogout);
  },
  methods: {
    handleLogin() {
      this.isAuthenticated = true;
    },
    handleLogout() {
      this.isAuthenticated = false;
    },
  },
};
</script>
