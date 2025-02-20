const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,  // ✅ Fixed: `String` (capital S)
        required: true  // ✅ Fixed: `required` (correct spelling)
    },
    lastname:{
        type: String,  // ✅ Fixed: `String` (capital S)
        required: true 

    },
    email: {
        type: String,
        required: true,
        unique: true  // Ensures no duplicate emails
    },
    password: {
        type: String,
        required: true
    }
});

// ✅ Fixed: Correct way to create a model
const User = mongoose.model('CourseUser', userSchema);

module.exports = User; // ✅ Fixed: Correct module export
