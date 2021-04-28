let express = require('express');
let routerIndex = require('../src/routes/index');
let validatorRouter = require('../src/routes/validator');
let app = express();
const cors = require('cors');
require('dotenv').config();
let bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/staking')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


let PORT = process.env.PORT || 5000 ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors());

app.use('/api', routerIndex);
app.use('/validator', validatorRouter);



app.listen(PORT,()=>{
    console.log('Server is running on',PORT);
})