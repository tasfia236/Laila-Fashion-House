import { useLoaderData, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import Swal from 'sweetalert2'

export const UpdateProduct = () => {
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const product = useLoaderData()
  const {
    _id,
    productName,
    description,
    productImage,
    categoryName,
    price,
    rating,
    size,
    fabric
  } = product

  const [formData, setFormData] = useState({
    productName,
    description,
    productImage,
    categoryName,
    price,
    rating,
    size,
    fabric
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSizeChange = e => {
    const selectedSizes = Array.from(
      e.target.selectedOptions,
      option => option.value
    )
    setFormData({
      ...formData,
      size: selectedSizes
    })
  }

  const handleUpdateProduct = e => {
    e.preventDefault()
    console.log(formData)
    axiosSecure
      .put(`/update/products/${_id}`, formData)
      .then(res => {
        console.log(res.data) // Logs the response data
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success',
            text: 'Product Successfully Updated',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }

        navigate('/dashboard/manageproduct') // Redirect after update
      })
      .catch(error => {
        console.error('Error deleting product:', error)
      })
  }

  return (
    <div className='flex justify-center items-center bg-gradient-to-br from-blue-50 to-sky-100 px-4 py-8 min-h-screen'>
      <div className='bg-white shadow-lg p-8 rounded-lg w-full max-w-2xl'>
        <h1 className='mb-6 font-bold text-3xl text-center text-gray-800'>
          Update Product
        </h1>
        <form onSubmit={handleUpdateProduct} className='space-y-6'>
          <div>
            <label className='block mb-1 font-medium text-gray-700'>
              Product Name
            </label>
            <input
              type='text'
              name='productName'
              value={formData.productName}
              onChange={handleChange}
              className='border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none'
              required
            />
          </div>
          <div>
            <label className='block mb-1 font-medium text-gray-700'>
              Description
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none'
              rows='4'
              required
            />
          </div>
          <div>
            <label className='block mb-1 font-medium text-gray-700'>
              Product Image URL
            </label>
            <input
              type='text'
              name='productImage'
              value={formData.productImage}
              onChange={handleChange}
              className='border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none'
              required
            />
          </div>
          <div>
            <label className='block mb-1 font-medium text-gray-700'>
              Category
            </label>
            <select
              name='categoryName'
              value={formData.categoryName}
              onChange={handleChange}
              className='border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none'
              required
            >
              <option value=''>Select a category</option>
              <option value='Saree'>Saree</option>
              <option value='Shalwar Kameez'>Shalwar Kameez</option>
              <option value='Accessories'>Accessories</option>
              <option value='2-piece sets'>2-piece sets</option>
            </select>
          </div>
          <div>
            <label className='block mb-1 font-medium text-gray-700'>
              Price
            </label>
            <input
              type='number'
              name='price'
              value={formData.price}
              onChange={handleChange}
              className='border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none'
              required
            />
          </div>
          <div>
            <label className='block mb-1 font-medium text-gray-700'>
              Rating
            </label>
            <input
              type='number'
              min='0'
              max='5'
              step='0.1'
              name='rating'
              value={formData.rating}
              onChange={handleChange}
              className='border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none'
            />
          </div>
          <div>
            <label className='block mb-1 font-medium text-gray-700'>
              Sizes
            </label>
            <select
              name='size'
              value={formData.size}
              onChange={handleSizeChange}
              multiple
              className='border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none'
            >
              <option value='M'>M</option>
              <option value='X'>X</option>
              <option value='XL'>XL</option>
              <option value='Unistitch'>Unistitch</option>
            </select>
            <small className='text-gray-500'>
              Hold Ctrl (Cmd on Mac) to select multiple sizes
            </small>
          </div>
          <div>
            <label className='block mb-1 font-medium text-gray-700'>
              Fabric
            </label>
            <input
              type='text'
              name='fabric'
              value={formData.fabric}
              onChange={handleChange}
              className='border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none'
              required
            />
          </div>
          <div className='flex justify-center items-center mt-8'>
            <button
              type='submit'
              className='bg-purple800 hover:bg-purple100 px-4 py-2 rounded-lg font-semibold text-white hover:text-black transition'
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
