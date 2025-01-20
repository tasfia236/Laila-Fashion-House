import { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const AddProduct = () => {
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        productImage: '',
        categoryName: '',
        price: '',
        rating: 4.0,
        size: [],
        fabric: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSizeChange = (e) => {
        const selectedSizes = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({
            ...formData,
            size: selectedSizes
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axiosSecure.post('/add/product', formData);
            alert(response.data);
            console.log(response);
        } catch (error) {
            alert('Error adding product: ' + error.response.data.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-lg my-12 p-8 rounded-lg w-11/12 md:w-3/4 lg:w-1/2">
                <h1 className="mb-6 font-bold text-2xl text-center text-gray-800">
                    Add New Product
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            onChange={handleChange}
                            className="border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            className="border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
                            rows="3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Product Image URL</label>
                        <input
                            type="text"
                            name="productImage"
                            onChange={handleChange}
                            className="border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Category</label>
                        <select
                            name="categoryName"
                            onChange={handleChange}
                            className="border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Saree">Saree</option>
                            <option value="Shalwar Kameez">Shalwar Kameez</option>
                            <option value="Accessories">Accessories</option>
                            <option value="2-piece sets">2-piece sets</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            onChange={handleChange}
                            className="border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Rating</label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Sizes</label>
                        <select
                            name="size"
                            multiple
                            onChange={handleSizeChange}
                            className="border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
                        >
                            <option value="M">M</option>
                            <option value="X">X</option>
                            <option value="XL">XL</option>
                            <option value="Unistitch">Unistitch</option>
                        </select>
                        <small className="text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple sizes</small>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Fabric</label>
                        <input
                            type="text"
                            name="fabric"
                            onChange={handleChange}
                            className="border-gray-300 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#7dd3fc] hover:bg-[#2171e2] py-2 rounded-lg focus:ring-2 focus:ring-blue-400 w-full font-semibold text-white focus:outline-none"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
