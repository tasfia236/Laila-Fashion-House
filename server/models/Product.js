import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
    productImage: {
        type: 'string',
        required: true,
    },
    categoryName: {
        type: 'string',
        required: true,
    },
    price: {
        type: 'number',
        required: true,
    },
    rating: {
        type: 'number',
        default: 4.0,
        min: 0.0,
        max: 5.0,
        validate: {
            validator: function (value) {
                return value >= 0.0 && value <= 5.0;
            },
            message: 'Rating must be between 0.0 and 5.0',
        },
    },
    size: {
        type: 'array',
    },
    fabric: {
        type: 'string',
        required: true,
    },
}, { timestamps: true }
);

const Product = mongoose.model('products', productSchema);

export default Product;
