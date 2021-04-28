const express = require('express');
const router = express.Router();

const userController = require('../api/registration');
const verifcationController = require('../api/verification');
const loginController = require('../api/login');
const resendController = require('../api/resendVerification');
const updatePassController = require('../api/updatePassword');
const emailController = require('../api/email');
const removeEmailController = require('../api/RemoveEmail');

//register route
router.post('/register', (req, res) => {
    let userReg = new userController(req.body, req.headers);
    userReg.register()
        .then(result => {
            res.status(result.code).json({
                result: result.result,
                code: result.code,
                message: result.message,
                verifyLink:result.vlink
            })
        })
        .catch(err => {
            console.log(err)
            res.status(err.code).json({
                result: err.result,
                code: err.code,
                error: err.error
            })
        })
})

//to verify user activation link
router.get('/verify',(req,res)=>{
    verifcationController.verifyEmail(req.query.email,req.query.code)
    .then(verification=>{
        res.status(verification.code).json({
            result: verification.result,
            code: verification.code
        })
    })
    .catch(verificationError=>{
        res.status(verificationError.code).json({
            result: verificationError.result,
            code: verificationError.code,
            message: verificationError.message
        })
    })
})

//login route
router.post('/login', (req, res) => {
    let loginReg = new loginController(req.body, req.headers);
    loginReg.login()
        .then(result => {
            res.status(result.code).json({
                result: result.result,
                code: result.code,
                message: result.message
            })
        })
        .catch(err => {
            console.log(err)
            res.status(err.code).json({
                result: err.result,
                code: err.code,
                error: err.error
            })
        })
})

//resend verification route
router.post('/resendVerificationLink', (req, res) => {
    let resendReg = new resendController(req.body, req.headers);
    resendReg.resend()
        .then(result => {
            res.status(result.code).json({
                result: result.result,
                code: result.code,
                message: result.message
            })
        })
        .catch(err => {
            console.log(err)
            res.status(err.code).json({
                result: err.result,
                code: err.code,
                error: err.error
            })
        })
})

//update password route
router.post('/updatePassword', (req, res) => {
    let updateReg = new updatePassController(req.body, req.headers);
    updateReg.update()
        .then(result => {
            res.status(result.code).json({
                result: result.result,
                code: result.code,
                message: result.message
            })
        })
        .catch(err => {
            console.log(err)
            res.status(err.code).json({
                result: err.result,
                code: err.code,
                error: err.error
            })
        })
})
//send Email
router.post('/sendEmail', (req, res) => {
    let emailReg = new emailController(req.body, req.headers);
    emailReg.email()
        .then(result => {
            res.status(result.code).json({
                result: result.result,
                code: result.code,
                message: result.message
            })
        })
        .catch(err => {
            console.log(err)
            res.status(err.code).json({
                result: err.result,
                code: err.code,
                error: err.error
            })
        })
})

//remove emailID
router.post('/removeEmail', (req, res) => {
    let emailReg = new removeEmailController(req.body, req.headers);
    emailReg.remove()
        .then(result => {
            res.status(result.code).json({
                result: result.result,
                code: result.code,
                message: result.message
            })
        })
        .catch(err => {
            console.log(err)
            res.status(err.code).json({
                result: err.result,
                code: err.code,
                error: err.error
            })
        })
})
module.exports = router;