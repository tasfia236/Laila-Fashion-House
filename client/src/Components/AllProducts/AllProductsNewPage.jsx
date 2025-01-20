import { useEffect, useState } from "react";
import Product from "../AllProducts/Product.jsx";
import useAxiosPublic from "../../Hooks/useAxiosPublic.jsx";

const AllProductsNewpage = () => {
  const [itemPerPage, setItemPerPage] = useState(3);
  const [currentpage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter , setfilter] = useState('');
  const [sort , setSort] = useState('');
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(""); 
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axiosPublic.get(
        `/products/all-data?page=${currentpage}&size=${itemPerPage}&filter=${filter}&sort=${sort}&search=${search}`
      );
      setProducts(data);
    //   setCount(data,count);
    };
    getProducts();
  }, [currentpage, itemPerPage, filter,sort,search]);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosPublic.get(`/total-Products/count?filter=${filter}&search=${search}`);
      setCount(data.count);
    };
    getCount();
  }, [filter,search]);

//   const handleSearch =(e)=>{
//     e.preventDefault();
//     console.log(search);


//   }

  const numberofPages = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberofPages).keys()].map((num) => num + 1);

  const handlePaginationButton = (value) => setCurrentPage(value);

 

  return (
    <div className="mx-auto mt-10 max-w-[1200px] h-full container"> 
      {/* Search Bar */}
      <div className="flex justify-between items-center p-4">
  <h1 className="ml-72 font-bold text-3xl">All Products------</h1>
  <form  className="flex"  >
    <div className="flex focus-within:border-sky300 focus-within:ring-opacity-40 p-1 border rounded-lg focus-within:ring focus-within:ring-sky300 overflow-hidden">
      <input

        className="bg-white px-4 py-2 text-gray-700 focus:placeholder-transparent outline-none placeholder-gray-500"
        type="text"
        name="search"
        placeholder="Search Products"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
       
      />
      <button
        type="submit"
        className="bg-[#be185d] hover:bg-[#7dd3fc] px-4 py-2 rounded-r-lg font-medium text-sm text-white uppercase tracking-wider transform transition-colors duration-300 focus:outline-none"
      >
        Search
      </button>
    </div>
  </form>
</div>


      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Filter and Sorting Section */}
        <div className="shadow-2xl p-4 rounded-lg w-1/5">
  {/* Filter Section */}
  <h2 className="mb-4 font-bold text-xl">Filter</h2>
  <div className="mb-6">
    {["Shalwar Kameez", "2-piece sets", "Saree", "Accessories"].map((category) => (
      <label key={category} className="flex items-center gap-2 mb-2">
        <input
          type="radio"
          name="filter"
          value={category}
          className="focus:ring-pink300 text-pink700"
          onChange={(e) => {setfilter(e.target.value)
            setCurrentPage}
          }
          checked={filter === category}
        />
        <span className="text-gray-700">{category}</span>
      </label>
    ))}
  </div>

  {/* Sort Section */}
  <h2 className="mb-4 font-bold text-xl">Sort</h2>
  <div className="mb-6">
    {[
      { value: "dsc", label: "Price High to Low" },
      { value: "asc", label: "Price Low to High" },
    ].map((sortOption) => (
      <label key={sortOption.value} className="flex items-center gap-2 mb-2">
        <input
          type="radio"
          name="sort"
          value={sortOption.value}
          className="focus:ring-pink300 text-pink700"
          onChange={(e) => setSort(e.target.value)}
          checked={sort === sortOption.value}
        />
        <span className="text-gray-700">{sortOption.label}</span>
      </label>
    ))}
  </div>

  {/* Reset Button */}
  <button
    className="bg-[#be185d] hover:bg-[#f9a8d4] px-4 py-2 rounded-lg w-full text-white"
    onClick={() => {
      setfilter("");
      setSort("");
      setSearch("");
    }}
  >
    Reset
  </button>
</div>


        {/* Product and Pagination Section */}
        <div className="w-4/7">
          {/* <h1 className="mb-10 font-bold text-3xl">
            All Products-----
          </h1> */}
          <div className="justify-center gap-10 grid grid-cols-3">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <button
              disabled={currentpage === 1}
              onClick={() => handlePaginationButton(currentpage - 1)}
              className="bg-[#be185d] disabled:hover:bg-gray-200 hover:bg-[#7dd3fc] mx-1 px-4 py-2 rounded-md text-white hover:text-white disabled:text-gray-500 capitalize disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {pages.map((btnNum) => (
              <button
                key={btnNum}
                onClick={() => handlePaginationButton(btnNum)}
                className={`px-4 py-2 mx-1 ${
                  currentpage === btnNum
                    ? "bg-[#be185d] text-white"
                    : "bg-[#ffeaf6] text-gray-700"
                } rounded-md hover:bg-[#be185d] hover:text-white`}
              >
                {btnNum}
              </button>
            ))}

            <button
              disabled={currentpage === numberofPages}
              onClick={() => handlePaginationButton(currentpage + 1)}
              className="bg-[#be185d] hover:bg-[#7dd3fc] mx-1 px-4 py-2 rounded-md text-white hover:text-white disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsNewpage;