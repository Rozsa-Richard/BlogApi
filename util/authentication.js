import * as db from "../data/user.js";
import jwt from "jsonwebtoken";

function auth(res,req, next){
  try {
    const accessToken = req.headers.authorize;
    if (!accessToken){
        return res.status(401).json({message:"Unathorized"})
    }
    const token = jwt.verify(accessToken.split(' ')[1],'secret_key');
    const now = Math.floor(Date.now()/1000);
    if (!token || token.exp < now){
        return res.status(403).json({message:"Access forbidden"});
    }
    const user = db.getUserByMail(token.email);
    if (!user){
        return res.status(403).json({message: "Acces denied"});
    }
    req.userId = user.id;
    req.userEmail = user.email;
    next();
  } catch (err) {
    //return res.status(500).json(err);
  }
}

export default auth;


function getAge(inputString){
  return parseInt(inputString.split(' ')[0]);
}