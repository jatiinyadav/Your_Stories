const moongose = require('mongoose')

const StorySchema = new moongose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    body: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = moongose.model('Story', StorySchema)