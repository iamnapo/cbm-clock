'use strict';

const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const io = require('socket.io').listen(httpServer);

const clock1 = require('./scripts/default');
const clock2 = require('./scripts/gbn');
const clock3 = require('./scripts/gbm');
const clock4 = require('./scripts/cbm-sameUnits');
const clock5 = require('./scripts/cbm-differentUnits');

app.set('view engine', 'pug');
app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => res.send('<h1>Hello friend 😀</h1>', {title: 'CallByMeaning demo'}));
app.get('/1', (req, res) => res.render('clock_1', {title: 'Default JavaScript'}));
app.get('/2', (req, res) => res.render('clock_2', {title: 'Get by name'}));
app.get('/3', (req, res) => res.render('clock_3', {title: 'Get by meaning'}));
app.get('/4', (req, res) => res.render('clock_4', {title: 'Call by meaning with existing units'}));
app.get('/5', (req, res) => res.render('clock_5', {title: 'Call by meaning with different units'}));
app.get('*', (req, res) => res.status(404).send('Hmm... How did you end up here?'));

let io1;
io.of('/1').on('connection', (socket) => {
  socket.on('clock1', () => {
    io1 = setInterval(() => {
      let times = clock1();
      io.of('/1').emit('data1', times);
    }, 1000);
  });
  socket.on('disconnect', () => {
    clearInterval(io1);
  });
});

let io2;
io.of('/2').on('connection', (socket) => {
  socket.on('clock2', () => {
    io1 = setInterval(() => {
      clock2().then((times) => io.of('/2').emit('data2', times));
    }, 1000);
  });
  socket.on('disconnect', () => {
    clearInterval(io2);
  });
});

let io3;
io.of('/3').on('connection', (socket) => {
  socket.on('clock3', () => {
    io1 = setInterval(() => {
      clock3().then((times) => io.of('/3').emit('data3', times));
    }, 1000);
  });
  socket.on('disconnect', () => {
    clearInterval(io3);
  });
});

let io4;
io.of('/4').on('connection', (socket) => {
  socket.on('clock4', () => {
    io1 = setInterval(() => {
      clock4().then((times) => io.of('/4').emit('data4', times));
    }, 1000);
  });
  socket.on('disconnect', () => {
    clearInterval(io4);
  });
});

let io5;
io.of('/5').on('connection', (socket) => {
  socket.on('clock5', () => {
    io1 = setInterval(() => {
      clock5().then((times) => io.of('/5').emit('data5', times));
    }, 1000);
  });
  socket.on('disconnect', () => {
    clearInterval(io5);
  });
});

let myServer = httpServer.listen(3001, () => {
  console.log('Server started at http://localhost:%s. Have fun. 😀', 3001);
});
exports.close = () => {
  myServer.close();
};