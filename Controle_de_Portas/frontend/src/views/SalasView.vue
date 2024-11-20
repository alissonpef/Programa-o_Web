<template>
  <div id="salas">
    <div class="container">
      <div v-if="alertMessage" :class="['alert', alertType]" role="alert">
        {{ alertMessage }}
        <button type="button" class="btn-close" @click="closeAlert" aria-label="Close">
        </button>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="col-12">
          <h4 class="mb-5 fw-normal text-center">
            Salas que você pode acessar
          </h4>
          <div v-if="salas.length">
            <div v-for="sala in salas" :key="sala" class="mb-3 d-flex justify-content-center">
              <button class="btn btn-success w-50 py-2" @click="abrirSala(sala)">
                Abrir {{ sala }}
              </button>
            </div>
          </div>
          <div v-else>
            <p>Você não tem acesso a nenhuma sala.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      salas: [],
      alertMessage: '',
      alertType: '',
    };
  },
  created() {
    this.getSalas();
  },
  methods: {
    async getSalas() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.$router.push({ name: 'login' });
          return;
        }
        const response = await axios.get('http://localhost:2000/lista', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.salas = response.data.salas || [];
      } catch (error) {
        console.error(error);
        this.showAlert('Erro ao buscar a lista de salas.', 'alert-danger');
        this.$router.push({ name: 'login' });
      }
    },

    async abrirSala(sala) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.$router.push({ name: 'login' });
          return;
        }
        const response = await axios.post(
          'http://localhost:2000/abre',
          { sala },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data && response.data.message) {
          this.showAlert(`Sala ${sala}: ${response.data.message}`, 'alert-success');
        } else {
          this.showAlert(`Erro ao abrir a sala ${sala}.`, 'alert-danger');
        }
      } catch (error) {
        console.error(error);
        this.showAlert(`Erro ao abrir a sala ${sala}.`, 'alert-danger');
      }
    },
    showAlert(message, type) {
      this.alertMessage = message;
      this.alertType = type;
      setTimeout(this.closeAlert, 5000);
    },
    closeAlert() {
      this.alertMessage = '';
      this.alertType = '';
    },
  },
};
</script>

<style scoped>
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
