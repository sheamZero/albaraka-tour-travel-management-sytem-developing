import Container from "../../Shared/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import Rating from "react-rating";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "Absolutely amazing experience with Albaraka Tours! The team was professional, responsive, and made our trip to Maldives unforgettable.",
      tour: "Beach Paradise - Maldives",
      date: "March 2024",
    },
    {
      id: 2,
      name: "Mohammed Rahman",
      location: "Dubai, UAE",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "Best travel agency I've ever used! Our Swiss Alps adventure was perfectly planned.",
      tour: "Mountain Adventure - Swiss Alps",
      date: "February 2024",
    },
    {
      id: 3,
      name: "Emily Chen",
      location: "Singapore",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      text: "Great value for money! The City Explorer package in Paris exceeded our expectations.",
      tour: "City Explorer - Paris",
      date: "January 2024",
    },
    {
      id: 4,
      name: "David Wilson",
      location: "London, UK",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      text: "Unforgettable safari experience in Kenya! Saw the Big Five and stayed at amazing lodges.",
      tour: "Safari Expedition - Kenya",
      date: "December 2023",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            What Our <span className="text-primary">Travelers Say</span>
          </h2>

          <p className="text-text max-w-2xl mx-auto text-base md:text-lg px-4">
            Don't just take our word for it. Here's what our happy customers
            have to say about their travel experiences with Albaraka Tours.
          </p>
        </motion.div>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          centeredSlides={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 1.2 },
            1024: { slidesPerView: 1.5 },
          }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {
          testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-xl mx-auto">

                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />

                <h3 className="text-xl font-semibold text-secondary">
                  {testimonial.name}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  {testimonial.location}
                </p>

                <Rating
                  initialRating={testimonial.rating}
                  readonly
                  emptySymbol={<span className="text-gray-300 text-xl">★</span>}
                  fullSymbol={<span className="text-yellow-400 text-xl">★</span>}
                />

                <p className="text-text mt-4 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="text-sm text-gray-500">
                  <p className="font-medium">{testimonial.tour}</p>
                  <p>{testimonial.date}</p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Testimonials;