var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var pastSprintSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    status: String,
    progress: Number,
    description: String,
    notify: Boolean,
    user: String,
    createdAt: Date,
    startedAt: Date,
    finishedAt: Date
})

pastSprintSchema.plugin(mongoosePaginate);
const pastSprintModel = mongoose.model('past_sprint', pastSprintSchema);

module.exports = pastSprintModel;