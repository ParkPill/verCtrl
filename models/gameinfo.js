var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameinfoSchema = new Schema({
    name: { type: String, default: "", unique: true },
    pw: { type: String, default: "pw"},
    ver: { type: Number, default: 0 },
    maint: { type: Number, default: 0 },
    createDate: Date,
});

module.exports = mongoose.model('gameinfo', gameinfoSchema);