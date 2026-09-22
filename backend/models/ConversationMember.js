const mongoose = require("mongoose");
const conversationMemberSchema = new mongoose.Schema({
    conversationId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Conversation'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
    leftAt: {
        type: Date,
        default: null
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model('ConversationMember', conversationMemberSchema);