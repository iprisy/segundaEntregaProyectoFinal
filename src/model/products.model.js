const mongoose = require('mongoose');

const collectionName='Products'

const productSchema= new mongoose.Schema({

    descripcion:{
        required:true,
        type:String,
    } ,
    precio_unitario:{
        type:Number,
      
    },
    cantidad: {
        required:true,
        type:Number,
      
    },

})
const productsModel = mongoose.model(collectionName, productSchema)
module.exports=productsModel;