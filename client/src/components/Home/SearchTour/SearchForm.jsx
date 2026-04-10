import { useState } from "react";
import {motion} from 'framer-motion'
import { Search, Calendar, Users, MapPin, DollarSign, Plane, Hotel, Utensils } from 'lucide-react';


const SearchForm = () => {
    const [formData, setFormData] = useState({
        destination: '',
        tourType: 'all',
        budget: '',
        duration: '',
        travelers: '2'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Searching tours with:', formData);
        // Add your search logic here
    };
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-4 md:px-8 md:p-5 border border-border">
                <h3 className="text-2xl font-semibold text-secondary mb-3 flex items-center gap-2">
                    <Search className="w-6 h-6 text-primary" />
                    Search Tours
                </h3>

                <div className="space-y-2">
                    {/* Destination */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-2">
                            Destination
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/40" />
                            <input
                                type="text"
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                placeholder="Where would you like to go?"
                                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                        </div>
                    </div>


                    {/* Tour Type */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-2">
                            Tour Type
                        </label>
                        <select
                            name="tourType"
                            value={formData.tourType}
                            onChange={handleChange}
                            className="w-full px-3 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">Select Tour Type</option>
                            <option value="all">All Tours</option>
                            <option value="luxury">Luxury Tours</option>
                            <option value="adventure">Adventure Tours</option>
                            <option value="family">Family Tours</option>
                            <option value="beach">Beach Vacations</option>
                            <option value="cultural">Cultural Tours</option>
                        </select>
                    </div>

                    {/* Budget & Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text mb-2">
                                <DollarSign className="inline w-3 h-3 mr-1" />
                                Budget (USD)
                            </label>
                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full px-3 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Any budget</option>
                                <option value="0-500">$0 - $500</option>
                                <option value="500-1000">$500 - $1000</option>
                                <option value="1000-2000">$1000 - $2000</option>
                                <option value="2000+">$2000+</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text mb-2">
                                <Calendar className="inline w-3 h-3 mr-1" />
                                Duration
                            </label>
                            <select
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full px-3 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Any duration</option>
                                <option value="1-3">1-3 days</option>
                                <option value="4-7">4-7 days</option>
                                <option value="8-14">8-14 days</option>
                                <option value="14+">14+ days</option>
                            </select>
                        </div>
                    </div>

                    {/* Travelers */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-2">
                            <Users className="inline w-3 h-3 mr-1" />
                            Number of Travelers
                        </label>
                        <select
                            name="travelers"
                            value={formData.travelers}
                            onChange={handleChange}
                            className="w-full px-3 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all mt-6 flex items-center justify-center gap-2"
                    >
                        <Search className="w-5 h-5" />
                        Search Available Tours
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default SearchForm;