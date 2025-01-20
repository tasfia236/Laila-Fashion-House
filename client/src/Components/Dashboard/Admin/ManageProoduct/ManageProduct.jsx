import { useEffect, useState } from 'react'
import ProductCard from './ProductCard.jsx'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure.jsx'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const ManageProduct = () => {
  const [itemPerPage, setItemPerPage] = useState(6)
  const [currentpage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(0)
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const axiosSecure = useAxiosSecure()
  const [added, setAdded] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axiosSecure.get(
        `/products/all-data?page=${currentpage}&size=${itemPerPage}&search=${search}`
      )
      setProducts(data)
      //   setCount(data,count);
    }
    getProducts()
  }, [currentpage, itemPerPage, search])

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure.get(
        `/total-Products/count?&search=${search}`
      )
      setCount(data.count)
    }
    getCount()
  }, [search])

  const numberofPages = Math.ceil(count / itemPerPage)
  const pages = [...Array(numberofPages).keys()].map(num => num + 1)

  const handlePaginationButton = value => setCurrentPage(value)

  const handleDeleteProduct = product => {
    console.log(product)
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete ${product.productName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`delete/product/${product._id}`)
          .then(res => {
            console.log(res.data) // Logs the response data
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Product has been deleted.', 'success')
            }
            navigate('/dashboard/manageproduct')
          })
          .catch(error => {
            console.error('Error deleting product:', error)
          })
      }
    })
  }

  return (
    <div className='mx-auto mt-10 w-fit h-full'>
      {/* Search Bar */}
      <div className='flex flex-wrap justify-center items-center gap-24 px-6 pb-12'>
        <h1 className='font-bold text-3xl'>Products</h1>
        <form className='flex'>
          <div className='flex focus-within:border-sky300 focus-within:ring-opacity-40 p-1 border rounded-lg focus-within:ring focus-within:ring-sky300 overflow-hidden'>
            <input
              className='bg-white px-4 py-2 text-gray-700 focus:placeholder-transparent outline-none placeholder-gray-500'
              type='text'
              name='search'
              placeholder='Search Products'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              type='submit'
              className='bg-[#be185d] hover:bg-[#7dd3fc] px-4 py-2 rounded-r-lg font-medium text-sm text-white uppercase tracking-wider transform transition-colors duration-300 focus:outline-none'
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Main Layout */}
      <div className='w-full'>
        {/* Product and Pagination Section */}
        <div className='flex justify-center w-full'>
          <div className='gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
            {products.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))}
          </div>
        </div>
        {/* Pagination */}
        <div className='flex justify-center mt-12'>
          <button
            disabled={currentpage === 1}
            onClick={() => handlePaginationButton(currentpage - 1)}
            className='bg-purple800 disabled:hover:bg-gray-200 hover:bg-[#7dd3fc] mx-1 px-4 py-2 rounded-md text-white hover:text-white disabled:text-gray-500 capitalize disabled:cursor-not-allowed'
          >
            Previous
          </button>

          {pages.map(btnNum => (
            <button
              key={btnNum}
              onClick={() => handlePaginationButton(btnNum)}
              className={`px-4 py-2 mx-1 ${
                currentpage === btnNum
                  ? 'bg-purple800 text-white'
                  : 'bg-purple50 text-gray-700'
              } rounded-md hover:bg-purple700 hover:text-white`}
            >
              {btnNum}
            </button>
          ))}

          <button
            disabled={currentpage === numberofPages}
            onClick={() => handlePaginationButton(currentpage + 1)}
            className='bg-purple800 hover:bg-[#7dd3fc] mx-1 px-4 py-2 rounded-md text-white hover:text-white disabled:text-gray-500 disabled:cursor-not-allowed'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManageProduct
