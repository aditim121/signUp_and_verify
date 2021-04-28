// const { spawn } = require('child_process');
// //const awesomeFile = require('/home/aditimahesh/Documents/Work/Persistence/go/src/github.com/persistenceOne/signUp_And_Verify/src/routes/awesomeFile.py')
// let hoodie = 10,
//     shoe = 15;
// const result = spawn("python",
//     ["-c", `import awesomeFile; awesomeFile.myfunc(${hoodie}, ${shoe})`])
// result.stdout.pipe(process.stdout)
const shell = require('shelljs')
 let newMnemonic = "new-mnemonic"
shell.exec('/home/aditimahesh/Documents/Work/Persistence/go/src/github.com/stakefish/eth2.0-deposit-cli/deposit.sh ' + newMnemonic)