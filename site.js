let express = require('express');
let fs = require('fs');
let http = require('http');
let https = require('https');
let app = express();

let certpath = '/etc/letsencrypt/live/objelisks.garden/fullchain.pem';
let keypath = '/etc/letsencrypt/live/objelisks.garden/privkey.pem';

let creds = {
  key: fs.readFileSync(keypath, 'utf-8'),
  cert: fs.readFileSync(certpath, 'utf-8'),
};

app.use(express.static('public'));

let httpServer = http.createServer(app);
let httpsServer = https.createServer(creds, app);

httpServer.listen(80, () => console.log('boop'));
httpsServer.listen(443, () => console.log('secure boop'));
