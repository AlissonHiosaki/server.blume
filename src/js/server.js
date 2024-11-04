const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Simulação de banco de dados
const users = {
    admin: 'admin' // Você pode adicionar mais usuários aqui
};

// Endpoint de login
app.post('/login', (req, res) => {
    const { login, senha } = req.body;

    if (users[login] && users[login] === senha) {
        res.status(200).json({ message: 'Login bem-sucedido!' });
    } else {
        res.status(401).json({ message: 'Usuário ou senha incorreta. Tente novamente.' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
