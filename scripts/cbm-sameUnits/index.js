'use strict';

const CallByMeaning = require('cbm-api');
const cbm = new CallByMeaning('http://localhost:3000');

async function clock() {
  let time = await cbm.call({outputNodes: 'time', outputUnits: 'milliseconds'}); time = time.body;
  let seconds = Math.floor((time / 1000)) % 60;
  let minutes = (Math.floor((time / 1000) / 60)) % 60;
  let hours = (Math.floor((time / 1000) / 60 / 60)) % 24 + 2; // + 2 for local time
  return {seconds: seconds, minutes: minutes, hours: hours};
}

module.exports = clock;