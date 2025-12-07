import mongoose from 'mongoose' 

const DbCon = async()=>{
    try{
        mongoose.connect(process.env.MOGODB_URL)
        console.log('MongoDb is Connected')
    }catch(error){
        console.log('MongoDb is error',error)
    }
}

export default DbCon