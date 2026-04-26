import Container from "../../components/Shared/Container"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"
import { FaLocationArrow, FaWhatsapp, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { useState } from "react"
import ContactInfo from "../../components/ContactUs/ContactInfo"
import ContactForm from "../../components/ContactUs/ContactForm"
import FAQ from "../../components/ContactUs/FAQ"

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
    setIsSubmitted(true);
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
    <section className="py-12 bg-linear-to-b from-white to-gray-50">
      <Container>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-text/70 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Get in touch with our travel experts
          </p>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE - Contact Info Cards */}
          <ContactInfo
            socialLinks={socialLinks}
            contactInfo={contactInfo}
          />

          {/* RIGHT SIDE - Contact Form */}
          <ContactForm
            register={register}
            isSubmitted={isSubmitted}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />

        </div>



        {/* FAQ Section */}
        <FAQ/>

        {/* Newsletter Section */}
        <div className="mt-16 bg-linear-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-white/90 mb-5">Get exclusive deals, travel tips, and inspiration straight to your inbox</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 outline outline-white focus:outline-none focus:ring-2 focus:ring-white/50"
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