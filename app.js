let express = require('express')
let bodyParser = require('body-parser')
let apiRouter = require('./apiRouter').router

let app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use((req, res, next) => console.log(req.body) || next());
app.use(apiRouter)
app.listen(process.env.PORT || 3002) // Ecoute sur le port de developpement sinon 3002 en local

module.exports = app;
