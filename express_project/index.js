const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/', (_req, res) => {
  res.json({ status: 1, msg: 'Home page API' });
});

app.get('/news', (_req, res) => {
  res.json({ status: 1, msg: 'news api is called' });
});

app.get('/news/:id', (req, res) => {
  const { id } = req.params;
  res.json({ status: 1, msg: `News Details API for id ${id}` });
});

app.get('/products', (_req, res) => {
  res.json({ status: 1, msg: 'Product api created' });
});

app.post('/login', (req, res) => {
  res.status(200).json({
    status: 1,
    msg: 'Login API',
    bodyData: req.body,
    queryData: req.query,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});