import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="py-20 md:py-32 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
          Why We Started PettBazar
        </h1>
        <p className="text-xl md:text-2xl font-medium text-primary mb-12 leading-relaxed">
          Finding a pet should feel exciting, not overwhelming.
        </p>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary max-w-none text-foreground/90">
          <p className="lead text-xl leading-relaxed">
            PettBazar is being created to simplify the journey of bringing a pet home and caring for them over time. Our goal is to help pet parents discover pets, connect with breeders, and access essentials and services in one convenient platform.
          </p>
          <p>
            We noticed a gap in the Indian market. While the love for pets is growing rapidly, the infrastructure to support pet parents hasn't kept up. Finding a verified breeder, understanding the right nutrition, or simply locating trustworthy services often requires countless hours of research, phone calls, and leaps of faith.
          </p>
          <p>
            We believe it shouldn't be this hard. We envision a digital home where trust is built-in, where quality is standard, and where the community supports each other. Whether you are bringing home your first puppy, looking for specialized care, or offering exceptional pet services, PettBazar is designed for you.
          </p>
          <div className="my-12 p-8 bg-muted rounded-[24px] border border-border">
            <h3 className="text-2xl font-bold mt-0 mb-4 text-foreground">Our Promise</h3>
            <ul className="space-y-3 m-0 list-none p-0">
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span><strong>Trust First:</strong> We prioritize verified listings to ensure safety for both pets and parents.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span><strong>Community Driven:</strong> Built by pet lovers, for pet lovers. We listen to what the community needs.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span><strong>Premium Experience:</strong> A clean, intuitive interface that makes discovery a joy, not a chore.</span>
              </li>
            </ul>
          </div>
          <p>
            Join us on this journey. We are building the future of pet care in India, and we'd love for you to be a part of it from day one.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
