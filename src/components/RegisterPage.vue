<template>
  <div class="register-wrapper">
    <div class="register-container">
      <h2 class="register-title">Criar Conta</h2>
      <input v-model="nome" placeholder="Nome" class="register-input" />
      <input v-model="email" placeholder="Email" class="register-input" />
      <input v-model="senha" type="password" placeholder="Senha" class="register-input" />
      <button @click="register" class="register-button">Registrar</button>
      <router-link to="/login" class="register-link">Já tem uma conta? Entrar</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const url = process.env.VUE_APP_BASE_URL;
export default {
  data() {
    return {
      nome: '',
      email: '',
      senha: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post(`${url}/users`, {
          nome: this.nome,
          email: this.email,
          senha: this.senha
        });
        alert('Conta criada com sucesso!');
        this.$router.push('/login');
      } catch (err) {
        if (err.status === 409)  {
          alert('Email já cadastrado');
        } else {
          alert('Erro ao criar conta');
        }
      }
    }
  }
}
</script>

<style scoped>
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f2f2f2;
  box-sizing: border-box;
}

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.register-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #061ef7;
}

.register-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
}

.register-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.register-button {
  width: 100%;
  max-width: 300px;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #0056b3;
}

.register-link {
  margin-top: 12px;
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .register-title {
    font-size: 20px;
  }

  .register-input,
  .register-button {
    font-size: 14px;
    padding: 10px;
  }

  .register-button {
    max-width: 100%;
  }
}
</style>
