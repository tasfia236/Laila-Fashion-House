import { AllProducts } from "./AllProducts";
import Carousel from "./Carousel";
import Categories from "./Categories";

export default function Home() {
  return (
    <div className=''>

      <Carousel className=""></Carousel>
      <div className='bg-[#ffeaf6] mx-auto mt-20 rounded-2xl h-full font-bold text-3xl text-center container'>
        <Categories></Categories>
      </div>
      <div >
        <AllProducts />
      </div>
    </div>
  )
}
