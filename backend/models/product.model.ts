import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    tp: {
        type: Number,
        required: true,
    },
    return: {
        type: Number,
        required: true,
    },

});

export const productModel = mongoose.model('product', productSchema);

