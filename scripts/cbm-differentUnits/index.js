'use strict';

const CallByMeaning = require('cbm-api');
const cbm = new CallByMeaning();

async function clock() {
  let secondsUNIX = await cbm.call({outputNodes: 'time', outputUnits: 'seconds'}); secondsUNIX = secondsUNIX.body;
  let minutesUNIX = await cbm.call({outputNodes: 'time', outputUnits: 'minutes'}); minutesUNIX = minutesUNIX.body;
  let hoursUNIX = await cbm.call({outputNodes: 'time', outputUnits: 'hours'}); hoursUNIX = hoursUNIX.body;

  let seconds = ~~secondsUNIX % 60;
  let minutes = ~~minutesUNIX % 60;
  let hours = ~~hoursUNIX % 24 + 2; // + 2 for local time
  return {seconds: seconds, minutes: minutes, hours: hours};
}

module.exports = clock;