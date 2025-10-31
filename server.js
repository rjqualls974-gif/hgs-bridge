const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let latest = { ok:false, updated:null, data:{} };

app.post('/webhook', (req,res) => {
  try {
    const payload = req.body;
    latest = { ok:true, updated:new Date().toISOString(), data:payload };
    res.json({ ok:true });
  } catch(e) {
    res.status(400).json({ ok:false, error:e.message });
  }
});

app.get('/state', (req,res)=> res.json(latest));

app.listen(10000, ()=> console.log('HGS Node Bridge running on port 10000'));
