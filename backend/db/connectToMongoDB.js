import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL,);
        console.log("connected to MongoDB")
    }catch (error){
        console.log("Error Connecting to MongoDB", error.message)
    }
}

export default connectToMongoDB;

  