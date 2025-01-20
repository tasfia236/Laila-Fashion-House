import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function ProductCard ({ product, handleDeleteProduct }) {
  return (
    <div className='relative flex flex-col flex-grow bg-center shadow-lg rounded-lg w-80 h-full transform transition-transform duration-300 overflow-hidden'>
      {/* Product Image */}
      <img
        src={product?.productImage}
        alt={product?.productName}
        className='z-10 absolute inset-0 w-full h-full object-cover'
      />

      {/* Overlay */}
      <div className='z-20 absolute inset-0 bg-purple800 bg-opacity-70'></div>

      <div className='relative z-50 flex flex-col flex-grow p-4 sm:p-6 text-white'>
        <div className='top-2 right-2 absolute flex-grow bg-[#be185d] bg-yellow-400 m-2 px-6 p-2 rounded-full font-bold text-white text-xs'>
          {product?.categoryName}
        </div>

        {/* Product Details */}
        <div className='p-5'>
          {/* Product Name */}
          <h2 className='flex-grow pt-6 font-bold text-gray-800 text-lg truncate'>
            {product?.productName}
          </h2>

          {/* Product Description */}
          <p className='flex-grow flex-shrink mt-2 line-clamp-3 h-20 text-gray-600 text-sm'>
            {product?.description}
          </p>

          {/* Fabric */}
          <div className='mt-3 text-gray-500 text-sm'>
            <span className='font-semibold'>Fabric:</span> {product?.fabric}
          </div>
          {/* Sizes and Price */}
          <div className='flex justify-between items-center mt-4'>
            {/* Sizes */}
            <div className='mt-1 text-gray-500 text-sm'>
              <span className='font-semibold'>Size:</span>{' '}
              {(product?.size || []).join(', ') || 'N/A'}
            </div>

            {/* Price */}
            <div className='font-bold text-blue-600 text-xl'>
              ${product?.price?.toFixed(2) || '0.00'}
            </div>
          </div>

          {/* Add to Cart and Details Button */}
          <div className='flex justify-between mt-6'>
            <Link to={`dashboard/updateproduct/${product._id}`}>
              <button className='border-2 border-white bg-transparent hover:bg-[#be185d] shadow-lg px-4 py-2 rounded-md font-semibold text-sm text-white transition duration-200'>
                Update
              </button>
            </Link>
            <button
              onClick={() => handleDeleteProduct(product)}
              className='border-2 border-white bg-[#be185d] hover:bg-transparent px-4 py-2 rounded-md font-semibold text-sm text-white transition duration-200 outline-none'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object,
  handleDeleteProduct: PropTypes.func.isRequired
}
