async function slow() {
  for(let i = 0; i < 1000000000; i++) {}
  // console.log('done')
  return 'done'
}

async function main() {
  const t1 = Date.now()
  const res = await Promise.all([
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
  console.log(res)
  console.log('total time taken', Date.now() - t1)
}

main()
