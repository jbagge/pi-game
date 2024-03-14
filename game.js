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
}

rl.write('Continue the sequence!\n> 3.14');
reset();

input.on('keypress', c => {
  rl.write(null, { ctrl: true, name: 'u' });
  if (c === 'r') {
    reset();
    rl.write(out);
    return;
  }
  if (c === 'c') {
    const peep = digits.slice(0,10).join('');
    rl.write(out + cs + peep + end);
    digits.unshift(...peep.split(''));
    return;
  }
  const next = digits.shift();
  if (c === next) {
    out += gs + next;
  } else {
    out += rs + next;
  }
  out += end;
  rl.write(out);
});
