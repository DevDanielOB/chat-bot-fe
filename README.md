# 💬 chat-bot-front

A **chat-bot-front** é uma interface web construída com **Vue.js**, que se conecta à API do projeto **chat-bot-api** e permite que usuários cadastrados possam trocar mensagens em tempo real utilizando **Socket.IO**.

A estilização da aplicação foi feita com **Flexbox**, garantindo um layout responsivo e fluido. A comunicação com o back-end ocorre via WebSocket, utilizando o protocolo Socket.IO para envio e recebimento de mensagens entre usuários autenticados.

---

## 🚀 Tecnologias Utilizadas

- **[Vue.js](https://vuejs.org/)** – Framework JavaScript progressivo
- **[Socket.IO](https://socket.io/)** – Comunicação em tempo real
- **Flexbox** – Layout responsivo com CSS moderno
- **[Docker](https://www.docker.com/)** – Contêiner para desenvolvimento e execução

---

## 📦 Clonando o projeto

Clone o repositório em sua máquina local com o comando:

```bash
git clone https://github.com/DevDanielOB/chat-bot-front.git
cd chat-bot-front
```

---

## 🛠️ Executando o projeto

Para rodar a aplicação localmente com Docker, utilize o comando abaixo no terminal:

```bash
docker compose up --build
```

A aplicação será iniciada na porta:  
🔗 `http://localhost:8080`

> ℹ️ **Atenção:** Para que o chat funcione corretamente, é necessário que o back-end (`chat-bot-api`) também esteja em execução em `http://localhost:3000`.

---

## 🧪 Testando o Chat

Para testar o serviço de mensagens em tempo real:

1. Acesse `http://localhost:8080`
2. Crie **dois usuários diferentes** (ex: `usuario1` e `usuario2`)
3. Faça login com ambos (em janelas diferentes ou navegadores distintos)
4. Comece a trocar mensagens entre eles em tempo real 🎉

---

## 📂 Estrutura do Projeto

```
src/
├── assets/            # Arquivos estáticos
├── components/        # Componentes reutilizáveis Vue
├── views/             # Páginas principais da aplicação
├── services/          # Comunicação com a API
├── socket/            # Configuração do Socket.IO
├── App.vue            # Componente raiz
└── main.js            # Inicialização da aplicação
```

---

## ✅ Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Porta 8080 liberada no seu ambiente local
- A API `chat-bot-api` rodando em `http://localhost:3000`

---

## ✨ Contribuições

Contribuições são muito bem-vindas!  
Sinta-se à vontade para abrir uma **issue** ou enviar um **pull request**.
