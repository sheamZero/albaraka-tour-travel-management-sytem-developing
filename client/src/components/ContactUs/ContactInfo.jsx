import { FaLocationArrow, FaMapPin } from "react-icons/fa";


const ContactInfo = ({ contactInfo, socialLinks }) => {

    return (
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
                    <FaLocationArrow className="text-primary" />
                    Get in Touch
                </h2>
                <div className="space-y-6">
                    {
                        contactInfo.map((info, index) => (
                            <div key={index} className="flex gap-4 group">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    {info.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-secondary mb-1">{info.title}</h3>
                                    {
                                        info.details.map((detail, i) => (
                                            <p key={i} className="text-text/60 text-sm">{detail}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-secondary mb-4">Follow Us</h3>
                <div className="flex gap-3 flex-wrap">
                    {
                        socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 ${social.color} hover:text-white transition-all duration-300 hover:scale-110`}
                            >
                                {social.icon}
                            </a>
                        ))
                    }
                </div>
            </div>

           <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
  
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.718420482407!2d90.36214707516781!3d23.818753496570142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c13f802beff5%3A0x619efb503d43c8b2!2sjewel%20design%20limited!5e0!3m2!1sen!2sbd!4v1777130255406!5m2!1sen!2sbd"
    className="w-full h-48 md:h-56 border-0"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />

  <div className="p-4 text-center">
    <a
      href="https://www.google.com/maps?q=jewel+design+limited"
      target="_blank"
      rel="noopener noreferrer"
      className="text-text/60 text-sm flex items-center gap-2 justify-center hover:text-primary transition"
    >
      <FaMapPin className="text-red-500" />
      <span>Open in Google Maps</span>
    </a>
  </div>

</div>
        </div>
    );
};

export default ContactInfo;