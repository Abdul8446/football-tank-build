const User = require("../Models/UserModel");
const Features =require('../Models/FeaturesModel')

module.exports.adminHome = (req, res) => {
  if (req.user) {
    res.json({ admindata: req.user, admin: true });
  } else {
    res.json({ error: { message: "token expired" } });
  }
};

module.exports.adminLoginGet = (req, res) => {
  if (req.user) {
    res.json({ admindata: req.user, admin: true });
  } else {
    res.json({ error: { message: "token expired" } });
  }
};

module.exports.usersData = async (req, res) => {
  try {
    if (!req.user) {
      return res.json({ error: { message: "token expired" } });
    } else {
      const users = await User.find({}).exec(); // Use exec() to execute the query and return a promise
      // You can send the retrieved users to the client or perform other operations with the data
      console.log(users)
      res.json(users);
    }
  } catch (err) {
    // Handle the error and send an appropriate response to the client
    res.json({ error: { message: "Failed to retrieve users data" } });
  }
};

module.exports.blockUser = async (req, res) => {
  const userId = req.query.id;
  const status = JSON.parse(req.query.status);
  try {
    if (!req.user) {
      return res.json({ error: { message: "token expired" } });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: !status },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.json({ error: "Failed to update user status" });
  }
};

module.exports.contents = async (req,res)=>{
  try {
    if (!req.user) {
      return res.json({ error: { message: "token expired" } });
    } else {
      let features = await Features.find() 
      res.json(features);
    }
  } catch (error) {
    res.json({ error: { message: "Failed to retrieve features data" } });
  }
}

module.exports.enableOrDisableContent = async (req,res)=>{
  try {
    if (!req.user) {
      return res.json({ error: { message: "token expired" } });
    } else {
      let features = await Features.find() 
      switch (req.query.name){
        case 'ads':
          if(req.query.table=='normal'){
            features[0].ads.normal=!features[0].ads.normal
          }else if(req.query.table=='premium'){
            features[0].ads.premium=!features[0].ads.premium
          }
          break;
        case 'matchStats':
          if(req.query.table=='normal'){
            features[0].matchStats.normal=!features[0].matchStats.normal
          }else if(req.query.table=='premium'){
            features[0].matchStats.premium=!features[0].matchStats.premium
          } 
          break;
        case 'matchLineUps':
          if(req.query.table=='normal'){
            features[0].matchLineUps.normal=!features[0].matchLineUps.normal
          }else if(req.query.table=='premium'){
            features[0].matchLineUps.premium=!features[0].matchLineUps.premium
          } 
          break;
        case 'matchH2h':
          if(req.query.table=='normal'){
            features[0].matchH2h.normal=!features[0].matchH2h.normal
          }else if(req.query.table=='premium'){
            features[0].matchH2h.premium=!features[0].matchH2h.premium
          }    
          break;
        case 'teamMatches':
          if(req.query.table=='normal'){
            features[0].teamMatches.normal=!features[0].teamMatches.normal
          }else if(req.query.table=='premium'){
            features[0].teamMatches.premium=!features[0].teamMatches.premium
          }
          break;
        case 'teamTables':
          if(req.query.table=='normal'){
            features[0].teamTables.normal=!features[0].teamTables.normal
          }else if(req.query.table=='premium'){
            features[0].teamTables.premium=!features[0].teamTables.premium
          }  
          break;
        case 'teamNews':
          if(req.query.table=='normal'){
            features[0].teamNews.normal=!features[0].teamNews.normal
          }else if(req.query.table=='premium'){     
            features[0].teamNews.premium=!features[0].teamNews.premium
          }  
          break;
        case 'teamStats':
          if(req.query.table=='normal'){
            features[0].teamStats.normal=!features[0].teamStats.normal
          }else if(req.query.table=='premium'){     
            features[0].teamStats.premium=!features[0].teamStats.premium
          }  
          break;  
        default:
          break;  
      }
      console.log(features)
      const updatedFeatures=await Features.findOneAndUpdate({},features[0],{new:true})
      console.log(updatedFeatures)
      res.json(updatedFeatures)
    }
  } catch (error) {
    res.json({ error: { message: "Failed to retrieve features data" } });
  }
}


