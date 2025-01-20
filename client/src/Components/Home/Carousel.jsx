// Import Swiper styles
import pic3 from '../../assets/pic3.jpg'
import pic2 from '../../assets/pic2.jpg'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Carousel = () => {
  return (
    <>
  
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
      <div
        className="bg-cover bg-center w-full h-[700px] md:h-[950px]"
        style={{
          backgroundImage:
           `url(${pic3})`,
        }}
      >
         
        <div className="flex justify-center items-center bg-gray-900/40 w-full h-full">
        
          <div className="text-center">
            <h1 className="font-semibold text-3xl text-white lg:text-4xl">
            Elevate Your Shopping
            Experience Today!
            </h1>
            <button className="bg-[#7dd3fc] mt-4 p-4 border-none rounded-lg font-bold text-black">
              Explore More
            </button>
          </div>
        </div>
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div
        className="bg-cover bg-center w-full h-[700px] md:h-[950px]"
        style={{
          backgroundImage:
            `url(${pic2})`,
        }}
      >
        <div className="flex justify-center items-center bg-gray-900/40 w-full h-full">
          <div className="text-center">
            <h1 className="font-semibold text-3xl text-white lg:text-4xl">
            Elevate Your Shopping
            Experience Today!
            </h1>
            <button className="bg-[#7dd3fc] mt-4 p-4 border-none rounded-lg font-bold text-black">
              Explore More
            </button>
          </div>
        </div>
      </div>
      </SwiperSlide>
      
     
    </Swiper>
  </>
  )
}
export default Carousel;