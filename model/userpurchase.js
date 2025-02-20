const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "course",
    },
   
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
