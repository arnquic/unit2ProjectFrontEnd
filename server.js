const express = require('express');
const app = express();
const routesReport = require('rowdy-logger').being(app);
const path = require('path');

app.get('/', (req, res) => {
    const filepath = path.join(__dirname, 'index.html');
    res.sendFile(filepath);
});

app.get('/main.js', (req, res) => {
    const filepath = path.join(__dirname, 'main.js');
    res.sendFile(filepath);
});

app.get('/style.css', (req, res) => {
    const filepath = path.join(__dirnam, 'style.css');
    res.type('css').sendFile(filepath);
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    reoutesReport.print();
})