import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


import Container from "../../Shared/Container";

import "swiper/css";
import "swiper/css/pagination";
import { ArrowRight } from "lucide-react";
import { useCategoryCounts } from "../../../hooks/usePackage";

/**
 * Static category config (NO total here anymore)
 */
const categories = [
    {
        id: "beach",
        name: "Beach",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
    },
    {
        id: "adventure",
        name: "Adventure",
        image: "https://i.ibb.co/J2s6F6b/adventure.jpg",
    },
    {
        id: "cultural",
        name: "Cultural",
        image: "https://i.ibb.co/6m9XKZs/culture.jpg",
    },
    {
        id: "wildlife",
        name: "Wildlife",
        image: "https://i.ibb.co/7gXK9Wf/wildlife.jpg",
    }
];

const PopularCategories = () => {
    const navigate = useNavigate();

    /**
     * [{ _id: "beach", total: 12 }, ...]
     */
    const { data: counts = [], isLoading } = useCategoryCounts();

    console.log(counts)

    const categoriesWithCount = categories.map(cat => {
        const found = counts.find(c => c._id === cat.id);
        return {
            ...cat,
            total: found?.total || 0
        };
    });

    const handleClick = (categoryId) => {
        navigate(`/categories?category=${categoryId}`);
    };

    return (
        <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
            <Container>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
                        Browse by <span className="text-primary">Categories</span>
                    </h2>

                    <p className="text-text max-w-2xl mx-auto text-lg">
                        Find your perfect travel style. Whether you love beaches,
                        adventure, culture, or wildlife — we have something for you.
                    </p>
                </motion.div>

                {/* Loading State */}
                {isLoading ? (
                    <p className="text-center py-10">Loading categories...</p>
                ) : (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        autoplay={{ delay: 3500 }}
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
                            categoriesWithCount.map((cat) => (
                                <SwiperSlide key={cat.id}>
                                    <div
                                        onClick={() => handleClick(cat.id)}
                                        className="group cursor-pointer"
                                    >

                                        <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition">

                                            {/* Image */}
                                            <div className="aspect-square overflow-hidden">
                                                <img
                                                    src={cat.image}
                                                    alt={cat.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />
                                            </div>

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                                            {/* Badge (Dynamic) */}
                                            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                                {cat.total} Packages
                                            </div>

                                            {/* Bottom */}
                                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                                                <h3 className="text-white text-lg font-bold">
                                                    {cat.name}
                                                </h3>

                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                                    <ArrowRight className="h-5 w-5 text-white" />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                )}

            </Container>
        </section>
    );
};

export default PopularCategories;