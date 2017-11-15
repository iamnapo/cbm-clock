'use strict';

module.exports = () => {
  let time = new Date().getTime();
  let seconds = Math.floor((time / 1000)) % 60;
  let minutes = (Math.floor((time / 1000) / 60)) % 60;
  let hours = (Math.floor((time / 1000) / 60 / 60)) % 24 + 2; // + 2 for local time
  return {seconds: seconds, minutes: minutes, hours: hours};
};