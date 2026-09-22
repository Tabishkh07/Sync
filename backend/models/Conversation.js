const mongoose = require('mongoose');
const conversationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['direct', 'group']
    },
    name: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
    {
    timestamps: true
});

module.exports = mongoose.model('Conversation', conversationSchema);
