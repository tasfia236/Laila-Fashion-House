import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function ProductCard ({ product, handleDeleteProduct }) {
  return (
    <div className='relative flex flex-col flex-grow bg-center shadow-lg rounded-lg w-80 h-full overflow-hidden transition-transform duration-300 transform'>
      {/* Product Image */}
      <img
        src={product?.productImage}
        alt={product?.productName}
        className='z-10 absolute inset-0 w-full h-full object-cover'
      />

      {/* Overlay */}
      <div className='z-20 absolute inset-0 bg-purple-900 bg-opacity-50'></div>

      <div className='z-50 relative flex flex-col flex-grow p-4 sm:p-6 text-white'>
        <div className='top-2 right-2 absolute flex-grow bg-[#be185d] m-2 p-2 px-6 rounded-full font-bold text-white text-xs'>
          {product?.categoryName}
        </div>

        {/* Product Details */}
        <div className='p-5'>
          {/* Product Name */}
          <h2 className='flex-grow pt-6 font-bold text-gray-100 text-lg truncate'>
            {product?.productName}
          </h2>

          {/* Product Description */}
          <p className='flex-grow flex-shrink mt-2 h-20 text-gray-300 text-sm line-clamp-3'>
            {product?.description}
          </p>

          {/* Fabric */}
          <div className='mt-3 text-gray-200 text-sm'>
            <span className='font-semibold'>Fabric:</span> {product?.fabric}
          </div>
          {/* Sizes and Price */}
          <div className='flex justify-between items-center mt-4'>
            {/* Sizes */}
            <div className='mt-1 text-gray-200 text-sm'>
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
              <button className='bg-transparent hover:bg-[#be185d] shadow-lg px-4 py-2 border-2 border-white rounded-md font-semibold text-white text-sm transition duration-200'>
                Update
              </button>
            </Link>
            <button
              onClick={() => handleDeleteProduct(product)}
              className='bg-[#be185d] hover:bg-transparent px-4 py-2 border-2 border-white rounded-md outline-none font-semibold text-white text-sm transition duration-200'
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
