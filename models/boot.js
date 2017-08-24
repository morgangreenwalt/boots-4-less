var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BootSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
        trim: true,
        // match: /^\$?[0-9]+\.?[0-9]*$/
    },
    image: {
        type: String,
        required: true
    },

    male: {
        type: Boolean,
        required: true
    },

    female: {
        type: Boolean,
        required: true
    },

    size: [{
        type: Schema.Types.ObjectId,
        ref: "Size"
    }],

    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }]
});

var Boot = mongoose.model("Boot", BootSchema);

module.exports = Boot;