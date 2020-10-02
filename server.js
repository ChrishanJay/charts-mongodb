const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

const CHART_EMBEDDING_URL = 'https://charts.mongodb.com/charts-data-analytics-lqcwa';
const CHART_TENANT_ID = 'REPLACE_WITH_TENANT_ID';
const EMBEDDING_KEY = '63254e5f37e24cdf';
const EXPIRY_IN_SECONDS = 5000;

app.get('/api/verifiedchart/:id', (req, res) => {
    const timestamp = Math.floor(Date.now() / 1000);
    let payload = `id=${req.params.id}&timestamp=${timestamp}&expires-in=${EXPIRY_IN_SECONDS}`;
    const hmac = crypto.createHmac('sha256', EMBEDDING_KEY);
    hmac.update(payload);
    const signature = hmac.digest('hex');
    const url = `${CHART_EMBEDDING_URL}/embed/charts?${payload}&signature=${signature}`;
    res.send(url);
});

app.use(express.static('static'));
app.listen(port, () => console.log(`Listening on port ${port}`));
