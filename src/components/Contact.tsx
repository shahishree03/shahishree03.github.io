
import { useEffect, useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time email validation
    if (name === 'email') {
      if (value === '') {
        setEmailError('');
      } else {
        const validation = validateEmail(value);
        setEmailError(validation.isValid ? '' : validation.error || '');
      }
    }
  };

  // Email validation function
  const validateEmail = (email: string): { isValid: boolean; error?: string } => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: "Please enter a valid email address" };
    }

    // Check for common disposable/temporary email domains
    const disposableEmails = [
      '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
      'temp-mail.org', 'throwaway.email', 'getnada.com', 'maildrop.cc',
      'yopmail.com', 'mailnesia.com', 'fakeinbox.com', 'sharklasers.com',
      'trashmail.com', 'dispostable.com', 'tempail.com', 'mohmal.com'
    ];
    
    const emailDomain = email.split('@')[1]?.toLowerCase();
    if (disposableEmails.includes(emailDomain)) {
      return { isValid: false, error: "Please use a permanent email address, not a temporary one" };
    }

    // Check for suspicious patterns
    if (email.includes('noreply') || email.includes('no-reply')) {
      return { isValid: false, error: "Please use a valid personal or business email address" };
    }

    // Check for common fake email patterns
    const suspiciousPatterns = ['test@', 'fake@', 'dummy@', 'example@', 'spam@'];
    if (suspiciousPatterns.some(pattern => email.toLowerCase().includes(pattern))) {
      return { isValid: false, error: "Please use your real email address" };
    }

    return { isValid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!formData.name.trim()) {
        toast({
          title: "Name Required",
          description: "Please enter your full name",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (formData.name.trim().length < 2) {
        toast({
          title: "Invalid Name",
          description: "Please enter a valid full name (at least 2 characters)",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Email validation
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid) {
        toast({
          title: "Invalid Email",
          description: emailValidation.error,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (!formData.subject.trim()) {
        toast({
          title: "Subject Required",
          description: "Please enter a subject for your message",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (!formData.message.trim() || formData.message.trim().length < 10) {
        toast({
          title: "Message Too Short",
          description: "Please enter a detailed message (at least 10 characters)",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'your-email@gmail.com';

      console.log('EmailJS Config:', { serviceId, templateId, publicKey: publicKey ? 'Set' : 'Not set' });

      // Try EmailJS first if configured
      if (serviceId && templateId && publicKey) {
        // Get current date and time in simpler format
        const now = new Date();
        const currentDate = now.toLocaleDateString('en-US');
        const currentTime = now.toLocaleTimeString('en-US');
        const fullDateTime = `${currentDate} at ${currentTime}`;

        console.log('Date/Time being sent:', { currentDate, currentTime, fullDateTime });

        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: contactEmail,
            current_date: currentDate,
            current_time: currentTime,
            full_datetime: fullDateTime,
          },
          publicKey
        );

        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out. I'll get back to you soon!",
        });
      } else {
        // Fallback to mailto if EmailJS is not configured
        const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Portfolio Website
        `;

        const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(
          `Portfolio Contact: ${formData.subject}`
        )}&body=${encodeURIComponent(emailBody)}`;

        window.open(mailtoLink);

        toast({
          title: "Email Client Opened!",
          description: "Your default email client has been opened. Please send the message from there.",
        });
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Error sending email:', error);
      
      // Fallback to mailto on error
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
      `;

      const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'your-email@gmail.com';
      const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(
        `Portfolio Contact: ${formData.subject}`
      )}&body=${encodeURIComponent(emailBody)}`;

      window.open(mailtoLink);

      toast({
        title: "Fallback: Email Client Opened",
        description: "There was an issue with direct sending. Your email client has been opened instead.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Get In <span className="text-purple-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full" />
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
            Let's collaborate on your next project or discuss opportunities to work together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  I'm always interested in hearing about new opportunities, challenging projects, 
                  and innovative ideas. Whether you're looking for a software developer, 
                  DevOps engineer, I'd love to hear from you.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-gray-300">shahishresth@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Phone</p>
                    <p className="text-gray-300">+91 9315230844</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Location</p>
                    <p className="text-gray-300">Noida, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/shahishree03"
                    className="w-12 h-12 bg-slate-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="https://linkedin.com/in/shahishreshth"
                    className="w-12 h-12 bg-slate-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '0.4s' }}>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm p-8 rounded-xl border border-slate-600/30">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-purple-500 resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-16 pt-8 border-t border-slate-700/50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.6s' }}>
          <p className="text-gray-400">
            © 2024 Shahi Shreshth. Built with ShivShakti
          </p>
        </div>
      </div>
    </div>
  );
};

export { Contact };
