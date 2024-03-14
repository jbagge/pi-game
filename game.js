#!/usr/bin/env node
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const pi = require('./pi.js');

const rs = '\x1b[31m';
const gs = '\x1b[32m';
const cs = '\x1b[36m';
const end = '\x1b[0m';

const rl = readline.createInterface({ input, output });

let max_mistakes = 5;

const write = (out, mistakes, max_mistakes) => {
  rl.write('\u001B[2J\u001B[0;0f');
  rl.write(`Continue the sequence! mistakes ${mistakes}/${max_mistakes}\n> `);
  rl.write(out);
}

const reset = () => {
  digits = pi.split('');
  out = digits.splice(0,4).join('');
  write(out, 0, max_mistakes);
}

reset();

let timer;
let count = 0;
let mistakes = 0;

input.on('keypress', (c) => {
  if (timer) {
    return;
  }
  // rl.write(null, { ctrl: true, name: 'u' });
  if ((c+'').match(/[^0-9]/)) {
    return;
  }
  const next = digits.shift();
  if (c === next) {
    out += gs + next + end;
    write(out, mistakes, max_mistakes);
    return;
  } else if (mistakes < max_mistakes - 1) {
    mistakes += 1;
    out += rs + next + end;
    write(out,mistakes, max_mistakes);
    return;
  }
  mistakes += 1;
  const peep = digits.slice(0,10).join('');
  out += rs + next + cs + peep + end;
  write(out, mistakes, max_mistakes);
  digits.unshift(...peep.split(''));
  timer = setInterval(() => {
    const ttl = 10;
    rl.write('\u001B[2J\u001B[0;0f');
    rl.write(`Continue the sequence! mistakes ${mistakes}/${max_mistakes}\n> `);
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
