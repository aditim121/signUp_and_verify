const express = require('express');
const router = express.Router();
const {exec} = require('child_process');

//calling shell commands
router.post('/exec', async(req, res) => {
    process.env.VALIDATOR_COUNT = req.body.count;
    let ex = await exec('cp src/routes/index.js ./');
    let ex1 = await exec('cp src/routes/validator.js ./');
    console.log("name : " + ex)
    console.log(process.env.VALIDATOR_COUNT)
    res.send(ex)
})

module.exports = router;