var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BootSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }]
});

var Boot = mongoose.model("Boot", BootSchema);

module.exports = Boot;