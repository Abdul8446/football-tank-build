var express = require('express');
const { checkAdmin } = require('../Middlewares/AuthMiddlewares');
const { adminLogin } = require('../Controllers/AuthControllers');
const { adminHome, adminLoginGet, usersData, blockUser, contents, enableOrDisableContent } = require('../Controllers/AdminControllers');
var router = express.Router();

router.get('/',checkAdmin,adminHome);
    //    
router.get('/login',checkAdmin,adminLoginGet)    

router.post('/login',adminLogin)

router.get('/users',checkAdmin,usersData)

router.put('/block-user',checkAdmin,blockUser)  

router.get('/contents',checkAdmin,contents)

router.put('/enable-or-disable-content',checkAdmin,enableOrDisableContent)

module.exports = router;
