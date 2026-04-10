import { Shield, Headphones, Calendar, Map, ThumbsUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const Featured = () => {

    const features = [
        {
            id: 1,
            icon: Shield,
            title: "Best Price Guarantee",
            description: "We offer the best rates for flights, hotels, and tour packages. Find a lower price? We'll match it.",
            color: "from-blue-500 to-blue-600"
        },
        {
            id: 2,
            icon: Headphones,
            title: "24/7 Customer Support",
            description: "Our dedicated support team is available around the clock to assist you with any queries.",
            color: "from-green-500 to-green-600"
        },
        {
            id: 3,
            icon: Calendar,
            title: "Flexible Booking",
            description: "Free cancellation up to 7 days before departure. Book now, pay later with flexible options.",
            color: "from-purple-500 to-purple-600"
        },
        {
            id: 4,
            icon: Map,
            title: "Expert Local Guides",
            description: "Experience destinations through the eyes of knowledgeable local guides.",
            color: "from-orange-500 to-orange-600"
        },
        {
            id: 5,
            icon: ThumbsUp,
            title: "Trusted & Verified",
            description: "Thousands of happy travelers trust us for their dream vacations worldwide.",
            color: "from-red-500 to-red-600"
        },
        {
            id: 6,
            icon: DollarSign,
            title: "No Hidden Fees",
            description: "Transparent pricing with no surprise charges. What you see is what you pay.",
            color: "from-teal-500 to-teal-600"
        }
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
                <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50"
                >
                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-linear-to-br ${feature.color} rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300`}>
                        <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-3">
                        {feature.title}
                    </h3>
                    <p className="text-text/70 leading-relaxed">
                        {feature.description}
                    </p>
                </motion.div>
            ))}
        </div>
    );
};

export default Featured;