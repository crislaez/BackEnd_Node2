'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name:String,
    picture:String,
    price: {type: Number, dafault:0},
    description:String,
    quantity:Number
})

module.exports = mongoose.model('product', ProductSchema);