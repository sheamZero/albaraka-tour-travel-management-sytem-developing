import { CheckCircle, Send } from 'lucide-react';
import React from 'react';

const ContactForm = ({ isSubmitted, handleSubmit, onSubmit, register, errors, isSubmitting }) => {
    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-secondary mb-2">Send Us a Message</h2>
                    <p className="text-text/60">We'll get back to you within 24 hours</p>
                </div>

                {
                    isSubmitted && (
                        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-in fade-in duration-300">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <p className="text-green-700">Thank you! Your message has been sent successfully.</p>
                        </div>
                    )
                }

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
    );
};

export default ContactForm;