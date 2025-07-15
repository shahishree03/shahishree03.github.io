
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Security measures
const RESUME_URL = "/Shahi__Shreshth_.pdf"; 

// Simple bot detection
const detectBot = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const userAgent = navigator.userAgent.toLowerCase();
  const botPatterns = [
    'bot', 'crawler', 'spider', 'crawling', 'scraper', 'scraping',
    'headless', 'phantom', 'selenium', 'puppeteer', 'playwright'
  ];
  
  return botPatterns.some(pattern => userAgent.includes(pattern));
};

// Disable right-click and shortcuts
const disableRightClick = (e: Event) => {
  e.preventDefault();
  return false;
};

const disableShortcuts = (e: KeyboardEvent) => {
  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
    (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S'))
  ) {
    e.preventDefault();
    return false;
  }
};

export const Resume = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    emailjs: "",
  });
  const [isBot, setIsBot] = useState(false);
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Security initialization
  useEffect(() => {
    // Bot detection
    setIsBot(detectBot());
    
    // Disable right-click and keyboard shortcuts
    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('keydown', disableShortcuts);
    
    // Disable text selection on sensitive elements
    const style = document.createElement('style');
    style.textContent = `
      .no-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
      }
      .resume-iframe {
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('keydown', disableShortcuts);
    };
  }, []);

  // Constants with environment variables
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_RESUME_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  // Simple validation
  const validate = () => {
    const errs: typeof errors = {
      name: "",
      email: "",
      phone: "",
      emailjs: "",
    };
    
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      errs.email = "Invalid email address";
    }
    if (!form.phone.trim()) {
      errs.phone = "Phone is required";
    } else if (!/^[\d +()-]{8,}$/.test(form.phone)) {
      errs.phone = "Invalid phone number";
    }
    
    setErrors(errs);
    return Object.values(errs).every(error => error === "");
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bot protection
    if (isBot || detectBot()) {
      setErrors(prev => ({ ...prev, emailjs: "Access denied. Please use a regular browser." }));
      return;
    }
    
    if (!validate()) return;
    setSending(true);
    setSuccessMsg("");

    // Additional security checks
    const currentTime = Date.now();
    const userAgent = navigator.userAgent;
    
    // Send form data with EmailJS including security info
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          timestamp: new Date().toISOString(),
          userAgent: userAgent,
          origin: window.location.origin,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSuccessMsg("Submitted successfully! Your resume will download now.");
      // Download PDF
      const link = document.createElement("a");
      link.href = RESUME_URL;
      link.download = "Shahi_Shreshth_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowForm(false);
      setForm({ name: "", email: "", phone: "" });
    
      
    } catch (error) {
      setErrors(prev => ({ ...prev, emailjs: "Failed to send. Try again later." }));
    }
    setSending(false);
  };

  return (
    <section id="resume" className="max-w-4xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold text-white text-center mb-8 no-select">
        My Live Resume
      </h2>
      {isBot ? (
        <div className="bg-slate-800 rounded-xl shadow-lg mb-8 p-8 text-center">
          <p className="text-gray-300">Resume preview not available for automated browsers.</p>
          <p className="text-gray-400 text-sm mt-2">Please use a regular browser to view the resume.</p>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-xl shadow-lg mb-8 overflow-hidden no-select">
          <div className="relative">
            <iframe
              src={RESUME_URL}
              title="Resume PDF"
              width="100%"
              height="700px"
              className="w-full resume-iframe"
              style={{
                minHeight: "600px",
                border: "none",
                background: "#222"
              }}
              sandbox="allow-same-origin"
              loading="lazy"
            />
            {/* Overlay to prevent right-click on iframe */}
            <div 
              className="absolute inset-0 pointer-events-none" 
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      )}
      )}
      <div className="text-center mb-8">
        <button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-all no-select"
          onClick={() => !isBot && setShowForm(true)}
          disabled={isBot}
        >
          {isBot ? "Download Unavailable" : "Download Resume"}
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-slate-900 p-8 rounded-xl max-w-md w-full shadow-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setShowForm(false)}
            >✕</button>
            <h3 className="text-xl font-bold text-white mb-4">
              Enter Details to Download
            </h3>
            <form onSubmit={handleDownload} className="space-y-5">
              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleInput}
                  className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:border-purple-500"
                  required
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleInput}
                  className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:border-purple-500"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleInput}
                  className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:border-purple-500"
                  required
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              {errors.emailjs && (
                <p className="text-red-500 text-xs mt-2">{errors.emailjs}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold transition-all shadow hover:scale-105"
                disabled={sending}
              >
                {sending ? "Submitting..." : "Download PDF"}
              </button>
              {successMsg && <p className="text-green-500 text-xs mt-2">{successMsg}</p>}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
