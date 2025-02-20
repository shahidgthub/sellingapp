const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number, 
        required: true,
    },
    image: {
        public_id: {
            type: String, // ✅ Fixed type
            required: true, // ✅ Fixed spelling
        },
        url: {
            type: String, // ✅ Added missing type
            required: true, // ✅ Fixed spelling
        }
    },
});

const Course = mongoose.model("course", courseSchema);

module.exports = Course;
