
import { ChevronRight, Star } from 'lucide-react';
import fallback from '../../assets/images/fallback.png'

const OurStory = () => {
    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src={fallback}
                            alt="Travel Adventure"
                            className="w-full h-[400px] object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-5 -right-5 bg-primary text-white p-4 rounded-2xl shadow-lg hidden md:block">
                        <div className="flex items-center gap-2">
                            <Star className="fill-yellow-400 text-yellow-400" />
                            <span className="font-bold">Trusted Since 2022</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-secondary mb-4">Our Story</h2>
                    <p className="text-text/70 leading-relaxed mb-4">
                        Founded in 2022, TravelHub began with a simple mission: to make travel accessible,
                        enjoyable, and memorable for everyone. What started as a small team of travel enthusiasts
                        has grown into a trusted name in the industry, serving thousands of happy travelers worldwide.
                    </p>
                    <p className="text-text/70 leading-relaxed mb-6">
                        We believe that travel is more than just visiting new places—it's about creating connections,
                        experiencing different cultures, and collecting moments that last a lifetime. Our team works
                        tirelessly to curate unique packages that cater to every type of traveler, from adventure
                        seekers to luxury lovers.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold cursor-pointer">
                        <span>Learn more about our journey</span>
                        <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;