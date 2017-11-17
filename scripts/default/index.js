'use strict';

function clock() {
  let time = new Date().getTime();
  let seconds = ~~(time / 1000) % 60;
  let minutes = ~~((time / 1000) / 60) % 60;
  let hours = ~~((time / 1000) / 60 / 60) % 24 + 2; // + 2 for local time
  return {seconds: seconds, minutes: minutes, hours: hours};
}

module.exports = clock;