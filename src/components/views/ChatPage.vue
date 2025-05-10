<template>
  <div class="chat-container">
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>Contatos</h2>
        <h2>{{ meuNome }}</h2>
        <button @click="sair">Sair</button>
      </div>
      <ul class="contact-list">
        <li v-for="contact in contacts" :key="contact.id" :class="{ active: destinatario === contact.id }"
          @click="destinatario = contact.id">
          {{ contact.nome }}
          <span v-if="unread[contact.id]" class="unread-icon">🔵</span>
        </li>

      </ul>
    </div>

    <div class="chat-box">
      <div class="messages">
        <div v-for="msg in mensagens" :key="msg.id" class="message"
          :class="{ 'me': msg.de === meuId, 'other': msg.de !== meuId }">
          <div class="message-header">
            <strong>{{ nomeDoRemetente(msg.de) }}</strong>
            <small>{{ formatarHora(msg.createdAt) }}</small>
          </div>
          <div class="message-body">
            {{ msg.texto }}
          </div>
        </div>

      </div>
      <div class="input-box">
        <input v-model="texto" @keyup.enter="enviar" placeholder="Digite uma mensagem..." />
        <button @click="enviar">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import io from 'socket.io-client';

const url = process.env.VUE_APP_BASE_URL;
export default {
  data() {
    return {
      texto: '',
      mensagens: [],
      destinatario: null,
      meuId: null,
      contacts: [],
      socket: null,
      meuNome: '',
      unread: {},
    };
  },
  async created() {
    const token = localStorage.getItem('token');
    if (!token) return this.$router.push('/login');

    this.socket = io(url, {
      auth: { token }
    });

    this.socket.on('nova-mensagem', (msg) => {
      if (msg.de === this.destinatario || msg.para === this.destinatario) {
        this.mensagens.push(msg);
      } else {
        const contatoId = msg.de === this.meuId ? msg.para : msg.de;
        if (!this.unread[contatoId]) this.unread[contatoId] = 0;
        this.unread[contatoId]++;
      }
    });

    const decoded = JSON.parse(atob(token.split('.')[1]));
    this.meuId = decoded.sub;

    const res = await axios.get(`${url}/users/all-users`);
    this.contacts = res.data.filter(contact => contact.id !== this.meuId);
    this.meuNome = res.data.find(contact => contact.id === this.meuId).nome;
  },
  watch: {
    async destinatario(novo) {
      if (!novo) return;
      const token = localStorage.getItem('token');
  
  if (!token) {
    this.$router.push('/login');
    return;
  }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
      const res = await axios.get(`${url}/messages?de=${this.meuId}&para=${novo}`, config);
      this.mensagens = res.data;

      if (this.unread[novo]) {
        this.unread[novo] = 0;
      }
    }
  }
  ,
methods: {
  async enviar() {
    if (!this.texto || !this.destinatario) return;

    const novaMsg = {
      de: this.meuId,
      para: this.destinatario,
      texto: this.texto,
      createdAt: new Date().toISOString()
    };

    this.socket.emit('nova-mensagem', novaMsg);

    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');
      return;
    }

    const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

    await axios.post(`${url}/messages`, novaMsg, config);

    this.mensagens.push(novaMsg);
    this.texto = '';
  },
  nomeDoRemetente(id) {
    if (id === this.meuId) return 'Você';
    const contato = this.contacts.find(c => c.id === id);
    return contato ? contato.nome : 'Desconhecido';
  },
  formatarHora(timestamp) {
    if (!timestamp) return '';
    const data = new Date(timestamp);
    return data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  },
  sair() {
    if (this.socket) this.socket.disconnect();
    localStorage.removeItem('token');
    this.$router.push('/login');
  }
}
};
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 90vh;
  font-family: Arial, sans-serif;
  flex-direction: row;
}

.sidebar {
  width: 25%;
  background-color: #f7f7f7;
  border-right: 1px solid #ddd;
  padding: 20px;
  box-sizing: border-box;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 20px;
}

.sidebar-header button {
  background-color: #007bff;
  ;
  border: none;
  color: white;
  padding: 6px 10px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-list li {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}

.contact-list li:hover {
  background-color: #e0e0e0;
}

.contact-list li.active {
  background-color: #d0e6ff;
  font-weight: bold;
}

.message-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 4px;
  color: #555;
}

.message-body {
  font-size: 14px;
}

.chat-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f2f2f2;
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  max-width: 60%;
  border-radius: 8px;
  word-wrap: break-word;
}

.message.me {
  background-color: #d1e7dd;
  align-self: flex-end;
  align-items: flex-end;
}

.message.other {
  background-color: #e2e3e5;
  align-items: flex-start;
}

.input-box {
  display: flex;
  gap: 10px;
}

.input-box input {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-box button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}

.input-box button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .chat-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
    padding: 15px;
  }

  .chat-box {
    padding: 15px;
  }

  .message {
    max-width: 80%;
    font-size: 14px;
  }

  .sidebar-header h2 {
    font-size: 18px;
  }

  .input-box input {
    font-size: 12px;
  }

  .input-box button {
    font-size: 12px;
    padding: 8px 16px;
  }

  .unread-icon {
    margin-left: 8px;
    font-size: 12px;
    color: #007bff;
  }

}
</style>
