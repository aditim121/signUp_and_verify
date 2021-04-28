const express = require('express');
const router = express.Router();
const shell = require('shelljs')
const fs = require('fs');
const fileName = '/home/aditimahesh/Documents/Work/Persistence/go/src/github.com/stakefish/eth2.0-deposit-cli/eth2deposit/check.json';
const file = require(fileName);

//calling shell script file
router.post('/runValidatorScript', async(req, res) => {
    //auth token pending
    process.env.VALIDATOR_COUNT = req.body.count;
    console.log("Request received for: " + req.body.count + " validator.")
    shell.exec('/home/ubuntu/deployment/deploy.sh')
    res.send("Done.")
})


module.exports = router;