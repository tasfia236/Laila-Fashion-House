import { useState, useEffect } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';

const SingleProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [selectedImage, setSelectedImage] = useState('');

  const hardcodedImages = [
    'https://via.placeholder.com/150/1', 
    'https://via.placeholder.com/150/2',
    'https://via.placeholder.com/150/3',
    'https://via.placeholder.com/150/4',
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axiosPublic.get(`/product/data/${id}`);
        setProduct(data);
        setSelectedImage(data.productImage); 
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    getData();
  }, [id, axiosPublic]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg mx-auto p-6 rounded-lg max-w-6xl">
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mt-36">
        {/* Left Section: Images */}
        <div className="flex">
          {/* Small Images */}
          <div className="flex flex-col gap-2">
            {[
              product.productImage,
              ...hardcodedImages, 
            ].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                  img === selectedImage ? 'border-2 border-pink700' : 'border'
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex flex-1 justify-center items-center">
            <img
              src={selectedImage}
              alt={product.productName}
              className="rounded-lg max-h-96 object-cover"
            />
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div>
          <h1 className="font-bold text-2xl text-gray-800">{product.productName}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <div className="mt-4">
            <span className="font-semibold">Category:</span> {product.categoryName}
          </div>
          <div className="mt-2">
            <span className="font-semibold">Fabric:</span> {product.fabric}
          </div>
          <div className="mt-1 text-gray-500 text-sm">
            <span className="font-semibold">Size:</span>{' '}
            {product.size?.join(', ') || 'N/A'}
          </div>
          <div className="mt-4 font-bold text-blue-600 text-xl">
            Price: ${product.price?.toFixed(2) || '0.00'}
          </div>
          <div className="flex items-center mt-2 text-yellow500">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < product.rating ? 'currentColor' : 'none'}
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

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-[#be185d] hover:bg-pink600 shadow-lg px-6 py-2 rounded-md text-white transition">
              Add to Cart
            </button>
            <button className="border-2 border-pink700 bg-transparent hover:bg-[#be185d] px-6 py-2 rounded-md text-pink700 hover:text-white transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails