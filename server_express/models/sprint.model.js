var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var SprintSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    status: String,
    description: String
})

SprintSchema.plugin(mongoosePaginate);
const sprint = mongoose.model('sprint', SprintSchema);

module.exports = sprint;