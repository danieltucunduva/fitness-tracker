var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


/**
 * @swagger
 * definitions:
 *   SprintTemplate:
 *     type: object
 *     required:
 *       - _id
 *       - name
 *       - duration
 *       - status
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *       duration:
 *         type: number
 *       status:
 *         type: string
 */
var sprintTemplateSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    status: String,
})

sprintTemplateSchema.plugin(mongoosePaginate);
const sprintTemplateModel = mongoose.model('sprint_template', sprintTemplateSchema);

module.exports = sprintTemplateModel;