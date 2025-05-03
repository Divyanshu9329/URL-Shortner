const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // Set strictQuery to false

async function connectToMongoDB(url){
    return mongoose.connect(url)
} 

module.exports ={
    connectToMongoDB,
    // connectToMongoDB: async (url) => {
}; 