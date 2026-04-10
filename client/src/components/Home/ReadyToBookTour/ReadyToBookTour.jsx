import React from 'react';
import Container from '../../Shared/Container';
import { motion } from 'framer-motion'

const ReadyToBookTour = () => {
    return (
        <section className='my-16 md:my-24'>



            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center mt-12 py-12 bg-linear-to-r from-primary/20 to-secondary/10"
            >
                <Container>
                    <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-2">
                        Ready to Start Your Journey?
                    </h3>
                    <p className="text-text mb-4">
                        Join thousands of happy travelers who chose Albaraka Tours
                    </p>
                    <button className="px-8 py-3 text-lg bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all hover:scale-105">
                        Book Your Tour Now
                    </button>
                </Container>
            </motion.div>
        </section>
    );
};

export default ReadyToBookTour;