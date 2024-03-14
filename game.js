#!/usr/bin/env node
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const pi = require('./pi.js');

const rs = '\x1b[31m';
const gs = '\x1b[32m';
const cs = '\x1b[36m';
const end = '\x1b[0m';

const rl = readline.createInterface({ input, output });

const reset = () => {
  digits = pi.split('');
  out = digits.splice(0,4).join('');
  rl.write('\u001B[2J\u001B[0;0f');
  rl.write('Continue the sequence!\n> 3.14');
}

reset();

let timer;
let count = 0;
input.on('keypress', (c) => {
  if (timer) {
    return;
  }
  rl.write('\u001B[2J\u001B[0;0f');
  rl.write('Continue the sequence!\n> ');
  rl.write(out);
  // rl.write(null, { ctrl: true, name: 'u' });
  if ((c+'').match(/[^0-9]/)) {
    return;
  }
  const next = digits.shift();
  if (c === next) {
    rl.write(gs + next + end);
    out += gs + next + end;
    return;
  }
  const peep = digits.slice(0,10).join('');
  rl.write(rs + next + cs + peep + end);
  out += rs + next + cs + peep + end;
  digits.unshift(...peep.split(''));
  timer = setInterval(() => {
    const ttl = 10;
    rl.write('\u001B[2J\u001B[0;0f');
    rl.write('Continue the sequence!\n> ');
    rl.write(out + '\n> Resetting in ' + (ttl - count) + 's');
    if (ttl - count === 0) {
      clearInterval(timer);
      timer = null;
      count = 0;
      reset();
      return;
    }
    count += 1;
  }, 1000);
});
