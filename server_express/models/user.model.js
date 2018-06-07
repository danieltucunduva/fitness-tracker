var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: Date,
    sharedSprints: [String]
})

userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;