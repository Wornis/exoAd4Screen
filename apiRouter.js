let express = require('express')
let userCtrl = require('./routes/user/userCtrl')

module.exports.router = (() => {
    const apiRouter = express.Router()

    apiRouter.route('/user/:id').get(userCtrl.getUserViewedArticles);

    return apiRouter

})();
