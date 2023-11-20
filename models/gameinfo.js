var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameinfoSchema = new Schema({
    name: { type: String, default: "", unique: true },
    ver: { type: Number, default: 0 },
    maint: { type: Number, default: 0 },
});

module.exports = mongoose.model('gameinfo', gameinfoSchema);