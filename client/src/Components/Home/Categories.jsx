import { useState, useEffect } from 'react';
import saree from '../../assets/saree.jpg';
import shalwar from '../../assets/selwar-kamiz.jpg';
import accessories from '../../assets/Accessories.jpg';
import twopiece from '../../assets/twopiece.jpg';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

 const Categories = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const axiosPublic = useAxiosPublic();

  const categories = [
    { id: 1, name: '2-piece sets', image: twopiece },
    { id: 2, name: 'Accessories', image: accessories },
    { id: 3, name: 'Saree', image: saree },
    { id: 4, name: 'Shalwar Kameez', image: shalwar },
  ];

//   useEffect(() => {
//     axiosPublic
//       .get('/products/data') 
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching products:', error);
//       });
//   }, []);
 useEffect(()=>{
    const getData = async () =>{
        const {data} =await axiosPublic.get('/products/data')  
   //     console.log(data)
        setProducts(data); 
       
    }

    getData();
 },[])

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };



  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold text-center mb-20">Choose  <span className="text-pink700">Categories</span> </h2>
     
      <div className="flex justify-center flex-wrap gap-36">
      {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className={`flex flex-col items-center text-center cursor-pointer transform transition-transform duration-300 hover:scale-110 ${
              selectedCategory === category.name ? 'bg-gray-200' : ''
            }`}
          >
            <div className="w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-3 text-sm font-bold">{category.name}</p>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="mt-10">
          <h3 className="text-xl font-bold text-center mt-20 mb-16">Products in {selectedCategory}</h3>
          <div className="flex justify-center flex-wrap gap-10 mt-5">
            {products
              .filter((p) => p.categoryName === selectedCategory) 
              .map((product) => (
                <div key={product._id} className="flex flex-col items-center text-center">
                  <div className="w-40 h-40 rounded-lg border-2 border-gray-300 overflow-hidden">
                    <img src={product.productImage} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-2 text-sm font-bold">{product.productName}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Categories;
