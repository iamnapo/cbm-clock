'use strict';

const CallByMeaning = require('cbm-api');
const cbm = new CallByMeaning('http://localhost:3000');

// Create a function in the server for future reference
let params = {
  name: 'getTime',
  desc: 'Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch(1 January 1970 00: 00: 00 UTC).',
  returnsNames: 'time',
  returnsUnits: 'milliseconds',
  codeFile: __dirname.concat('/getTime.js'),
};
// cbm.create in generally blocking, but when asking to upload a file is not
(async () => {
  let res = await cbm.create(params, 'function');
  return res;
})().then((res) => console.log(res));

// {
//   name: 'getTime',
//   description: 'Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch(1 January 1970 00: 00: 00 UTC).',
//   units: undefined,
//   argsNames: [],
//   argsUnits: [],
//   returnsNames: ['time'],
//   returnsUnits: ['milliseconds'],
//   sourceCode: 'getTime.js',
// }

async function clock() {
  let result = await cbm.lookup('getTime');
  let getTime = eval(cbm.getCode(result.body.sourceCode));
  let time = getTime();
  let seconds = Math.floor((time / 1000)) % 60;
  let minutes = (Math.floor((time / 1000) / 60)) % 60;
  let hours = (Math.floor((time / 1000) / 60 / 60)) % 24 + 2; // + 2 for local time
  return {seconds: seconds, minutes: minutes, hours: hours};
}

module.exports = clock;