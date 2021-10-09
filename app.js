// 載入 express 並建構應用程式伺服器
const express = require('express')
// 引用 body-parser
const bodyParser = require('body-parser')
//express-handlebars
const exphbs = require('express-handlebars')
//use mongoDB
require('./config/mongoose')

const app = express()
const baseURL = `http://localhost:3000/`

const userAccountModel = require('./models/userAccount') 

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    return res.render('index')
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    // console.log(email, password)
    userAccountModel.findOne({ email: email }, function (err, user) {
        if (err)
            console.log(err)
        else{
            if (!user) {
                res.render('index', { noUser: "no user" })
            } else{
                if (user.password === password)
                    res.render('welcome', { username : user.firstName })
                else 
                    res.render('index', { invalidPW: "invalid PW" })
            }    
        }
    })
})

// 設定 port 3000
app.listen(3000, () => {
    console.log('short web address is running on ' + `${baseURL}`)
})