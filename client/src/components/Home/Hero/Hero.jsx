import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

import banner_1 from '../../../assets/images/banner_1.png';
import banner_2 from '../../../assets/images/banner_2.png';
import banner_3 from '../../../assets/images/banner_3.png';
import banner_4 from '../../../assets/images/banner_4.png';
import { Compass } from 'lucide-react';

const Hero = () => {
    const banners = [
        {
            id: 1,
            image: banner_1,
            title: "Discover The World Beyond Borders",
            subtitle:
                "Explore breathtaking destinations, hidden gems, and unforgettable journeys with Albaraka Travel."
        },
        {
            id: 2,
            image: banner_2,
            title: "Luxury Travel, Perfectly Curated",
            subtitle:
                "Experience premium tours, world-class comfort, and unforgettable moments."
        },
        {
            id: 3,
            image: banner_3,
            title: "Adventure Starts With One Step",
            subtitle:
                "From mountains to oceans — create memories that last a lifetime."
        },
        {
            id: 4,
            image: banner_4,
            title: "Exclusive Travel Deals Await",
            subtitle:
                "Save up to 40% on selected packages and start your dream journey today."
        }
    ];
    return (
        <section className="relative overflow-hidden">
            <Swiper
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Pagination, Autoplay]}
                className="h-[90vh] md:h-[85vh] lg:h-screen"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="relative h-full w-full">
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/40" />

                            <div className="absolute inset-0 flex items-center justify-center px-4">
                                <div className="text-center max-w-4xl mx-auto">
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="flex items-center justify-center w-14 h-14 bg-secondary/50 rounded-full mb-6 mx-auto"
                                    >
                                        <Compass className="w-7 h-7 text-primary" />
                                    </motion.div>

                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                                    >
                                        {banner.title}
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                                        className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8"
                                    >
                                        {banner.subtitle}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                        className="flex items-center justify-center gap-4 flex-wrap"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:shadow-lg transition-all"
                                        >
                                            Explore Tours
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 border-2 border-primary text-primary rounded-full font-bold text-lg hover:bg-primary hover:border-none hover:text-white transition-all"
                                        >
                                            View Packages
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Hero;