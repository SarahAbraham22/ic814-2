const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn=await mongoose.connect(
            'mongodb+srv://sarah:mongodb101@cluster0.lmmu0.mongodb.net/ic814?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`MongoDB connected`);
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports=connectDB; 