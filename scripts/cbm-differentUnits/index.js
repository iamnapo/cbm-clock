'use strict';

const CallByMeaning = require('cbm-api');
const cbm = new CallByMeaning();

async function clock() {
  let secondsUNIX = (await cbm.call('time', 'seconds')).body;
  let minutesUNIX = (await cbm.call('time', 'minutes')).body;
  let hoursUNIX = (await cbm.call('time', 'hours')).body;

  let seconds = ~~secondsUNIX % 60;
  let minutes = ~~minutesUNIX % 60;
  let hours = ~~hoursUNIX % 24 + 2; // + 2 for local time
  return {seconds: seconds, minutes: minutes, hours: hours};
}

module.exports = clock;