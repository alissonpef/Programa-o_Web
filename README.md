# **Sistema de Controle de Acesso a Salas**

Este projeto implementa um sistema de controle automatizado para abertura de portas em uma universidade. A aplicação permite a professores e funcionários gerenciar e acessar salas por meio de uma interface web, oferecendo maior praticidade e segurança no processo de autenticação e controle de acessos.

---

## **Sumário**

1. [Visão Geral](#visão-geral)
2. [Equipe Responsável](#equipe-responsável)
3. [Principais Funcionalidades](#principais-funcionalidades)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Estrutura do Repositório](#estrutura-do-repositório)
6. [API - Endpoints](#api---endpoints)
7. [Como Executar](#como-executar)
8. [Simulação de Fechaduras](#simulação-de-fechaduras)
9. [Conclusão](#conclusão)

---

## **Visão Geral**

O **Sistema de Controle de Acesso a Salas** foi desenvolvido com foco em otimizar o gerenciamento de portas em ambientes acadêmicos. Por meio de fechaduras eletrônicas controladas por microcontroladores, a equipe de TI economiza tempo em configurações manuais, enquanto os usuários (professores e funcionários) contam com uma plataforma web confiável para acessar as salas autorizadas.

---

## **Equipe Responsável**

- **Alisson Pereira Ferreira**  
- **Dennis Paul Paz Lopez**

**Universidade Federal de Santa Catarina (UFSC) – Campus Araranguá**  
Caixa Postal 88.905-120 – Araranguá – SC – Brasil

---

## **Principais Funcionalidades**

1. **Autenticação de Usuários**  
   - Login seguro utilizando credenciais institucionais (UFSC).
2. **Listagem de Salas Autorizadas**  
   - Exibição das salas disponíveis de acordo com as permissões do usuário.
3. **Abertura de Portas**  
   - Envio de comandos ao microcontrolador para liberar o acesso à sala selecionada.
4. **Comunicação em Tempo Real**  
   - Utilização de WebSockets para integrar o backend ao microcontrolador em tempo real.

---

## **Tecnologias Utilizadas**

### **Frontend**
- **Vue.js**: Framework JavaScript para criação de interfaces reativas.
- **Requisições HTTP (REST)**: Métodos GET e POST para comunicação com o backend.

### **Backend**
- **Node.js & Express**: Criação de APIs RESTful e gerenciamento de conexões via WebSockets.
- **MongoDB**: Armazenamento de dados (credenciais, permissões) em banco de dados NoSQL.

### **Microcontroladores**
- Scripts de simulação representando o funcionamento real das fechaduras eletrônicas.

---

## **Estrutura do Repositório**

```bash
/Controle_de_Portas
├── /frontend           # Aplicação Web (Vue.js)
└──/backend             # Servidor (Node.js, Express, WebSockets)
```

---

## **API - Endpoints**

1. **Login**  
   - **Endpoint**: `/login`  
   - **Método**: `POST`  
   - **Dados de Entrada**: `idufsc`, `senha`  
   - **Retorno**: Token de autenticação

2. **Lista de Salas**  
   - **Endpoint**: `/lista`  
   - **Método**: `GET`  
   - **Retorno**: Lista de salas que o usuário tem permissão para acessar

3. **Abertura de Porta**  
   - **Endpoint**: `/abre`  
   - **Método**: `POST`  
   - **Dados de Entrada**: `identificação_da_porta`  
   - **Ação**: Envia comando ao microcontrolador para abertura da porta

---

## **Como Executar**

### 1. Clonar o Repositório

```bash
git clone https://github.com/alissonpef/Projetos_de_Web-UFSC.git
```

### 2. Configurar o Banco de Dados

1. Instale o [MongoDB](https://www.mongodb.com/).  
2. Crie uma base de dados chamada `controle_portas`.  
3. Execute o script `/backend/db/init.js` para popular o banco com dados iniciais.

### 3. Executar o Backend

1. Acesse a pasta `/backend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   node server.js
   ```
4. O servidor estará acessível em:  
   ```
   http://localhost:2000
   ```

### 4. Executar o Frontend

1. Acesse a pasta `/frontend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run serve
   ```
4. A aplicação web estará disponível em:  
   ```
   http://localhost:8080
   ```

### 5. Testar o Sistema

1. Acesse a aplicação via navegador.  
2. Utilize as credenciais simuladas presentes em `db/init.js`.  
3. Verifique a funcionalidade de login, a listagem de salas e a abertura de portas.

---

## **Conclusão**

O **Sistema de Controle de Acesso a Salas** integra tecnologias modernas para agilizar o gerenciamento de portas em ambientes universitários, proporcionando segurança e escalabilidade. Futuras melhorias podem incluir relatórios de uso, integração com sistemas biométricos e automação de tarefas administrativas.

Em caso de dúvidas ou sugestões, fique à vontade para abrir uma *issue* ou enviar um *pull request*.

---
