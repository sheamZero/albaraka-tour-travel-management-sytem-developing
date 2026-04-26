import Container from "../../components/Shared/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      id: "item-1",
      question: "How do I book a package?",
      answer:
        "You can book directly through our website or contact our support team for assistance."
    },
    {
      id: "item-2",
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, debit cards, mobile banking, and bank transfers."
    },
    {
      id: "item-3",
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes, cancellation and modification policies depend on the package. Please contact support for details."
    },
    {
      id: "item-4",
      question: "Do you offer travel insurance?",
      answer:
        "Yes, we provide optional travel insurance for most packages."
    },
    {
      id: "item-5",
      question: "Are your packages customizable?",
      answer:
        "Yes, many packages can be customized based on your preferences, budget, and schedule."
    }
  ];

  return (
    <section className="py-12 bg-gray-50 mt-16">
      <Container>

        {/* 🔷 Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary">
            Frequently Asked Questions
          </h1>

          <p className="text-text/70 max-w-2xl mx-auto">
            Find quick answers to common questions about bookings, payments, and travel plans.
          </p>
        </motion.div>

        {/* 🔷 FAQ Accordion */}
        <div className="mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8">
          <Accordion type="single" collapsible className="space-y-3 grid grid-cols-1 lg:grid-cols-2 gap-10">

            {
            faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-gray-100 rounded-xl px-4"
              >
                <AccordionTrigger className="text-left font-medium text-secondary hover:text-primary transition-all">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-text/70 py-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))
            }

          </Accordion>
        </div>

      </Container>
    </section>
  );
};

export default FAQ;