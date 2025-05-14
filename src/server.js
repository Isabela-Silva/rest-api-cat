const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); 

let gatos = [
  { id: 1, nome: 'Mingau', idade: 3, cor: 'Branco', comentarios: [] },
  { id: 2, nome: 'Garfield', idade: 5, cor: 'Laranja', comentarios: [] }
];

app.get('/api/gatos', (req, res) => {
  res.json(gatos);
});

app.post('/api/gatos', (req, res) => {
  const novoGato = req.body;
  
  const novoId = gatos.length > 0 ? Math.max(...gatos.map(gato => gato.id)) + 1 : 1;
  novoGato.id = novoId;
  
  novoGato.comentarios = [];
  
  gatos.push(novoGato);
  
  res.status(201).json(novoGato);
});

app.delete('/api/gatos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = gatos.findIndex(gato => gato.id === id);
  
  if (indice === -1) {
    return res.status(404).json({ mensagem: 'Gato não encontrado' });
  }
  
  const gatoRemovido = gatos.splice(indice, 1)[0];
  
  res.json({ mensagem: 'Gato removido com sucesso', gato: gatoRemovido });
});

app.put('/api/gatos/:id/nome', (req, res) => {
  const id = parseInt(req.params.id);
  const { novoNome } = req.body;
  
  const gato = gatos.find(gato => gato.id === id);
  
  if (!gato) {
    return res.status(404).json({ mensagem: 'Gato não encontrado' });
  }
  
  if (!novoNome || novoNome.trim() === '') {
    return res.status(400).json({ mensagem: 'Nome inválido' });
  }
  
  gato.nome = novoNome;
  
  res.json({ mensagem: 'Nome atualizado com sucesso', gato });
});

app.post('/api/gatos/:id/comentarios', (req, res) => {
  const id = parseInt(req.params.id);
  const { texto } = req.body;
  
  const gato = gatos.find(gato => gato.id === id);
  
  if (!gato) {
    return res.status(404).json({ mensagem: 'Gato não encontrado' });
  }
  
  if (!texto || texto.trim() === '') {
    return res.status(400).json({ mensagem: 'Comentário inválido' });
  }
  
  const comentario = {
    id: gato.comentarios.length + 1,
    texto,
    data: new Date().toISOString()
  };
  
  gato.comentarios.push(comentario);
  
  res.status(201).json({ mensagem: 'Comentário adicionado com sucesso', comentario });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});