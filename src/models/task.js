const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    /*
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
    */

    title: {
    type: String,
    require: [true, "'Title' is required"],
    },
    description: {
        type: String,
        require: false,
        default: 'Without description'
    },
    image_url: {
        type: String,
        require: false,
        default: 'Without image'
    },
    created_at:{
        type: Date,
        require: [true, "'Created at' is required"],
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('tasks', TaskSchema);