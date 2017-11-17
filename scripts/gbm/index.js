'use strict';

const CallByMeaning = require('cbm-api');
const cbm = new CallByMeaning('http://localhost:3000');

async function clock() {
  let result = await cbm.search({outputNodes: 'time'}); // **
  let getTime = eval(cbm.getCode(result.body[1].function));
  let time = getTime();
  let seconds = ~~(time / 1000) % 60;
  let minutes = ~~((time / 1000) / 60) % 60;
  let hours = ~~((time / 1000) / 60 / 60) % 24 + 2; // + 2 for local time
  return {seconds: seconds, minutes: minutes, hours: hours};
}

module.exports = clock;

// **
// [
//   {
//     'function': 'now.js',
//     'desc': 'Gets the timestamp of the number of seconds that have elapsed since the Unix epoch (1 January 1970 00:00:00 UTC).',
//   },
//   {
//     'function': 'getTime.js',
//     'desc': 'Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch(1 January 1970 00: 00: 00 UTC).',
//   },
// ];