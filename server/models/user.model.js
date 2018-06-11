var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       _id:
 *         type: string
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       createdAt:
 *         type: string
 *       sharedSprints:
 *         type: array
 *         items:
 *           type: string
 *       __v:
 *         type: number
 */
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: Date,
    sharedSprints: [String]
})

userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;