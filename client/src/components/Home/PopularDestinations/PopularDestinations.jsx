import { Button } from "@/components/ui/button";
import Container from '../../Shared/Container';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

import { ArrowRight } from "lucide-react";

const PopularDestinations = () => {
    const navigate = useNavigate();

    const destinations = [
        {
            id: 1,
            name: "New York City",
            state: "New York",
            image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop",
            tours: 32,
            price: 799,
        },
        {
            id: 2,
            name: "Los Angeles",
            state: "California",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
            tours: 24,
            price: 699,
        },
        {
            id: 3,
            name: "Grand Canyon",
            state: "Arizona",
            image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
            tours: 18,
            price: 499,
        },
        {
            id: 4,
            name: "Miami Beach",
            state: "Florida",
            image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
            tours: 20,
            price: 649,
        },
        {
            id: 5,
            name: "Las Vegas",
            state: "Nevada",
            image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&h=600&fit=crop",
            tours: 27,
            price: 599,
        },
        {
            id: 6,
            name: "Yellowstone",
            state: "Wyoming",
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
            tours: 15,
            price: 729,
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-primary/5 overflow-hidden">
            <Container>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
                        Explore Our <span className="text-primary">Popular Destinations</span>
                    </h2>

                    <p className="text-text max-w-2xl mx-auto text-lg leading-relaxed">
                        Discover breathtaking places loved by travelers around the world.
                        From vibrant cities to natural wonders, explore our most popular
                        destinations and start planning your next unforgettable journey.
                    </p>
                </motion.div>


                {/* Slider */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    modules={[Pagination, Autoplay]}
                    className="pb-12"
                >

                    {
                        destinations.map((destination) => (
                            <SwiperSlide key={destination.id}>
                                <div className="group cursor-pointer">

                                    {/* Card */}
                                    <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">

                                        {/* Image */}
                                        <div className="aspect-square overflow-hidden">
                                            <img
                                                src={destination.image}
                                                alt={destination.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition" />

                                        {/* Tours Badge */}
                                        <div className="absolute top-4 right-4 z-10 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground shadow-lg">
                                            {destination.tours} Tours
                                        </div>

                                        {/* Bottom Info */}
                                        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">

                                            <h3 className="text-lg font-bold text-white">
                                                {destination.name}
                                            </h3>

                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                                <ArrowRight className="h-5 w-5 text-white" />
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>


                {/* Button */}
                <div className="flex justify-center mt-10">
                    <motion.button
                        onClick={() => navigate('/destinations')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 border-2 border-primary text-primary rounded-full font-bold text-lg hover:shadow-lg hover:bg-primary hover:text-white transition-all"
                    >
                        View All Destinations
                    </motion.button>
                </div>

            </Container>
        </section>
    );
};

export default PopularDestinations;