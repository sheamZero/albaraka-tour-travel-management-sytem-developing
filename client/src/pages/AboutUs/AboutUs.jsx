import Container from "../../components/Shared/Container"
import { MapPin, Users, Award, Globe, Calendar, Heart, Star, ChevronRight } from "lucide-react"
import { FaLocationArrow, FaRegSmile, FaHandHoldingHeart } from "react-icons/fa"
import OurStory from "../../components/AboutUs/OurStory"
import StatsMissonVision from "../../components/AboutUs/StatsMissonVision"
import OurValues from "../../components/AboutUs/OurValues"
import OurTeam from "../../components/AboutUs/OurTeam"
import { useNavigate } from 'react-router-dom'

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-linear-to-b from-white to-gray-50">
      <Container>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
            About <span className="text-primary">Us</span>
          </h1>
          {/* <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div> */}
          <p className="text-text/70 text-lg max-w-2xl mx-auto">
            Your trusted partner in creating unforgettable travel experiences around the world
          </p>
        </div>

        <OurStory />
        <StatsMissonVision />
        <OurValues />
        <OurTeam />

        <div className="bg-linear-to-r from-primary to-primary/80 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Ready for Your Next Adventure?</h2>
          <p className="text-white/90 mb-6 max-w-md mx-auto">
            Let us help you plan the perfect getaway. Your dream destination is just a click away.
          </p>
          <button
            onClick={() => navigate("/packages")}
            className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
            Explore Our Packages
          </button>
        </div>

      </Container>
    </section>
  )
}

export default AboutUs