import { MapPin, Users, Award, Globe, Calendar, Heart, Star, ChevronRight } from "lucide-react"
import { FaLocationArrow, FaRegSmile, FaHandHoldingHeart } from "react-icons/fa"

const StatsMissonVision = () => {
     const stats = [
    { icon: <Users className="w-8 h-8" />, value: "50K+", label: "Happy Travelers" },
    { icon: <Globe className="w-8 h-8" />, value: "30+", label: "Destinations" },
    { icon: <Calendar className="w-8 h-8" />, value: "10+", label: "Years Experience" },
    { icon: <Award className="w-8 h-8" />, value: "500+", label: "5-Star Reviews" }
  ]
    return (
        <section>
            {/* Stats Section */}
            <div className="bg-primary/10 rounded-3xl py-12 px-6 mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-primary flex justify-center mb-3">
                                {stat.icon}
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-secondary">{stat.value}</div>
                            <div className="text-text/60 text-sm mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* mission & vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <MapPin className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-secondary mb-3">Our Mission</h3>
                    <p className="text-text/70 leading-relaxed">
                        To provide exceptional travel experiences that inspire, educate, and create lasting
                        memories while ensuring safety, comfort, and value for every traveler.
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <FaLocationArrow className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-secondary mb-3">Our Vision</h3>
                    <p className="text-text/70 leading-relaxed">
                        To become the most trusted and preferred travel partner worldwide, connecting people
                        with extraordinary destinations and authentic cultural experiences.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default StatsMissonVision;