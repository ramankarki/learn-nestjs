const { Worker } = require('worker_threads');

function slow() {
  return new Promise((resolve, reject) => {
    const t1 = Date.now()
    const worker = new Worker('./slowWorker.js', {workerData: { max: 1000000000 }})
    console.log('worker created in', Date.now() - t1)
    worker.once('message', () => {
      console.log('done', Date.now() - t1)
      resolve()
    })
    worker.once('error', reject)
  });
}

async function main() {
  const t1 = Date.now()
  await Promise.all([
    slow(),
    slow(),
    slow(),
    slow(),
    slow(),
    slow(),
    slow(),
    slow(),
    slow(),
    slow(),
  ]);
  console.log('total time taken', Date.now() - t1)
}

main()
