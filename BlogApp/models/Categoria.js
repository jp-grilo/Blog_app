const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const Categoria = new Schema({
    node: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})