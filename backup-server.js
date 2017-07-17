const express = require('express');
const bodyParser = require('body-parser');
const Storage = require('node-persist');
Storage.initSync({ dir: './storage' });

const auth = {
  user: 'user',
  password: 'pass'
}

const authenticate = (authHeaders, res) => {
  const b64auth = (authHeaders || '').split(' ')[1] || '';
  const [user, password] = new Buffer(b64auth, 'base64').toString().split(':');
  if (!user || !password || user !== auth.user || password !== auth.password) {
    res.set('WWW-Authenticate', 'Basic realm="msb"');
    res.status(401).send('access denied');
    return false;
  }
  return true;
}

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  next();
});
app.use(bodyParser.json());

// mining-stats recover endpoint
app.get("/msr", (request, response) => {
  if (authenticate(request.headers.authorization, response)) {
    const data = Storage.getItemSync('mining-stats-data') || null;
    response.send({ status: 'ok', data: data });
  }
});

// mining-stats backup endpoint
app.post("/msb", (request, response) => {
  if (authenticate(request.headers.authorization, response)) {
    if (request.body) {
      const oldData = Storage.getItemSync('mining-stats-data') || {};
      const data = Object.assign({}, oldData, request.body);
      Storage.setItemSync('mining-stats-data', data);
      response.send({ status: 'ok', data: data });
    } else {
      response.send({ status: 'error', detail: 'empty data recieved' });
    }
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log('listening on port ' + listener.address().port);
});
