
import { MapPin, Users, Award, Globe, Calendar, Heart, Star, ChevronRight } from "lucide-react"
import { FaLocationArrow, FaRegSmile, FaHandHoldingHeart } from "react-icons/fa"

const OurValues = () => {
    const values = [
        { icon: <Heart className="w-6 h-6" />, title: "Passion for Travel", description: "We live and breathe travel, sharing our love for exploration with every client." },
        { icon: <FaRegSmile className="w-6 h-6" />, title: "Customer First", description: "Your satisfaction is our priority. We go above and beyond for you." },
        { icon: <FaHandHoldingHeart className="w-6 h-6" />, title: "Responsible Tourism", description: "Committed to sustainable and ethical travel practices." }
    ]

    return (
        <section>
            <div className="mb-20">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-secondary mb-2">Our Core Values</h2>
                    <p className="text-text/60">What makes us different</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((value, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-secondary mb-2">{value.title}</h3>
                            <p className="text-text/60 text-sm">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurValues;