import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Plane, Mail, MapPin, Phone } from "lucide-react";
import Container from "./Container";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-secondary text-white font-semibold overflow-hidden">
            <Container>
                {/* Decorative Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                    <div
                        className="absolute top-10 left-20 w-72 h-72 rounded-full blur-3xl"
                        style={{ background: "#7da640" }}
                    ></div>
                    <div
                        className="absolute bottom-10 right-20 w-96 h-96 rounded-full blur-3xl"
                        style={{ background: "#7da640" }}
                    ></div>
                </div>

                {/* Main Footer Content */}
                <div className="relative container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 z-10">
                    {/* Logo + About */}
                    <div>
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <Plane className="w-8 h-8 text-primary" />
                            <span className="text-2xl font-bold">
                                Albaraka <span className="text-primary">Tour & Travel</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-white/70">
                            Discover the world with Albaraka Tour & Travel. We provide unforgettable travel experiences with best price guarantee and 24/7 customer support.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-primary uppercase">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-white/70 hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/packages" className="text-white/70 hover:text-primary transition-colors">
                                    Tour Packages
                                </Link>
                            </li>
                            <li>
                                <Link to="/destinations" className="text-white/70 hover:text-primary transition-colors">
                                    Destinations
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-white/70 hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-white/70 hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-primary uppercase">
                            Support
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/faq" className="text-white/70 hover:text-primary transition-colors">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-white/70 hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-white/70 hover:text-primary transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/cancellation" className="text-white/70 hover:text-primary transition-colors">
                                    Cancellation Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact + Socials */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-primary uppercase">
                            Get In Touch
                        </h3>
                        <p className="text-sm mb-4 text-white/70">
                            Have any questions? We're here to help 24/7.
                        </p>
                        
                        <div className="space-y-2 mb-4">
                            <p className="text-sm text-white/70 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary" />
                                <a href="tel:+12345678900" className="hover:text-primary transition-colors">
                                    +1 234 567 8900
                                </a>
                            </p>
                            <p className="text-sm text-white/70 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                <a href="mailto:info@albarakatravel.com" className="hover:text-primary transition-colors">
                                    info@albarakatravel.com
                                </a>
                            </p>
                            <p className="text-sm text-white/70 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>123 Travel Street, Downtown, City 12345</span>
                            </p>
                        </div>

                        <div className="flex space-x-4 mt-3">
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-white/70 hover:text-primary transition-all duration-200"
                                title="Facebook"
                            >
                                <FaFacebook size={22} />
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-white/70 hover:text-primary transition-all duration-200"
                                title="Instagram"
                            >
                                <FaInstagram size={22} />
                            </a>
                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-white/70 hover:text-primary transition-all duration-200"
                                title="LinkedIn"
                            >
                                <FaLinkedin size={22} />
                            </a>
                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-white/70 hover:text-primary transition-all duration-200"
                                title="Twitter (X)"
                            >
                                <BsTwitterX size={22} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider + Copyright */}
                <div className="border-t border-white/10 py-4 text-center text-sm text-white/60 relative z-10">
                    © {currentYear}{" "}
                    <span className="font-bold text-primary">Albaraka Tour & Travel</span>. All rights reserved.
                </div>
            </Container>
        </footer>
    );
};

export default Footer;