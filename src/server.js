const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json())
app.use('/', require('./router/router'))

const port = process.env.PORT

app.listen(port || 3333, () => console.log("Servidor iniciado"));