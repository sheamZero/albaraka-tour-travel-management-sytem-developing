import Container from "../../components/Shared/Container"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"
import { FaLocationArrow, FaWhatsapp, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { useState } from "react"

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async (data) => {
    console.log("Form submitted:", data)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    reset()
  }

  const contactInfo = [
    { icon: <MapPin className="w-6 h-6" />, title: "Visit Us", details: ["123 Travel Street, Downtown", "New York, NY 10001, USA"] },
    { icon: <Phone className="w-6 h-6" />, title: "Call Us", details: ["+1 (555) 123-4567", "+1 (555) 987-6543"] },
    { icon: <Mail className="w-6 h-6" />, title: "Email Us", details: ["info@travelhub.com", "support@travelhub.com"] },
    { icon: <Clock className="w-6 h-6" />, title: "Working Hours", details: ["Mon-Fri: 9AM - 8PM", "Sat-Sun: 10AM - 5PM"] }
  ]

  const socialLinks = [
    { icon: <FaFacebookF className="w-5 h-5" />, name: "Facebook", color: "hover:bg-[#1877f2]", link: "https://facebook.com" },
    { icon: <FaTwitter className="w-5 h-5" />, name: "Twitter", color: "hover:bg-[#1da1f2]", link: "https://twitter.com" },
    { icon: <FaInstagram className="w-5 h-5" />, name: "Instagram", color: "hover:bg-[#e4405f]", link: "https://instagram.com" },
    { icon: <FaLinkedinIn className="w-5 h-5" />, name: "LinkedIn", color: "hover:bg-[#0077b5]", link: "https://linkedin.com" },
    { icon: <FaWhatsapp className="w-5 h-5" />, name: "WhatsApp", color: "hover:bg-[#25d366]", link: "https://wa.me/15551234567" }
  ]

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <Container>
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
            Contact <span className="text-primary">Us</span>
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-text/70 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Get in touch with our travel experts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDE - Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
                <FaLocationArrow className="text-primary" />
                Get in Touch
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary mb-1">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-text/60 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-secondary mb-4">Follow Us</h3>
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 ${social.color} hover:text-white transition-all duration-300 hover:scale-110`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Map Preview */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80"
                alt="Map Location"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <p className="text-text/60 text-sm">📍 Find us on Google Maps</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-secondary mb-2">Send Us a Message</h2>
                <p className="text-text/60">We'll get back to you within 24 hours</p>
              </div>

              {isSubmitted && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-in fade-in duration-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <p className="text-green-700">Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-secondary font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-secondary font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-secondary font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label className="block text-secondary font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      {...register("subject", { required: "Subject is required" })}
                      className={`w-full px-4 py-3 border ${errors.subject ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                      placeholder="Booking Inquiry"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-secondary font-medium mb-2">Message *</label>
                  <textarea
                    rows={5}
                    {...register("message", { required: "Message is required" })}
                    className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none`}
                    placeholder="Tell us about your travel plans..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-text/50 text-sm">
                  Or call us directly at <span className="text-primary font-semibold">+1 (555) 123-4567</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Frequently Asked Questions</h2>
            <p className="text-text/60">Quick answers to common questions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow group cursor-pointer">
              <h3 className="font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">How do I book a package?</h3>
              <p className="text-text/60 text-sm">You can book directly through our website or contact our customer support team for assistance.</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow group cursor-pointer">
              <h3 className="font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">What payment methods do you accept?</h3>
              <p className="text-text/60 text-sm">We accept credit cards, debit cards, PayPal, and bank transfers.</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow group cursor-pointer">
              <h3 className="font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">Can I cancel or modify my booking?</h3>
              <p className="text-text/60 text-sm">Yes, cancellation and modification policies vary by package. Contact us for details.</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow group cursor-pointer">
              <h3 className="font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">Do you offer travel insurance?</h3>
              <p className="text-text/60 text-sm">Yes, we offer comprehensive travel insurance options for all our packages.</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-white/90 mb-5">Get exclusive deals, travel tips, and inspiration straight to your inbox</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
              Subscribe
            </button>
          </form>
        </div>

      </Container>
    </section>
  )
}

export default ContactUs