const express = require('express');
const { randomUUID } = require('crypto'); // para gerar o GUID
const app = express();

app.use(express.json()); // Para permitir receber dados no formato JSON

// Array para armazenar as pessoas
let pessoas = [];

// GET - Retornar lista de pessoas
app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});

// POST - Adicionar nova pessoa
app.post('/pessoas', (req, res) => {
    const { nome, celular } = req.body;
    const novaPessoa = { id: randomUUID(), nome, celular };
    pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa);
});

// PUT - Atualizar pessoa por ID
app.put('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, celular } = req.body;

    const index = pessoas.findIndex(pessoa => pessoa.id === id);
    
    if (index !== -1) {
        pessoas[index] = { id, nome, celular };
        res.json(pessoas[index]);
    } else {
        res.status(404).json({ message: "Pessoa não encontrada" });
    }
});

// DELETE - Excluir pessoa por ID
app.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;

    const index = pessoas.findIndex(pessoa => pessoa.id === id);
    
    if (index !== -1) {
        pessoas.splice(index, 1);
        res.status(204).send(); // Sucesso sem conteúdo
    } else {
        res.status(404).json({ message: "Pessoa não encontrada" });
    }
});

// Rodar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
