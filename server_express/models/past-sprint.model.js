var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var pastSprintSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    status: String,
    description: String
})

pastSprintSchema.plugin(mongoosePaginate);
const pastSprintModel = mongoose.model('past_sprint', pastSprintSchema);

module.exports = pastSprintModel;