var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SizeSchema = new Schema({

    size: {
        type: String,
        required: true
    }
});

var Size = mongoose.model("Size", SizeSchema);

module.exports = Size;