const Atendimento = require('../models/atendimentos')


module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        
        Atendimento.lista()
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(500).json(erros))

    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.buscaPorId(id, res);
    })

    app.post('/atendimentos', (req, res) => {
        
        const atendimento = req.body;

        Atendimento.adiciona(atendimento)
            .then(atendimento => res.status(201).json(atendimento))
            .catch(erros => res.status(400).json(erros))
        
    })

    app.patch('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id);
        Atendimento.altera(id, req.body, res);

    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.deleta(id, res);
    })
     
     
}