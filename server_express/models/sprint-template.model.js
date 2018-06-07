var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var sprintTemplateSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    status: String,
})

sprintTemplateSchema.plugin(mongoosePaginate);
const sprintTemplateModel = mongoose.model('sprint_template', sprintTemplateSchema);

module.exports = sprintTemplateModel;