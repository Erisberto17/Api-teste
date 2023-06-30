const express = require('express');

const app = express();

app.use(express.json())
app.use('/', require('./router/router'))

app.listen(3333, () => console.log("Servidor iniciado"));