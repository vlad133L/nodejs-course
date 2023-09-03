const fs = require('fs');
const dns = require('dns');

function info(text) {
  console.log(text, performance.now().toFixed(2));
}

console.log('Program starts'); //1

//Close events
fs.writeFile('./test.txt', 'Hello Node.js', () => info('File written')); // 10

//Promises
Promise.resolve().then(() => info('Promise 1')); // 5

//Next tick
process.nextTick(() => info('Next tick 1')); // 4

//setImmediate (Check)
setImmediate(() => info('Imeddiate 1')); // 9

//Timeouts
setTimeout(() => info('Timeout 1'), 0); // 3
setTimeout(() => {
  process.nextTick(() => info('Next tick 2')); // 13
  info('Timeout 2'); // 12
}, 100);

//Intervals
let intervalCount = 0;
const intervalId = setInterval(() => {
  info(`Interval ${(intervalCount += 1)}`);
  if (intervalCount === 2) clearInterval(intervalId);
}, 50); // 11

// I/O Events
dns.lookup('localhost', (err, address, family) => {
  info('DNS 1 localhost'); // 6
  Promise.resolve().then(() => info('Promise 2')); // 8
  process.nextTick(() => 'Next tick 3'); // 7
});

console.log('Program ends'); //2
