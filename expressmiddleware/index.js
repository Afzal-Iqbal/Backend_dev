const express = require('express');
const { checkToken } = require('./checkTokenMiddleware.js');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;
app.get('/', (_req, res) => {
    res.send({
        status: 1,
        msg: "Welcome to the backend:"
    });
});

app.get('/news', checkToken, (_req, res) => {
    res.send({
        msg: 'news api is called'
    });
});

app.get('/news/:id', (req, res) => {
    const { id } = req.params;
    res.send({
        msg: `news Details Api for Id ${id}`
    });
});

app.get('/products', (_req, res) => {
    res.send({ msg: 'Product api is called' });
});

app.post('/login', (req, res) => {
    res.status(200).send({
        msg: "login Api",
        bodyData: req.body,
        queryData: req.query,
    });
});

app.listen(PORT, () => {
    console.log(`server is running at on http://localhost:${PORT}`);
});