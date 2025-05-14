// Importando os módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Criando a aplicação Express
const app = express();
const PORT = 3000;

// Configurando middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Para servir o arquivo HTML

// Banco de dados em memória para os gatos
let gatos = [
  { id: 1, nome: 'Mingau', idade: 3, cor: 'Branco' },
  { id: 2, nome: 'Garfield', idade: 5, cor: 'Laranja' }
];

// Rota para obter todos os gatos
app.get('/api/gatos', (req, res) => {
  res.json(gatos);
});

// Rota para adicionar um novo gato
app.post('/api/gatos', (req, res) => {
  const novoGato = req.body;
  
  // Gerando um ID para o novo gato
  const novoId = gatos.length > 0 ? Math.max(...gatos.map(gato => gato.id)) + 1 : 1;
  novoGato.id = novoId;
  
  // Adicionando o gato à lista
  gatos.push(novoGato);
  
  // Retornando o gato adicionado
  res.status(201).json(novoGato);
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});