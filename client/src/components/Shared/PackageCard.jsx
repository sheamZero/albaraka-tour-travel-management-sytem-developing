import { MapPin, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import Rating from "react-rating";
import { Link } from "react-router-dom";

const PackageCard = ({ item, index }) => {
    return (
        <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group flex flex-col items-center justify-between h-full"
        >
            <div className="bg-card max-w-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-border/50 w-full">
                {/* Image Container */}
                <div className="relative overflow-hidden shrink-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4">
                        <span className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                            ${item.price}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                    {/* Title and Rating Row */}
                    <div className="flex justify-between items-start gap-3 mb-2">
                        <h3 className="text-xl font-bold text-secondary">
                            {item.title}
                        </h3>

                        <div className="flex items-center gap-1 flex-shrink-0">
                            <Rating
                                initialRating={item.rating}
                                emptySymbol={
                                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                }
                                fullSymbol={
                                    <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                }
                                readonly={true}
                                fractions={2}
                            />
                            <span className="text-xs text-text/60 ml-1">
                                ({item.rating})
                            </span>
                        </div>
                    </div>

                    {/* Location & Duration */}
                    <div className="flex items-center gap-3 text-sm text-text my-2 mt-1">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{item.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5" />
                            <span>${item.price}/person</span>
                        </div>
                    </div>

                    {/* Description - This will grow to push button down */}
                    <p className="text-text text-sm line-clamp-2 mb-3">
                        {item.description}
                    </p>

                    {/* Included Items */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {
                            item.included.slice(0, 3).map((include, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-text/80">
                                    {include}
                                </span>
                            ))
                        }
                        {
                            item.included.length > 3 && (
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-text/60">
                                    +{item.included.length - 3} more
                                </span>
                            )
                        }
                    </div>

                    <div className="mt-auto">
                        <Link to={`/packageDetails/${item.id}`}>
                            <button
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-2.5 font-semibold transition-all hover:scale-105 active:scale-95"
                            >
                                View Package
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PackageCard;