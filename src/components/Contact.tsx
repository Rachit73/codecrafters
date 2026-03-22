import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fieldVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-bg-secondary/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-accent-primary uppercase tracking-widest mb-2">Get In Touch</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
            Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Together</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div>
              <h4 className="text-2xl font-display font-bold text-text-primary mb-6">Contact Information</h4>
              <p className="text-text-secondary leading-relaxed mb-8">
                Ready to start your next project? Reach out to us and let's discuss how we can help you achieve your goals.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center shrink-0 border border-accent-primary/20 group-hover:border-accent-primary/50 transition-colors">
                  <Phone className="text-accent-primary" size={24} />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-1">Phone</h5>
                  <a href="tel:+919022141119" className="text-lg text-text-primary hover:text-accent-primary transition-colors">
                    +91 9022141119
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 flex items-center justify-center shrink-0 border border-accent-secondary/20 group-hover:border-accent-secondary/50 transition-colors">
                  <Mail className="text-accent-secondary" size={24} />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-1">Email</h5>
                  <a href="mailto:123vineetpratyush@gmail.com" className="text-lg text-text-primary hover:text-accent-secondary transition-colors">
                    123vineetpratyush@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center shrink-0 border border-accent-primary/20 group-hover:border-accent-primary/50 transition-colors">
                  <MapPin className="text-accent-primary" size={24} />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-1">Address</h5>
                  <p className="text-lg text-text-primary leading-relaxed">
                    CodeCrafters Technologies<br />
                    4th Floor, Orion Tech Park<br />
                    Whitefield Main Road<br />
                    Bangalore, Karnataka, India – 560066
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="glass p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            <form 
              action="https://formsubmit.co/ajax/123vineetpratyush@gmail.com" 
              method="POST"
              onSubmit={handleSubmit}
              className="relative z-10"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_subject" value="New Contact from CodeCrafters Website!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
                
                <motion.div variants={fieldVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    disabled={isSubmitting}
                    className="w-full bg-bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus:neon-glow transition-all duration-300 disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={fieldVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      disabled={isSubmitting}
                      className="w-full bg-bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus:neon-glow transition-all duration-300 disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </motion.div>

                  <motion.div variants={fieldVariants}>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required
                      disabled={isSubmitting}
                      className="w-full bg-bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus:neon-glow transition-all duration-300 disabled:opacity-50"
                      placeholder="+91 98765 43210"
                    />
                  </motion.div>
                </div>

                <motion.div variants={fieldVariants}>
                  <label htmlFor="service" className="block text-sm font-medium text-text-secondary mb-2">Service Required</label>
                  <select 
                    id="service" 
                    name="service"
                    required
                    defaultValue=""
                    disabled={isSubmitting}
                    className="w-full bg-bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus:neon-glow transition-all duration-300 appearance-none disabled:opacity-50"
                  >
                    <option value="" disabled className="text-text-secondary">Select a service...</option>
                    <option value="Frontend" className="bg-bg-secondary text-text-primary">Frontend</option>
                    <option value="Backend" className="bg-bg-secondary text-text-primary">Backend</option>
                    <option value="Database" className="bg-bg-secondary text-text-primary">Database</option>
                    <option value="SaaS" className="bg-bg-secondary text-text-primary">SaaS</option>
                    <option value="Hosting" className="bg-bg-secondary text-text-primary">Hosting</option>
                    <option value="Domain" className="bg-bg-secondary text-text-primary">Domain</option>
                    <option value="Video Ad" className="bg-bg-secondary text-text-primary">Video Ad</option>
                    <option value="Promotional Poster" className="bg-bg-secondary text-text-primary">Promotional Poster</option>
                    <option value="Business Guidance" className="bg-bg-secondary text-text-primary">Business Guidance</option>
                    <option value="Other" className="bg-bg-secondary text-text-primary">Other</option>
                  </select>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus:neon-glow transition-all duration-300 resize-none disabled:opacity-50"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </motion.div>

                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400"
                  >
                    <CheckCircle size={20} />
                    <p className="text-sm font-medium">Message sent successfully! We'll be in touch soon.</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400"
                  >
                    <AlertCircle size={20} />
                    <p className="text-sm font-medium">Something went wrong. Please try again later.</p>
                  </motion.div>
                )}

                <motion.div variants={fieldVariants} className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-accent-primary text-bg-secondary font-bold text-lg flex items-center justify-center gap-2 neon-glow hover:bg-accent-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        Sending...
                        <Loader2 size={20} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={20} />
                      </>
                    )}
                  </motion.button>
                </motion.div>
                
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
