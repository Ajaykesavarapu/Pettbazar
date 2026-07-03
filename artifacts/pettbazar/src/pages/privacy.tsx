import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="py-20 md:py-32 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="prose prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary"
      >
        <h1 className="text-3xl md:text-5xl mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <p>
          Welcome to PettBazar ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (pettbazar.in) and use our services.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We may collect several types of information from and about users of our Website, including:</p>
        <ul>
          <li><strong>Personal Data:</strong> Name, email address, phone number, and location when you voluntarily provide it to us (e.g., when joining the waitlist or contacting us).</li>
          <li><strong>Usage Data:</strong> Information about your internet connection, the equipment you use to access our Website, and usage details collected automatically through cookies and similar technologies.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use information that we collect about you or that you provide to us:</p>
        <ul>
          <li>To present our Website and its contents to you.</li>
          <li>To provide you with information, products, or services that you request from us (like early access notifications).</li>
          <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
          <li>To improve our website, products, services, marketing, and customer relationships.</li>
        </ul>

        <h2>3. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies, web beacons, and other tracking technologies to collect information about your activity on our Website to improve your experience. You can set your browser to refuse all or some browser cookies, but this may affect how the website functions.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>
          We may use third-party service providers (such as Tally for forms or analytics providers) to help us operate our business. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure, and we cannot guarantee the absolute security of your data.
        </p>

        <h2>6. Contact Information</h2>
        <p>
          If you have any questions or comments about this Privacy Policy and our privacy practices, please contact us at:
        </p>
        <div className="p-6 bg-muted rounded-xl border border-border mt-6">
          <p className="my-1"><strong>Email:</strong> <a href="mailto:hellopettbazar@gmail.com">hellopettbazar@gmail.com</a></p>
          <p className="my-1"><strong>Location:</strong> Visakhapatnam, India</p>
        </div>
      </motion.div>
    </div>
  );
}
