const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

app.post('/proxy', async (req, res) => {
  const payload = req.body;

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbyq1yGrR59U8a9_OXt_Z3AToLvKYKzXsIf1Ssyl-cJxtyiZI4ZCfkyRzn2NzxaUAr_s8w/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.text();
    res.status(200).json({ status: 'proxy-ok', gasResponse: result });
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ status: 'proxy-fail', error: error.toString() });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});