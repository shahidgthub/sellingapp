const mongoose = require("mongoose");

const url = process.env.MONGO_URI; 

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(" MongoDB is connected");
    } catch (err) {
        console.error(" Error connecting to MongoDB:", err);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = connectDB;
