<template>
  <div id="login">
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="card col-5">
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="h4 mb-3 fw-normal">
                Digite suas credenciais
              </div>
              <div class="form-floating">
                <input class="form-control" type="text" id="usuario" placeholder="Usuário" v-model="ufscid">
                <label for="usuario">Usuário</label>
              </div>
              <div class="form-floating mt-2">
                <input class="form-control" type="password" id="senha" placeholder="Senha" v-model="senha">
                <label for="senha">Senha</label>
              </div>
              <button class="btn btn-primary w-100 py-2 mt-4" type="submit">
                Entrar
              </button>
            </form>
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
      ufscid: '',
      senha: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:2000/login', {
          idufsc: this.ufscid,
          senha: this.senha
        });

        const token = response.data.token;
        if (token) {
          localStorage.setItem('token', token);
          this.$router.push({ name: 'home' });
        } else {
          alert('Usuário ou senha inválidos');
        }
      } catch (error) {
        console.error(error);
        alert('Usuário ou senha inválidos');
      }
    }
  },
};
</script>
