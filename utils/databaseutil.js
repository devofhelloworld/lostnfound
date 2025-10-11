const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://root:root@lostnfound.yyk8iar.mongodb.net/?retryWrites=true&w=majority&appName=lostnfound";

let _db;

const mongoconnect = (callback)=>{
  MongoClient.connect(MONGO_URL).then(client=>{
    _db = client.db('lost&found');
    callback();
  }).catch(error=>console.log('what Error',error));
}

const getdb = ()=>{
  if(!_db){
    throw new Error('Database not connected'); 
  }
  else return _db;
}

exports.getdb = getdb ;
exports.mongoconnect = mongoconnect;
