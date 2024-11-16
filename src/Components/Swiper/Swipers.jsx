import image1 from '../../assets/images/icons/Sajek.png';
import image2 from '../../assets/images/icons/Sreemongol.png';
import image3 from '../../assets/images/icons/sundorbon.png';


import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';


const Swipers = () => {
    return (
        <div className='w-[250px] md:w-[500px] lg:w-[600px]'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1.5}
                navigation={{
                    prevEl: '.prev',
                    nextEl: '.next',
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide className='border-8 rounded-xl md:rounded-3xl lg:rounded-3xl border-yellow-500'>
                    <Link to='/sajek'>
                        <div className='absolute bottom-0 pl-1 md:pl-2 lg:pl-5 pb-1 md:pb-2 lg:pb-5'>
                            <p className='md:text-xl lg:text-4xl'>Sajek</p>
                        </div>
                        <img src={image1} alt="" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide className='border-8 rounded-xl md:rounded-3xl lg:rounded-3xl border-yellow-500'>
                    <Link to='sreemangal'>
                        <div className='absolute bottom-0 pl-1 md:pl-2 lg:pl-5 pb-1 md:pb-2 lg:pb-5'>
                            <p className='md:text-xl lg:text-4xl'>Sreemongol</p>
                        </div>
                        <img src={image2} alt="" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide className='border-8 rounded-xl md:rounded-3xl lg:rounded-3xl border-yellow-500'>
                    <Link to='sundarbans'>
                        <div className='absolute bottom-0 pl-1 md:pl-2 lg:pl-5 pb-1 md:pb-2 lg:pb-5'>
                            <p className='md:text-xl lg:text-4xl'>sundorbon</p>
                        </div>
                        <img src={image3} alt="" />
                    </Link>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Swipers;