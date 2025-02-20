require("dotenv").config(); // Load environment variables
const express = require("express");
const connectDB = require("./config/db"); // Correct file path
const courseRoutes = require("./routes/coureroutes"); // Import the router
const userRoutes = require("./routes/userroute");
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const fileUpload = require('express-fileupload'); // ✅ Corrected import

const app = express();
connectDB();

// ✅ Enable CORS
app.use(cors({
    origin: "*", // Allow all origins (adjust this in production)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// ✅ Middleware to parse JSON and handle file uploads
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const port = process.env.PORT || 3000;

// ✅ Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

// ✅ Use the course routes
app.use("/api", courseRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
