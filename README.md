# Projeto de Controle de Portas na Universidade

## 📖 Introdução

Este projeto visa implementar um sistema de controle automatizado para abertura de portas em uma universidade. Com base na infraestrutura de fechaduras eletrônicas conectadas a microcontroladores, o sistema permite que professores e funcionários gerenciem e acessem salas utilizando uma plataforma web. O objetivo é otimizar o tempo gasto pela equipe de TI em configurações manuais, tornando o processo de gerenciamento de acessos mais eficiente e seguro.

---

## 👥 Integrantes do Projeto

- **Alisson Pereira Ferreira**
- **Dennis Paul Paz Lopez**

**Universidade Federal de Santa Catarina (UFSC) – Campus Araranguá**  
Caixa Postal 88.905-120 – Araranguá – SC – Brasil

---

### Principais Características

1. **Autenticação de Usuários**: Professores e funcionários fazem login utilizando suas credenciais da UFSC.
2. **Controle de Acesso**: O sistema exibe uma lista de salas que o usuário tem permissão para acessar.
3. **Abertura de Portas**: Ao clicar no botão correspondente à sala, uma mensagem é enviada ao microcontrolador para abrir a porta.
4. **Sistema Baseado em Websockets**: Comunicação em tempo real entre o servidor e os microcontroladores das fechaduras.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **Framework**: Vue.js para renderização dinâmica de componentes.
- **Comunicação**: Requisições GET e POST para interação com o backend.

### **Backend**
- **Servidor**: Node.js com Express para criação de APIs RESTful.
- **Websockets**: Gerenciamento de conexões entre o servidor e microcontroladores.
- **Banco de Dados**: MongoDB para armazenamento de credenciais e permissões dos usuários.

### **Microcontroladores**
- Simulação de fechaduras utilizando scripts que representam o comportamento real dos dispositivos.

---

## 📂 Estrutura do Repositório

```
/Controle_de_Portas
├── /frontend          # Código da aplicação web
├── /backend           # Servidor Node.js
└── /docs              # Documentação do projeto
```

---

## ⚙️ Funcionalidades

1. **Login**:
   - Endpoint: `/login`
   - Método: POST
   - Entrada: `idufsc`, `senha`
   - Saída: Token de autenticação.

2. **Lista de Salas**:
   - Endpoint: `/lista`
   - Método: GET
   - Retorna a lista de salas que o usuário tem permissão para acessar.

3. **Abertura de Porta**:
   - Endpoint: `/abre`
   - Método: POST
   - Entrada: `identificação_da_porta`
   - Aciona o microcontrolador para abrir a porta correspondente.

---

## 🚀 Como Executar

### 1. Clonar o Repositório

```bash
git clone https://github.com/alissonpef/Projetos_de_Web-UFSC.git
```

### 2. Configurar o Banco de Dados

- Certifique-se de ter o MongoDB instalado.
- Crie uma base de dados chamada `controle_portas`.
- Popule os dados utilizando o script em `/backend/db/init.js`.

### 3. Executar o Backend

1. Navegue até a pasta `/backend`.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   node server.js
   ```

   O servidor estará acessível em `http://localhost:2000`.

### 4. Executar o Frontend

1. Navegue até a pasta `/frontend`.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor do frontend:

   ```bash
   npm run serve
   ```

   A aplicação web estará acessível em `http://localhost:8080`.

### 5. Testar o Sistema

- Acesse a aplicação pelo navegador.
- Utilize as credenciais simuladas para login (disponíveis no arquivo `db/init.js`).
- Teste as funcionalidades de login, lista de salas e abertura de portas.

---

## 🔄 Simulação de Fechaduras

Para simular o funcionamento das fechaduras:

1. Execute o script `fechadura_simulada.js` localizado na pasta `/backend/simulation`:

   ```bash
   node fechadura_simulada.js
   ```

2. O script cria uma simulação de comportamento das fechaduras em tempo real.

---

## 🌟 Conclusão

O **Controle de Portas na Universidade** é um sistema robusto que integra tecnologias modernas para otimizar a segurança e o gerenciamento de acesso em ambientes universitários. Este projeto foi desenvolvido com foco em eficiência, escalabilidade e facilidade de uso. Futuras melhorias incluem a implementação de relatórios de uso e integração com sistemas biométricos.

---

