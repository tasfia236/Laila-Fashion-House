
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Product({ product }) {
    return (

        <Link to={`/product/${product._id}`} className="bg-white shadow-lg hover:shadow-xl mx-auto rounded-lg max-w-xs transition-transform duration-300 overflow-hidden hover:scale-105">
            {/* Product Image */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product?.productImage}
                    alt={product?.productName}
                    className="w-full h-full object-cover"
                />
                <div className="top-2 right-2 absolute bg-[#be185d] bg-yellow-400 px-4 p-2 rounded-full font-bold text-white text-xs">
                    {product?.categoryName}
                </div>
            </div>

            {/* Product Details */}
            <div className="p-5">
                {/* Product Name */}
                <h2 className="font-bold text-gray-800 text-lg truncate">
                    {product?.productName}
                </h2>

                {/* Product Description */}
                <p className="mt-2 line-clamp-3 text-gray-600 text-sm">
                    {product?.description}
                </p>

                {/* Fabric */}
                <div className="mt-3 text-gray-500 text-sm">
                    <span className="font-semibold">Fabric:</span> {product?.fabric}
                </div>

                {/* Sizes */}
                <div className="mt-1 text-gray-500 text-sm">
                    <span className="font-semibold">Size:</span>{' '}
                    {(product?.size || []).join(', ') || 'N/A'}
                </div>

                {/* Price and Rating */}
                <div className="flex justify-between items-center mt-4">
                    <div className="font-bold text-blue-600 text-xl">
                        ${product?.price?.toFixed(2) || '0.00'}
                    </div>
                    <div className="flex items-center text-yellow500">
                        {Array.from({ length: 5 }, (_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                fill={i < product?.rating ? "currentColor" : "none"}
                                stroke="currentColor"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 17.27l6.18 3.73-1.64-7.19L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.57-1.64 7.19L12 17.27z"
                                />
                            </svg>
                        ))}
                    </div>
                </div>


                {/* Add to Cart and Details Button */}
                <div className="flex justify-between mt-6">

                    <button className="border-2 border-pink700 bg-transparent hover:bg-[#be185d] shadow-lg px-4 py-2 rounded-md font-semibold text-pink700 text-sm hover:text-white transition duration-200">

                        Add to Cart
                    </button>
                    <button className="bg-[#be185d] hover:bg-blue-700 px-4 py-2 rounded-md font-semibold text-sm text-white transition duration-200 outline-none">
                        View Details
                    </button>
                </div>
            </div>
        </Link>

    );
}


Product.propTypes = {
    product: PropTypes.object
  };
