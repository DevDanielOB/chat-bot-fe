<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h2 class="login-title">Login</h2>
      <input v-model="email" placeholder="Email" class="login-input" />
      <input v-model="senha" type="password" placeholder="Senha" class="login-input" />
      <button @click="login" class="login-button">Entrar</button>
      <router-link to="/register" class="login-link">Criar conta</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;

export default {
  data() {
    return {
      email: '',
      senha: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post(`${url}/auth/login`, {
          email: this.email,
          senha: this.senha
        });
        localStorage.setItem('token', res.data.access_token);
        this.$router.push('/chat');
      } catch (err) {
        alert('Erro ao fazer login');
      }
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f2f2f2;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #061ef7;
  text-align: center;
}

.login-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
}

.login-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.login-link {
  margin-top: 16px;
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  transition: text-decoration 0.3s ease;
}

.login-link:hover {
  text-decoration: underline;
}

/* Melhor adaptação para telas menores */
@media (max-width: 500px) {
  .login-title {
    font-size: 20px;
  }

  .login-input,
  .login-button {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
