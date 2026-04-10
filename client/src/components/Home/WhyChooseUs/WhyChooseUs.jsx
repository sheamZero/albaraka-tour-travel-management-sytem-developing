import Container from "../../Shared/Container";
import { motion } from 'framer-motion';
import { ThumbsUp, Plane, Hotel, Users } from 'lucide-react';
import Featured from "./Featured";

const WhyChooseUs = () => {

    const stats = [
        { id: 1, value: "5000+", label: "Happy Travelers", icon: Users },
        { id: 2, value: "50+", label: "Destinations", icon: Plane },
        { id: 3, value: "1000+", label: "Tour Packages", icon: Hotel },
        { id: 4, value: "98%", label: "Satisfaction Rate", icon: ThumbsUp },
    ];

    return (
        <section className="py-16 md:py-24 bg-primary/5">
            <Container>
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
                        Why Choose <span className="text-primary">Albaraka Tours</span>
                    </h2>
                    <p className="text-text max-w-2xl mx-auto text-lg leading-relaxed">
                        We make travel simple, affordable, and unforgettable.
                        Here's why thousands of travelers trust us with their journeys.
                    </p>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6"
                >
                    {
                        stats.map((stat, index) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                                    <stat.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-secondary">{stat.value}</h3>
                                <p className="text-text text-sm">{stat.label}</p>
                            </motion.div>
                        ))
                    }
                </motion.div>

                {/* Features Grid */}
                <Featured />

               
            </Container>
        </section>
    );
};

export default WhyChooseUs;