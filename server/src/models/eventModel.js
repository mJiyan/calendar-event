'use strict'
const mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

let EventSchema = new Schema({
    id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: String,
    label: String,
    day: Number,
});

EventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Event', EventSchema);