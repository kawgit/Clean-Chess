console.log("HODOWw");

// const { spawn } = require('child_process');
// const sleep = require('sleep-promise');

import { spawn } from 'child_process';
import sleep from 'sleep-promise';

console.log("HODOWw");

const child = spawn('src/engines/torch');
console.log("HODOWw");

// Listen for data from the child process's stdout
child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
console.log("HODOWw");

// Listen for data from the child process's stderr
child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
console.log("HODOWw");

// Listen for the child process to exit
child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

console.log("HODOWw");
// Send data to the child process's stdin
await sleep(1000);
console.log("WHAT");
child.stdin.write('eval\n');

await sleep(1000);

child.stdin.write('quit\n');
child.stdin.end(); // Close the stdin stream