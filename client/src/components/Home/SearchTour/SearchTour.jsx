import Container from '../../Shared/Container';
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import SearchForm from './SearchForm';

import fallbackImage from '../../../assets/images/fallback.png';
import travelVideo from '../../../assets/video/video.mp4';
import { Pause, Play } from 'lucide-react';

const SearchTour = () => {
    const [videoError, setVideoError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef(null);

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause();
                setIsVideoPlaying(false);
            }
            else {
                videoRef.current.play();
                setIsVideoPlaying(true);
            }
        }
    }
    return (
        <section className="py-16 md:py-24 bg-primary/5">
            <Container>
                {/* header section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
                        Find Your <span className="text-primary">Perfect Tour</span>
                    </h2>
                    <p className="text-text max-w-2xl mx-auto text-lg">
                        Discover amazing destinations with our hand-picked tour packages.
                        Find the perfect journey that matches your dreams and budget.
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
                    {/* left side - video */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl overflow-hidden h-full min-h-[400px] md:min-h-[500px] group"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}

                    >
                        {!videoError ? (
                            <video
                                ref={videoRef}
                                // autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                                onError={() => setVideoError(true)}
                            >
                                <source src={travelVideo} type="video/mp4" />
                            </video>
                        ) : (
                            /* fallback image if video fails */
                            <img
                                src={fallbackImage}
                                alt="Travel destination"
                                className="w-full h-full object-cover"
                            />
                        )}

                        {
                            isHovered && (
                                <div
                                    onClick={togglePlayPause}
                                    className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                            {
                                                isVideoPlaying ? (
                                                    <Pause className="w-8 h-8 ml-0" />
                                                ) : (
                                                    <Play className="w-8 h-8 ml-1" />
                                                )
                                            }
                                        </div>
                                        <h3 className="text-2xl font-bold">
                                            {
                                                isVideoPlaying ? "Discover Your Next Adventure" : "Ready to Explore?"
                                            }
                                        </h3>
                                    </div>
                                </div>
                            )
                        }
                    </motion.div>

                    {/* right side - search form */}
                    <SearchForm />
                </div>
            </Container>
        </section>
    );
};

export default SearchTour;