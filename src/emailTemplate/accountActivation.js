module.exports = {
    'subject' : 'To Activate Your Account, Click On Activation Link',
    'body' : process.env.IP + process.env.nodePORT + `/api/verify`,
    'subjectUpdatePass' : 'To update your password, Click On Link',
    'bodyUpdatePass' : process.env.IP + process.env.UIPORT +`/passwordreset`
}