<template>
  <nav class="py-3 bg-dark" data-bs-theme="dark">
    <div class="container d-flex flex-wrap align-items-center">
      <router-link :to="{ name: 'home' }" class="navbar-brand text-light me-auto">
        UFSC
      </router-link>
      <ul class="nav">
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link :to="{ name: 'login' }" class="btn btn-primary">
            Entrar
          </router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <button @click="logout" class="btn btn-danger">
            Sair
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
  font-weight: 1000;
}
</style>

<script>
export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
    };
  },
  created() {
    // Escuta o evento 'login' para atualizar o estado de autenticação
    window.addEventListener('login', this.handleLogin);
    window.addEventListener('logout', this.handleLogout);
  },
  beforeUnmount() {
    // Remove os event listeners ao desmontar o componente
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
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      // Emite um evento global para notificar outros componentes (opcional)
      window.dispatchEvent(new Event('logout'));
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
