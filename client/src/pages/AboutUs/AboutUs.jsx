import Container from "../../components/Shared/Container"
import { MapPin, Users, Award, Globe, Calendar, Heart, Star, ChevronRight } from "lucide-react"
import { FaLocationArrow, FaRegSmile, FaHandHoldingHeart } from "react-icons/fa"

const AboutUs = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "50K+", label: "Happy Travelers" },
    { icon: <Globe className="w-8 h-8" />, value: "30+", label: "Destinations" },
    { icon: <Calendar className="w-8 h-8" />, value: "10+", label: "Years Experience" },
    { icon: <Award className="w-8 h-8" />, value: "500+", label: "5-Star Reviews" }
  ]

  const values = [
    { icon: <Heart className="w-6 h-6" />, title: "Passion for Travel", description: "We live and breathe travel, sharing our love for exploration with every client." },
    { icon: <FaRegSmile className="w-6 h-6" />, title: "Customer First", description: "Your satisfaction is our priority. We go above and beyond for you." },
    { icon: <FaHandHoldingHeart className="w-6 h-6" />, title: "Responsible Tourism", description: "Committed to sustainable and ethical travel practices." }
  ]

  const team = [
    { name: "Sarah Johnson", role: "Founder & CEO", image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Michael Chen", role: "Head of Operations", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Emily Rodriguez", role: "Travel Specialist", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "David Kim", role: "Customer Experience", image: "https://randomuser.me/api/portraits/men/75.jpg" }
  ]

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <Container>
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
            About <span className="text-primary">Us</span>
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-text/70 text-lg max-w-2xl mx-auto">
            Your trusted partner in creating unforgettable travel experiences around the world
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80" 
                alt="Travel Adventure"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-primary text-white p-4 rounded-2xl shadow-lg hidden md:block">
              <div className="flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold">Trusted Since 2015</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-4">Our Story</h2>
            <p className="text-text/70 leading-relaxed mb-4">
              Founded in 2015, TravelHub began with a simple mission: to make travel accessible, 
              enjoyable, and memorable for everyone. What started as a small team of travel enthusiasts 
              has grown into a trusted name in the industry, serving thousands of happy travelers worldwide.
            </p>
            <p className="text-text/70 leading-relaxed mb-6">
              We believe that travel is more than just visiting new places—it's about creating connections, 
              experiencing different cultures, and collecting moments that last a lifetime. Our team works 
              tirelessly to curate unique packages that cater to every type of traveler, from adventure 
              seekers to luxury lovers.
            </p>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <span>Learn more about our journey</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

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

        {/* Mission & Vision */}
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

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-secondary mb-2">Our Core Values</h2>
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

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-secondary mb-2">Meet Our Team</h2>
            <p className="text-text/60">Passionate experts dedicated to your travel needs</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all text-center group">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-secondary text-lg">{member.name}</h3>
                  <p className="text-primary text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Ready for Your Next Adventure?</h2>
          <p className="text-white/90 mb-6 max-w-md mx-auto">
            Let us help you plan the perfect getaway. Your dream destination is just a click away.
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
            Explore Our Packages
          </button>
        </div>

      </Container>
    </section>
  )
}

export default AboutUs