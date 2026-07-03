import { motion, AnimatePresence } from "framer-motion";
import { SiGoogleplay } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-image.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const testimonials = [
  { name: "Sumathi", text: "Exactly the kind of platform pet parents have been waiting for." },
  { name: "Chandu", text: "A simpler way to discover pets and everything that comes after." },
  { name: "Adithya", text: "Clean, thoughtful, and genuinely useful for new pet parents." }
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="mb-6">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20">
                  Launching Soon for Pet Parents
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight mb-6">
                One Place for Every Step of Your <span className="text-primary">Pet Journey</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                Discover pets, connect with breeders, and access everything your pet needs in one growing ecosystem.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto text-lg px-8 py-6 rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
                  onClick={() => window.open('https://tally.so/r/GxDY6j', '_blank')}
                  data-testid="hero-cta-primary"
                >
                  Get Early Access
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base px-6 py-6 rounded-xl font-semibold border-2 border-primary text-primary bg-primary/5 pointer-events-none relative overflow-hidden"
                  tabIndex={-1}
                  aria-disabled="true"
                  data-testid="hero-cta-secondary"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
                  <SiGoogleplay className="mr-2 h-5 w-5 text-primary" />
                  <span className="font-bold">Android App</span>&nbsp;Launching Soon
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex-1 w-full max-w-md lg:max-w-none"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden shadow-2xl border border-border/50 bg-muted">
                <img 
                  src={heroImage} 
                  alt="Happy Indian children playing with a puppy in a modern home" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-card px-4 border-y border-border/40">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Early Supporters Are Saying</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              First impressions from people excited about PettBazar.
            </p>
          </motion.div>

          {/* Auto-rotating testimonial */}
          <div className="relative min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Card className="border-border bg-background shadow-lg rounded-[24px] relative overflow-hidden">
                  <div className="absolute top-6 left-8 text-8xl text-primary/10 font-serif leading-none select-none">"</div>
                  <CardContent className="p-10 pt-14 flex flex-col relative z-10">
                    <p className="text-xl md:text-2xl font-medium text-foreground mb-8 leading-relaxed text-center">
                      {testimonials[activeTestimonial].text}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {testimonials[activeTestimonial].name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-lg">{testimonials[activeTestimonial].name}</p>
                        <p className="text-sm text-muted-foreground">Early Supporter</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeTestimonial ? "bg-primary w-7" : "bg-primary/25"
                }`}
                aria-label={`View testimonial ${i + 1}`}
                data-testid={`testimonial-dot-${i}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-background scroll-mt-16">
        <div className="container mx-auto max-w-3xl">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know before PettBazar launches.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-border bg-card rounded-[16px] px-6 py-2 shadow-sm data-[state=open]:shadow-md transition-all">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-primary transition-colors">
                  What is PettBazar, and when is it launching?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-4">
                  PettBazar is India's upcoming premium digital marketplace built exclusively for pet lovers, verified breeders, and pet services. We are currently in the final stages of development and are launching very soon. By joining our early-bird waitlist today, you'll be the first to get exclusive early access.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-border bg-card rounded-[16px] px-6 py-2 shadow-sm data-[state=open]:shadow-md transition-all">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-primary transition-colors">
                  Why should I join the waitlist right now?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-4">
                  The first 1,000 pet owners, breeders, and businesses who sign up will receive exclusive premium badges on their profiles and free featured listing credits when the platform goes live. This helps their listings appear at the top of search results at no cost.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-border bg-card rounded-[16px] px-6 py-2 shadow-sm data-[state=open]:shadow-md transition-all">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-primary transition-colors">
                  Will PettBazar be free to use when it launches?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-4">
                  Yes. Creating an account, browsing the marketplace, and posting standard pet or service listings will be completely free. Premium promotional tools may be introduced later, but the core platform is built to remain accessible to the community.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-border bg-card rounded-[16px] px-6 py-2 shadow-sm data-[state=open]:shadow-md transition-all">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-primary transition-colors">
                  How do I ensure a safe purchase once the platform is live?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-4">
                  Your safety and the pet's well-being are our highest priorities. Always verify the pet's health, vaccination records, and living environment in person before making any decisions or paying advance money. PettBazar is designed to help you connect more safely, but in-person verification remains the best protection.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-muted border-t border-border/40 scroll-mt-16">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-10">
              Questions, partnerships, or feedback — we'd love to hear from you.
            </p>

            <a
              href="mailto:hellopettbazar@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:bg-[#EA580C] hover:-translate-y-1 transition-all duration-200"
              data-testid="link-email-cta"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              hellopettbazar@gmail.com
            </a>

            <p className="mt-8 text-sm text-muted-foreground">
              Based in Visakhapatnam, India
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
