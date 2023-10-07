const { workerData, parentPort } = require('worker_threads');

function slowcode(max) {
  for (let i = 0; i < max; i++) {}
}

slowcode(workerData.max)
parentPort.postMessage('done')
