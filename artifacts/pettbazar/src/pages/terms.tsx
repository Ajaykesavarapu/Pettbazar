import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="py-20 md:py-32 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="prose prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary"
      >
        <h1 className="text-3xl md:text-5xl mb-8">Terms & Conditions</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <p>
          Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the pettbazar.in website (the "Service") operated by PettBazar ("us", "we", or "our").
        </p>
        <p>
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
        </p>

        <h2>1. Waitlist and Early Access</h2>
        <p>
          By joining our waitlist, you express interest in our upcoming platform. Joining the waitlist does not guarantee access to the platform or any specific promotional benefits. Any premium badges or free listing credits promised to early signups are subject to change and will be governed by specific terms upon the platform's official launch.
        </p>

        <h2>2. Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property of PettBazar and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of PettBazar.
        </p>

        <h2>3. Links to Other Web Sites</h2>
        <p>
          Our Service may contain links to third-party web sites or services that are not owned or controlled by PettBazar (e.g., Tally forms, social media platforms).
        </p>
        <p>
          PettBazar has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that PettBazar shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such web sites or services.
        </p>

        <h2>4. Disclaimer of Liability</h2>
        <p>
          While we strive to provide a secure and reliable platform, PettBazar is a marketplace facilitator. We do not own, breed, or sell pets directly. Any transactions, agreements, or interactions between users (e.g., pet parents and breeders) are solely between the involved parties. We strongly advise all users to verify health records, living conditions, and legitimacy before making any payments or commitments.
        </p>

        <h2>5. Changes</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
        </p>

        <h2>6. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <div className="p-6 bg-muted rounded-xl border border-border mt-6">
          <p className="my-1"><strong>Email:</strong> <a href="mailto:hellopettbazar@gmail.com">hellopettbazar@gmail.com</a></p>
          <p className="my-1"><strong>Location:</strong> Visakhapatnam, India</p>
        </div>
      </motion.div>
    </div>
  );
}
