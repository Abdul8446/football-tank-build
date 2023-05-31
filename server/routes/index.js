var express = require("express");
var router = express.Router();
const axios = require("axios");
const mongoose = require('mongoose')
const { signup, login } = require('../Controllers/AuthControllers');
const { checkUser } = require("../Middlewares/AuthMiddlewares");
const { matchDetails, commentary, matchInfo, matchStats, competitionOverview, teamOverview, getAllTeamDetails, getAllPlayerStats, getNewsList, lineUps, h2h, fetchMatches, competitionsList, subCompetitions, featuredNews } = require("../Controllers/ApiControllers");
const multer = require('multer');
const { addProfilePicture, changeProfilePicture, deleteProfilePicture, getImageUrl, verifyOldPassword, updateProfile, addOrRemoveFromFavoriteMatches, removeFinishedFromFavoriteMatches, addOrRemoveFromFavoriteCompetitions, addOrRemoveFromFavoriteTeams, getNavbar, getHomepage } = require("../Controllers/UserControllers");
const { createPaymentIntent, activatePremiumSubscription } = require("../Controllers/SubscriptionControllers");
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
require('dotenv').config()
    

// connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));
   
     
/* GET home page. */    
router.get("/api/",checkUser,getHomepage);  
              
router.get('/api/fetch-matches',fetchMatches)

router.get("/api/competitions-list",competitionsList);

router.get("/api/sub-competitions",subCompetitions);

router.get("/api/featured-news",featuredNews);

router.get("/api/navbar",getNavbar);

router.post('/api/signup',signup)

router.post('/api/login',login)   

router.get('/api/match-details',matchDetails)

router.get('/api/commentary',commentary)

router.get('/api/match-info',matchInfo)

router.get('/api/match-stats',matchStats)

router.get('/api/competition-overview',competitionOverview)

router.get('/api/team-overview',teamOverview)

router.get('/api/get-all-team-details',getAllTeamDetails)   
    
router.get('/api/get-all-player-stats',getAllPlayerStats)

router.get('/api/news',getNewsList)
      
router.post('/api/add-profile-picture',upload.single('file'),addProfilePicture)

router.put('/api/change-profile-picture',upload.single('file'),changeProfilePicture)

router.delete('/api/delete-profile-picture/:id',deleteProfilePicture)

router.get('/api/get-image-url',getImageUrl)

router.get('/api/verify-old-password',verifyOldPassword)       

router.put('/api/update-profile',updateProfile)

router.put('/api/add-or-remove-from-favorite-matches',addOrRemoveFromFavoriteMatches)

router.put('/api/remove-finished-from-favorite-matches',removeFinishedFromFavoriteMatches)

router.put('/api/add-or-remove-from-favorite-competitions',addOrRemoveFromFavoriteCompetitions)

router.put('/api/add-or-remove-from-favorite-teams',addOrRemoveFromFavoriteTeams)

router.get('/api/line-ups',lineUps)

router.get('/api/h2h',h2h)

router.post('/api/create-payment-intent',createPaymentIntent)

router.put('/api/activate-premium-subscription',activatePremiumSubscription)
   
module.exports = router;

      