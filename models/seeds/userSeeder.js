const mongoose = require('mongoose')
const userAccount = require('../userAccount')
mongoose.connect('mongodb://localhost/userAccounts',{useNewUrlParser: true, useUnifiedTopology: true}) // 設定連線到 mongoDB
const users = require('./users.json')
const db = mongoose.connection

db.once('open', () => {
    users.users.forEach( user => {
        console.log(user.email)
        userAccount.create({
            firstName: user.firstName,
            email: user.email,
            password: user.password
        })
    })
    console.log('done')
})