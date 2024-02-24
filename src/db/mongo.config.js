const mongoose=require('mongoose');

const DB_HOST='127.0.0.1'
const DB_NAME='TiendaVirtual'
const DB_PORT=27017

const configConnection ={
    url:`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    options:{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    },
}

const mongoDBconnection = async()=>{
    try {
        console.log("🚀 ~ mongoDBconnection ~ configConnection.url:", configConnection.url)
        await mongoose.connect(configConnection.url, configConnection.options);
        console.log(`===============================`);
        console.log(`==URL:${configConnection.url.substring(0,20)}===`);
        console.log(`===============================`);
        console.log(`===== DB: ${DB_NAME}`)
    } catch (error) {
        console.log("🚀 ~ mongoDBconnection ~ error:", error);
        throw new Error(error);
 
        
    }

}
module.exports = {configConnection, mongoDBconnection}